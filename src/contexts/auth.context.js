import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserAPI from "../APIs/user.api";

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
        const response = await UserAPI.getProfile();
        if (response.isSuccess) {
          console.log("User profile:", response.data);
          setUser(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile();
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, loading, setLoading, getProfile }}>{children}</AuthContext.Provider>;
};
