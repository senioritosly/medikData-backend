import supabase from "../database.js";

const addCitas = {}

addCitas.getClinicas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('clinica')
            .select('*')

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las clinicas' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay clinicas' });
        }

        return res.json({ clinicas: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


addCitas.getEspecialidades = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('clinica')
            .select('medico( especialidad)')
            .eq('id_clinica', req.params.id_clinica)

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las especialidades' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay especialidades' });
        }

        return res.json({ especialidades: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

addCitas.getMedico = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('medico')
            .select('nombres, apellidos, dpi')
            .eq('especialidad', req.params.especialidad)
            .eq('id_clinica', req.params.id_clinica)


        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las medicos' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay medicos' });
        }

        return res.json({ medico: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

addCitas.postCita = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cita')
            .insert([
                {
                    pacientetoken: req.body.pacientetoken,
                    medicotoken: req.body.medicotoken,
                    clinicatoken: req.body.clinicatoken,
                    hora: req.body.hora,
                    fecha: req.body.fecha,
                    estado: 'pendiente'
                },
            ])
            .single()

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al agendar la cita' });
        }

        return res.json({ cita: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


export default addCitas
