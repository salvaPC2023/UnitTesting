class Puntaje {
    constructor() {
        this.puntajePruebas = 0;
        this.puntajeLineas = 100;
        this.puntajeCobertura = 0;
    }

    getPuntajePruebas() {
        return this.puntajePruebas;
    }
    setPuntajePruebas(puntaje) {
        this.puntajePruebas = puntaje;
    }
    getPuntajeLineasCodigo() {
        return this.puntajeLineas;
    }
    setPuntajeLineasCodigo(puntajel) {
        this.puntajeLineas = puntajel;
    }
    setPorcentajeCobertura(porcentaje) {
        this.puntajeCobertura = porcentaje;
    }
    getPuntajeCobertura() {
        return this.puntajeCobertura;
    }
}

export default Puntaje;
