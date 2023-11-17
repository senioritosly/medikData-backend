import app from "./app.js"
import dotenv from 'dotenv'
import cron from 'node-cron';
import { updateAppointmentsStatus, checkAndUpdateAvailability } from './scheduledTasks.js';
dotenv.config();

console.log('Ejecutando las tareas programadas al iniciar el servidor');
updateAppointmentsStatus();
checkAndUpdateAvailability();


cron.schedule('0 * * * *', () => {
    console.log('Actualizando citas cada hora en punto');
    scheduledTasks.updateAppointmentsStatus();
    console.log('Actualizando disponibilidad cada hora en punto');
    scheduledTasks.checkAndUpdateAvailability();
});

const port = process.env.PORT || 8080;
const main = async () => {
    await app.listen(port, () => {
        console.log(`server has started on port ${port}`);
    });
}

main()
