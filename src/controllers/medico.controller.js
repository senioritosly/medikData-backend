import supabase from "../database.js";

const medicosController = {};

// Obtener la lista de médicos
medicosController.getMedicos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('medico')
            .select('dpi, full_name, especialidad, numerocolegiado, telefono, id_clinica, correo')
            .order('apellidos');

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener la lista de médicos' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No hay médicos registrados' });
        }

        return res.json({ medicos: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Agregar un nuevo médico
medicosController.crearMedico = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('medico')
            .insert([
                {
                    dpi: req.body.dpi,
                    full_name: req.body.full_name,
                    especialidad: req.body.especialidad,
                    numerocolegiado: req.body.numerocolegiado,
                    telefono: req.body.telefono,
                    id_clinica: req.body.id_clinica,
                    correo: req.body.correo
                }
            ])
            .single();

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al agregar el médico' });
        }

        return res.json({ medico: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener la lista de médicos de la misma clínica del administrador
medicosController.getMedicosClinicas = async (req, res) => {
    try {
        console.log(req.params.dpi);
        const { data: adminData, error: adminError } = await supabase
            .from('clinica')
            .select('id_clinica')
            .eq('dpi', req.params.dpi);

        if (adminError) {
            console.log(adminError);
            return res.status(500).json({ error: 'Error al obtener el id_clinica del administrador' });
        }

        if (!adminData || adminData.length === 0) {
            return res.status(404).json({ error: 'No se encontró la clínica del administrador' });
        }

        const idClinica = adminData[0].id_clinica;

        // Paso 3: Obtener los médicos de la misma clínica
        const { data, error } = await supabase
            .from('medico')
            .select('full_name, especialidad')
            .eq('id_clinica', idClinica);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener la lista de médicos' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No hay médicos registrados en esta clínica' });
        }

        return res.json({ medicos: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

medicosController.getHorarios = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('disponibilidad')
            .select('fecha, hora')
            .eq('doctor_dpi', req.params.dpi)

        console.log('DPI parameter:', req.params.dpi);
        console.log('Data from Supabase:', data);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener la lista de horarios' });
        }
        if (!data) {
            return res.status(404).json({ error: 'No hay horarios registrados' });
        }

        return res.json({ horarios: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }

};

export default medicosController;
