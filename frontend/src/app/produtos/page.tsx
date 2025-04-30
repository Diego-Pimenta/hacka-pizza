import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { hasAuthToken } from "@/actions/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProductsList } from "./products-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos | Hacka-Pizza",
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
        <div className="pt-20 px-5">
          <Link href="/produtos/editor">
            <span className="text-lg font-bold bg-[#B72A23] text-white rounded-lg px-5 py-2 mb-6">
              Novo Produto
            </span>
          </Link>

          <h1 className="text-2xl font-extrabold underline text-[#B72A23] my-8">
            Produtos
          </h1>

          <ProductsList />
        </div>
      </div>
    </Main>
  );
}
