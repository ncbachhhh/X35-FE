import { notification } from "antd";
import React, { useContext } from "react";

const NotificationContext = React.createContext(null);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={{ api }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
