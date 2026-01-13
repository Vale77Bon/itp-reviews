import React, { useEffect } from 'react';

const AdBanner = ({ dataAdSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error cargando anuncio:", e);
    }
  }, []);

  return (
    <div className="my-4 flex justify-center overflow-hidden border border-gray-100 rounded-lg bg-gray-50 min-h-[100px]">
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-pub-5103223521018326" 
           data-ad-slot={dataAdSlot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdBanner;