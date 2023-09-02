import supabase from "../database.js";

const auth = {}

auth.signUp = async (req, res) => {
    try {
        let userData;

        if (req.body.profile_role === "paciente") {
            userData = {
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                options: {
                    data: {
                        dpi: req.body.dpi,
                        full_name: req.body.full_name,
                        nacimiento: req.body.nacimiento,
                        genero: req.body.genero,
                        alergias: req.body.alergias,
                        complicaciones: req.body.complicaciones,
                        profile_role: req.body.profile_role
                    },
                },
            };
        } else if (req.body.profile_role === "clinica") {
            userData = {
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                options: {
                    data: {
                        dpi: req.body.dpi,
                        full_name: req.body.full_name,
                        direccion: req.body.direccion,
                        profile_role: req.body.profile_role
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

// auth.getUserByEmail = async (req, res) => {
//     try {
//         const { data, error } = await supabase
//             .from('profiles')
//             .select('email')
//             .eq('email', req.params.email)
//             .single();

//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: 'Error al obtener el usuario' });
//         }

//         if (!data) {
//             return res.status(404).json({ error: 'Usuario no encontrado' });
//         }

//         return res.json({ user: data });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'Error en el servidor' });
//     }
// };

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
}

export default auth