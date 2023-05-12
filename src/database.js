import  { createClient }  from '@supabase/supabase-js'
// require('dotenv').config({ path: './.env.local' })
import dotenv from 'dotenv'
dotenv.config({ path: './.env.local' })

// const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

export default supabase