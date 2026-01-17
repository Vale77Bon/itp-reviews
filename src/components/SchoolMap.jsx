import React, { useState } from 'react';
import { Map, X, Info, Camera } from 'lucide-react';
import { edificios } from '../data/edificios'; // Importamos los datos

const SchoolMap = () => {
  const [selectedEdificio, setSelectedEdificio] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-12">
      
      {/* Encabezado */}
      <div className="bg-blue-900 px-6 py-4 border-b border-blue-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Map size={20}/> Mapa Interactivo
          </h2>
          <p className="text-blue-200 text-sm mt-1">
            Haz clic en los números para ver fotos del edificio.
          </p>
        </div>
      </div>
      
      {/* --- CONTENEDOR DEL MAPA (Relativo para poder poner pines encima) --- */}
      <div className="relative bg-gray-900 overflow-hidden group">
        
        {/* IMAGEN DEL MAPA */}
        <img 
          src="/mapa-dark.jpeg" 
          alt="Mapa Técnico ITP" 
          className="w-full h-auto object-contain min-h-[400px]"
        />

        {/* --- PINES INTERACTIVOS --- */}
        {edificios.map((edificio) => (
          <button
            key={edificio.id}
            onClick={() => setSelectedEdificio(edificio)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 text-blue-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all hover:scale-125 z-10"
            style={{ 
              top: edificio.top, 
              left: edificio.left 
            }}
          >
            {edificio.id}
          </button>
        ))}

        {/* Aviso si no hay selección */}
        {!selectedEdificio && (
          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
            <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              👆 Toca un número para ver detalles
            </span>
          </div>
        )}
      </div>
      
      {/* --- VENTANA MODAL (POPUP) --- */}
      {selectedEdificio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedEdificio(null)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre si clicas dentro
          >
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedEdificio(null)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full z-20 transition"
            >
              <X size={20} />
            </button>

            {/* Imagen del Edificio */}
            <div className="h-48 bg-gray-200 relative">
              <img 
                src={selectedEdificio.imagen} 
                alt={selectedEdificio.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-bold text-xl">{selectedEdificio.nombre}</h3>
              </div>
            </div>

            {/* Información */}
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Info className="text-blue-600 shrink-0 mt-1" size={20} />
                <p className="text-gray-600 leading-relaxed">
                  {selectedEdificio.descripcion}
                </p>
              </div>

              {/* Botón de acción (ej. ver materias) */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setSelectedEdificio(null)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition text-sm"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SchoolMap;