import LoginGuard from "@/utils/routeGuard/LoginGuard";
import { Suspense } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
  return (
    <LoginGuard>
      <Suspense>
        <>{children}</>
      </Suspense>
    </LoginGuard>
  );
}
