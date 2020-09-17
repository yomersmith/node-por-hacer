const argv = require('./config/yargs').argv;
const { crear, getListado, actualizar, borrar } = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);

        break;
    case 'listar':
        let listado = getListado();
        if (listado.length != 0) {
            console.log(`================ ${colors.inverse('POR HACER')} ================`.green);
            for (const tarea of listado) {

                console.log(`tarea : ${colors.gray(tarea.descripcion)}`);
                console.log(`Estado: ${colors.red(tarea.completado)}`);

            }
            console.log('==========================================='.green);
        } else {

        }
        break;
    case 'actualizar':
        actualizar(argv.descripcion, argv.completado == 'true');
        break;
    case 'borrar':
        borrar(argv.descripcion);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}