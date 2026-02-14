cd ~/Documents/Zalphamainsitemake/Zalphamainsitemake

notepad src/app/admin/agents/hooks/useAgentAnalytics.ts
```

Find this section (lines 5-8):
```
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

Replace with:
```
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'
)