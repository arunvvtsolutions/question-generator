"use client";

import { useEffect, useState } from "react";

const useNavigationTracker = () => {
  const [navigationType, setNavigationType] = useState<string>("");

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setNavigationType("backOrForward");
    };

    // Listen for the popstate event
    window.addEventListener("popstate", handlePopState);

    // Initial check to detect if it's a page reload
    const navigationEntries = performance.getEntriesByType("navigation");
    if (navigationEntries.length > 0) {
      const navigationData = navigationEntries[0] as PerformanceNavigationTiming;
      if (navigationData.type === "reload") {
        setNavigationType("reload");
      } else {
        setNavigationType("navigation");
      }
    }

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return navigationType;
};

export default useNavigationTracker;
