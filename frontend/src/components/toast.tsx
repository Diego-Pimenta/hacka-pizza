"use client";

import { Toaster } from "sonner";

export const Toast = () => {
  return (
    <Toaster
      richColors
      expand
      closeButton
      toastOptions={{
        style: {
          willChange: "unset",
        },
      }}
    />
  );
};
