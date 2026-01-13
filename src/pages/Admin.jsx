import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [form, setForm] = useState({
    nombre: '',
    departamento: '',
    materia: '',
    dificultad: 'Media',
    calificacion: 5
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "V@leyvero123") { // Recuerda cambiar tu contraseña si quieres
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profesores')
      .insert([form]);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("¡Profesor agregado correctamente!");
      setForm({ ...form, nombre: '', materia: '' }); // Limpiamos nombre y materia
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
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agregar Nuevo Profesor</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Ajusté a 1 columna en móvil */}
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
              <option value="Ciencias Básicas">Ciencias Básicas</option> {/* Dejé esta por si acaso */}
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
          <label className="block font-bold mb-1">Materia Principal</label>
          <input 
            type="text" 
            required
            className="w-full border p-2 rounded" 
            placeholder="Ej. Cálculo Diferencial"
            value={form.materia}
            onChange={e => setForm({...form, materia: e.target.value})}
          />
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

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition">
          Guardar Profesor
        </button>

      </form>
    </div>
  );
};

export default Admin;