"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Main } from "@/components/main";

const clients = {
  "11999999999": {
    name: "João da Silva",
    address: "Rua das Flores, 123",
  },
  "11888888888": {
    name: "Maria Oliveira",
    address: "Avenida Central, 456",
  },
};

const pizzaFlavors = [
  {
    flavor: "Calabresa",
    sizes: {
      broto: 30,
      media: 45,
      grande: 60,
    },
  },
  {
    flavor: "Frango com Catupiry",
    sizes: {
      broto: 35,
      media: 50,
      grande: 65,
    },
  },
  {
    flavor: "Portuguesa",
    sizes: {
      broto: 33,
      media: 48,
      grande: 63,
    },
  },
];

type PizzaFlavor = {
  flavor: string;
  sizes: Record<string, number>;
};

export const availableDrinks = [
  {
    drink: "Coca-Cola",
    sizes: {
      lata: 5,
      "600ml": 7,
      "1L": 10,
    },
  },
  {
    drink: "Guaraná",
    sizes: {
      lata: 4,
      "600ml": 6,
      "1L": 9,
    },
  },
  {
    drink: "Suco de Laranja",
    sizes: {
      "300ml": 7,
      "500ml": 9,
    },
  },
  {
    drink: "Água Mineral",
    sizes: {
      "500ml": 3,
      "1L": 5,
    },
  },
];

interface AvailableDrink {
  drink: string;
  sizes: Record<string, number>;
}

const orderSchema = z
  .object({
    phone: z
      .string()
      .min(10, { message: "Phone é obrigatório" })
      .max(11, { message: "Phone é obrigatório" }),
    name: z.string().min(1, { message: "Name é obrigatório" }),
    address: z.string().min(1, { message: "Endereço é obrigatório" }),
    pizzaFlavor: z.string().min(1, { message: "Selecione um sabor de pizza" }),
    pizzaSize: z.string().min(1, { message: "Selecione um tamanho" }),
    pizzaQuantity: z
      .number()
      .min(1, { message: "Quantidade deve ser pelo menos 1" }),
    wantsDrink: z.boolean().default(false),
    drinkName: z.string().optional(),
    drinkSize: z.string().optional(),
    drinkQuantity: z.number().optional(),
    paymentMethod: z
      .string()
      .min(1, { message: "Selecione a forma de pagamento" }),
    status: z.string().default("pendente"),
  })
  .refine((data) => (data.wantsDrink ? !!data.drinkName : true), {
    message: "Selecione uma bebida",
    path: ["drinkName"],
  })
  .refine((data) => (data.wantsDrink ? !!data.drinkSize : true), {
    message: "Selecione um tamanho de bebida",
    path: ["drinkAmount"],
  });

type IOrder = z.infer<typeof orderSchema>;

