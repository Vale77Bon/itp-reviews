import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import ProfessorCard from '../components/ProfessorCard';
import { Search, ArrowLeft, Bug } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase(); 
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState(null); // Para ver qué trae la base de datos

  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      try {
        // 1. Traemos TODOS los profesores
        const { data, error } = await supabase.from('profesores').select('*');
        
        if (error) throw error;

        // Guardamos info para diagnóstico (solo los primeros 3 para no llenar pantalla)
        setDebugInfo(data.slice(0, 3)); 

        // 2. Filtramos con Javascript (Infalible)
        const resultadosFiltrados = data.filter(profe => {
          // Convertimos todo a minúsculas para comparar
          const nombre = profe.nombre ? profe.nombre.toLowerCase() : '';
          const materia = profe.materia ? profe.materia.toLowerCase() : ''; // Aseguramos que lea 'materia'
          
          // ¿Coincide el nombre O la materia?
          return nombre.includes(query) || materia.includes(query);
        });

        setProfesores(resultadosFiltrados);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      
      {/* AVISO DE VERSIÓN (Si no ves este cuadro rojo, es que tu navegador sigue en el pasado) */}
      <div className="bg-red-100 border-2 border-red-500 text-red-700 p-2 mb-4 rounded text-center text-sm font-bold">
         🔴 VERSIÓN DE PRUEBA V3.0 - Si ves esto, el código se actualizó.
      </div>

      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline flex items-center mb-4">
          <ArrowLeft size={16} className="mr-1"/> Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Search className="text-blue-500" />
          Resultados para: <span className="text-blue-900 italic">"{query}"</span>
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-20">
           <p>Cargando...</p>
        </div>
      ) : (
        <>
          {profesores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profesores.map((profe) => (
                <ProfessorCard key={profe.id} {...profe} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
               {/* Mensaje de no encontrado */}
               <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <p className="text-xl text-gray-600 font-bold">No encontramos coincidencias para "{query}"</p>
               </div>

               {/* TABLA DE DIAGNÓSTICO: Muestra qué tiene la base de datos realmente */}
               <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-auto">
                 <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2"><Bug/> DATOS REALES EN DB:</h3>
                 <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
               </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;