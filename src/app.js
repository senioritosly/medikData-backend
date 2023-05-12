import './database.js'
import cors from 'cors'
import express from 'express'

import routeAuth from './routes/auth.routes.js'

const app = express()

//settings
// app.set('port', process.env.PORT || 4000)

//middlewares
//funciones que se ejecutan antes de llegar a las rutas
app.use(cors())
app.use(express.json())


//routes

app.use('/api/auth', routeAuth)

// module.exports = app
export default app