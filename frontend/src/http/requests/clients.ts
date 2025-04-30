import { api } from "@/http/api-instance";
import { ApiError } from "../errors/api-error";
import { AxiosError } from "axios";
import { apiMessageErrorHandler } from "../errors/api-message-error-handler";

export interface IAddress {
  address: string;
  region: string;
  postCode: string;
  country: string;
}

export interface IClient {
  id: string;
  name: string;
  cpf: string;
  phoneNumber: string;
  active: boolean;
  address: IAddress[];
}

export async function createClient(
  name: string,
  cpf: string,
  phoneNumber: string,
  address: IAddress
) {
  try {
    const response = await api.post<{ client: IClient }>("/clients", {
      name,
      cpf,
      phoneNumber,
      address,
    });

    return {
      client: response.data.client,
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

export async function fetchClients() {
  try {
    const response = await api.get<{ clients: IClient[] }>("/clients");

    return {
      clients: response.data.clients,
    };
  } catch (error) {
    const { message } = apiMessageErrorHandler(
      error instanceof AxiosError
        ? error.response?.data.error
        : "Internal server error"
    );

    throw new ApiError(message);
  }
}

export async function getClientById(id: string) {
  try {
    const response = await api.get<{ client: IClient }>(`/clients/${id}`);

    return {
      client: response.data.client,
    };
  } catch (error) {
    const { message } = apiMessageErrorHandler(
      error instanceof AxiosError
        ? error.response?.data.error
        : "Internal server error"
    );

    throw new ApiError(message);
  }
}

export async function updateClient(
  id: string,
  name: string,
  cpf: string,
  phoneNumber: string,
  address: IAddress
) {
  try {
    const response = await api.put<{ client: IClient }>(`/clients/${id}`, {
      name,
      cpf,
      phoneNumber,
      address,
    });

    return {
      client: response.data.client,
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

export async function deleteClient(id: string) {
  try {
    await api.delete(`/clients/${id}`);

    return {
      message: "ok",
    };
  } catch (error) {
    const { message } = apiMessageErrorHandler(
      error instanceof AxiosError
        ? error.response?.data.error
        : "Internal server error"
    );

    throw new ApiError(message);
  }
}
