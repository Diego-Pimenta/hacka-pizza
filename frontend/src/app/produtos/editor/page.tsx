import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { ProductForm } from "./product-form";
import { hasAuthToken } from "@/actions/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Produto | Hacka-Pizza",
};

export default async function Products() {
  const authToken = await hasAuthToken();

  if (!authToken) {
    redirect("/login");
  }

  return (
    <Main>
      <div className="bg-gray-100 pb-20">
        <Header />
        <div className="pt-20 px-6 max-w-7xl mx-auto grid justify-center gap-8 font-poppins">
          <ProductForm />
        </div>
      </div>
    </Main>
  );
}
