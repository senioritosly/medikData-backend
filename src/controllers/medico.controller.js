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
            .select('dpi, full_name, especialidad, numerocolegiado, correo')
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
            .select('disponibilidad_id, fecha, hora, estado')
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

medicosController.addAvailability = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('disponibilidad')
            .insert([
                {
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                    estado: 'pendiente',
                    doctor_dpi: req.body.doctor_dpi
                }
            ])
            .single();

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al agregar la disponibilidad' });
        }

        return res.json({ disponibilidad: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
}

medicosController.updateDiagnostico = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('diagnostico')
            .update({ diagnostico: req.body.diagnostico })
            .eq('citaid', req.params.citaid);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar el diagnóstico' });
        }

        return res.json({ diagnostico: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' })
    }
}

medicosController.updateDisponibilidad = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('disponibilidad')
            .update({ fecha: req.body.fecha, hora: req.body.hora })
            .eq('disponibilidad_id', req.body.disponibilidad_id)
            .eq('doctor_dpi', req.body.doctor_dpi);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar la disponibilidad' });
        }

        return res.json({ disponibilidad: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' })
    }
}

medicosController.deleteDisponibilidad = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('disponibilidad')
            .delete()
            .eq('disponibilidad_id', req.body.disponibilidad_id)
            .eq('doctor_dpi', req.body.doctor_dpi);

        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al eliminar la disponibilidad' });
        }

        return res.json({ disponibilidad: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' })
    }
}

medicosController.getPacientesMedico = async (req, res) => {
    try {
        const medicoDpi = req.params.dpi;

        // Paso 1: Obtener los tokens de los pacientes de las citas del médico
        const { data: citasData, error: citasError } = await supabase
            .from('cita')
            .select('pacientetoken')
            .eq('medicotoken', medicoDpi);

        if (citasError) {
            console.log(citasError);
            return res.status(500).json({ error: 'Error al obtener las citas del médico' });
        }

        if (!citasData || citasData.length === 0) {
            return res.status(404).json({ error: 'No se encontraron citas para este médico' });
        }

        // Paso 2: Obtener información de los pacientes
        const pacientesTokens = citasData.map(cita => cita.pacientetoken);
        const { data: pacientesData, error: pacientesError } = await supabase
            .from('paciente')
            .select('*')
            .in('dpi', pacientesTokens);

        if (pacientesError) {
            console.log(pacientesError);
            return res.status(500).json({ error: 'Error al obtener información de los pacientes' });
        }

        if (!pacientesData || pacientesData.length === 0) {
            return res.status(404).json({ error: 'No se encontraron pacientes para este médico' });
        }

        return res.json({ pacientes: pacientesData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


export default medicosController;
