"use client";
import React, { useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

const GtagScript = () => {
  const [state, setState] = useState(false);
  setTimeout(() => {
    setState(true);
  }, 3000);
  return <>{state ? <GoogleTagManager gtmId="GTM-KVG4WP86" /> : <></>}</>;
};

export default GtagScript;
