import supabase from "../database.js";

const reseniasConect = {}
reseniasConect.getResenias = async (req, res) => {
    try {
        let { data: resenias, error } = await supabase
            .from('resenias')
            .select(`
            *,
            medico:medico (nombres, apellidos, dpi),
            paciente:autor (nombres, apellidos, dpi)
        `);

        if (error) throw error;

        if (!resenias.length) {
            return res.status(404).json({ error: 'No hay reseñas' });
        }

        // transformar las reseñas para que incluyan los nombres en lugar de las IDs
        resenias = resenias.map(resenia => ({
            ...resenia,
            medico: `${resenia.medico.nombres} ${resenia.medico.apellidos}`,
            paciente: `${resenia.paciente.nombres} ${resenia.paciente.apellidos}`
        }));

        return res.json({ resenias });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
}

export default reseniasConect;

