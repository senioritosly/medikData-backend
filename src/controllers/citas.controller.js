import supabase from "../database.js";
import  crearPDF  from '../pdfGenerator.js';

const listadoCitas = {}

listadoCitas.getCitas = async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('cita')
        .select('citasid, paciente(full_name), medico(full_name), clinica(nombre), fecha, hora, estado')
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

listadoCitas.getCitasMedicos = async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('cita')
        .select('citasid, paciente(full_name), medico(full_name), clinica(nombre), fecha, hora, estado')
        .eq('medicotoken', req.params.medicotoken)
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

listadoCitas.getClinicaDeCitaPendiente = async (req, res) => {
    try {
        const { data: citasPendientes, error: errorCitas } = await supabase
            .from('cita')
            .select('clinicatoken')
            .eq('pacientetoken', req.params.pacientetoken);

        if (errorCitas) {
            console.log(errorCitas);
            return res.status(500).json({ error: 'Error al obtener citas pendientes' });
        }

        if (!citasPendientes || citasPendientes.length === 0) {
            return res.status(404).json({ mensaje: 'No hay citas pendientes para este paciente' });
        }

        const clinicatokens = citasPendientes.map(cita => cita.clinicatoken);

        const { data: clinicas, error: errorClinicas } = await supabase
            .from('clinica')
            .select('id_clinica, direccion, telefono, nombre')
            .in('id_clinica', clinicatokens);

        if (errorClinicas) {
            console.log(errorClinicas);
            return res.status(500).json({ error: 'Error al obtener información de clínicas' });
        }

        return res.json({ clinicas: clinicas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
}

listadoCitas.getDoctoresConCitasPendientes = async (req, res) => {
    try {
        const { clinicatoken, pacientetoken } = req.params;

        // Obtener citas pendientes del paciente para la clínica específica
        const { data: citasPendientes, error: errorCitas } = await supabase
            .from('cita')
            .select('medicotoken')
            .eq('clinicatoken', clinicatoken)
            .eq('pacientetoken', pacientetoken);

        if (errorCitas) {
            console.log(errorCitas);
            return res.status(500).json({ error: 'Error al obtener citas pendientes' });
        }

        if (!citasPendientes || citasPendientes.length === 0) {
            return res.status(404).json({ mensaje: 'No hay citas pendientes para este paciente en esta clínica' });
        }

        const medicotokens = citasPendientes.map(cita => cita.medicotoken);

        // Obtener información de los doctores con medicotoken obtenidos
        const { data: doctores, error: errorDoctores } = await supabase
            .from('medico')
            .select('dpi, full_name, especialidad, telefono')
            .in('dpi', medicotokens);

        if (errorDoctores) {
            console.log(errorDoctores);
            return res.status(500).json({ error: 'Error al obtener información de doctores' });
        }

        return res.json({ doctores: doctores });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};



listadoCitas.getCitasPorPacienteYMedico = async (req, res) => {
    try {
        const pacientetoken = req.params.pacientetoken;
        const medicotoken = req.params.medicotoken;

        // Obtener citas basadas en el DPI del paciente y el token del médico
        const { data: citasData, error: citasError } = await supabase
            .from('cita')
            .select('citasid, paciente(full_name), medico(full_name), clinica(nombre), fecha, hora, estado')
            .eq('pacientetoken', pacientetoken)
            .eq('medicotoken', medicotoken)
            .eq('estado', 'pendiente');

        if (citasError) {
            console.log(citasError);
            return res.status(500).json({ error: 'Error al obtener citas' });
        }

        if (!citasData || citasData.length === 0) {
            return res.status(404).json({ error: 'No se encontraron citas con los criterios especificados' });
        }

        // Opcional: Obtener información adicional de médicos y clínicas si es necesario
        // ...

        return res.json({ citas: citasData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

listadoCitas.getCitaCompleta = async (req, res) => {
    try {
        // Obtener información de la cita
        const { citasid } = req.params;
        const { data: citaData, error: citaError } = await supabase
            .from('cita')
            .select('*')
            .eq('citasid', citasid)
            .single();

        if (citaError || !citaData) {
            console.log(citaError);
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        if (citaData.estado !== 'realizada') {
            return res.status(400).json({ error: 'La cita no está realizada' });
        }

        // Obtener información del paciente
        const { data: pacienteData, error: pacienteError } = await supabase
            .from('paciente')
            .select('*')
            .eq('dpi', citaData.pacientetoken)
            .single();

        // Obtener información del médico
        const { data: medicoData, error: medicoError } = await supabase
            .from('medico')
            .select('full_name, especialidad, numerocolegiado, telefono, correo')
            .eq('dpi', citaData.medicotoken)
            .single();

        // Obtener información de la clínica
        const { data: clinicaData, error: clinicaError } = await supabase
            .from('clinica')
            .select('direccion, telefono, nombre')
            .eq('id_clinica', citaData.clinicatoken)
            .single();

        // Obtener diagnóstico
        const { data: diagnosticoData, error: diagnosticoError } = await supabase
            .from('diagnostico')
            .select('*')
            .eq('citaid', citasid)
            .single();


        // Compilar toda la información
        const pdfStream = crearPDF({
            cita: citaData,
            paciente: pacienteData,
            medico: medicoData,
            clinica: clinicaData,
            diagnostico: diagnosticoData
        });

        // Establecer el tipo de contenido de la respuesta
        res.setHeader('Content-Type', 'application/pdf');

        // Enviar el stream del PDF como respuesta
        pdfStream.pipe(res);
        pdfStream.end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};




export default listadoCitas
