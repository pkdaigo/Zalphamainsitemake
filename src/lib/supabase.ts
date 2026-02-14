import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://becsvvgggvhokamuiijt.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlY3N2dmdnZ3Zob2thbXVpaWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0ODMzMTAsImV4cCI6MjA4NTA1OTMxMH0.SkKBm8NaAjOf2qKa3YT9SnHkNBIUlAJxO4lNtxxX4-Q'

export const supabase = createClient(supabaseUrl, supabaseKey)
