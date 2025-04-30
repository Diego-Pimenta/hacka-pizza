"use client";
import { useState } from "react";
import { Header } from "@/components/header";
import { Main } from "@/components/main";

type Order = {
  id: number;
  client: string;
  phone: string;
  address: string;
  items: {
    name: string;
    quantity: number;
    size?: string;
    price: number;
  }[];
  total: number;
  paymentMethod: string;
  status: "Pendente" | "Em preparo" | "Cancelado" | "Entregue";
  createdAt: string;
};

export default function OrderTracking() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      client: "João da Silva",
      phone: "11999999999",
      address: "Rua das Flores, 123",
      items: [
        { name: "Pizza Calabresa", quantity: 1, size: "Média", price: 45 },
        { name: "Coca-Cola", quantity: 2, size: "Lata", price: 10 },
      ],
      total: 55,
      paymentMethod: "Pix",
      status: "Pendente",
      createdAt: "2023-05-01T10:30:00",
    },
    {
      id: 2,
      client: "Maria Oliveira",
      phone: "11888888888",
      address: "Avenida Central, 456",
      items: [
        { name: "Pizza Frango com Catupiry", quantity: 1, size: "Grande", price: 65 },
        { name: "Guaraná", quantity: 1, size: "600ml", price: 6 },
      ],
      total: 71,
      paymentMethod: "Dinheiro",
      status: "Em preparo",
      createdAt: "2023-05-01T11:15:00",
    },
    {
      id: 3,
      client: "Carlos Souza",
      phone: "11777777777",
      address: "Rua das Palmeiras, 789",
      items: [
        { name: "Pizza Portuguesa", quantity: 2, size: "Broto", price: 66 },
      ],
      total: 66,
      paymentMethod: "Cartão de Crédito",
      status: "Entregue",
      createdAt: "2023-04-30T19:45:00",
    },
    {
      id: 4,
      client: "Ana Santos",
      phone: "11666666666",
      address: "Alameda Santos, 1001",
      items: [
        { name: "Pizza Calabresa", quantity: 1, size: "Grande", price: 60 },
        { name: "Água Mineral", quantity: 1, size: "500ml", price: 3 },
      ],
      total: 63,
      paymentMethod: "Cartão de Débito",
      status: "Cancelado",
      createdAt: "2023-04-30T20:30:00",
    },
  ]);

  const updateOrderStatus = (id: number, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: Order["status"]) => {
    switch(status) {
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Em preparo": return "bg-blue-100 text-blue-800";
      case "Cancelado": return "bg-red-100 text-red-800";
      case "Entregue": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Main>
      <div className="min-h-screen bg-gray-100 pb-20">
        <Header />
        <div className="pt-20 px-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#B72A23] mb-6">Acompanhar Pedidos</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold">
              <div className="col-span-1">ID</div>
              <div className="col-span-2">Cliente</div>
              <div className="col-span-2">Telefone</div>
              <div className="col-span-2">Itens</div>
              <div className="col-span-1">Total</div>
              <div className="col-span-2">Pagamento</div>
              <div className="col-span-2">Status</div>
            </div>

            {orders.map((order) => (
              <div key={order.id} className="grid grid-cols-12 p-4 border-b items-center">
                <div className="col-span-1">{order.id}</div>
                <div className="col-span-2">
                  <p className="font-medium">{order.client}</p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                </div>
                <div className="col-span-2">{order.phone}</div>
                <div className="col-span-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="mb-1">
                      {item.quantity}x {item.name} {item.size && `(${item.size})`}
                    </div>
                  ))}
                </div>
                <div className="col-span-1 font-medium">R$ {order.total.toFixed(2)}</div>
                <div className="col-span-2">{order.paymentMethod}</div>
                <div className="col-span-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em preparo">Em preparo</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Entregue">Entregue</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
}