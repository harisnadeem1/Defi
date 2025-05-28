import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpnifsrtizyodnoryrml.supabase.co'; // Replace with your URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbmlmc3J0aXp5b2Rub3J5cm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NTYzODEsImV4cCI6MjA2NDAzMjM4MX0.JzTzeoEJWED387EqLVkvxq6jocfJeXpJ4EK9lgT0Oxg'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
