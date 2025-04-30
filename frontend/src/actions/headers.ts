"use server";

import { api } from "@/http/api-instance";
import { cookies } from "next/headers";

const AUTH_TOKEN = "auth";

export const hasAuthToken = async () => {
  return (await cookies()).has(AUTH_TOKEN);
};

export const getAuthToken = async () => {
  return (await cookies()).get(AUTH_TOKEN)?.value;
};

export const setAuthToken = async (token: string) => {
  (await cookies()).set(AUTH_TOKEN, `Bearer ${token}`, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1, // 1h
  });
};

export const deleteAuthToken = async () => {
  const hasToken = await hasAuthToken();

  if (hasToken) {
    (await cookies()).delete(AUTH_TOKEN);
  }

  api.defaults.headers.Authorization = "";
};
