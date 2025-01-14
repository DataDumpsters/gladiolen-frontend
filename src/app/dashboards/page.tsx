"use client";

import React from "react";
import Layout from "@/app/dashboards/layout";

const AdminHome = () => {
  return (
    <Layout>
      <div className="flex text-gladiolentext bg-white rounded-2xl justify-center items-center p-4 text-2xl">
        <h1>Welkom bij het dashboard voor admins</h1>{" "}
      </div>
    </Layout>
  );
};

export default AdminHome;
