import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfessorList from './pages/ProfessorList'; // Opcional si no lo usas
import ProfessorDetail from './pages/ProfessorDetail';
import Admin from './pages/Admin';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
          
          <Navbar />
          
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buscar" element={<SearchResults />} />
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