import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${searchTerm}`);
    }
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Diseño flexible: Columna en móvil, Fila en escritorio */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* --- NIVEL 1: Logo y Links Básicos --- */}
          <div className="flex justify-between w-full md:w-auto items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-blue-200 transition">
              <GraduationCap size={28} />
              <span>ITP Reviews</span>
            </Link>

            {/* Menú (Visible solo en Móvil para ahorrar espacio) */}
            <div className="flex gap-4 md:hidden text-sm font-medium">
               <Link to="/" className="hover:text-blue-200">Inicio</Link>
               <Link to="/buscar" className="hover:text-blue-200">Profesores</Link>
            </div>
          </div>

          {/* --- NIVEL 2: Buscador Central --- */}
          <form onSubmit={handleSearch} className="w-full md:flex-1 md:max-w-xl relative">
            <input
              type="text"
              placeholder="🔍 Buscar profesor o materia..."
              className="w-full pl-4 pr-10 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1.5 bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200">
               <Search size={16} />
            </button>
          </form>

          {/* --- NIVEL 3: Menú Escritorio (Sin Admin) --- */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link to="/" className="hover:text-blue-200 transition">Inicio</Link>
            <Link to="/buscar" className="hover:text-blue-200 transition">Profesores</Link>
            {/* El botón Admin se eliminó de aquí para privacidad */}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;