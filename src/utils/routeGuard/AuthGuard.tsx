"use client";
import { useSelector } from "@/store";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect } from "react";
import { setLocalStorage } from "..";
import { AUTHENTICATION } from "@/service/enums/texts";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isInitialized) {
      setLocalStorage(AUTHENTICATION.USER_FROM_WEB, "true");
      router.push("/sign-in");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isInitialized]);

  if (!isAuthenticated) return <NextTopLoader />;

  return children;
};

export default AuthGuard;
