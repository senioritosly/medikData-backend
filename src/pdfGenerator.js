import PdfPrinter from 'pdfmake';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function crearPDF(datos) {
    const fonts = {
        Roboto: {
            normal: path.join(__dirname, './fonts/Roboto-Regular.ttf'),
            bold: path.join(__dirname, './fonts/Roboto-Medium.ttf'),
            italics: path.join(__dirname, './fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname, './fonts/Roboto-MediumItalic.ttf')
        }
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition = {
        content: [
            { text: 'Detalle de la Cita Médica', style: 'header' },
            '\n',
            { text: 'Datos de la Cita:', style: 'subheader' },
            `ID de la Cita: ${datos.cita.citasid}`,
            `Fecha: ${datos.cita.fecha}`,
            `Hora: ${datos.cita.hora}`,
            `Estado: ${datos.cita.estado}`,
            '\n',
            { text: 'Datos del Paciente:', style: 'subheader' },
            `Nombre: ${datos.paciente.full_name}`,
            `DPI: ${datos.paciente.dpi}`,
            `Altura: ${datos.paciente.altura} cm`,
            `Peso: ${datos.paciente.peso} kg`,
            `Fecha de Nacimiento: ${datos.paciente.nacimiento}`,
            `Tipo de Sangre: ${datos.paciente.tipo_sangre}`,
            `Sexo: ${datos.paciente.sexo}`,
            `Correo Electrónico: ${datos.paciente.correo}`,
            '\n',
            { text: 'Datos del Médico:', style: 'subheader' },
            `Nombre: ${datos.medico.full_name}`,
            `Especialidad: ${datos.medico.especialidad}`,
            `Número Colegiado: ${datos.medico.numerocolegiado}`,
            `Teléfono: ${datos.medico.telefono}`,
            `Correo Electrónico: ${datos.medico.correo}`,
            '\n',
            { text: 'Datos de la Clínica:', style: 'subheader' },
            `Nombre: ${datos.clinica.nombre}`,
            `Dirección: ${datos.clinica.direccion}`,
            `Teléfono: ${datos.clinica.telefono}`,
            '\n',
            { text: 'Diagnóstico:', style: 'subheader' },
            `${datos.diagnostico.diagnostico}`,
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center'
            },
            subheader: {
                fontSize: 15,
                bold: true
            }
        }
    };

    const pdfPrinter = new PdfPrinter(fonts);
    const pdfDoc = pdfPrinter.createPdfKitDocument(docDefinition);

    // No escribe el PDF en el sistema de archivos, solo devuelve el stream
    return pdfDoc;
}


export  default crearPDF
