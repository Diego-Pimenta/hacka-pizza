"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "@/http/requests/products";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiError } from "@/http/errors/api-error";
import { Loading } from "@/components/ui/loading";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.enum(["PIZZA", "DRINK"], {
    errorMap: () => ({ message: "Categoria é obrigatória" }),
  }),
  size: z.string().min(1, "Tamanho é obrigatório"),
  price: z.coerce.number().min(0, "Preço deve ser maior que zero"),
});

type IProduct = z.infer<typeof productSchema>;

interface ProductForm {
  productId?: string;
}

export function ProductForm({ productId }: ProductForm) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: IProduct) => {
    setIsLoading(true);

    try {
      if (!productId) {
        await createProduct(
          data.name,
          data.description,
          data.category,
          data.size,
          data.price
        );
        toast.info("Produto criado com sucesso!");
      } else {
        await updateProduct(
          productId,
          data.name,
          data.description,
          data.category,
          data.size,
          data.price
        );
        toast.info("Produto atualizado com sucesso!");
      }

      router.push("/produtos");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = useCallback(async () => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getProductById(productId);

      const product = response.product;

      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("category", product.category);
      setValue("size", product.size);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.message(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [productId, setValue]);

  useEffect(() => {
    getProduct();
  }, [getProduct, productId]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <form className="space-y-4 min-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-[#B72A23] mb-6">
        {productId ? "Editar" : "Novo"} Produto
      </h1>

      <div>
        <label className="block font-semibold">Nome</label>
        <input
          type="text"
          {...register("name")}
          className="w-full p-2 rounded border"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Descrição</label>
        <textarea
          {...register("description")}
          className="w-full p-2 rounded border"
          required
        ></textarea>
      </div>

      <div className="border-t pt-4">
        <label className="block font-semibold mb-1">Categoria do produto</label>
        <select {...register("category")} className="w-full p-2 rounded border">
          <option value="">Selecione uma categoria</option>
          <option value="PIZZA">Pizza</option>
          <option value="DRINK">Bebida</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Tamanho</label>
        <input
          type="text"
          {...register("size")}
          className="w-full p-2 rounded border"
          required
        />
      </div>

      <div className="mt-3">
        <label className="block font-semibold">Preço</label>
        <input
          type="number"
          min={1}
          step="0.01"
          {...register("price")}
          className="w-full p-2 rounded border"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#B72A23] text-white py-2 rounded hover:bg-[#a0251e] transition mt-4"
      >
        {productId ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
}
