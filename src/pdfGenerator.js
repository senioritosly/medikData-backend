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

    const pdfPrinter = new PdfPrinter(fonts);

    const docDefinition = {
        content: [
            {   
                columns: [
                {
                image: path.join(__dirname, './assets/logoMedicData.png'),
                width: 100,
                alignment: 'left',
                margin: [0, 0, 0, 20] // Agrega un margen inferior al logo
                },
                {
                    // Textos de Clínica y Dirección alineados a la derecha
                    width: '*',
                    text: [
                        { text: `Clínica: ${datos.clinica.nombre}\n`, bold: true },
                        { text: `Dirección: ${datos.clinica.direccion}`, bold: true }
                    ],
                    alignment: 'right',
                    margin: [0, 0, 0, 20]
                }
                ]
            },
            { text: 'Informe Médico', style: 'header' },
            '\n',
            { 
                table: {
                    widths: ['*'], // Esto asegura que la tabla ocupe el 100% del ancho
                    body: [
                        [{ text: 'Datos del Médico:', style: 'subheader' }],
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex === 0) ? '#06316B' : null; // Color de fondo para el encabezado
                    }
                }
            },
            `Nombre: ${datos.medico.full_name}`,
            `Especialidad: ${datos.medico.especialidad}`,
            `Número Colegiado: ${datos.medico.numerocolegiado}`,
            `Teléfono: ${datos.medico.telefono}`,
            `Correo Electrónico: ${datos.medico.correo}`,
            '\n',
            { 
                table: {
                    widths: ['*'], // Esto asegura que la tabla ocupe el 100% del ancho
                    body: [
                        [{ text: 'Datos de la Cita:', style: 'subheader' }],
                        // ... Cuerpo de la sección de datos de la cita
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex === 0) ? '#06316B' : null; // Color de fondo para el encabezado
                    }
                }
             },
            `Fecha: ${datos.cita.fecha}`,
            `Hora: ${datos.cita.hora}`,
            `Estado: ${datos.cita.estado}`,
            '\n',
            {
                table: {
                    widths: ['*'], // Esto asegura que la tabla ocupe el 100% del ancho
                    body: [
                        [{ text: 'Datos del Paciente:', style: 'subheader' }],
                        // ... Cuerpo de la sección de datos de la cita
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex === 0) ? '#06316B' : null; // Color de fondo para el encabezado
                    }
                }
            },
            `Nombre: ${datos.paciente.full_name}`,
            `DPI: ${datos.paciente.dpi}`,
            `Altura: ${datos.paciente.altura} cm`,
            `Peso: ${datos.paciente.peso} kg`,
            `Fecha de Nacimiento: ${datos.paciente.nacimiento}`,
            `Tipo de Sangre: ${datos.paciente.tipo_sangre}`,
            `Sexo: ${datos.paciente.sexo}`,
            `Correo Electrónico: ${datos.paciente.correo}`,
            '\n',
            { 
                table: {
                    widths: ['*'], // Esto asegura que la tabla ocupe el 100% del ancho
                    body: [
                        [{ text: 'Datos de la Clínica:', style: 'subheader' }],
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex === 0) ? '#06316B' : null; // Color de fondo para el encabezado
                    }
                }
            },
            `Nombre: ${datos.clinica.nombre}`,
            `Dirección: ${datos.clinica.direccion}`,
            `Teléfono: ${datos.clinica.telefono}`,
            '\n',
            { 
                table: {
                    widths: ['*'], // Esto asegura que la tabla ocupe el 100% del ancho
                    body: [
                        [{ text: 'Diagnóstico:', style: 'subheader' }],
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex === 0) ? '#06316B' : null; // Color de fondo para el encabezado
                    }
                }
                 },
            `${datos.diagnostico.diagnostico}`,
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                color: '#06316B'
            },
            subheader: {
                fontSize: 15,
                bold: true,
                color: '#ffffff',
            }
        }
    };

    const pdfDoc = pdfPrinter.createPdfKitDocument(docDefinition);

    return pdfDoc;
}

export default crearPDF;