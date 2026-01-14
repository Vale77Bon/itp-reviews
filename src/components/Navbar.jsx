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
        {/* Usamos flex-col en móvil para poner una cosa bajo la otra */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* --- FILA SUPERIOR: Logo y Menú --- */}
          <div className="flex justify-between w-full md:w-auto items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-blue-200 transition">
              <GraduationCap size={28} />
              <span>ITP Reviews</span>
            </Link>

            {/* Menú (Visible en Móvil) */}
            <div className="flex gap-4 md:hidden text-sm font-medium">
               <Link to="/" className="hover:text-blue-200">Inicio</Link>
               <Link to="/buscar" className="hover:text-blue-200">Profesores</Link>
            </div>
          </div>

          {/* --- FILA INFERIOR: Buscador --- */}
          {/* En móvil ocupa todo el ancho (w-full). En PC se ajusta al centro. */}
          <form onSubmit={handleSearch} className="w-full md:flex-1 md:max-w-xl relative">
            <input
              type="text"
              placeholder="🔍 Buscar profesor o materia..."
              className="w-full pl-4 pr-10 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Botón lupa dentro del input */}
            <button type="submit" className="absolute right-2 top-1.5 bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200">
               <Search size={16} />
            </button>
          </form>

          {/* --- MENU ESCRITORIO (Solo visible en PC) --- */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link to="/" className="hover:text-blue-200 transition">Inicio</Link>
            <Link to="/buscar" className="hover:text-blue-200 transition">Profesores</Link>
            <Link to="/admin" className="text-xs bg-blue-800 px-2 py-1 rounded hover:bg-blue-700 opacity-70">
              Admin
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;