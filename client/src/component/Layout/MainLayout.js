import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../css/component.css";

const Layout = () => {
  return (
    <div className="Layout">
      <input type="checkbox" id="sidebar_toggel" />
      <Sidebar />
      <main className="main_content">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
