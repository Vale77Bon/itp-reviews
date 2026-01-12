import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Star } from 'lucide-react';

const ReviewForm = ({ profesorId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0); // Para efecto visual al pasar mouse
  const [formData, setFormData] = useState({ autor: '', materia: '', comentario: '' });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return alert("¡Debes seleccionar una calificación de estrellas!");
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            profesor_id: profesorId,
            autor: formData.autor || 'Anónimo', // Si no pone nombre, es Anónimo
            materia_cursada: formData.materia,
            comentario: formData.comentario,
            calificacion: rating
          }
        ]);

      if (error) throw error;

      // Éxito: Limpiamos formulario y avisamos al padre
      setFormData({ autor: '', materia: '', comentario: '' });
      setRating(0);
      setMensaje("¡Gracias! Tu reseña se ha publicado.");
      if (onReviewAdded) onReviewAdded(); // Refresca la lista de comentarios

    } catch (error) {
      console.error("Error enviando:", error);
      setMensaje("Hubo un error al enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
      // Borrar mensaje después de 3 segs
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
      <h3 className="font-bold text-lg text-blue-900 mb-4">Escribe una reseña</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Selector de Estrellas */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Calificación:</label>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  type="button"
                  key={index}
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star 
                    size={28} 
                    className={starValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs de Texto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Materia cursada (Opcional)</label>
            <input 
              type="text" 
              placeholder="Ej. Cálculo Diferencial"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.materia}
              onChange={(e) => setFormData({...formData, materia: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Tu Nombre (Opcional)</label>
            <input 
              type="text" 
              placeholder="Pon 'Anónimo' si prefieres"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.autor}
              onChange={(e) => setFormData({...formData, autor: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Tu opinión *</label>
          <textarea 
            required
            rows="3"
            placeholder="¿Es buen profesor? ¿Deja mucha tarea? ¿Cómo califica?"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            value={formData.comentario}
            onChange={(e) => setFormData({...formData, comentario: e.target.value})}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-bold text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
        >
          {loading ? 'Enviando...' : 'Publicar Reseña'}
        </button>

        {mensaje && (
          <div className={`text-center text-sm font-bold p-2 rounded ${mensaje.includes('error') ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;