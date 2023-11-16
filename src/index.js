import app from "./app.js"
import dotenv from 'dotenv'
import cron from 'node-cron';
import { updateAppointmentsStatus } from './scheduledTasks.js';
dotenv.config();

console.log('Ejecutando la tarea de actualización de citas al iniciar la aplicación');
updateAppointmentsStatus();

cron.schedule('0 * * * *', () => {
    console.log('Actualizando citas cada hora en punto');
    scheduledTasks.updateAppointmentsStatus();
});

const port = process.env.PORT || 8080;
const main = async () => {
    await app.listen(port, () => {
        console.log(`server has started on port ${port}`);
    });
}

main()
