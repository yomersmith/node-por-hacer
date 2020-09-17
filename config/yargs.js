const descripcion = {
    alias: 'd',
    demand: true,
    desc: "Descripcion de la tarea por hacer"
};

const completado = {
    alias: 'c',
    desc: "Marca como completado o pentiente la tarea"
};
const argv = require('yargs')
    //.command('listar', 'Lista las tareas por hacer', opciones)
    .command('crear', 'Crea item en la lista por hacer', {
        descripcion
    })
    .command('borrar', 'Elimina un item en la lista por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza un item en la lista por hacer', {
        descripcion,
        completado
    })
    .command('listar', 'Consulta las tareas por hacer')
    .help()
    .argv;

module.exports = {
    argv
}