import React, { useEffect, useState } from 'react';
import ProfessorCard from '../components/ProfessorCard';
import SchoolMap from '../components/SchoolMap';
import { supabase } from '../services/supabaseClient';
import AdBanner from '../components/AdBanner';

const Home = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar profesores al iniciar la página
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        // Obtenemos los profesores (limitamos a 6 para no saturar el home)
        const { data, error } = await supabase
          .from('profesores')
          .select('*')
          .limit(6);
        
        if (error) throw error;
        setProfesores(data);
      } catch (error) {
        console.error('Error cargando profesores:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfesores();
  }, []);

  return (
    <div className="py-8 max-w-6xl mx-auto px-4 space-y-16">
      
      {/* SECCIÓN 1: TÍTULO Y BIENVENIDA */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
          Evaluación Docente <span className="text-blue-600">ITP</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          La plataforma hecha por estudiantes para encontrar referencias reales de tus profesores y ubicarte en el campus.
        </p>
      </div>

      {/* SECCIÓN 2: MAPA INTERACTIVO */}
      <section>
        <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
          <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Mapa del Campus</h2>
        </div>
        {/* Aquí se renderiza tu componente del mapa */}
        <SchoolMap />
      </section>

      <div className="max-w-4xl mx-auto w-full">
        <AdBanner dataAdSlot="9162019540" />
      </div>
      
      {/* SECCIÓN 3: LISTA DE PROFESORES RECIENTES */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Profesores Destacados</h2>
          </div>
          {/* Enlace para ver todos si hubiera muchos */}
          <a href="/buscar" className="text-blue-600 font-medium hover:underline text-sm">
            Ver todos →
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profesores.length > 0 ? (
              profesores.map((profe) => (
                <ProfessorCard 
                  key={profe.id}
                  {...profe}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-10">
                No hay profesores registrados aún.
              </p>
            )}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;