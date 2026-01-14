import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Map, MessageSquare, GraduationCap, Users } from 'lucide-react';
import SchoolMap from '../components/SchoolMap';

const Home = () => {
  // --- LÓGICA DEL BUSCADOR ---
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${searchTerm}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* --- 1. PORTADA (HERO) CON BUSCADOR --- */}
      <div className="bg-blue-900 text-white py-20 px-4 text-center rounded-b-[3rem] shadow-xl mb-12 relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-blue-800 p-3 rounded-full mb-4 shadow-lg animate-bounce">
            <GraduationCap size={40} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Evaluación Docente <span className="text-yellow-400">ITP</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 font-light max-w-2xl mx-auto">
            La herramienta definitiva para armar tu horario. Encuentra referencias reales y ubica tus salones.
          </p>
          
          {/* --- NUEVO BUSCADOR CENTRAL (Reemplaza a los botones) --- */}
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="🔍 Escribe un profesor o materia..."
                className="w-full py-4 pl-6 pr-14 rounded-full text-gray-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg transition-all transform group-hover:scale-105"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
              >
                <Search size={24} />
              </button>
            </form>
            <p className="text-blue-300 text-sm mt-3">
              Ejemplos: "Calculo", "Juan Perez", "Taller de bases de datos"
            </p>
          </div>
          {/* ---------------------------------------------------- */}

        </div>
      </div>

      {/* --- 2. SECCIÓN DEL MAPA --- */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Map className="text-blue-600" /> Ubica tu Salón
          </h2>
          <p className="text-gray-600 mt-2">
            Consulta el croquis oficial para no perderte el primer día.
          </p>
        </div>
        
        <SchoolMap />
      </div>

      {/* --- 3. CARACTERÍSTICAS --- */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600 mb-4">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Anónimo y Seguro</h3>
            <p className="text-sm text-gray-500 mt-2">
              Tus opiniones ayudan a la comunidad sin comprometer tu identidad.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="bg-green-50 p-3 rounded-full text-green-600 mb-4">
              <MessageSquare size={28} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Reseñas Reales</h3>
            <p className="text-sm text-gray-500 mt-2">
              Olvídate de los rumores. Lee experiencias detalladas de alumnos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="bg-purple-50 p-3 rounded-full text-purple-600 mb-4">
              <Users size={28} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Hecho por Estudiantes</h3>
            <p className="text-sm text-gray-500 mt-2">
              Entendemos lo que buscas porque nosotros también sufrimos armando el horario.
            </p>
          </div>
        </div>
      </div>

      {/* --- 4. TEXTO SEO --- */}
      <div className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Misión de ITP Reviews</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-sm">
            Esta plataforma centraliza la información académica del Instituto Tecnológico de Puebla, enfocándose en las carreras de Ingeniería en TICs, Sistemas, Industrial, Mecánica y más. Nuestro objetivo es mejorar la toma de decisiones académicas mediante la transparencia.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
            <p className="text-yellow-800 text-xs font-bold">
              ⚠️ Aviso Legal: Este sitio es un proyecto estudiantil independiente y no representa al sitio oficial del Tecnológico Nacional de México ni del ITP.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;