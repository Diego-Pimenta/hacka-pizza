"use client";

import { ApiError } from "@/http/errors/api-error";
import {
  deleteProduct,
  fetchProducts,
  IProduct,
} from "@/http/requests/products";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const ProductsList = () => {
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, IProduct[]>
  >({});

  const fetchProductsList = useCallback(async () => {
    const response = await fetchProducts();

    const grouped = response.products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, IProduct[]>);

    setGroupedProducts(grouped);
  }, []);

  const handleDeleteProduct = async (id: string) => {
    const action = confirm("Você realmente deseja deletar este produto?");

    if (!action) return;

    try {
      await deleteProduct(id);

      toast.info("Produto deletado com sucesso!");

      await fetchProductsList();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, [fetchProductsList]);

  const categoryTranslations: Record<string, string> = {
    DRINK: "Bebidas",
    PIZZA: "Pizzas",
  };

  return (
    <nav className="mt-6">
      <div className="flex flex-row-reverse gap-6">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-[#B72A23] mb-4">
              {categoryTranslations[category] || category}
            </h2>
            <div className="flex flex-col gap-4">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded shadow-md"
                >
                  <div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Tamanho: {product.size}</p>
                    <p>Preço: R$ {product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-row gap-2">
                    <Link
                      href={`/produtos/editor/${product.id}`}
                      className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-white rounded-md px-2 py-1"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-md px-2 py-1"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
