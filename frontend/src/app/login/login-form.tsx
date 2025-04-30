"use client";

import { setAuthToken } from "@/actions/headers";
import { Loading } from "@/components/ui/loading";
import { useAuth } from "@/hooks/use-auth";
import { ApiError } from "@/http/errors/api-error";
import { loginUser } from "@/http/requests/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Insira um endereço de e-mail" })
    .email("O endereço de e-mail é inválido"),
  password: z
    .string({ required_error: "Insira uma senha válida" })
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
});

export type ILogin = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { loadUserData } = useAuth();

  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILogin) => {
    setIsLoading(true);

    try {
      const { token } = await loginUser(data.email, data.password);

      toast.info("Usuário logado com sucesso!");

      await setAuthToken(token);

      await loadUserData();

      router.prefetch("/");
    } catch (error) {
      if (error instanceof ApiError) {
        const { message, paths } = error;

        if (Array.isArray(paths)) {
          paths.forEach((path) => {
            setError(path as keyof ILogin, { message });
          });
        } else {
          toast.error(message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 uppercase"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          name="email"
          className="mt-1 block w-full rounded-md border border-gray-500 px-3 py-2 focus:border-[#B72A23] focus:outline-none focus:ring-1 focus:ring-[#B72A23]"
          required
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 uppercase"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          name="password"
          className="mt-1 block w-full rounded-md border border-gray-500 px-3 py-2 focus:border-[#B72A23] focus:outline-none focus:ring-1 focus:ring-[#B72A23]"
          required
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={Object.keys(errors).length > 0 || isLoading}
        className="w-full bg-[#B72A23] text-white py-2 px-4 rounded-md hover:bg-[#961f19] transition-colors duration-200 cursor-pointer"
      >
        {isLoading ? <Loading size="button" variant="small" /> : "Entrar"}
      </button>
    </form>
  );
}
