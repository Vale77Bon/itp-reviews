import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import ProfessorCard from '../components/ProfessorCard';
import { Search, ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      console.log("Buscando:", query); // 🕵️‍♂️ Chismoso para ver en la consola

      try {
        // --- AQUÍ ESTÁ LA CLAVE ---
        // Usamos .or() para que busque en 'nombre' O en 'materia'
        const { data, error } = await supabase
          .from('profesores')
          .select('*')
          .or(`nombre.ilike.%${query}%,materia.ilike.%${query}%`);

        if (error) {
          console.error("Error de Supabase:", error);
          throw error;
        }

        console.log("Resultados encontrados:", data); // 🕵️‍♂️ Ver qué encontró
        setProfesores(data);
      } catch (error) {
        console.error('Error buscando:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResultados();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      
      {/* Encabezado */}
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline flex items-center mb-4">
          <ArrowLeft size={16} className="mr-1"/> Volver al inicio
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Search className="text-blue-500" />
          Resultados para: <span className="text-blue-900 italic">"{query}"</span>
        </h1>
      </div>

      {/* Grid de Resultados */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Buscando coincidencias...</p>
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
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="flex justify-center mb-4">
                 <Search size={48} className="text-gray-300" />
              </div>
              <p className="text-xl text-gray-600 font-medium mb-2">No encontramos profesores 😕</p>
              <p className="text-gray-500 max-w-md mx-auto">
                Intenta buscar solo una palabra clave (ej. "Redes" en lugar de "Redes de computadoras") o verifica la ortografía.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;