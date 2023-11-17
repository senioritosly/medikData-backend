import supabase from "../database.js";
//import nodemailer from 'nodemailer';
import crypto from 'crypto';

const auth = {};

function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
}


//// Configurar el transporte de Nodemailer
//const transporter = nodemailer.createTransport({
//    host: 'smtp.ethereal.email',
//    port: 587,
//    auth: {
//        user: 'jamel.kunde@ethereal.email',
//        pass: 'CE2rYGfbAkuFKSqXys'
//    }
//});

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
            return res.status(409).json({ message: 'El DPI y el correo ya están en uso' });
        } else if (existingEmailUser.length > 0) {
            return res.status(409).json({ message: 'Correo ya en uso' });
        } else if (existingDpiUser.length > 0) {
            return res.status(409).json({ message: 'DPI ya en uso' });
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
                        altura: req.body.altura,
                        peso: req.body.peso,
                        tipo_sangre: req.body.tipo_sangre,
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
            return res.status(500).json({ message: 'Error creando usuario' });
        }

        return res.json({ message: 'Usuario creado correctamente', data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creando usuario' });
    }
};


auth.signIn = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password,
        });

        if (error) {
            if (error.message === 'Invalid login credentials') {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            } else if (error.message === 'Email not confirmed') {
                return res.status(401).json({ message: 'Email no verificado' });
            }
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

auth.updateUser= async (req, res) => {
    try {
        const userId = req.params.dpi; // DPI del usuario
        const newFullName = req.params.fullname; // Nuevo nombre completo
        // Primero, verifica si el usuario con ese DPI existe
        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('dpi', userId)
            .single();
        if (userError) {
            throw userError;
        }
        if (!userData) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Si el usuario existe, actualiza su perfil
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ full_name: newFullName })
            .eq('dpi', userId);
        if (updateError) {
            throw updateError;
        }
        // Respuesta exitosa
        res.json({ message: 'Perfil actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}

auth.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validar si el email tiene un formato correcto
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Verificar si el usuario existe en la tabla 'profiles'
        const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .single();

        if (profileError || !userProfile) {
            console.error("User not found:", profileError);
            return res.status(404).json({ message: 'User not found' });
        }

        // Solicitar a Supabase que envíe el correo de restablecimiento de contraseña
        let { data, error } = await supabase.auth.resetPasswordForEmail(email)

        if (error) {
            console.error("Error sending reset password email:", error);
            return res.status(500).json({ message: 'Error sending reset password email' });
        }

        return res.json({ message: 'Reset password email sent' });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

auth.updatePassword = async (req, res) => {
    try {
        const { accessToken, newPassword, refreshToken } = req.body;

        // Ensure that the new password is not empty
        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }

        // Ensure that the access token is not empty
        if (!accessToken) {
            return res.status(400).json({ message: 'Access token is required' });
        }

        // Ensure that the refresh token is not empty
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        // Set session with Supabase
        const { data: session, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        if (sessionError) {
            console.error("Error setting session:", sessionError);

            // Check if it's an AuthSessionMissingError
            if (sessionError.message === 'Auth session missing') {
                return res.status(401).json({ message: 'Authentication session missing or expired' });
            }

            return res.status(500).json({ message: 'Error setting session' });
        }

        // Update the user's password
        const { data: updateData, error: updateError } = await supabase.auth.updateUser(accessToken, {
            password: newPassword
        });

        if (updateError) {
            console.error("Error updating password:", updateError);

            if (updateError.message === 'Auth session missing') {
                return res.status(401).json({ message: 'Authentication session missing or expired' });
            }

            return res.status(500).json({ message: 'Error updating password' });
        }

        return res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export default auth
