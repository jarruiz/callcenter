

/*Esta clase contiene todos los métodos disponbles que puedes hacer la central*/
module.exports = class CallCenterFeature{
    constructor(idEmploye, statedEmploy, idCall, numberCall){
        this.idEmploye = idEmploye;
        this.statedEmploy = statedEmploy;
        this.idCall = idCall;
        this.numberCall =numberCall;
    }

    /*Método que permite contestar una llamada recibida*/
    takeCall(){

        let idCall = this.idCall;
        let numberCall = this.numberCall;

        console.log("Soy Empleado: "+  this.idEmploye )
        console.log("Estoy atendiendo la Llamada id:" + idCall + " numero: "+ this.numberCall)

        console.log("====================================================================================")
        /*Se simulas tiempo de duración de la llamada*/
        let intervalX = 5000;
        let intervalY = 10000;
        var NumAle = Math.floor(Math.random()*(intervalY-intervalX))+intervalX


        setTimeout(func, NumAle);
        function func() {
            console.log("====================================================================================")
            console.log("Llamada id:" + idCall + " numero: "+ numberCall +" atendida");
            console.log("====================================================================================")
            return
        }
    }

    redirectIVR(){
        console.log("Todos los Operdadores se encuentran ocupados, su llamada será atendida a la breveda, espere en línea")
    }


}
