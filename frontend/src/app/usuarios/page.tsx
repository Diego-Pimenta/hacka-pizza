//id
//name
//email
//password

"use client";
import { useState, useMemo } from 'react';
import { Header } from "@/components/header";

interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
}

const initialUsers: Users[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@email.com",
    password: "123456"
  },
  {
    id: 2,
    name: "Gerente",
    email: "gerente@email.com",
    password: "654321"
  },
  {
    id: 3,
    name: "Atendente",
    email: "atendente@email.com",
    password: "112233"
  },
  {
    id: 4,
    name: "Supervisor",
    email: "supervisor@email.com",
    password: "332211"
  }
];

export default function UserRegistration() {
  const [users, setUsers] = useState<Users[]>(initialUsers);
  const [usersEdit, setusersEdit] = useState<Users | null>(null);
  const [formData, setFormData] = useState<Omit<Users, 'id'>>({
    name: '',
    email: '',
    password: ''
  });
  const [search, setSearch] = useState('');
  const [searchMode, setSearchMode] = useState<'todos' | 'name' | 'email'>('todos');
  const [mostrarpassword, setMostrarpassword] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    
    const term = search.toLowerCase().trim();
    
    return users.filter(user => {
      switch (searchMode) {
        case 'name':
          return user.name.toLowerCase().includes(term);
        case 'email':
          return user.email.toLowerCase().includes(term);
        default:
          return (
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
          );
      }
    });
  }, [users, search, searchMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (usersEdit) {
      setUsers(users.map(user => 
        user.id === usersEdit.id ? { 
          ...formData, 
          id: usersEdit.id 
        } : user
      ));
    } else {
      const newUser: Users = {
        ...formData,
        id: Date.now()
      };
      setUsers([...users, newUser]);
    }
    
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setusersEdit(null);
  };

  const handleEditar = (user: Users) => {
    setusersEdit(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password
    });
  };

  const handleExcluir = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-20 px-6 max-w-7xl mx-auto font-poppins">
        <h1 className="text-2xl font-bold text-[#B72A23] mb-6">Cadastro de Usuários</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {usersEdit ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Nome*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                  type={mostrarpassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded border pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setMostrarpassword(!mostrarpassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {mostrarpassword ? (
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
              {usersEdit ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
            </button>
            
            {usersEdit && (
              <button
                type="button"
                onClick={() => {
                  setusersEdit(null);
                  setFormData({
                    name: '',
                    email: '',
                    password: ''
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 rounded border pl-10"
                placeholder={`Buscar por ${searchMode === 'todos' ? 'name ou email' : searchMode}...`}
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
              value={searchMode}
              onChange={(e) => setSearchMode(e.target.value as 'todos' | 'name' | 'email')}
              className="p-2 rounded border bg-white"
            >
              <option value="todos">Todos os Campos</option>
              <option value="name">name</option>
              <option value="email">Email</option>
            </select>
          </div>
          
          {search && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredUsers.length} usuário(s) encontrado(s)
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
              {search ? 'Resultados da Busca' : 'Todos os Usuários'}
            </h2>
            {search && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Filtro: {searchMode === 'todos' ? 'todos os campos' : searchMode}
              </span>
            )}
          </div>
          
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">
                {search ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado ainda.'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
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
                    <th className="py-2 px-4 border">name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{user.name}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleEditar(user)}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleExcluir(user.id)}
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