"use client";

import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { Loading } from "./ui/loading";

export const Main = ({ children }: { children: ReactNode }) => {
  const { isLoadingUserData } = useAuth();

  if (isLoadingUserData) {
    return (
      <div className="flex h-screen">
        <Loading />
      </div>
    );
  }

  return <div className="flex h-screen flex-col">{children}</div>;
};
