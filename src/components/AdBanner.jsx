import React, { useEffect } from 'react';

const AdBanner = ({ dataAdSlot }) => {
  useEffect(() => {
    try {
      // Esta función intenta cargar el anuncio de Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error cargando anuncio:", e);
    }
  }, []);

  return (
    <div className="my-4 flex justify-center overflow-hidden">
      {/* Reemplaza data-ad-client con TU ID de AdSense (empieza con ca-pub-) */}
      <ins className="adsbygoogle"
           style={{ display: 'block', textAlign: 'center' }}
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
           data-ad-slot={dataAdSlot || "1234567890"}></ins>
    </div>
  );
};

export default AdBanner;