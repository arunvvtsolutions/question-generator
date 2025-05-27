"use client";
import { useSelector } from "@/store";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect } from "react";

import { AUTHENTICATION } from "@/service/enums/texts";
import { setLocalStorage } from "@/utils";

const GlobalPage = () => {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && isInitialized) router.push("/home");
    if (!isAuthenticated && isInitialized) {
      setLocalStorage(AUTHENTICATION.USER_FROM_WEB, "true");
      router.push("/sign-in");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isInitialized]);

  if (!isAuthenticated) return <NextTopLoader />;
  return <div></div>;
};

export default GlobalPage;
