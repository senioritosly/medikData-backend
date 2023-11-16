import supabase from "./database.js";



async function updateAppointmentsStatus() {
    try {
        const currentDateTime = new Date().toISOString();

        // Seleccionar citas cuya fecha haya pasado y cuyo estado sea 'pendiente'
        const { data, error } = await supabase
            .from('cita')
            .select('*') // Selecciona todos los campos necesarios
            .lte('fecha', currentDateTime) // Menor o igual a la fecha y hora actual
            .eq('estado', 'pendiente'); // Selecciona solo citas pendientes

        if (error) {
            throw error;
        }

        if (data && data.length > 0) {
            // Actualizar cada cita pendiente a 'realizado'
            for (const cita of data) {
                const { error } = await supabase
                    .from('cita')
                    .update({ estado: 'realizada' })
                    .eq('citasid', cita.citasid);

                if (error) {
                    throw error;
                }
            }
            console.log(`Actualizadas ${data.length} citas a 'realizada' a las ${new Date().toISOString()}`);
        } else {
            console.log('No hay citas pendientes para actualizar.');
        }
    } catch (error) {
        console.error('Error durante la actualización de citas:', error);
    }
}

export { updateAppointmentsStatus };
