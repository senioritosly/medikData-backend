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

async function checkAndUpdateAvailability() {
    try {
        const currentDateTime = new Date().toISOString();

        const { data: availabilityData, error: availabilityError } = await supabase
            .from('disponibilidad')
            .select('*');

        if (availabilityError) {
            throw availabilityError;
        }

        let availabilityUpdated = false;

        for (const availability of availabilityData) {
            // Combine the date and time fields into a single datetime
            const availabilityDateTime = new Date(availability.fecha + 'T' + availability.hora).toISOString();

            if (availability.estado === 'pendiente' && availabilityDateTime <= currentDateTime) {
                // If the availability is in the past, delete it
                const { error: deleteError } = await supabase
                    .from('disponibilidad')
                    .delete()
                    .match({ disponibilidad_id: availability.disponibilidad_id });

                if (deleteError) {
                    throw deleteError;
                }

                availabilityUpdated = true;
            }
        }

        if (availabilityUpdated) {
            console.log('Disponibilidad actualizada correctamente');
        } else {
            console.log('No hay disponibilidad por actualizar.');
        }
    } catch (error) {
        console.error('Error updating availability:', error);
    }
};




export { updateAppointmentsStatus, checkAndUpdateAvailability };
