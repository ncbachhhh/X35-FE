import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/auth.context";

const useAdminSocket = () => {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      console.warn("⛔ user._id is undefined, socket not initialized");
      return;
    }

    // Ngắt kết nối cũ nếu có
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Tạo socket mới
    const socket = io("http://localhost:8000/admin", {
      transports: ["websocket"],
      query: { userId: user.id },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Admin socket connected");
      setSocketReady(true);
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Socket connect error:", err.message);
    });

    socket.on("disconnect", () => {
      console.log("❌ Admin socket disconnected");
      setSocketReady(false);
    });

    return () => {
      socket.disconnect();
      setSocketReady(false);
    };
  }, [user?.id]);

  return socketReady ? socketRef.current : null;
};

export default useAdminSocket;
