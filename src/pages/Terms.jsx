import React from 'react';
import { Shield, AlertTriangle, Gavel, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FileText className="text-blue-600" /> Términos y Condiciones de Uso
        </h1>
        
        <p className="text-gray-500 mb-8 text-sm">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          
          {/* SECCIÓN 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle size={20} className="text-yellow-500" /> 1. Declaración de Independencia
            </h2>
            <p>
              <strong>ITP Reviews</strong> es un proyecto estudiantil independiente y de código abierto. 
              <strong>NO tenemos ninguna afiliación oficial</strong>, laboral ni administrativa con el 
              Instituto Tecnológico de Puebla (ITP) ni con el Tecnológico Nacional de México (TecNM). 
              Las opiniones aquí expresadas son responsabilidad exclusiva de los usuarios y no reflejan 
              la postura de la institución educativa.
            </p>
          </section>

          {/* SECCIÓN 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Uso Aceptable del Servicio</h2>
            <p className="mb-2">
              Al utilizar nuestra plataforma para publicar reseñas, te comprometes a:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Opinar basándote exclusivamente en tu experiencia académica real.</li>
              <li>No publicar contenido difamatorio, insultos, amenazas o lenguaje de odio.</li>
              <li>No revelar información personal privada de los docentes (direcciones, teléfonos, vida familiar).</li>
              <li>No realizar spam ni publicidad no autorizada.</li>
            </ul>
            <p className="mt-2 bg-red-50 p-3 rounded text-red-700 text-sm font-medium border border-red-100">
              Nos reservamos el derecho de eliminar, sin previo aviso, cualquier comentario que viole estas normas o que consideremos inapropiado para la comunidad.
            </p>
          </section>

          {/* SECCIÓN 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Propiedad Intelectual</h2>
            <p>
              El código fuente y diseño de la plataforma son propiedad de los desarrolladores. 
              Sin embargo, al publicar una reseña, cedes a ITP Reviews el derecho no exclusivo 
              de mostrar, reproducir y distribuir dicho contenido dentro de la plataforma de manera indefinida.
            </p>
          </section>

          {/* SECCIÓN 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Limitación de Responsabilidad</h2>
            <p>
              El uso de la información contenida en este sitio es bajo tu propio riesgo. 
              ITP Reviews no garantiza la exactitud de las opiniones vertidas por los usuarios. 
              No nos hacemos responsables por decisiones académicas (elección de materias, bajas, reprobación) 
              tomadas con base en la información de este sitio.
            </p>
          </section>

          {/* SECCIÓN 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
               <Shield size={20} className="text-green-600" /> 5. Privacidad y Publicidad
            </h2>
            <p>
              Este sitio utiliza servicios de publicidad de terceros (Google AdSense) que pueden utilizar 
              cookies para mostrar anuncios relevantes. No recopilamos nombres reales ni correos electrónicos 
              de los usuarios que consultan la información. El anonimato es nuestra prioridad.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <Link to="/" className="text-blue-600 font-bold hover:underline">
              &larr; Volver al Inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;