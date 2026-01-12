import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfessorList from './pages/ProfessorList';
import ProfessorDetail from './pages/ProfessorDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* El Navbar siempre visible */}
        <Navbar />
        
        {/* El contenido cambia según la ruta */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<ProfessorList />} />
            <Route path="/profesor/:id" element={<ProfessorDetail />} />
          </Routes>
        </main>

        {/* El Footer siempre visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;