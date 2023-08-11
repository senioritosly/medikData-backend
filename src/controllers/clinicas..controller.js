import supabase from "../database.js";

const listadoClinicas = {};

listadoClinicas.getClincas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('clinica')
            .select('nombre, direccion, telefono')
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

export default listadoClinicas;
