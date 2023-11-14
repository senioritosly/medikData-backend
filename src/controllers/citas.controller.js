import supabase from "../database.js";

const listadoCitas = {}

listadoCitas.getCitas = async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('cita')
        .select('paciente(full_name), medico(full_name), clinica(nombre), fecha, hora, estado')
        .eq('pacientetoken', req.params.pacientetoken)
        .eq('estado', 'realizada');

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las citas' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay citas' });
        }

        return res.json({ citas: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

listadoCitas.getCitasPendientes = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cita')
            .select('citasid, paciente(full_name), medico(full_name), clinica(nombre), fecha, hora, estado')
            .eq('pacientetoken', req.params.pacientetoken)
            .eq('estado', 'pendiente');


        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las clinicas' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay clinicas' });
        }

        return res.json({ citasPendientes: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

listadoCitas.getCitasPendientesMedicos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cita')
            .select('citasid, paciente(full_name), medico(full_name), clinica(nombre), fecha, hora, estado')
            .eq('medicotoken', req.params.medicotoken)
            .eq('estado', 'pendiente');


        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las clinicas' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay clinicas' });
        }

        return res.json({ citasPendientes: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

listadoCitas.getCitasPendientesCitaID = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cita')
            .select('citasid, paciente(full_name), medico(full_name), clinica(nombre), fecha, hora, estado')
            .eq('citasid', req.params.citaid)
            .eq('estado', 'pendiente');


        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener las clinicas' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay clinicas' });
        }

        return res.json({ citasPendientes: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

listadoCitas.getCitaDiagnostico = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('diagnostico')
            .select('diagnostico')
            .eq('citaid', req.params.citaid);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener el diagnostico' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay diagnostico' });
        }

        return res.json({ diagnostico: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
}

listadoCitas.deleteCita = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cita')
            .delete()
            .eq('citasid', req.params.citaid);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al eliminar la cita' });
        }

        if (!data) {
            return res.status(404).json({ error: 'No hay citas' });
        }

        return res.json({ citas: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
}

export default listadoCitas
