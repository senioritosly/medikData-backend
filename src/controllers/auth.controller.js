import supabase from "../database.js";

const auth = {}

auth.signUp = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signUp({
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
                    complicaciones: req.body.complicaciones
                },
            },
        })

        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error creating user' });
        }

        return res.json({ message: 'Usuario creado correctamente', data });
    } catch (error) {
        console.log(error)
    }

    return res.json({ message: "Usuario creado correctamente" })
}

auth.signIn = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password
        })

        return res.json({ message: data })

    } catch (error) {
        console.log(error)
    }
}

auth.getUserByEmail = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', req.params.email)
            .single();

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }

        if (!data) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.json({ user: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


export default auth