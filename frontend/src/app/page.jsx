import Header from "@/components/Header";

export default function Home() {
  const options = [
    { label: 'Pedidos', path: '/pedidos' },
    { label: 'Bebidas', path: '/bebidas' },
    { label: 'Cadastro de Clientes', path: '/clientes' },
    { label: 'Sabores de Pizza', path: '/sabores' },
    { label: 'Tamanhos de Pizza', path: '/tamanhos' },
    { label: 'Usuários', path: '/usuarios' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#B72A23] mb-8">
          Menu Principal
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {options.map((option) => (
            <a
              key={option.label}
              href={option.path}
              className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-center text-center text-lg font-semibold text-[#B72A23] hover:bg-[#B72A23] hover:text-white transition"
            >
              {option.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}