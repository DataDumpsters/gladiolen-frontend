import React from "react";
import SideNav from "@/app/components/SideNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-col flex-grow p-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
