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

auth.updatePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Verificar si el usuario existe en Supabase Auth
        const { data: user, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }

        if (user.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const userId = user[0].id; // Obtener el ID de usuario de Supabase Auth

        // Actualizar la contraseña del usuario en Supabase Auth utilizando el ID de usuario
        const { data: updatedUser, updateError } = await supabase.auth.updateUser({
            email: email,
            password: newPassword,
            data: {} // Puedes proporcionar datos adicionales aquí si es necesario
        });

        if (updateError) {
            console.log(updateError);
            return res.status(500).json({ error: 'Error al actualizar la contraseña' });
        }

        return res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


// Método forgotPassword

//auth.forgotPassword= async (req, res) => {
//    try {
//        const { email } = req.body;
//        // Verificar si el usuario existe
//        const { data: user, error: userError } = await supabase
//            .from('auth.users') // Asegúrate de que sea la tabla correcta
//            .select('*')
//            .eq('email', email)
//            //.single();
//
//        if (userError || !user) {
//            return res.status(404).json({ message: 'User not found' });
//        }
//
//        // Generar token y fecha de caducidad
//        const token = generateResetToken();
//        const expiryDate = new Date();
//        expiryDate.setHours(expiryDate.getHours() + 1); // Token válido por 1 hora
//
//        // Guardar el token y la fecha de caducidad en la base de datos
//        const { error: updateError } = await supabase
//            .from('users')
//            .update({ email_change_token_new: token, email_change_sent_at: expiryDate })
//            .eq('email', email);
//
//        if (updateError) {
//            return res.status(500).json({ message: 'Error updating user data' });
//        }
//        // URL de restablecimiento de contraseña (ajustar según tu front-end)
//        const resetUrl = `http://frontend.example.com/reset-password?token=${token}`;
//        // Configurar y enviar el correo electrónico
//        const mailOptions = {
//            from: 'noreply@example.com',
//            to: email,
//            subject: 'Password Reset',
//            text: `Please use the following link to reset your password: ${resetUrl}`,
//            html: `<p>Please use the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
//        };
//        // Enviar el correo electrónico
//        const info = await transporter.sendMail(mailOptions);
//        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // URL para ver el correo electrónico en Ethereal
//        return res.json({ message: 'Reset password email sent' });
//    } catch (error) {
//        console.log(error);
//        return res.status(500).json({ message: 'Internal server error' });
//    }
//};
//
//// Método resetPassword
//auth.resetPassword = async (req, res) => {
//    try {
//        const { token, newPassword } = req.body;
//
//        // Verificar el token y la fecha de caducidad
//        const { data: user, error: userError } = await supabase
//            .from('profiles')
//            .select('*')
//            .eq('reset_token', token)
//            .single();
//
//        if (userError || !user) {
//            return res.status(404).json({ message: 'Invalid or expired token' });
//        }
//
//        const tokenExpiry = user.reset_token_expiry;
//        if (!tokenExpiry || new Date() > new Date(tokenExpiry)) {
//            return res.status(400).json({ message: 'Token has expired' });
//        }
//
//        // Cambiar la contraseña del usuario (Asegúrate de encriptar la nueva contraseña)
//        const { error: passwordError } = await supabase
//            .from('profiles')
//            .update({ password: newPassword /* Aquí debes encriptar la contraseña */, reset_token: null, reset_token_expiry: null })
//            .eq('id', user.id);
//
//        if (passwordError) {
//            return res.status(500).json({ message: 'Error updating password' });
//        }
//
//        return res.json({ message: 'Password reset successfully' });
//    } catch (error) {
//        console.log(error);
//        return res.status(500).json({ message: 'Internal server error' });
//    }
//};
//

export default auth
