import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Search, Edit, X } from 'lucide-react'; // Iconos para que se vea bonito

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  // Estados para el formulario
  const [form, setForm] = useState({
    nombre: '',
    departamento: '',
    materia: '',
    dificultad: 'Media',
    calificacion: 5
  });

  // Estados para la Edición
  const [editingId, setEditingId] = useState(null); // Si tiene ID, estamos editando. Si es null, estamos creando.
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // --- 1. LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "puebla2024") {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  // --- 2. BUSCAR PROFESOR PARA EDITAR ---
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const { data, error } = await supabase
      .from('profesores')
      .select('*')
      .ilike('nombre', `%${searchTerm}%`); // Busca coincidencias parciales

    if (error) {
      alert("Error buscando: " + error.message);
    } else {
      setSearchResults(data);
    }
  };

  // --- 3. CARGAR DATOS EN EL FORMULARIO (MODO EDICIÓN) ---
  const startEditing = (profe) => {
    setEditingId(profe.id);
    setForm({
      nombre: profe.nombre,
      departamento: profe.departamento,
      materia: profe.materia,
      dificultad: profe.dificultad,
      calificacion: profe.calificacion
    });
    setSearchResults([]); // Limpiamos la búsqueda para enfocar en el formulario
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube la pantalla al formulario
  };

  // --- 4. CANCELAR EDICIÓN ---
  const cancelEditing = () => {
    setEditingId(null);
    setForm({
      nombre: '',
      departamento: '',
      materia: '',
      dificultad: 'Media',
      calificacion: 5
    });
  };

  // --- 5. GUARDAR (CREAR O ACTUALIZAR) ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // MODO ACTUALIZAR (UPDATE)
      const { error } = await supabase
        .from('profesores')
        .update(form)
        .eq('id', editingId);

      if (error) {
        alert("Error al actualizar: " + error.message);
      } else {
        alert("¡Profesor actualizado correctamente!");
        cancelEditing(); // Limpia todo
      }

    } else {
      // MODO CREAR (INSERT)
      const { error } = await supabase
        .from('profesores')
        .insert([form]);

      if (error) {
        alert("Error al guardar: " + error.message);
      } else {
        alert("¡Profesor creado correctamente!");
        setForm({ ...form, nombre: '', materia: '' }); // Limpia solo campos clave
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Acceso Administrador</h2>
          <input 
            type="password" 
            className="border p-2 w-full mb-4 rounded" 
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      
      {/* --- SECCIÓN BUSCADOR --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">🔍 Buscar Profesor para Editar</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Nombre del profesor..." 
            className="flex-1 border p-2 rounded"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buscar
          </button>
        </form>

        {/* Resultados de búsqueda */}
        {searchResults.length > 0 && (
          <div className="mt-4 border-t pt-4 space-y-2">
            {searchResults.map(profe => (
              <div key={profe.id} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                <div>
                  <span className="font-bold block">{profe.nombre}</span>
                  <span className="text-xs text-gray-500">{profe.departamento}</span>
                </div>
                <button 
                  onClick={() => startEditing(profe)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-yellow-600"
                >
                  <Edit size={14} /> Editar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- FORMULARIO PRINCIPAL --- */}
      <div className={`p-6 rounded-xl shadow-lg border transition-colors ${editingId ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'}`}>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {editingId ? '✏️ Editando Profesor' : '➕ Agregar Nuevo Profesor'}
          </h1>
          
          {editingId && (
            <button onClick={cancelEditing} className="text-red-500 text-sm flex items-center gap-1 hover:underline">
              <X size={16} /> Cancelar Edición
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block font-bold mb-1">Nombre Completo</label>
            <input 
              required
              type="text" 
              className="w-full border p-2 rounded" 
              value={form.nombre}
              onChange={e => setForm({...form, nombre: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Carrera / Departamento</label>
              <select 
                required
                className="w-full border p-2 rounded"
                value={form.departamento}
                onChange={e => setForm({...form, departamento: e.target.value})}
              >
                <option value="">Selecciona una carrera...</option>
                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                <option value="Ingeniería en TICs">Ingeniería en TICs</option>
                <option value="Ingeniería en Logística">Ingeniería en Logística</option>
                <option value="Ingeniería en Gestión Empresarial">Ing. Gestión Empresarial</option>
                <option value="Licenciatura en Administración">Lic. Administración</option>
                <option value="Ciencias Básicas">Ciencias Básicas</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Dificultad</label>
              <select 
                className="w-full border p-2 rounded"
                value={form.dificultad}
                onChange={e => setForm({...form, dificultad: e.target.value})}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Materias (separadas por comas)</label>
            <input 
              type="text" 
              required
              className="w-full border p-2 rounded" 
              placeholder="Ej. Cálculo Diferencial, Álgebra Lineal, Tutoría"
              value={form.materia}
              onChange={e => setForm({...form, materia: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Escribe las materias separadas por coma para que salgan como etiquetas azules.
            </p>
          </div>

          <div>
            <label className="block font-bold mb-1">Calificación Inicial (1-5)</label>
            <input 
              type="number" 
              max="5"
              min="1"
              step="0.1"
              className="w-full border p-2 rounded" 
              value={form.calificacion}
              onChange={e => setForm({...form, calificacion: e.target.value})}
            />
          </div>

          <button className={`w-full text-white font-bold py-3 rounded transition ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`}>
            {editingId ? 'Actualizar Datos' : 'Guardar Profesor'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Admin;