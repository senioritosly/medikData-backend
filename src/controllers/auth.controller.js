import supabase from "../database.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const auth = {};

function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Configurar el transporte de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jamel.kunde@ethereal.email',
        pass: 'CE2rYGfbAkuFKSqXys'
    }
});

auth.signUp = async (req, res) => {
    try {
        let userData;
        const { email, dpi } = req.body;

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const { data: existingEmailUser, error: emailError } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', email);

        // Verificar si ya existe un usuario con el mismo DPI
        const { data: existingDpiUser, error: dpiError } = await supabase
            .from('profiles')
            .select('*')
            .eq('dpi', dpi);

        if (emailError || dpiError) {
            console.log(emailError || dpiError);
            return res.status(500).json({ message: 'Error checking existing user' });
        }

        if (existingEmailUser.length > 0 && existingDpiUser.length > 0) {
            return res.status(409).json({ message: 'Both email and DPI already exist' });
        } else if (existingEmailUser.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        } else if (existingDpiUser.length > 0) {
            return res.status(409).json({ message: 'DPI already exists' });
        }

        if (req.body.profile_role === "paciente") {
            userData = {
                email: req.body.email,
                password: req.body.password,
                options: {
                    data: {
                        dpi: req.body.dpi,
                        full_name: req.body.full_name,
                        nacimiento: req.body.nacimiento,
                        genero: req.body.genero,
                        alergias: req.body.alergias,
                        complicaciones: req.body.complicaciones,
                        profile_role: req.body.profile_role,
                        telefono: req.body.telefono,
                    },
                },
            };
        } else if (req.body.profile_role === "clinica") {
            userData = {
                email: req.body.email,
                password: req.body.password,
                options: {
                    data: {
                        dpi: req.body.dpi,
                        full_name: req.body.full_name,
                        direccion: req.body.direccion,
                        profile_role: req.body.profile_role,
                        telefono: req.body.telefono,
                    },
                },
            };
        } else if (req.body.profile_role === "doctor"){
            userData = {
                email: req.body.email,
                password: req.body.password,
                options: {
                    data: {
                        dpi: req.body.dpi,
                        full_name: req.body.full_name,
                        profile_role: req.body.profile_role,
                        telefono: req.body.telefono,
                        especialidad: req.body.especialidad,
                        numerocolegiado: req.body.numerocolegiado,
                        clinica_doc: req.body.clinica_doc,
                    },
                },
            };
        }
        const { data, error } = await supabase.auth.signUp(userData);

        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error creating user' });
        }

        return res.json({ message: 'Usuario creado correctamente', data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};


auth.signIn = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password,
        });

        if (error) {
            console.log(error);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.json({ message: 'Login successful', data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

auth.getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email; // Asegúrate de que estás extrayendo correctamente el email de los parámetros

        // Verificar si el usuario existe
        const { data: user, error } = await supabase
            .from('profiles') // Asegúrate de que sea el nombre correcto de la tabla
            .select('*')
            .eq('email', email);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }

        if (user.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.json({ user: user[0] }); // Devuelve el primer usuario encontrado
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


auth.getUser = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const { data: user, error } = await supabase.auth.getUser(token);

        if (error) {
            console.log(error);
            return res.status(401).json({ error: 'Invalid token' });
        }

        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

auth.logOut = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const { error } = await supabase.auth.signOut(token)

        return res.json({ message: 'Usuario deslogueado correctamente' })
    } catch (error) {
        console.log(error)
    }
};

// Método forgotPassword


export default auth
