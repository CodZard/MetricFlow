import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpqnpqqlzapixjfqqgop.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwcW5wcXFsemFwaXhqZnFxZ29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMjE0MjMsImV4cCI6MjA4ODc5NzQyM30.FCfhbgt2Wfi208tXePMujtLmqDRhRrzq3dd4Fm8bsTs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)