import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // 1. IMPORTANTE: Para que funcionen los títulos SEO
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfessorList from './pages/ProfessorList';
import ProfessorDetail from './pages/ProfessorDetail';
import Admin from './pages/Admin';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <HelmetProvider> {/* 2. Envolvemos toda la app para el SEO */}
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
          
          {/* 3. LÍNEA MÁGICA: Esto forzará a Vercel a actualizarse sí o sí */}
          <div className="bg-black text-white text-xs text-center py-1 font-bold">
            VERSION 4.0 - ACTUALIZACIÓN FORZADA
          </div>

          <Navbar />
          
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* CORRECCIÓN: Tenías dos rutas "/buscar". Dejamos SearchResults para la lupa */}
              <Route path="/buscar" element={<SearchResults />} />
              
              {/* Si quieres usar ProfessorList, ponle otra ruta como "/lista" */}
              <Route path="/lista" element={<ProfessorList />} /> 

              <Route path="/profesor/:id" element={<ProfessorDetail />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;