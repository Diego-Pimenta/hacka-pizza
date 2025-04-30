"use client";

import { useState } from "react";
import { searchClientsByPhoneNumber, IClient } from "@/http/requests/clients";
import { toast } from "sonner";
import { ApiError } from "@/http/errors/api-error";

interface ClientSearchProps {
  onSearchResults: (clients: IClient[]) => void;
  onClearSearch: () => void;
}

export function ClientSearch({
  onSearchResults,
  onClearSearch,
}: ClientSearchProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      onClearSearch();
      return;
    }

    setIsSearching(true);

    try {
      const response = await searchClientsByPhoneNumber(phoneNumber);
      
      onSearchResults(response.clients);

      if (response.clients?.length === 0) {
        toast.info("Nenhum cliente encontrado com este número de telefone");
      }
    } catch (error) {

        console.log(error);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao buscar clientes");
      }

      onClearSearch();
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setPhoneNumber("");
    onClearSearch();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Buscar Clientes por Telefone
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-4"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 rounded border pl-10"
            placeholder="Digite o número de telefone..."
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          type="submit"
          className="bg-[#B72A23] text-white py-2 px-4 rounded hover:bg-[#a0251e] transition"
          disabled={isSearching}
        >
          {isSearching ? "Buscando..." : "Buscar"}
        </button>

        {phoneNumber && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
          >
            Limpar
          </button>
        )}
      </form>

      <p className="text-sm text-gray-600">
        Digite o número de telefone do cliente para buscar
      </p>
    </div>
  );
}
