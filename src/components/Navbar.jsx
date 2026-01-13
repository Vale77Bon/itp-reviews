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
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        
        {/* LOGO E IMAGEN */}
        <Link to="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
          {/* La imagen carga directo desde la carpeta public */}
          <img 
            src="/logo-itp.png" 
            alt="Logo ITP Reviews" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
          />
          {/* Texto del Logo (Opcional: puedes borrar este span si el logo ya trae letras) */}
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            ITP Reviews
          </span>
        </Link>

        {/* Buscador Funcional */}
        <div className="hidden md:flex bg-blue-800 rounded-lg items-center px-3 py-1.5 border border-blue-700 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
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

        {/* Menú de Enlaces */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors">Inicio</Link>
          <Link to="/buscar" className="hover:text-blue-200 transition-colors">Profesores</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;