import supabase from "../database.js";

const medicosController = {};

// Obtener la lista de médicos
medicosController.getMedicos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('medico')
            .select('dpi, nombres, apellidos, especialidad, numerocolegiado, telefono, id_clinica, correo')
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
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
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

export default medicosController;
