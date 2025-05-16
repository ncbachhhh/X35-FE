import React from "react";
import Header from "./Header/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import ChatButton from "./ChatButton/ChatButton.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ChatButton />
    </>
  );
}
