import { hasAuthToken } from "@/actions/headers";
import { Header } from "@/components/header";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | HackaPizza",
};

export default async function Login() {
  const authToken = await hasAuthToken();

  if (authToken) {
    redirect("/");
  }

  return (
    <div className='bg-[url("/background.svg")] h-screen w-screen bg-cover bg-center flex items-center justify-center p-2'>
      <Header showLogoutButton={false} />

      <div className="bg-[rgba(255,255,255,0.80)] p-8 rounded-lg shadow-md w-96 font-poppins">
        <LoginForm />
      </div>
    </div>
  );
}
