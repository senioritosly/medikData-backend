import supabase from "../database.js";

const reseniasConect = {}

reseniasConect.getResenias = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('resenia')
            .select('*')

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las resenias' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay resenias' });
        }

        return res.json({ resenias: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
}

export default reseniasConect;
