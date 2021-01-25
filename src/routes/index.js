/*definición de las rutas*/
const express = require('express');
const router = express.Router();
const Dispacher = require('../controllers/dispacher.js');
//const emp = require('../models/employees.js')();


/*Definiendo la ruta inicial*/

router.get('/', (req, res) =>{

    let response = {
        error: false,
        codigo: 200,
        titulo : "CallCenter Sura",
        mensaje: "Esperando llamadas"
    };
    res.send(response);
})

router.post('/callIn', (req, res) =>{
    let llamada = new Dispacher();
    let response
    if( req.body[0] === undefined  ) {
        response = {
            error: true,
            codigo: 502,
            mensaje: 'El campo número es requeridos'
        }
    }else if ( !req.body[0].numero ){
        response = {
            error: true,
            codigo: 502,
            mensaje: 'El campo número es requeridos'
        }
    }else{
        response = {
            error: false,
            codigo: 200,
            mensaje: 'Llamadas atendidas satisfactoriamente'
        };
        let item = req.body
        llamada.dispatchCall(item);
    }

    console.log(response)
    res.send(response)


})
module.exports = router;