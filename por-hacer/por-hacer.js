const fs = require('fs');



let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    return new Promise((resolve, reject) => {

        fs.writeFile(`db/data.json`, data, (err) => {
            if (err)
                reject(err);
            else
                resolve(`Registro exitoso`);
        });

    });


}

const leerDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = []
    }

}


const crear = (descripcion) => {
    leerDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB()
        .then(msj => console.log(msj))
        .catch(err => console.log(`Se registro un error al momento de guardar el archivo ${err}`));
    return listadoPorHacer;
}

const getListado = () => {
    leerDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado) => {

    leerDB();

    if (listadoPorHacer.length != 0) {
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        console.log(index);

        if (index >= 0) {
            console.log(`Antes > listdoporhacer: ${listadoPorHacer[index].completado}  - completado:   ${completado}`);

            listadoPorHacer[index].completado = completado;
            console.log(`Despues > listdoporhacer: ${listadoPorHacer[index].completado}  - completado:   ${completado}`);


            guardarDB()
                .then(msj => console.log(`${msj} - Se actulizo el archivo con las actividades`))
                .catch(err => console.log(`Se registro un error al momento de Actualizar el archivo ${err}`));
        } else {
            console.log('No se encontro coincidencias en la busqueda para actualizar');

        }

    } else {
        console.log('No hay registros para actualizar');

    }
}

const borrar = (desc) => {
    leerDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === desc);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB()
            .then(msj => console.log(`${msj} - Se elimino de forma exitosa el registro`))
            .catch(err => console.log(`Se registra un error al momento de Actualizar el archivo ${err}`));

    } else {

        return `No se encontro el Registro solicitado para Eliminar`;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}