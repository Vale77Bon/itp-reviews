import { createClient } from '@supabase/supabase-js';

// NOTA: Lo ideal en producción es usar variables de entorno (.env),
// pero para empezar rápido, puedes pegar tus claves aquí.
const supabaseUrl = 'https://qhyitifpejcskmjpmgih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeWl0aWZwZWpjc2ttanBtZ2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDA3MjQsImV4cCI6MjA4MzcxNjcyNH0.BQ-9qTDjZ22xwDakH2np7esmWuLAmKr3h9tuwgC7QlE';

export const supabase = createClient(supabaseUrl, supabaseKey);