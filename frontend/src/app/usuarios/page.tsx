//id
//nome
//email
//senha

"use client";
import { useState, useMemo } from 'react';
import Header from "@/components/Header";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const usuariosIniciais: Usuario[] = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@email.com",
    senha: "123456"
  },
  {
    id: 2,
    nome: "Gerente",
    email: "gerente@email.com",
    senha: "654321"
  },
  {
    id: 3,
    nome: "Atendente",
    email: "atendente@email.com",
    senha: "112233"
  },
  {
    id: 4,
    nome: "Supervisor",
    email: "supervisor@email.com",
    senha: "332211"
  }
];

export default function CadastroUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciais);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<Omit<Usuario, 'id'>>({
    nome: '',
    email: '',
    senha: ''
  });
  const [busca, setBusca] = useState('');
  const [modoBusca, setModoBusca] = useState<'todos' | 'nome' | 'email'>('todos');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const usuariosFiltrados = useMemo(() => {
    if (!busca.trim()) return usuarios;
    
    const termo = busca.toLowerCase().trim();
    
    return usuarios.filter(usuario => {
      switch (modoBusca) {
        case 'nome':
          return usuario.nome.toLowerCase().includes(termo);
        case 'email':
          return usuario.email.toLowerCase().includes(termo);
        default:
          return (
            usuario.nome.toLowerCase().includes(termo) ||
            usuario.email.toLowerCase().includes(termo)
          );
      }
    });
  }, [usuarios, busca, modoBusca]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.senha) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (usuarioEditando) {
      setUsuarios(usuarios.map(usuario => 
        usuario.id === usuarioEditando.id ? { 
          ...formData, 
          id: usuarioEditando.id 
        } : usuario
      ));
    } else {
      const novoUsuario: Usuario = {
        ...formData,
        id: Date.now()
      };
      setUsuarios([...usuarios, novoUsuario]);
    }
    
    setFormData({
      nome: '',
      email: '',
      senha: ''
    });
    setUsuarioEditando(null);
  };

  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha
    });
  };

  const handleExcluir = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-20 px-6 max-w-7xl mx-auto font-poppins">
        <h1 className="text-2xl font-bold text-[#B72A23] mb-6">Cadastro de Usuários</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {usuarioEditando ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
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
            
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Senha*</label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full p-2 rounded border pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {mostrarSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
            </div>
          </div>
          
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-[#B72A23] text-white py-2 px-4 rounded hover:bg-[#a0251e] transition"
            >
              {usuarioEditando ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
            </button>
            
            {usuarioEditando && (
              <button
                type="button"
                onClick={() => {
                  setUsuarioEditando(null);
                  setFormData({
                    nome: '',
                    email: '',
                    senha: ''
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
          <h2 className="text-xl font-semibold mb-4">Buscar Usuários</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full p-2 rounded border pl-10"
                placeholder={`Buscar por ${modoBusca === 'todos' ? 'nome ou email' : modoBusca}...`}
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
              value={modoBusca}
              onChange={(e) => setModoBusca(e.target.value as 'todos' | 'nome' | 'email')}
              className="p-2 rounded border bg-white"
            >
              <option value="todos">Todos os Campos</option>
              <option value="nome">Nome</option>
              <option value="email">Email</option>
            </select>
          </div>
          
          {busca && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {usuariosFiltrados.length} usuário(s) encontrado(s)
              </p>
              {busca && (
                <button
                  onClick={() => setBusca('')}
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
              {busca ? 'Resultados da Busca' : 'Todos os Usuários'}
            </h2>
            {busca && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Filtro: {modoBusca === 'todos' ? 'todos os campos' : modoBusca}
              </span>
            )}
          </div>
          
          {usuariosFiltrados.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">
                {busca ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado ainda.'}
              </p>
              {busca && (
                <button
                  onClick={() => setBusca('')}
                  className="text-[#B72A23] hover:underline"
                >
                  Ver todos os usuários
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">Nome</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map(usuario => (
                    <tr key={usuario.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{usuario.nome}</td>
                      <td className="py-2 px-4 border">{usuario.email}</td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleEditar(usuario)}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleExcluir(usuario.id)}
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