export default function Orders() {
  const [selectedPizza, setSelectedPizza] = useState<PizzaFlavor>();
  const [selectedDrink, setSelectedDrink] = useState<AvailableDrink>();
  const [total, setTotal] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<IOrder>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      wantsDrink: false,
    },
  });

  const phone = watch("phone");
  const wantsDrink = watch("wantsDrink");
  const pizzaFlavor = watch("pizzaFlavor");
  const pizzaSize = watch("pizzaSize");
  const pizzaQuantity = watch("pizzaQuantity");
  const drinkName = watch("drinkName");
  const drinkSize = watch("drinkSize");
  const drinkQuantity = watch("drinkQuantity");
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    const isSelectedPizza = pizzaFlavors.find((p) => p.flavor === pizzaFlavor);

    setSelectedPizza(isSelectedPizza);

    const isSelectedDrink = availableDrinks.find((b) => b.drink === drinkName);

    setSelectedDrink(isSelectedDrink);
  }, [drinkName, pizzaFlavor]);

  useEffect(() => {
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, "");

      const client = clients[cleanPhone];

      if (client) {
        setValue("name", client.name);
        setValue("address", client.address);
      } else {
        resetField("name");
        resetField("address");
      }
    }
  }, [phone, setValue]);

  useEffect(() => {
    let pizzaTotal = 0;

    const selectedPizza = pizzaFlavors.find((p) => p.flavor === pizzaFlavor);

    if (selectedPizza && pizzaSize) {
      pizzaTotal = selectedPizza.sizes[pizzaSize] * pizzaQuantity;
    }

    let drinkTotal = 0;

    if (wantsDrink) {
      const selectedDrink = availableDrinks.find((d) => d.drink === drinkName);
      if (selectedDrink && drinkSize) {
        drinkTotal = selectedDrink.sizes[drinkSize] * (drinkQuantity || 1);
      }
    }

    setTotal(pizzaTotal + drinkTotal);
  }, [
    pizzaFlavor,
    pizzaSize,
    pizzaQuantity,
    wantsDrink,
    drinkName,
    drinkSize,
    drinkQuantity,
  ]);

  const onSubmit = (data: IOrder) => {
    alert(
      `Pedido de ${data.pizzaFlavor}${
        data.wantsDrink ? " + " + data.drinkName : ""
      } realizado com sucesso!`
    );
  };

  return (
    <Main>
      <div className="min-h-screen bg-gray-100 pb-20">
        <Header />
        <div className="pt-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 font-poppins">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-[#B72A23] mb-6">
              Novo Pedido
            </h1>
            <div>
              <label className="block font-semibold">Telefone do Cliente</label>
              <input
                type="text"
                {...register("phone")}
                className={`w-full p-2 rounded border ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="11999999999"
                maxLength={11}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

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
              <label className="block font-semibold">Endereço</label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2 rounded border"
                required
              />
            </div>

            <div className="border-t pt-4">
              <label className="block font-semibold mb-1">Sabor da Pizza</label>
              <select
                {...register("pizzaFlavor")}
                className={`w-full p-2 rounded border ${
                  errors.pizzaFlavor ? "border-red-500" : ""
                }`}
              >
                <option value="">Selecione um sabor</option>
                {pizzaFlavors.map((pizza) => (
                  <option key={pizza.flavor} value={pizza.flavor}>
                    {pizza.flavor}
                  </option>
                ))}
              </select>
              {errors.pizzaFlavor && (
                <p className="text-red-500 text-sm">
                  {errors.pizzaFlavor.message}
                </p>
              )}

              <div className="mt-3">
                <label className="block font-semibold">Quantidade</label>
                <input
                  type="number"
                  min={1}
                  {...register("pizzaQuantity")}
                  className="w-full p-2 rounded border"
                />
              </div>

              <div className="mt-3">
                <label className="block font-semibold">Tamanho</label>
                {selectedPizza ? (
                  <select
                    {...register("pizzaSize")}
                    className={`w-full p-2 rounded border ${
                      errors.pizzaSize ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Selecione</option>
                    {Object.entries(selectedPizza.sizes).map(
                      ([size, price]) => (
                        <option key={size} value={price}>
                          {size.charAt(0).toUpperCase() + size.slice(1)} - R${" "}
                          {price.toFixed(2)}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <p className="text-sm text-gray-500">
                    Selecione um sabor primeiro
                  </p>
                )}
                {errors.pizzaSize && (
                  <p className="text-red-500 text-sm">
                    {errors.pizzaSize.message}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block font-semibold mb-2">Deseja bebida?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="true"
                    checked={wantsDrink === true}
                    onChange={() => setValue("wantsDrink", true)}
                  />
                  Sim
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="false"
                    checked={wantsDrink === false}
                    onChange={() => setValue("wantsDrink", false)}
                  />
                  Não
                </label>
              </div>

              {wantsDrink && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block font-semibold">Bebida</label>
                    <select
                      {...register("drinkName")}
                      className={`w-full p-2 rounded border ${
                        errors.drinkName ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Selecione uma bebida</option>
                      {availableDrinks.map((available) => (
                        <option key={available.drink} value={available.drink}>
                          {available.drink}
                        </option>
                      ))}
                    </select>
                    {errors.drinkName && (
                      <p className="text-red-500 text-sm">
                        {errors.drinkName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold">Tamanho</label>
                    {selectedDrink ? (
                      <select
                        {...register("drinkSize")}
                        className={`w-full p-2 rounded border ${
                          errors.drinkSize ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Selecione</option>
                        {Object.entries(selectedDrink.sizes).map(
                          ([size, price]) => (
                            <option key={size} value={size}>
                              {size} - R$ {price.toFixed(2)}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Selecione uma bebida primeiro
                      </p>
                    )}
                    {errors.drinkSize && (
                      <p className="text-red-500 text-sm">
                        {errors.drinkSize.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold">Quantidade</label>
                    <input
                      type="number"
                      min={1}
                      {...register("drinkQuantity")}
                      className="w-full p-2 rounded border"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <label className="block font-semibold mb-1">
                Forma de Pagamento
              </label>
              <select
                {...register("paymentMethod")}
                className={`w-full p-2 rounded border ${
                  errors.paymentMethod ? "border-red-500" : ""
                }`}
                required
              >
                <option value="">Selecione</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="pix">Pix</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Status do Pedido</label>
              <select
                {...register("status")}
                className="w-full p-2 rounded border"
              >
                <option value="pendente">Pendente</option>
                <option value="em_preparo">Em Preparo</option>
                <option value="entregue">Entregue</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B72A23] text-white py-2 rounded hover:bg-[#a0251e] transition mt-4"
            >
              Finalizar Pedido
            </button>
          </form>

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

            {selectedPizza && pizzaSize && (
              <p>
                <strong>Pizza:</strong> {pizzaQuantity}x {selectedPizza.flavor}{" "}
                ({pizzaSize.charAt(0).toUpperCase() + pizzaSize.slice(1)}) - R${" "}
                {(selectedPizza.sizes[pizzaSize] * pizzaQuantity).toFixed(2)}
              </p>
            )}

            {wantsDrink && selectedDrink && drinkSize && (
              <p className="mt-2">
                <strong>Bebida:</strong> {drinkQuantity}x {selectedDrink.drink}{" "}
                ({drinkSize}) - R${" "}
                {(selectedDrink.sizes[drinkSize] * drinkQuantity).toFixed(2)}
              </p>
            )}

            <hr className="my-4" />

            {paymentMethod && (
              <p className="mt-2">
                <strong>Pagamento:</strong>{" "}
                {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
              </p>
            )}
            <hr className="my-4" />
            <p className="text-lg font-bold">
              Total:{" "}
              <span className="text-green-700">R$ {total.toFixed(2)}</span>
            </p>

            <p className="text-lg font-bold">
              Total:{" "}
              <span className="text-green-700">R$ {total.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </Main>
  );
}
