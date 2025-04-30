"use client";
import { useState, useMemo } from 'react';
import { Header } from "@/components/header";

interface Client {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
}

const initialClients: Client[] = [
  {
    id: 1,
    name: "João Silva",
    cpf: "12345678900",
    phone: "(11) 99999-9999",
    street: "Rua das Flores",
    number: "100",
    complement: "Apto 101",
    neighborhood: "Centro",
    city: "São Paulo"
  },
  {
    id: 2,
    name: "Maria Oliveira",
    cpf: "98765432100",
    phone: "(11) 98888-8888",
    street: "Avenida Brasil",
    number: "200",
    complement: "",
    neighborhood: "Jardins",
    city: "São Paulo"
  },
  {
    id: 3,
    name: "João Pereira",
    cpf: "11122233344",
    phone: "(21) 91234-5678",
    street: "Rua das Laranjeiras",
    number: "300",
    complement: "Casa",
    neighborhood: "Flamengo",
    city: "Rio de Janeiro"
  },
  {
    id: 4,
    name: "João Costa",
    cpf: "55566677788",
    phone: "(31) 97654-3210",
    street: "Rua Afonso Pena",
    number: "400",
    complement: "Apto 402",
    neighborhood: "Centro",
    city: "Belo Horizonte"
  },
  {
    id: 5,
    name: "Ana Beatriz",
    cpf: "11223344556",
    phone: "(41) 99876-5432",
    street: "Rua XV de Novembro",
    number: "500",
    complement: "",
    neighborhood: "Batel",
    city: "Curitiba"
  },
  {
    id: 6,
    name: "Carlos Eduardo",
    cpf: "66778899000",
    phone: "(51) 98765-4321",
    street: "Avenida Ipiranga",
    number: "600",
    complement: "Sala 5",
    neighborhood: "Centro",
    city: "Porto Alegre"
  },
  {
    id: 7,
    name: "Fernanda Lima",
    cpf: "44332211009",
    phone: "(85) 96543-2100",
    street: "rua dos Coqueiros",
    number: "700",
    complement: "Bloco B",
    neighborhood: "Meireles",
    city: "Fortaleza"
  },
  {
    id: 8,
    name: "Mariana Rocha",
    cpf: "33445566778",
    phone: "(71) 99812-3456",
    street: "Ladeira da Barra",
    number: "800",
    complement: "Cobertura",
    neighborhood: "Barra",
    city: "Salvador"
  }
];

