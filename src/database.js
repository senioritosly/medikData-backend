import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wjfuorfvxrtgbzrvwxan.supabase.co/'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZnVvcmZ2eHJ0Z2J6cnZ3eGFuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Mzg3OTIzOCwiZXhwIjoxOTk5NDU1MjM4fQ.IU6y2dg3ZxPD52ElQ8yv9jchWjaNgKqRaoFgQpI1mhU'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase
