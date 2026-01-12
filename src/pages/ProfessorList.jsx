import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import ProfessorCard from '../components/ProfessorCard';
import { SearchX } from 'lucide-react';

const ProfessorList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; // Obtiene lo que escribiste en la URL
  
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarProfesores = async () => {
      setLoading(true);
      try {
        let consulta = supabase.from('profesores').select('*');

        // Si hay búsqueda, filtramos por Nombre
        if (query) {
          // 'ilike' busca coincidencias parciales (ej: "Juan" encuentra "Juan Pérez")
          consulta = consulta.ilike('nombre', `%${query}%`);
        }

        const { data, error } = await consulta;
        
        if (error) throw error;
        setProfesores(data);
      } catch (error) {
        console.error('Error buscando:', error.message);
      } finally {
        setLoading(false);
      }
    };

    buscarProfesores();
  }, [query]); // Se ejecuta cada vez que cambia la búsqueda

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {query ? `Resultados para: "${query}"` : 'Todos los Profesores'}
      </h2>

      {loading ? (
        <p className="text-blue-600">Buscando...</p>
      ) : profesores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profesores.map((profe) => (
            <ProfessorCard 
              key={profe.id}
              {...profe} // Truco para pasar todas las propiedades juntas
            />
          ))}
        </div>
      ) : (
        // Diseño cuando no encuentra nada
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <SearchX className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No encontramos profesores</h3>
          <p className="text-gray-500">Intenta con otro nombre o verifica la ortografía.</p>
        </div>
      )}
    </div>
  );
};

export default ProfessorList;