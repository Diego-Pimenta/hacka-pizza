"use client";
import { useState, useMemo } from 'react';
import Header from "@/components/Header";

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
}

const clientesIniciais: Cliente[] = [
  {
    id: 1,
    nome: "João Silva",
    cpf: "12345678900",
    telefone: "(11) 99999-9999",
    rua: "Rua das Flores",
    numero: "100",
    complemento: "Apto 101",
    bairro: "Centro",
    cidade: "São Paulo"
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    cpf: "98765432100",
    telefone: "(11) 98888-8888",
    rua: "Avenida Brasil",
    numero: "200",
    complemento: "",
    bairro: "Jardins",
    cidade: "São Paulo"
  },
  {
    id: 3,
    nome: "João Pereira",
    cpf: "11122233344",
    telefone: "(21) 91234-5678",
    rua: "Rua das Laranjeiras",
    numero: "300",
    complemento: "Casa",
    bairro: "Flamengo",
    cidade: "Rio de Janeiro"
  },
  {
    id: 4,
    nome: "João Costa",
    cpf: "55566677788",
    telefone: "(31) 97654-3210",
    rua: "Rua Afonso Pena",
    numero: "400",
    complemento: "Apto 402",
    bairro: "Centro",
    cidade: "Belo Horizonte"
  },
  {
    id: 5,
    nome: "Ana Beatriz",
    cpf: "11223344556",
    telefone: "(41) 99876-5432",
    rua: "Rua XV de Novembro",
    numero: "500",
    complemento: "",
    bairro: "Batel",
    cidade: "Curitiba"
  },
  {
    id: 6,
    nome: "Carlos Eduardo",
    cpf: "66778899000",
    telefone: "(51) 98765-4321",
    rua: "Avenida Ipiranga",
    numero: "600",
    complemento: "Sala 5",
    bairro: "Centro",
    cidade: "Porto Alegre"
  },
  {
    id: 7,
    nome: "Fernanda Lima",
    cpf: "44332211009",
    telefone: "(85) 96543-2100",
    rua: "Rua dos Coqueiros",
    numero: "700",
    complemento: "Bloco B",
    bairro: "Meireles",
    cidade: "Fortaleza"
  },
  {
    id: 8,
    nome: "Mariana Rocha",
    cpf: "33445566778",
    telefone: "(71) 99812-3456",
    rua: "Ladeira da Barra",
    numero: "800",
    complemento: "Cobertura",
    bairro: "Barra",
    cidade: "Salvador"
  }
];


export default function CadastroClientes() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciais);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState<Omit<Cliente, 'id'>>({
    nome: '',
    cpf: '',
    telefone: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: ''
  });

  const [busca, setBusca] = useState('');

  const clientesFiltrados = useMemo(() => {
    if (!busca) return clientes;
    
    const termoBusca = busca.toLowerCase().trim();
    const numerosBusca = busca.replace(/\D/g, '');
    
    return clientes.filter(cliente => {
      if (numerosBusca.length > 0 && termoBusca.replace(/[.-]/g, '').match(/^\d+$/)) {
        return cliente.cpf.includes(numerosBusca);
      }
      return cliente.nome.toLowerCase().includes(termoBusca);
    });
  }, [clientes, busca]);
  
  

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

  const formatarTelefone = (telefone: string): string => {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.cpf.length !== 11) {
      alert('CPF deve conter exatamente 11 dígitos');
      return;
    }
    
    if (clienteEditando) {
      setClientes(clientes.map(cliente => 
        cliente.id === clienteEditando.id ? { 
          ...formData, 
          id: clienteEditando.id,
          cpf: formData.cpf
        } : cliente
      ));
    } else {
      const novoCliente: Cliente = {
        ...formData,
        id: Date.now(),
        telefone: formatarTelefone(formData.telefone.replace(/\D/g, ''))
      };
      setClientes([...clientes, novoCliente]);
    }
    
    setFormData({
      nome: '',
      cpf: '',
      telefone: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: ''
    });
    setClienteEditando(null);
  };

  const handleEditar = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setFormData({
      nome: cliente.nome,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      rua: cliente.rua,
      numero: cliente.numero,
      complemento: cliente.complemento,
      bairro: cliente.bairro,
      cidade: cliente.cidade
    });
  };

  const handleExcluir = (id: number) => {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-20 px-6 max-w-7xl mx-auto font-poppins">
        <h1 className="text-2xl font-bold text-[#B72A23] mb-6">Cadastro de Clientes</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {clienteEditando ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Nome*</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
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
                value={formData.telefone}
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
                value={formData.rua}
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
                value={formData.numero}
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
                value={formData.complemento}
                onChange={handleChange}
                className="w-full p-2 rounded border"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-1">Bairro*</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
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
                value={formData.cidade}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="mt-4 bg-[#B72A23] text-white py-2 px-4 rounded hover:bg-[#a0251e] transition"
            disabled={formData.cpf.length > 0 && formData.cpf.length !== 11}
          >
            {clienteEditando ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
          </button>
          
          {clienteEditando && (
            <button
              type="button"
              onClick={() => {
                setClienteEditando(null);
                setFormData({
                  nome: '',
                  cpf: '',
                  telefone: '',
                  rua: '',
                  numero: '',
                  complemento: '',
                  bairro: '',
                  cidade: ''
                });
              }}
              className="mt-4 ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          )}
        </form>

        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Buscar Clientes</h2>
          <div className="relative">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-2 rounded border pl-10"
              placeholder="Busque por nome ou CPF..."
            />
          </div>
          {busca && (
            <p className="mt-2 text-sm text-gray-600">
              {clientesFiltrados.length} cliente(s) encontrado(s)
            </p>
          )}
        </div>

        {busca && clientesFiltrados.length > 0 && (
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Resultados da Busca</h2>
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
                  {clientesFiltrados.map(cliente => (
                    <tr key={cliente.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{cliente.nome}</td>
                      <td className="py-2 px-4 border">{formatCpfDisplay(cliente.cpf)}</td>
                      <td className="py-2 px-4 border">{cliente.telefone}</td>
                      <td className="py-2 px-4 border">
                        {cliente.rua}, {cliente.numero}
                        {cliente.complemento && `, ${cliente.complemento}`} - {cliente.bairro}, {cliente.cidade}
                      </td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleEditar(cliente)}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleExcluir(cliente.id)}
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
          </div>
        )}

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Clientes Cadastrados</h2>
          
          {clientes.length === 0 ? (
            <p className="text-gray-500">Nenhum cliente cadastrado ainda.</p>
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
                  {clientes.map(cliente => (
                    <tr key={cliente.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{cliente.nome}</td>
                      <td className="py-2 px-4 border">{formatCpfDisplay(cliente.cpf)}</td>
                      <td className="py-2 px-4 border">{cliente.telefone}</td>
                      <td className="py-2 px-4 border">
                        {cliente.rua}, {cliente.numero}{cliente.complemento && `, ${cliente.complemento}`} - {cliente.bairro}, {cliente.cidade}
                      </td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleEditar(cliente)}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleExcluir(cliente.id)}
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