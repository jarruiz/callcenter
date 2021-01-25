const Feature = require('./feature.js');

module.exports =  class Employees {
    constructor(id , nombre, apellido, tipoEmpleado, estado) {
        this.id = id;
        this.name = nombre;
        this.lastname = apellido;
        this.typeEmploye = tipoEmpleado;
        this.stated = estado;
    }

    /*Métodos del operador*/
    emplOperator(isCallAct, numberCall){
        console.log("Soy Empleado: "+ this.name +" "+ this.lastname  +", Cargo: "+ this.typeEmploye + ", stated : "+ this.stated + ", atendiendo la llamada id: "+ isCallAct + ", numero : "+ numberCall)
        let feat = new Feature(this.id, this.stated, isCallAct, numberCall)

        /*Un vez el operador le asigana la llamada se procede a atenderla*/
        feat.takeCall();

        return
    }

    /*Métodos del supervisor*/
    emplSupervisor(isCallAct, numberCall){
        console.log("Soy Empleado: "+ this.name +" "+ this.lastname  +", Cargo: "+ this.typeEmploye + ", stated : "+ this.stated + ", atendiendo la llamada id: "+ isCallAct + ", numero : "+ numberCall)
        let feat = new Feature(this.id, this.stated, isCallAct, numberCall)

        /*Un vez el supervisor le asigana la llamada se procede a atenderla*/
        feat.takeCall()

        return
    }

    /*Métodos del director*/
    emplPrincipal(isCallAct, numberCall){
        console.log("Soy Empleado: "+ this.name +" "+ this.lastname  +", Cargo: "+ this.typeEmploye + ", stated : "+ this.stated + ", atendiendo la llamada id: "+ isCallAct + ", numero : "+ numberCall)
        let feat = new Feature(this.id, this.stated, isCallAct, numberCall)

        /*Un vez el director le asigana la llamada se procede a atenderla*/
        feat.takeCall()

        return
    }
}

