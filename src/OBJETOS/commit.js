
class Commit {
    constructor(cantPruebas, cantLineas, cobertura, complejidad, fechaHora, idCommit) {
        this.cantPruebas = cantPruebas;
        this.cantLineas = cantLineas;
        this.cobertura = cobertura;
        this.complejidad = complejidad;
        this.cantPruebasAprob = 0;
        this.recomendacion = "";
        this.fechaHora = fechaHora;
        this.frecuencia = "Regular";
        this.id = idCommit;
    }               

    getId(){
        return this.id;
    }

    getCantPruebas() {
        return this.cantPruebas;
    }

    getCantLineas() {
        return this.cantLineas;
    }

    getCobertura() {
        return this.cobertura;
    }

    getComplejidad() {
        return this.complejidad;
    }

    setPruebasAprob(cantidad) {
        this.cantPruebasAprob = cantidad;
    }

    getCantPruebasAprob() {
        return this.cantPruebasAprob;
    }

    getRecomendacion() {
        return this.generarRecomendacion();
    }

    getFechaHora() {
        return this.fechaHora;
    }

    setFechaHora(fechaHora) {
        this.fechaHora = fechaHora;
    }

    generarRecomendacion() {
        let puntaje_provisional = this.cantPruebasAprob / this.cantPruebas;
        if (puntaje_provisional == 1) {
            this.recomendacion += "Buen trabajo en las pruebas aprobadas. ";
        } else {
            if (puntaje_provisional >= 0.6) {
                this.recomendacion += "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. ";
            } else {
                this.recomendacion += "Se recomienda mejorar la cantidad de pruebas aprobadas. ";
            }
        }

        if (this.cantLineas > 500) {
            this.recomendacion += "El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
        } else {
            if (this.cantLineas > 100) {
                this.recomendacion += "Buen manejo de la cantidad de líneas de código. ";
            }
        }

        if (this.cobertura < 70) {
            this.recomendacion += "La cobertura de código es baja, considera añadir más pruebas.";
        }

        return this.recomendacion;
    }

    editarCantPruebas(newCantPruebas) {
        this.cantPruebas = newCantPruebas;
    }

    editarCantLineas(newCantLineas) {
        this.cantLineas = newCantLineas;
    }

    editarCobertura(newCobertura) {
        this.cobertura = newCobertura;
    }

    editarComplejidad(newComplejidad) {
        this.complejidad = newComplejidad;
    }

    editarFechaHora(newFechaHora) {
        this.fechaHora = newFechaHora;
    }

    setFrecuencia(frecuencia) {
        this.frecuencia = frecuencia;
    }

    getFrecuencia() {
        return this.frecuencia;
    }



}
export default Commit;
