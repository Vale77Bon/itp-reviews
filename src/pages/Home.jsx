import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, MessageSquare, ShieldCheck, GraduationCap, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* --- SECCIÓN HERO (PORTADA PRINCIPAL) --- */}
      <div className="bg-blue-900 text-white py-16 px-4 text-center rounded-b-[3rem] shadow-xl mb-12 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-blue-800 p-3 rounded-full mb-4 shadow-lg animate-bounce">
            <GraduationCap size={40} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Evaluación Docente <span className="text-yellow-400">ITP</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
            La plataforma hecha por estudiantes, para estudiantes. Encuentra referencias reales y decide mejor tu horario.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/buscar" className="bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
              <Search size={20} />
              Buscar Profesores
            </Link>
            <Link to="/buscar?q=sistemas" className="bg-blue-800 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition flex items-center justify-center gap-2 border border-blue-600">
              <Users size={20} />
              Ver Populares
            </Link>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE VALOR (TEXTO PARA GOOGLE) --- */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">¿Por qué usar ITP Reviews?</h2>
          <p className="text-gray-600 mt-2">Nuestra misión es mejorar la experiencia académica en el Instituto Tecnológico de Puebla.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">100% Anónimo y Seguro</h3>
            <p className="text-gray-600">
              Opina con libertad. Tus reseñas ayudan a futuras generaciones a elegir mejores maestros sin comprometer tu identidad.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center text-green-600 mb-4">
              <Map size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Mapa del Campus Actualizado</h3>
            <p className="text-gray-600">
              ¿No sabes dónde está tu salón? Consulta nuestro mapa interactivo con la ubicación exacta de edificios, laboratorios y áreas deportivas.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center text-purple-600 mb-4">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Comunidad Activa</h3>
            <p className="text-gray-600">
              Comparte tips sobre materias, dificultad de exámenes y recomendaciones para sobrevivir al semestre.
            </p>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN INFORMATIVA (PARA LLENAR CONTENIDO) --- */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre este Proyecto</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            ITP Reviews nace de la necesidad de contar con una fuente confiable de información académica. 
            Sabemos que elegir profesor puede definir el éxito de tu materia. Aquí centralizamos las experiencias 
            de alumnos de Ingeniería en Sistemas, Industrial, Mecánica, Gestión Empresarial y más.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left max-w-2xl mx-auto rounded">
            <p className="text-yellow-800 font-medium">
              ⚠️ Nota Importante: Este es un proyecto independiente creado por estudiantes y no tiene afiliación directa oficial con la administración del Instituto Tecnológico de Puebla.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;