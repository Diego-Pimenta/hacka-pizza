import Header from "@/components/Header";

export default function Login(){
  return (
    <div className='bg-[url("/background.svg")] h-screen w-screen bg-cover bg-center flex items-center justify-center p-2'>
      <Header showLogoutButton={false}/>
      
      <div className="bg-[rgba(255,255,255,0.80)] p-8 rounded-lg shadow-md w-96 font-poppins">
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 uppercase">
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border border-gray-500 px-3 py-2 focus:border-[#B72A23] focus:outline-none focus:ring-1 focus:ring-[#B72A23]"
              required
            />
          </div>
      
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 uppercase">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border border-gray-500 px-3 py-2 focus:border-[#B72A23] focus:outline-none focus:ring-1 focus:ring-[#B72A23]"
              required
            />
          </div>
      
          <button
            type="submit"
            className="w-full bg-[#B72A23] text-white py-2 px-4 rounded-md hover:bg-[#961f19] transition-colors duration-200 cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

