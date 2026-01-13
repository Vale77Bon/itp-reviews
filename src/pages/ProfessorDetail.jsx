import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { Star, User, ArrowLeft, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // Importamos Helmet para el SEO
import ReviewForm from '../components/ReviewForm';

const ProfessorDetail = () => {
  const { id } = useParams();
  const [profesor, setProfesor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar SOLO las reseñas (la usaremos para recargar al comentar)
  const fetchReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('profesor_id', id)
      .order('created_at', { ascending: false });
    
    if (data) setReviews(data);
  }, [id]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        // 1. Datos del Profesor
        const { data: dataProfe, error: errorProfe } = await supabase
          .from('profesores')
          .select('*')
          .eq('id', id)
          .single();

        if (errorProfe) throw errorProfe;
        setProfesor(dataProfe);

        // 2. Reseñas iniciales
        await fetchReviews();

      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [id, fetchReviews]);

  const renderStars = (rating) => (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-gray-300" : ""} />
      ))}
    </div>
  );

  if (loading) return <div className="text-center py-10">Cargando perfil...</div>;
  if (!profesor) return <div className="text-center py-10">Profesor no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      
      {/* --- SEO DINÁMICO --- */}
      {/* Esto cambia el título de la pestaña con el nombre del profesor */}
      <Helmet>
        <title>{profesor.nombre} | ITP Reviews</title>
        <meta 
          name="description" 
          content={`Lee reseñas y opiniones anónimas sobre ${profesor.nombre} (${profesor.departamento}) del Instituto Tecnológico de Puebla.`} 
        />
      </Helmet>

      {/* Botón Volver */}
      <Link to="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft size={16} className="mr-1" /> Volver al inicio
      </Link>

      {/* Tarjeta Info Profesor */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-sm">
          {profesor.nombre.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{profesor.nombre}</h1>
          <p className="text-lg text-gray-500 mb-2">{profesor.departamento}</p>
          
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100 flex items-center gap-2">
               <span className="font-bold text-yellow-700 text-lg">{profesor.calificacion}</span>
               {renderStars(Math.round(profesor.calificacion))}
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-600 flex items-center">
              Dificultad: <strong className="ml-1">{profesor.dificultad}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE RESEÑA */}
      <ReviewForm 
        profesorId={id} 
        onReviewAdded={fetchReviews} // Le pasamos la función para recargar la lista
      />

      {/* ESPACIO PUBLICIDAD */}
      <div className="w-full h-24 bg-gray-50 border-dashed border-2 border-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-8 text-sm">
        Publicidad aquí (Banner Horizontal)
      </div>

      {/* Lista de Reseñas */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MessageSquare size={20} /> Reseñas de Alumnos ({reviews.length})
        </h3>

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-1 rounded-full">
                        <User size={14} className="text-gray-500" />
                    </div>
                    <span className="font-bold text-gray-700 text-sm">{review.autor}</span>
                    {review.materia_cursada && (
                        <span className="text-xs text-gray-400 hidden sm:inline">• Materia: {review.materia_cursada}</span>
                    )}
                  </div>
                  {renderStars(review.calificacion)}
                </div>
                {review.materia_cursada && (
                    <p className="text-xs text-blue-600 font-medium mb-2 sm:hidden">Materia: {review.materia_cursada}</p>
                )}
                <p className="text-gray-600">{review.comentario}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center py-4">Este profesor aún no tiene comentarios. ¡Sé el primero!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDetail;