import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/topup", label: "Top Up" },
    { path: "/transaction", label: "Transaction" },
    { path: "/account", label: "Akun" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white text-black shadow-md px-6 md:px-12 lg:pl-[13%] lg:pr-[20%] py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="SIMS PPOB"
            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
          />
          <p>SIMS PPOB</p>
        </button>

        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {menuItems.map(({ path, label }) => (
            <button
              key={path}
              type="button"
              onClick={() => handleNavigate(path)}
              className={`font-semibold hover:scale-105 transition-all flex items-center gap-2 ${
                isActive(path)
                  ? "text-red-500 border-b-2 border-red-500 pb-1"
                  : "text-gray-700 hover:text-red-500"
              }`}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-red-500 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-2 flex flex-col gap-2 border-t border-gray-200 pt-4">
          {menuItems.map(({ path, label}) => (
            <button
              key={path}
              type="button"
              onClick={() => handleNavigate(path)}
              className={`font-semibold flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                isActive(path)
                  ? "bg-red-50 text-red-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;