export default function CustomerRegistration() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [clientEditing, setClientEditing] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Omit<Client, 'id'>>({
    name: '',
    cpf: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: ''
  });
  const [search, setSearch] = useState('');
  const [seachMode, setSearchMode] = useState<'todos' | 'nome' | 'cpf' | 'telefone' | 'endereco'>('todos');

  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;
    
    const term = search.toLowerCase().trim();
    const numbers = search.replace(/\D/g, '');

    return clients.filter(client => {
      switch (seachMode) {
        case 'nome':
          return client.name.toLowerCase().includes(term);
        case 'cpf':
          return client.cpf.includes(numbers);
        case 'telefone':
          return client.phone.includes(numbers);
        case 'endereco':
          return (
            client.street.toLowerCase().includes(term) ||
            client.neighborhood.toLowerCase().includes(term) ||
            client.city.toLowerCase().includes(term)
          );
        default:
          return (
            client.name.toLowerCase().includes(term) ||
            client.cpf.includes(numbers) ||
            client.phone.includes(numbers) ||
            client.street.toLowerCase().includes(term) ||
            client.neighborhood.toLowerCase().includes(term) ||
            client.city.toLowerCase().includes(term)
          );
      }
    });
  }, [clients, search, seachMode]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numericValue = input.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 11);
    setFormData({
      ...formData,
      cpf: truncatedValue
    });
  };
  const formatCpfDisplay = (cpf: string) => {
    if (!cpf) return '';
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatarTelefone = (phone: string): string => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.cpf.length !== 11) {
      alert('CPF deve conter exatamente 11 dígitos');
      return;
    }
    
    if (clientEditing) {
      setClients(clients.map(client => 
        client.id === clientEditing.id ? { 
          ...formData, 
          id: clientEditing.id,
          cpf: formData.cpf,
          phone: formatarTelefone(formData.phone.replace(/\D/g, ''))
        } : client
      ));
    } else {
      const newClient: Client = {
        ...formData,
        id: Date.now(),
        phone: formatarTelefone(formData.phone.replace(/\D/g, ''))
      };
      setClients([...clients, newClient]);
    }
    
    setFormData({
      name: '',
      cpf: '',
      phone: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: ''
    });
    setClientEditing(null);
  };

  const handleEdit = (client: Client) => {
    setClientEditing(client);
    setFormData({
      name: client.name,
      cpf: client.cpf,
      phone: client.phone,
      street: client.street,
      number: client.number,
      complement: client.complement,
      neighborhood: client.neighborhood,
      city: client.city
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-20 px-6 max-w-7xl mx-auto font-poppins">
        <h1 className="text-2xl font-bold text-[#B72A23] mb-6">Cadastro de Clientes</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {clientEditing ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Nome*</label>
              <input
                type="text"
                name="nome"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-1">CPF*</label>
              <input
                type="text"
                name="cpf"
                value={formatCpfDisplay(formData.cpf)}
                onChange={handleCpfChange}
                className={`w-full p-2 rounded border ${
                  formData.cpf.length > 0 && formData.cpf.length !== 11 ? 'border-red-500' : ''
                }`}
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
              {formData.cpf.length > 0 && formData.cpf.length !== 11 && (
                <p className="text-red-500 text-sm mt-1">CPF deve ter exatamente 11 dígitos</p>
              )}
            </div>
            
            <div>
              <label className="block font-semibold mb-1">Telefone*</label>
              <input
                type="text"
                name="telefone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-1">Rua*</label>
              <input
                type="text"
                name="rua"
                value={formData.street}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-1">Número*</label>
              <input
                type="text"
                name="numero"
                value={formData.number}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-1">Complemento</label>
              <input
                type="text"
                name="complemento"
                value={formData.complement}
                onChange={handleChange}
                className="w-full p-2 rounded border"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-1">Bairro*</label>
              <input
                type="text"
                name="bairro"
                value={formData.neighborhood}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-1">Cidade*</label>
              <input
                type="text"
                name="cidade"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>
          </div>
          
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-[#B72A23] text-white py-2 px-4 rounded hover:bg-[#a0251e] transition"
              disabled={formData.cpf.length > 0 && formData.cpf.length !== 11}
            >
              {clientEditing ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
            </button>
            
            {clientEditing && (
              <button
                type="button"
                onClick={() => {
                  setClientEditing(null);
                  setFormData({
                    name: '',
                    cpf: '',
                    phone: '',
                    street: '',
                    number: '',
                    complement: '',
                    neighborhood: '',
                    city: ''
                  });
                }}
                className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Buscar Clientes</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 rounded border pl-10"
                placeholder={`Buscar por ${seachMode === 'todos' ? 'qualquer campo' : seachMode}...`}
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
            
            <select
              value={seachMode}
              onChange={(e) => setSearchMode(e.target.value as 'todos' | 'nome' | 'cpf' | 'telefone' | 'endereco')}
              className="p-2 rounded border bg-white"
            >
              <option value="todos">Todos os Campos</option>
              <option value="nome">Nome</option>
              <option value="cpf">CPF</option>
              <option value="telefone">Telefone</option>
              <option value="endereco">Endereço</option>
            </select>
          </div>
          
          {search && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredClients.length} cliente(s) encontrado(s)
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-sm text-[#B72A23] hover:underline"
                >
                  Limpar busca
                </button>
              )}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {search ? 'Resultados da Busca' : 'Todos os Clientes'}
            </h2>
            {search && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Filtro: {seachMode === 'todos' ? 'todos os campos' : seachMode}
              </span>
            )}
          </div>
          
          {filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">
                {search ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado ainda.'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
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
                  {filteredClients.map(client => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{client.name}</td>
                      <td className="py-2 px-4 border">{formatCpfDisplay(client.cpf)}</td>
                      <td className="py-2 px-4 border">{client.phone}</td>
                      <td className="py-2 px-4 border">
                        {client.street}, {client.number}
                        {client.complement && `, ${client.complement}`} - {client.neighborhood}, {client.city}
                      </td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleEdit(client)}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
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
      </div>
    </div>
  );
}