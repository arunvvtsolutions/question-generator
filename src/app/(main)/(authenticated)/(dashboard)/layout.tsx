import MainLayout from "@/components/layout/MainLayout";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactElement }) => {
  // return <MainLayout sidebarVisible={true} hideSearchBar className="lg:px-[290px]">{children}</MainLayout>;
  return <MainLayout sidebarVisible={true} hideSearchBar className="">{children}</MainLayout>;
};

export default DashboardLayout;
