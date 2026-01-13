import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';

const ProfessorCard = ({ id, nombre, departamento, materia, calificacion, dificultad }) => {
  
  // Función para dibujar estrellitas
  const renderStars = (rating) => (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-gray-300" : ""} />
      ))}
    </div>
  );

  return (
    <Link to={`/profesor/${id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200">
        
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {nombre}
            </h3>
            <p className="text-sm text-gray-500">{departamento}</p>
          </div>
          <div className="bg-blue-50 text-blue-800 font-bold text-sm px-2 py-1 rounded-lg">
            {calificacion}
          </div>
        </div>

        {/* AQUÍ ESTÁ EL CAMBIO: Convertimos el texto de materias en etiquetas */}
        <div className="flex flex-wrap gap-1 mb-4 h-12 overflow-hidden content-start">
           {materia.split(',').slice(0, 3).map((mat, index) => (
             <span key={index} className="text-[10px] uppercase font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
               {mat.trim()}
             </span>
           ))}
           {materia.split(',').length > 3 && (
             <span className="text-[10px] text-gray-400 px-1 py-0.5">...</span>
           )}
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
             {renderStars(Math.round(calificacion))}
             <span className="text-xs text-gray-400 ml-1">({dificultad})</span>
          </div>
          <span className="text-blue-500 text-sm font-medium flex items-center group-hover:underline">
            Ver reseñas <ChevronRight size={14} />
          </span>
        </div>

      </div>
    </Link>
  );
};

export default ProfessorCard;