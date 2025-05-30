import React, { useEffect, useState, useRef } from "react";
import { Table, Modal, Input, List, Button, Select, Popconfirm } from "antd";
import UserAPI from "../../../APIs/user.api";
import useAdminSocket from "../../../sockets/adminSocket.js";
import MessageAPI from "../../../APIs/message.api.js";
import { useAuth } from "../../../contexts/auth.context";
import { useNotification } from "../../../contexts/notification.context.js";

const { Option } = Select;

export default function UserList() {
  const { api, contextHolder } = useNotification();
  const socket = useAdminSocket();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const messagesEndRef = useRef(null);

  // States modal sửa user
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editUserData, setEditUserData] = useState({
    fullname: "",
    email: "",
    address: "",
    role: "user",
  });

  // States modal tạo user mới
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createUserData, setCreateUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
  });

  // Load danh sách user
  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await UserAPI.getUserList(page, pageSize);
      if (res.isSuccess) {
        setUsers(res.data.users);
        setPagination({ current: page, pageSize, total: res.data.totalUsers });
      } else {
        api.error({ message: res.message || "Failed to load users" });
      }
    } catch {
      api.error({ message: "Failed to load users" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm mở modal chat
  const openChatModal = async (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
    setMessages([]);
    setLoadingMessages(true);
    try {
      const res = await MessageAPI.getChatHistory(user._id);
      if (res.isSuccess) setMessages(res.messages);
    } catch {
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Gửi chat
  const sendChat = async () => {
    const text = chatMessage.trim();
    if (!text) return api.warning({ message: "Vui lòng nhập tin nhắn" });

    if (socket) {
      socket.emit("send_message_to_customer", selectedUser._id, text);
    }

    try {
      await MessageAPI.sendMessageToUser({ toUserId: selectedUser._id, message: text });
    } catch {
      api.error({ message: "Gửi tin nhắn thất bại" });
    }

    setMessages((prev) => [
      ...prev,
      {
        fromUser: user.id,
        toUser: selectedUser._id,
        message: text,
        timestamp: new Date().toISOString(),
      },
    ]);
    setChatMessage("");
  };

  useEffect(() => {
    if (!selectedUser || !socket) return;

    const handleIncomingMessage = (msg) => {
      if (msg.fromUser === selectedUser._id || msg.toUser === selectedUser._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive_message", handleIncomingMessage);
    return () => socket.off("receive_message", handleIncomingMessage);
  }, [selectedUser, socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setMessages([]);
    setChatMessage("");
  };

  // Mở modal sửa user
  const openEditModal = (user) => {
    setEditUserData({
      fullname: user.fullname || "",
      email: user.email || "",
      address: user.address || "",
      role: user.role || "user",
      id: user._id,
    });
    setIsEditModalVisible(true);
  };

  // Thay đổi dữ liệu form sửa
  const handleEditChange = (field, value) => {
    setEditUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Lưu thay đổi user
  const handleEditSave = async () => {
    const { id, fullname, email, address, role } = editUserData;
    if (!fullname || !email || !role) {
      return api.warning({ message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
    }
    try {
      const res = await UserAPI.updateUser({ userId: id, fullname, email, address, role });
      if (res.isSuccess) {
        api.success({ message: "Cập nhật người dùng thành công" });
        setIsEditModalVisible(false);
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        api.error({ message: res.message || "Cập nhật thất bại" });
      }
    } catch {
      api.error({ message: "Cập nhật thất bại" });
    }
  };

  // Xóa user
  const handleDeleteUser = async (userId) => {
    try {
      const res = await UserAPI.deleteUser(userId);
      if (res.isSuccess) {
        api.success({ message: "Xóa người dùng thành công" });
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        api.error({ message: res.message || "Xóa thất bại" });
      }
    } catch {
      api.error({ message: "Xóa thất bại" });
    }
  };

  // Thay đổi dữ liệu form tạo user
  const handleCreateChange = (field, value) => {
    setCreateUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Gửi API tạo user mới
  const handleCreateUser = async () => {
    const { fullname, email, password, address } = createUserData;
    if (!fullname || !email || !password) {
      return api.warning({ message: "Vui lòng điền đầy đủ các trường bắt buộc" });
    }
    try {
      const res = await UserAPI.register({ fullname, email, password, address });
      if (res.isSuccess) {
        api.success({ message: "Tạo người dùng mới thành công" });
        setIsCreateModalVisible(false);
        setCreateUserData({ fullname: "", email: "", password: "", address: "" });
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        api.error({ message: res.message || "Tạo người dùng thất bại" });
      }
    } catch {
      api.error({ message: "Tạo người dùng thất bại" });
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text, record) => <a onClick={() => openChatModal(record)}>{text}</a>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)} style={{ paddingRight: 8 }}>
            Sửa
          </Button>
          <Popconfirm title="Bạn có chắc muốn xóa người dùng này?" onConfirm={() => handleDeleteUser(record._id)} okText="Có" cancelText="Không">
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="outlet-admin">
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => setIsCreateModalVisible(true)}>
        Tạo User mới
      </Button>

      <Table
        style={{ paddingRight: 20 }}
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={(pagination) => {
          setPagination(pagination);
          fetchUsers(pagination.current, pagination.pageSize);
        }}
      />

      {/* Modal chat */}
      <Modal title={`Chat với ${selectedUser?.fullname || ""}`} open={isModalVisible} onCancel={handleModalClose} footer={null} width={600}>
        <div id="chat-list-container" ref={messagesEndRef} style={{ maxHeight: 300, overflowY: "auto", marginBottom: 10, paddingRight: 8 }}>
          <List
            dataSource={messages}
            loading={loadingMessages}
            renderItem={(item) => {
              const isAdmin = item.fromUser === user.id;
              return (
                <List.Item
                  style={{
                    justifyContent: isAdmin ? "flex-end" : "flex-start",
                    display: "flex",
                    padding: "5px 10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: isAdmin ? "#bae7ff" : "#f5f5f5",
                      padding: 8,
                      borderRadius: 8,
                      maxWidth: "70%",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.message}
                    <div style={{ fontSize: 10, color: "#999", marginTop: 4 }}>{new Date(item.timestamp).toLocaleString()}</div>
                  </div>
                </List.Item>
              );
            }}
          />
        </div>

        <Input.TextArea
          rows={3}
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Nhập tin nhắn ở đây..."
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              sendChat();
            }
          }}
        />
        <Button type="primary" onClick={sendChat} disabled={!chatMessage.trim()} style={{ marginTop: 8 }}>
          Gửi
        </Button>
      </Modal>

      {/* Modal sửa user */}
      <Modal title="Sửa thông tin người dùng" open={isEditModalVisible} onCancel={() => setIsEditModalVisible(false)} onOk={handleEditSave} okText="Lưu" cancelText="Hủy" width={500}>
        <Input placeholder="Full Name" value={editUserData.fullname} onChange={(e) => handleEditChange("fullname", e.target.value)} style={{ marginBottom: 12 }} />
        <Input placeholder="Email" value={editUserData.email} onChange={(e) => handleEditChange("email", e.target.value)} style={{ marginBottom: 12 }} />
        <Input placeholder="Address" value={editUserData.address} onChange={(e) => handleEditChange("address", e.target.value)} style={{ marginBottom: 12 }} />
        <Select value={editUserData.role} onChange={(value) => handleEditChange("role", value)} style={{ width: "100%" }}>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </Modal>

      {/* Modal tạo user mới */}
      <Modal title="Tạo người dùng mới" open={isCreateModalVisible} onCancel={() => setIsCreateModalVisible(false)} onOk={handleCreateUser} okText="Tạo" cancelText="Hủy" width={500}>
        <Input placeholder="Full Name" value={createUserData.fullname} onChange={(e) => handleCreateChange("fullname", e.target.value)} style={{ marginBottom: 12 }} />
        <Input placeholder="Email" value={createUserData.email} onChange={(e) => handleCreateChange("email", e.target.value)} style={{ marginBottom: 12 }} />
        <Input.Password placeholder="Password" value={createUserData.password} onChange={(e) => handleCreateChange("password", e.target.value)} style={{ marginBottom: 12 }} />
        <Input placeholder="Address" value={createUserData.address} onChange={(e) => handleCreateChange("address", e.target.value)} style={{ marginBottom: 12 }} />
      </Modal>
    </div>
  );
}
