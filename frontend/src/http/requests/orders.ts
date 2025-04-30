import { api } from "@/http/api-instance";
import { ApiError } from "../errors/api-error";
import { AxiosError } from "axios";
import { apiMessageErrorHandler } from "../errors/api-message-error-handler";

export interface IOrderItem {
  type: 'pizza' | 'drink';
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  address: string;
  items: IOrderItem[];
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export async function createOrder(
  clientName: string,
  clientPhone: string,
  address: string,
  items: IOrderItem[],
  total: number,
  paymentMethod: string,
  status: string = "pendente"
) {
  try {
    const response = await api.post<{ order: IOrder }>("/orders", {
      clientName,
      clientPhone,
      address,
      items,
      total,
      paymentMethod,
      status,
    });

    return {
      order: response.data.order,
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

export async function fetchOrders() {
  try {
    const response = await api.get<{ orders: IOrder[] }>("/orders");

    return {
      orders: response.data.orders,
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

export async function getOrderById(id: string) {
  try {
    const response = await api.get<{ order: IOrder }>(`/orders/${id}`);

    return {
      order: response.data.order,
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

export async function updateOrderStatus(id: string, status: string) {
  try {
    const response = await api.patch<{ order: IOrder }>(`/orders/${id}/status`, {
      status,
    });

    return {
      order: response.data.order,
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

export async function deleteOrder(id: string) {
  try {
    await api.delete(`/orders/${id}`);

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

export async function getRevenueSummary() {
  try {
    const response = await api.get<{ summary: any }>("/orders/summary");

    return {
      summary: response.data.summary,
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
