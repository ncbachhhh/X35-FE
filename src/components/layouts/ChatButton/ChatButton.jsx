import React, { useState, useEffect, useRef } from "react";
import { Modal, List, Input, Button, message as antdMessage } from "antd";
import { useAuth } from "../../../contexts/auth.context";
import MessageAPI from "../../../APIs/message.api.js";
import useCustomerSocket from "../../../sockets/customerSocket.js";

const ADMIN_ID = "68234527e33af47bdda55eca";

export default function ChatButton() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const userId = user?.id;

  const socket = useCustomerSocket();

  // Lấy lịch sử chat khi mở modal
  useEffect(() => {
    if (visible && userId) {
      (async () => {
        const res = await MessageAPI.getChatHistory(ADMIN_ID);
        if (res.isSuccess) {
          setMessages(res.messages || []);
        } else {
          antdMessage.error(res.message || "Lỗi lấy lịch sử chat");
          setMessages([]);
        }
      })();
    }
  }, [visible, userId]);

  const scrollToBottom = () => {
    const container = document.getElementById("chat-list-container-customer");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!chatMessage.trim() || !socket) return;

    // Gửi socket realtime
    socket.emit("send_message_to_admin", chatMessage.trim());

    // Gửi API lưu tin nhắn
    // const res = await MessageAPI.sendMessageToUser({
    //   toUserId: ADMIN_ID,
    //   message: chatMessage.trim(),
    // });

    // if (!res.isSuccess) {
    //   antdMessage.error(res.message || "Gửi tin nhắn thất bại");
    // }

    // Cập nhật UI
    setMessages((prev) => [
      ...prev,
      {
        fromUser: userId,
        toUser: ADMIN_ID,
        message: chatMessage.trim(),
        timestamp: new Date().toISOString(),
      },
    ]);
    setChatMessage("");
  };

  useEffect(() => {
    if (!socket || !visible) return;

    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, visible]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Button type="primary" style={{ position: "fixed", bottom: 24, right: 24, borderRadius: "50%", width: 60, height: 60, fontSize: 24, zIndex: 1000 }} onClick={() => setVisible(true)}>
        <i className="fa-solid fa-comment"></i>
      </Button>

      <Modal visible={visible} title="Chat với Admin" onCancel={() => setVisible(false)} footer={null} width={400}>
        <List
          id="chat-list-container-customer"
          dataSource={messages}
          renderItem={(item) => {
            const isMe = String(item.fromUser) === String(userId);
            return (
              <List.Item style={{ justifyContent: isMe ? "flex-end" : "flex-start", display: "flex", padding: "5px 10px" }}>
                <div
                  style={{
                    backgroundColor: isMe ? "#bae7ff" : "#f5f5f5",
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

        <Input.TextArea
          rows={3}
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button type="primary" onClick={sendMessage} disabled={!chatMessage.trim()} style={{ marginTop: 8 }}>
          Gửi
        </Button>
        <div ref={messagesEndRef} />
      </Modal>
    </>
  );
}
