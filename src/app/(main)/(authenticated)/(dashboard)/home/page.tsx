export const dynamic = "force-dynamic";
import React from "react";
import AuthHome from "@/components/auth-home";
import UserDashboard from "../../../../../components/dashboard/home-after-login";

const Page = () => {
  return (
    <section className="mx-auto  lg:!py-[40px] px-[16px] !py-[10px] max-w-[880px]">
      {/* <AuthHome /> */}
      <UserDashboard />
    </section>
  );
};

export default Page;
