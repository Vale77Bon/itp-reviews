import React from 'react';
import { X, MapPin } from 'lucide-react';

const BuildingModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      {/* Contenedor del Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabecera con Foto */}
        <div className="relative h-48 bg-gray-200">
            {/* Si tuvieramos foto real, iría aquí. Usamos un placeholder por ahora */}
            <img 
              src={`https://placehold.co/600x400/1e3a8a/white?text=${data.name}`} 
              alt={data.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition"
            >
              <X size={20} />
            </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold text-xl">
            <MapPin size={24} />
            <h2>{data.name}</h2>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">
            {data.description}
          </p>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-500">
            <strong>Lo que encontrarás aquí:</strong>
            <ul className="list-disc ml-5 mt-1">
               {data.services.map((svc, index) => (
                 <li key={index}>{svc}</li>
               ))}
            </ul>
          </div>

          {/* ESPACIO DE PUBLICIDAD (300x50 móvil o banner) */}
          <div className="mt-6 w-full h-16 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
            espacio para publicidad (AdSense)
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingModal;   