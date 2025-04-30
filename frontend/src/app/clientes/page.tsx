"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import { ClientSearch } from "./clients-search";
import { fetchClients, IClient, deleteClient } from "@/http/requests/clients";
import { toast } from "sonner";
import { ApiError } from "@/http/errors/api-error";
import { Loading } from "@/components/ui/loading";

export default function ClientsPage() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [filteredClients, setFilteredClients] = useState<IClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    loadAllClients();
  }, []);

  const loadAllClients = async () => {
    setIsLoading(true);
    try {
      const response = await fetchClients();

      setClients(response.clients);
      setFilteredClients([]);
      setIsSearchActive(false);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao carregar clientes");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchResults = (searchResults: IClient[]) => {
    setFilteredClients(searchResults);
    setIsSearchActive(true);
  };

  const handleClearSearch = () => {
    setFilteredClients([]);
    setIsSearchActive(false);
  };

  const handleDeleteClient = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await deleteClient(id);
        toast.success("Cliente excluído com sucesso");

        if (isSearchActive) {
          setFilteredClients(
            filteredClients.filter((client) => client.id !== id)
          );
        }

        setClients(clients.filter((client) => client.id !== id));
      } catch (error) {
        if (error instanceof ApiError) {
          toast.error(error.message);
        } else {
          toast.error("Erro ao excluir cliente");
        }
      }
    }
  };

  const clientsToDisplay = isSearchActive ? filteredClients : clients;

  return (
    <div className="pb-20 bg-gray-100">
      <Header />
      <div className="pt-20 px-5">
        <h1 className="text-2xl font-bold text-[#B72A23] mb-6">Clientes</h1>

        <Link href="/clientes/editor">
          <span className="text-lg font-bold bg-[#B72A23] text-white rounded-lg px-5 py-2 mb-6">
            Adicionar Cliente
          </span>
        </Link>

        <ClientSearch
          onSearchResults={handleSearchResults}
          onClearSearch={handleClearSearch}
        />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loading />
          </div>
        ) : (
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isSearchActive ? "Resultados da Busca" : "Todos os Clientes"}
              </h2>
              {isSearchActive && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {filteredClients?.length} cliente(s) encontrado(s)
                </span>
              )}
            </div>

            {clientsToDisplay?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">
                  {isSearchActive
                    ? "Nenhum cliente encontrado com este número de telefone"
                    : "Nenhum cliente cadastrado ainda."}
                </p>
                {isSearchActive && (
                  <button
                    onClick={handleClearSearch}
                    className="text-[#B72A23] hover:underline"
                  >
                    Ver todos os clientes
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border">Nome</th>
                      <th className="py-2 px-4 border">CPF</th>
                      <th className="py-2 px-4 border">Telefone</th>
                      <th className="py-2 px-4 border">Endereço</th>
                      <th className="py-2 px-4 border">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsToDisplay?.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border">{client.name}</td>
                        <td className="py-2 px-4 border">{client.cpf}</td>
                        <td className="py-2 px-4 border">
                          {client.phoneNumber}
                        </td>
                        <td className="py-2 px-4 border">
                          {client.address && client.address.length > 0 ? (
                            <>
                              {client.address[0].address},{" "}
                              {client.address[0].region} -{" "}
                              {client.address[0].postCode},{" "}
                              {client.address[0].country}
                            </>
                          ) : (
                            <span className="text-gray-400">Sem endereço</span>
                          )}
                        </td>
                        <td className="py-2 px-4 border">
                          <Link href={`/clientes/editor/${client.id}`}>
                            <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2">
                              Editar
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
