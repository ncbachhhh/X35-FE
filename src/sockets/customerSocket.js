import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/auth.context";

const useCustomerSocket = () => {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      console.warn("⛔ user.id undefined, socket not initialized");
      return;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = io("http://localhost:8000/customer", {
      transports: ["websocket"],
      query: { userId: user.id },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Customer socket connected");
      setSocketReady(true);
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Customer socket connect error:", err.message);
    });

    socket.on("disconnect", () => {
      console.log("❌ Customer socket disconnected");
      setSocketReady(false);
    });

    return () => {
      socket.disconnect();
      setSocketReady(false);
    };
  }, [user?.id]);

  return socketReady ? socketRef.current : null;
};

export default useCustomerSocket;
