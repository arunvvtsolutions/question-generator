import MainLayout from "@/components/layout/MainLayout";
import React from "react";
import { ExamProvider } from "@/context/ExamContext";

const AuthMainLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <ExamProvider>
      <MainLayout hideSearchBar>{children}</MainLayout>
    </ExamProvider>
  );
};

export default AuthMainLayout;
