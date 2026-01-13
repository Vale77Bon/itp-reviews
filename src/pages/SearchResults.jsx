import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import ProfessorCard from '../components/ProfessorCard';
import { Search, ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; // Obtenemos el texto de la URL
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      try {
        // --- LA MAGIA: BUSCAR POR NOMBRE O POR MATERIA ---
        const { data, error } = await supabase
          .from('profesores')
          .select('*')
          // Esto se lee: "Donde nombre se parezca a X... O materia se parezca a X"
          .or(`nombre.ilike.%${query}%,materia.ilike.%${query}%`);

        if (error) throw error;
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
      setLoading(false); // Si no hay búsqueda, no cargamos nada
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      
      {/* Encabezado de Búsqueda */}
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
              <p className="text-xl text-gray-600 font-medium mb-2">No encontramos nada 😕</p>
              <p className="text-gray-500">
                Intenta buscar solo por el nombre (ej. "Juan") o solo la materia (ej. "Cálculo").
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;