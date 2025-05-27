"use client";
import React from "react";
import Header from "@/components/layout/MainLayout/Header";
import "./minimal.css";

const MinimalLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Header className="2xl:mx-[20rem] xl:mx-[50px]" />
      <>{children}</>
    </>
  );
};

export default MinimalLayout;
