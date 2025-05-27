"use client";
import { useSelector } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getLocalStorage } from "..";
import { AUTHENTICATION } from "@/service/enums/texts";

const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      const isUserFromWeb = getLocalStorage(AUTHENTICATION.USER_FROM_WEB);
      if (isUserFromWeb === "true") router.push("/home");
      else router.push("/sign-in");
      localStorage.removeItem(AUTHENTICATION.USER_FROM_WEB);
    }
  }, [isAuthenticated, router, pathname, isInitialized]);

  return children;
};

export default LoginGuard;
