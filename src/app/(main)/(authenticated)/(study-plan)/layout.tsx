import MainLayout from "@/components/layout/MainLayout";
import React from "react";

const AuthMainLayout = ({ children }: { children: React.ReactElement }) => {
  return <MainLayout hideSearchBar>{children}</MainLayout>;
};

export default AuthMainLayout;
