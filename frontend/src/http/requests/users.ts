import { api } from "@/http/api-instance";
import { ApiError } from "../errors/api-error";
import { AxiosError } from "axios";
import { apiMessageErrorHandler } from "../errors/api-message-error-handler";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post<{ token: string }>("/auth/login", {
      email,
      password,
    });

    return {
      token: response.data.token,
    };
  } catch (error) {
    const { message, paths } = apiMessageErrorHandler(
      error instanceof AxiosError
        ? error.response?.data.error
        : "Internal server error"
    );

    throw new ApiError(message, paths);
  }
}

export async function getUser() {
  const response = await api.get<{ user: IUser }>("/auth/user");

  return {
    user: response.data.user,
  };
}
