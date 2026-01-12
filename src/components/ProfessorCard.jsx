import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import { Star, BookOpen, MessageCircle } from 'lucide-react';

// 2. Agregamos 'id' a las propiedades que recibe el componente
const ProfessorCard = ({ id, nombre, departamento, calificacion, materia, dificultad }) => {
  
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{nombre}</h3>
            <p className="text-sm text-gray-500 font-medium">{departamento}</p>
          </div>
          <div className={`text-xs px-2 py-1 rounded-full font-bold ${calificacion >= 4 ? 'bg-green-100 text-green-800' : calificacion >= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            {calificacion}/5
          </div>
        </div>

        <div className="mt-3 flex items-center space-x-1">
          {renderStars(calificacion)}
          <span className="text-xs text-gray-400 ml-2">({dificultad} Dificultad)</span>
        </div>
      </div>

      {/* Footer de la tarjeta */}
      <div className="px-5 pb-5 mt-auto">
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center text-gray-600 text-sm">
            <BookOpen size={16} className="mr-2" />
            <span className="truncate max-w-[120px]">{materia}</span>
          </div>
          
          {/* 3. AQUI ESTABA EL ERROR: Ahora usamos Link apuntando al ID */}
          <Link 
            to={`/profesor/${id}`} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center hover:underline"
          >
            Ver reseñas <MessageCircle size={16} className="ml-1"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessorCard;