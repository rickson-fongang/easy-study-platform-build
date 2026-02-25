import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vcyjhcjufoqpfungxmtw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjeWpoY2p1Zm9xcGZ1bmd4bXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDEzMzgsImV4cCI6MjA4NzUxNzMzOH0.7nJLQfQwK5pQ1j2eJvRWkW8W573VnpL8d1FBjdcYv_g'

export const supabase = createClient(supabaseUrl, supabaseKey)
