import e from "express";
import supabase from "../database.js";

const addCitas = {}

addCitas.getCitas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paciente')
            .select('cita(*)')
            .eq('dpi', req.params.dpi)

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

export default addCitas
