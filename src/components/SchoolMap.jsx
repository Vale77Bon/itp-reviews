import React, { useState } from 'react';
import BuildingModal from './BuildingModal';

const SchoolMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Datos "Hardcodeados" de los edificios (luego pueden venir de Supabase)
  const buildingsData = {
    "edificio-a": {
      name: "Edificio de Sistemas",
      description: "Aquí se encuentran los laboratorios de cómputo y la coordinación de Ing. en Sistemas.",
      services: ["Laboratorio Cisco", "Sala de Servidores", "Cubículos Docentes"]
    },
    "edificio-b": {
      name: "Biblioteca",
      description: "Centro de información con acceso a internet y cubículos de estudio.",
      services: ["Préstamo de Libros", "Sala Silenciosa", "Hemeroteca"]
    },
    "edificio-c": {
      name: "Cafetería",
      description: "Área de comida y esparcimiento para alumnos.",
      services: ["Desayunos", "Papelería", "Microondas"]
    }
  };

  const handleBuildingClick = (id) => {
    if (buildingsData[id]) {
      setSelectedBuilding(buildingsData[id]);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-blue-50 rounded-xl overflow-hidden shadow-inner border border-blue-100 p-4">
      <h3 className="text-center font-bold text-gray-700 mb-2">Mapa del Campus (Haz clic en un edificio)</h3>
      
      {/* SVG INTERACTIVO */}
      {/* viewBox permite que el mapa se ajuste a cualquier pantalla sin pixelarse */}
      <svg viewBox="0 0 800 500" className="w-full h-auto drop-shadow-lg">
        
        {/* Fondo/Pasto */}
        <rect x="0" y="0" width="800" height="500" fill="#e0f2fe" rx="15" />
        
        {/* Edificio A (Sistemas) - Azul */}
        <g 
          className="cursor-pointer hover:opacity-80 transition-opacity group"
          onClick={() => handleBuildingClick('edificio-a')}
        >
          <rect x="100" y="100" width="150" height="100" fill="#3b82f6" rx="5" />
          <text x="175" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Sistemas</text>
        </g>

        {/* Edificio B (Biblioteca) - Naranja */}
        <g 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleBuildingClick('edificio-b')}
        >
          <rect x="350" y="80" width="200" height="120" fill="#f97316" rx="5" />
          <text x="450" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Biblioteca</text>
        </g>

        {/* Edificio C (Cafetería) - Verde */}
        <g 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleBuildingClick('edificio-c')}
        >
          <circle cx="600" cy="350" r="60" fill="#22c55e" />
          <text x="600" y="355" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cafetería</text>
        </g>

        {/* Caminos decorativos */}
        <path d="M 175 200 L 175 350 L 600 350" stroke="#cbd5e1" strokeWidth="20" fill="none" strokeDasharray="10,5"/>
        <path d="M 450 200 L 450 350" stroke="#cbd5e1" strokeWidth="20" fill="none" strokeDasharray="10,5"/>

      </svg>

      {/* El Modal que se abre sobre el mapa */}
      <BuildingModal 
        isOpen={!!selectedBuilding} 
        onClose={() => setSelectedBuilding(null)} 
        data={selectedBuilding}
      />
    </div>
  );
};

export default SchoolMap;