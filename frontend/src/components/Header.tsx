export default function Header({ showLogoutButton = true }) {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#B72A23] z-50 shadow-xl h-12 px-8 flex items-center justify-between">      
      <div className="w-24"></div>

      <h2 className="font-oleo text-white text-2xl absolute left-1/2 transform -translate-x-1/2">
        Hacka Pizza
      </h2>

      <div className="w-24">
        {showLogoutButton && (
          <button className="bg-white text-[#B72A23] font-bold px-4 py-1 rounded hover:bg-gray-200 transition cursor-pointer">
            Sair
          </button>
        )}
      </div>
    </header>
  );
}