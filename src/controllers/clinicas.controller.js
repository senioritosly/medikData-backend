import supabase from "../database.js";

const clinicasController = {};

clinicasController.getClincas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('clinica')
            .select('id_clinica, dpi, direccion, telefono, nombre')
            .order('nombre');

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las clínicas' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No hay clínicas' });
        }

        return res.json({ clinicas: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

clinicasController.crearClinica = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('clinica')
            .insert([
                {
                    dpi: req.body.dpi,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    nombre: req.body.nombre
                }
            ])
            .single();

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al crear la clínica' });
        }

        return res.json({ clinica: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Agregar funciones de actualización y eliminación aquí si es necesario
clinicasController.getClinicaID = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('clinica')
            .select('id_clinica')
            .eq('dpi', req.params.dpi)
            .single();

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener la clínica' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No existe la clínica' });
        }

        return res.json({ clinica: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

export default clinicasController;







