import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        
        <p className="font-bold text-white text-lg mb-2">ITP Reviews</p>
        <p className="text-sm mb-4">
          Hecho por <strong>Valentín</strong> para la comunidad del <strong>Instituto Tecnológico de Puebla</strong>.
        </p>
        
        <div className="flex justify-center gap-4 text-sm text-gray-400 mb-4">
           {/* Enlace a los Términos */}
           <Link to="/terminos" className="hover:text-white hover:underline transition">
             Términos y Condiciones
           </Link>
           <span>|</span>
           <a href="https://www.puebla.tecnm.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition">
             Sitio Oficial ITP
           </a>
        </div>

        <p className="text-xs text-gray-500">
          Este sitio no está afiliado oficialmente al TecNM.
        </p>
      </div>
    </footer>
  );
};

export default Footer;