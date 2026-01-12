import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    // Si presiona Enter y hay texto
    if (e.key === 'Enter' && busqueda.trim()) {
      navigate(`/buscar?q=${busqueda}`); // Navega a la URL con el parametro q
    }
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          🎓 ITP Reviews
        </Link>

        {/* Buscador Funcional */}
        <div className="hidden md:flex bg-blue-800 rounded-lg items-center px-3 py-1 border border-blue-700 focus-within:ring-2 focus-within:ring-blue-400">
          <Search size={18} className="text-blue-300" />
          <input 
            type="text" 
            placeholder="Buscar profesor o materia..." 
            className="bg-transparent border-none text-white placeholder-blue-300 focus:outline-none ml-2 text-sm w-64"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-blue-200">Inicio</Link>
          <Link to="/buscar" className="hover:text-blue-200">Profesores</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;