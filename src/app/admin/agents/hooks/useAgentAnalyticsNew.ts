import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { formatDistanceToNow, subDays, format } from 'date-fns'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'
)
