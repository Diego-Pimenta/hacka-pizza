"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import {
  createClient,
  getClientById,
  updateClient,
} from "@/http/requests/clients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiError } from "@/http/errors/api-error";
import { Loading } from "@/components/ui/loading";

const addressSchema = z.object({
  address: z.string().min(1, "Endereço é obrigatório"),
  region: z.string().min(1, "Região é obrigatória"),
  postCode: z.string().min(1, "CEP é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
});

const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  phoneNumber: z.string().min(1, "Telefone é obrigatório"),
  address: addressSchema,
});

type IClientForm = z.infer<typeof clientSchema>;

interface ClientFormProps {
  clientId?: string;
}

export function ClientForm({ clientId }: ClientFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IClientForm>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      address: {
        address: "",
        region: "",
        postCode: "",
        country: "Brasil",
      },
    },
  });

  const onSubmit = async (data: IClientForm) => {
    setIsLoading(true);

    try {
      if (!clientId) {
        await createClient(data.name, data.cpf, data.phoneNumber, {
          address: data.address.address,
          region: data.address.region,
          postCode: data.address.postCode,
          country: data.address.country,
        });
        toast.info("Cliente criado com sucesso!");
      } else {
        await updateClient(clientId, data.name, data.cpf, data.phoneNumber, {
          address: data.address.address,
          region: data.address.region,
          postCode: data.address.postCode,
          country: data.address.country,
        });
        toast.info("Cliente atualizado com sucesso!");
      }

      router.push("/clientes");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getClient = useCallback(async () => {
    if (!clientId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getClientById(clientId);
      const client = response.client;

      setValue("name", client.name);
      setValue("cpf", client.cpf);
      setValue("phoneNumber", client.phoneNumber);

      if (client.address && client.address.length > 0) {
        setValue("address.address", client.address[0].address);
        setValue("address.region", client.address[0].region);
        setValue("address.postCode", client.address[0].postCode);
        setValue("address.country", client.address[0].country);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [clientId, setValue]);

  useEffect(() => {
    getClient();
  }, [getClient, clientId]);

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
        {clientId ? "Editar" : "Novo"} Cliente
      </h1>

      <div>
        <label className="block font-semibold">Nome</label>
        <input
          type="text"
          {...register("name")}
          className="w-full p-2 rounded border"
          placeholder="Nome completo"
          required
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold">CPF</label>
        <input
          type="text"
          {...register("cpf")}
          className="w-full p-2 rounded border"
          placeholder="00000000000"
          maxLength={11}
          required
        />
        {errors.cpf && (
          <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold">Telefone</label>
        <input
          type="text"
          {...register("phoneNumber")}
          className="w-full p-2 rounded border"
          placeholder="(00) 00000-0000"
          required
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div className="border-t pt-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Endereço</h2>

        <div>
          <label className="block font-semibold">Endereço</label>
          <input
            type="text"
            {...register("address.address")}
            className="w-full p-2 rounded border"
            placeholder="Rua, Avenida, etc."
            required
          />
          {errors.address?.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.address.message}
            </p>
          )}
        </div>

        <div className="mt-3">
          <label className="block font-semibold">Região</label>
          <input
            type="text"
            {...register("address.region")}
            className="w-full p-2 rounded border"
            placeholder="Bairro, Cidade, etc."
            required
          />
          {errors.address?.region && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.region.message}
            </p>
          )}
        </div>

        <div className="mt-3">
          <label className="block font-semibold">CEP</label>
          <input
            type="text"
            {...register("address.postCode")}
            className="w-full p-2 rounded border"
            placeholder="00000-000"
            required
          />
          {errors.address?.postCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.postCode.message}
            </p>
          )}
        </div>

        <div className="mt-3">
          <label className="block font-semibold">País</label>
          <input
            type="text"
            {...register("address.country")}
            className="w-full p-2 rounded border"
            required
          />
          {errors.address?.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.country.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#B72A23] text-white py-2 rounded hover:bg-[#a0251e] transition mt-4"
      >
        {clientId ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
}
