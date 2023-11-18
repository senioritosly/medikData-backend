import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wjfuorfvxrtgbzrvwxan.supabase.co/'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZnVvcmZ2eHJ0Z2J6cnZ3eGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NzkyMzgsImV4cCI6MTk5OTQ1NTIzOH0.GLTlM-7DE9XxfwXEevtK64-p65KLKeCy2dQC3NBOTy0'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase
