import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import ProfessorCard from '../components/ProfessorCard';
import { Search, ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FUNCIÓN MÁGICA: Quita acentos y pone minúsculas ---
  const limpiarTexto = (texto) => {
    if (!texto) return '';
    return texto
      .toLowerCase() // Convierte a minúsculas
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Borra los acentos
  };

  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      try {
        // 1. Traemos TODOS los profesores
        const { data, error } = await supabase.from('profesores').select('*');
        
        if (error) throw error;

        // 2. Preparamos lo que escribió el usuario (sin acentos)
        const busquedaLimpia = limpiarTexto(rawQuery);

        // 3. Filtramos ignorando acentos
        const resultadosFiltrados = data.filter(profe => {
          const nombreLimpio = limpiarTexto(profe.nombre);
          const materiaLimpia = limpiarTexto(profe.materia);
          
          // ¿Coincide el nombre O la materia?
          return nombreLimpio.includes(busquedaLimpia) || materiaLimpia.includes(busquedaLimpia);
        });

        setProfesores(resultadosFiltrados);
      } catch (error) {
        console.error('Error buscando:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, [rawQuery]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline flex items-center mb-4">
          <ArrowLeft size={16} className="mr-1"/> Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Search className="text-blue-500" />
          Resultados para: <span className="text-blue-900 italic">"{rawQuery}"</span>
        </h1>
      </div>

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
              <p className="text-xl text-gray-600 font-medium mb-2">No encontramos coincidencias 😕</p>
              <p className="text-gray-500">
                Prueba buscando por nombre o materia (no importan los acentos).
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;