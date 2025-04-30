import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { ProductForm } from "../product-form";
import { hasAuthToken } from "@/actions/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Produto | Hacka-Pizza",
};

export interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateProduct(props: ProductPageProps) {
  const authToken = await hasAuthToken();

  if (!authToken) {
    redirect("/login");
  }

  const { id: productId } = await props.params;

  return (
    <Main>
      <div className="bg-gray-100 pb-20">
        <Header />
        <div className="pt-20 px-6 max-w-7xl mx-auto grid justify-center gap-8 font-poppins">
          <ProductForm productId={productId} />
        </div>
      </div>
    </Main>
  );
}
