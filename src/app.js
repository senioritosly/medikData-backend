import './database.js'
import cors from 'cors'
import express from 'express'

import routeAuth from './routes/auth.routes.js'
import routeAddCitas from './routes/agendar-citas.routes.js'
import routeCitas from './routes/citas.routes.js'
import routeResenias from './routes/resenias.routes.js'
import routeClinicas from './routes/clinicas.routes.js'
import routeMedicos from './routes/medico.routes.js';

const app = express()

//settings
// app.set('port', process.env.PORT || 4000)

//middlewares
//funciones que se ejecutan antes de llegar a las rutas
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//routes

// AUTH ROUTES
app.use('/api/auth', routeAuth)

// AGENDAR CITAS ROUTES
app.use('/api/addcitas', routeAddCitas)

// CITAS ROUTES
app.use('/api/citas', routeCitas)

//RESEÑAS
app.use('/api/resenias', routeResenias)

//CLINICAS
app.use('/api/clinica',routeClinicas)

//MEDICOS
app.use('/api/medico', routeMedicos)

// module.exports = app
export default app
