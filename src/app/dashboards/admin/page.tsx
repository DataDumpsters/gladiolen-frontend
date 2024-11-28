import React from 'react';
import SideNav from '@/app/components/SideNav';

export default function AdminHome() {
  return (
      <div className="flex">
        <SideNav className=""/>
        <div className="flex-grow p-8">
          <h1>Admin Name</h1>
      </div>
      </div>
  );
}