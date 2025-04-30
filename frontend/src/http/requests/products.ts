import { api } from "@/http/api-instance";
import { ApiError } from "../errors/api-error";
import { AxiosError } from "axios";
import { apiMessageErrorHandler } from "../errors/api-message-error-handler";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: "DRINK" | "PIZZA";
  size: string;
  price: number;
}

export async function createProduct(
  name: string,
  description: string,
  category: string,
  size: string,
  price: number
) {
  try {
    const response = await api.post<{ product: IProduct }>("/products", {
      name,
      description,
      category,
      size,
      price,
    });

    return {
      product: response.data.product,
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

export async function fetchProducts() {
  try {
    const response = await api.get<{ products: IProduct[] }>("/products");

    return {
      products: response.data.products,
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

export async function getProductById(id: string) {
  try {
    const response = await api.get<{ product: IProduct }>(`/products/${id}`);

    return {
      product: response.data.product,
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

export async function updateProduct(
  id: string,
  name: string,
  description: string,
  category: string,
  size: string,
  price: number
) {
  try {
    const response = await api.put<{ product: IProduct }>(`/products/${id}`, {
      name,
      description,
      category,
      size,
      price,
    });

    return {
      product: response.data.product,
    };
  } catch (error) {
    console.log(error);
    const { message, paths } = apiMessageErrorHandler(
      error instanceof AxiosError
        ? error.response?.data.error
        : "Internal server error"
    );

    throw new ApiError(message, paths);
  }
}

export async function deleteProduct(id: string) {
  try {
    await api.delete(`/products/${id}`);

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
