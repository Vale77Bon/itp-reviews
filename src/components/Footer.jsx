import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          Hecho por <strong>Valentín</strong> para la comunidad del <strong>Instituto Tecnológico de Puebla</strong>.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          No afiliado oficialmente al ITP.
        </p>
      </div>
    </footer>
  );
};

export default Footer;