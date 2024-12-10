"use client";

import React, { useEffect } from "react";
import Layout from "@/app/dashboards/admin/layout";
import { useAuthStore } from "@/app/store/authStore";

const AdminHome = () => {
  useEffect(() => {
    const token = useAuthStore.getState().token;
    console.log("Check token:", token);
  }, []);

  return (
    <Layout>
      <h1>Welkom bij het dashboard voor admins</h1>{" "}
      {/* You can replace this with your actual content */}
    </Layout>
  );
};

export default AdminHome;
