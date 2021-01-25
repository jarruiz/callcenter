const Employees = require('./employe.js');
const Feature = require('./feature.js');
const listEmpl = require('../data/empleados.js')
const enablesEmployes = require('../models/employees.js')();


module.exports =  class Dispacher{
    constructor(idllamada, numero){
        this.id = idllamada;
        this.number = numero;

    }

    dispatchCall(calls){

        console.log("Recibiendo ", calls.length + " llamada(s)");

        let enablesEmployes = listEmpl();

        //console.log("Actual Valor de enablesEmployes: ", enablesEmployes)
        let contCall = 0
        for( let cont = 0 ; cont < calls.length ; cont ++){
            console.log("====================================================================================")
            let feat = new Feature()
            let call = calls[cont];
            this.id = cont+1;
            this.number = call.numero;
            contCall ++

            console.log("llamada actual", call.numero);

            /*Limitamos la cantidad de llamadas a ser atendidas*/
            if( contCall < 11  ){

                /*Se verifica de los empleados cuales son operadores y selecciona el primero que esté disponible*/
                let SelectEmploye = searchArrayEmployees(enablesEmployes, "operador");

                if( SelectEmploye[0] !== undefined ) {
                    /*Si recibimos datos editamos el estado del operador a 'ocupado'
                     para que no se elegido nuevemente hasta que culmine la llamada'*/
                    console.log("Valor de Operador seleccionado: ", SelectEmploye);
                    enablesEmployes = editArrayEmployees(enablesEmployes, SelectEmploye[0].id, 'ocupado' )
                    /*preparamos los datos para enviarlo al método emplOperator de la clase Employees*/
                    let employ = new Employees(SelectEmploye[0].id, SelectEmploye[0].name, SelectEmploye[0].lastname, SelectEmploye[0].typeEmploye, SelectEmploye[0].stated)
                    console.log("Direccionando llamada número: ", this.id + " al "+ SelectEmploye[0].typeEmploye +": "+ SelectEmploye[0].name + " " + SelectEmploye[0].lastname)
                    employ.emplOperator(this.id, this.number);
                    //break;
                }else{
                    /*Si no encontramos datos de operadores buscamos los supervisores disponibles*/
                    console.log("No hay operadores disponibles")
                    let SelectEmploye = searchArrayEmployees(enablesEmployes, "supervisor");
                    console.log("Valor de Operador seleccionado: ", SelectEmploye)
                    if( SelectEmploye[0] !== undefined ) {
                        /*Si recibimos datos editamos el estado del Supervidor a 'ocupado'
                         para que no se elegido nuevemente hasta que culmine la llamada'*/
                        enablesEmployes = editArrayEmployees(enablesEmployes, SelectEmploye[0].id, 'ocupado' )
                        /*preparamos los datos para enviarlo al método emplSupervisor de la clase Employees*/
                        let employ = new Employees(SelectEmploye[0].id, SelectEmploye[0].name, SelectEmploye[0].lastname, SelectEmploye[0].typeEmploye, SelectEmploye[0].stated)
                        console.log("Direccionando llamada número: ", this.id + " al "+ SelectEmploye[0].typeEmploye +": "+ SelectEmploye[0].name + " " + SelectEmploye[0].lastname)
                        employ.emplSupervisor(this.id, this.number);
                        //break;
                    }else{
                        /*Si no encontramos datos de supervisores buscamos los directivos disponibles*/
                        console.log("No hay Supervisores disponibles")
                        let SelectEmploye = searchArrayEmployees(enablesEmployes, "director");
                        console.log("Valor de Operador seleccionado: ", SelectEmploye);
                        if( SelectEmploye !== undefined ) {
                            /*
                            Si recibimos datos editamos el estado del Director a 'ocupado'
                            para que no se elegido nuevemente hasta que culmine la llamada'*/
                            enablesEmployes = editArrayEmployees(enablesEmployes, SelectEmploye[0].id, 'ocupado' )
                            /*preparamos los datos para enviarlo al método emplPrincipal de la clase Employees*/
                            let employ = new Employees(SelectEmploye[0].id, SelectEmploye[0].name, SelectEmploye[0].lastname, SelectEmploye[0].typeEmploye, SelectEmploye[0].stated)
                            console.log("Direccionando llamada número: ", this.id + " al "+ SelectEmploye[0].typeEmploye +": "+ SelectEmploye[0].name + " " + SelectEmploye[0].lastname)
                            employ.emplPrincipal(this.id, this.number);
                            break;
                        }else {
                            /*
                            Si no encontramos datos de supervisores entonces enviamos a una
                            cola de espera para que sean atendidos una vez que haya una operador disponibles
                            */
                            feat.redirectIVR()
                            //break;
                        }
                    }
                }

                //console.log("Valor actual de enablesEmployes: ", enablesEmployes);

            }else{
                /*
                Si se llega al total de llamadas que pueden ser atendida se envía el
                resto de las llamadas a una cola de espera */
                feat.redirectIVR(this.id)
            }
        }
    }
}


/*
funciones adicionales para manejar los array de los empleados
*/

/*función de búsqueda de empleado según su atributo typeEmploye */
function searchArrayEmployees(arrayEmploy, typoEml){
    console.log("Tipos de Empleados a buscar: ", typoEml)
    let datoEle = []

    let newArrar = arrayEmploy.map(function (dato) {
        if (dato.typeEmploye == typoEml  ) {
            let nuevo = dato
            return nuevo
        }
    });

    for( let i = 0 ; i < newArrar.length; i++){
        let n = newArrar[i]
        //console.log("Valor de n: ", n);
        if(n !== undefined && n.stated == 'disponible' ){
            datoEle.push(n)
            break;
        }
    }

    //console.log("Aray recibido: ", datoEle);

    return datoEle
}

/*Función de edición del array de empleados para cambiar su estado a 'ocupado'*/
function editArrayEmployees(arrayEmploy, idEmploy, newStated){
    var newArrar = arrayEmploy.map(function(dato){
        if(dato.id == idEmploy ){
            dato.stated = newStated;
        }
        return dato;
    });
    return newArrar
}


