import React, { useEffect, useState, useRef } from "react";
import { Table, Modal, Input, List, Button, message } from "antd";
import UserAPI from "../../../APIs/user.api";
import useAdminSocket from "../../../sockets/adminSocket.js";
import MessageAPI from "../../../APIs/message.api.js";
import { useAuth } from "../../../contexts/auth.context";

export default function UserList() {
  const socket = useAdminSocket();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await UserAPI.getUserList(page, pageSize);
      if (res.isSuccess) {
        setUsers(res.data.users);
        setPagination({ current: page, pageSize, total: res.data.totalUsers });
      } else {
        message.error(res.message || "Failed to load users");
      }
    } catch {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openChatModal = async (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
    setMessages([]); // reset messages before loading new ones

    try {
      const res = await MessageAPI.getChatHistory(user._id);
      if (res.isSuccess) setMessages(res.messages);
    } catch {
      setMessages([]);
    }
  };

  const sendChat = async () => {
    const text = chatMessage.trim();
    if (!text) return message.warning("Please enter message");

    // Emit qua socket nếu đã kết nối
    if (socket) {
      socket.emit("send_message_to_customer", selectedUser._id, text);
    }

    // Gửi API để lưu DB
    // await MessageAPI.sendMessageToUser({ toUserId: selectedUser._id, message: text });

    // Update UI
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

  const scrollToBottom = () => {
    const container = document.getElementById("chat-list-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
  ];

  return (
    <>
      <Table
        className="outlet-admin"
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
        onChange={(pagination) => fetchUsers(pagination.current, pagination.pageSize)}
      />

      <Modal title={`Chat with ${selectedUser?.fullname || ""}`} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={600}>
        <List
          id="chat-list-container"
          dataSource={messages}
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
          style={{ maxHeight: 300, overflowY: "auto", marginBottom: 10 }}
        />
        <div ref={messagesEndRef} />
        <Input.TextArea
          rows={3}
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Type your message here..."
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              sendChat();
            }
          }}
        />
        <Button type="primary" onClick={sendChat} disabled={!chatMessage.trim()} style={{ marginTop: 8 }}>
          Send
        </Button>
      </Modal>
    </>
  );
}
