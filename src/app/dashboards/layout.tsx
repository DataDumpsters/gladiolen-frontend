import React from "react";
import SideNav from "@/app/components/SideNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <SideNav className="w-64 flex-shrink-0" />
      <div className="flex-grow ml-64 p-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
