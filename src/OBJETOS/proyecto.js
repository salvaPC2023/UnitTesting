import ArrayCommit from "./commitsArray";
import Puntaje from "./puntaje";
import path from "path";
import fs from "fs";
import Commit from "./commit";

class Proyecto {
    constructor(titulo) {
        this.titulo = titulo;
        this.arrayCommit = new ArrayCommit();
        this.puntaje = new Puntaje();
    }

    getArrayCommit() {
        return this.arrayCommit;
    }
    getTitulo() {
        return this.titulo;
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad, fecha) {
        this.arrayCommit.aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad, fecha);
    }

    mostrarCommits() {
        return this.arrayCommit.mostrarCommitCompleto();
    }

    eliminarUltimoCommit() {
        this.arrayCommit.eliminarUltimoCommit();
    }

    getPuntajePruebas() {
        let puntajePorcentaje = this.calcularPorcentajePruebas();
        this.puntaje.setPuntajePruebas(puntajePorcentaje);
        return this.puntaje.getPuntajePruebas();
    }

    getPuntajeLineasCodigo() {
        let puntajeLineasCodigo = this.calcularPuntajeLineasCodigo();
        this.puntaje.setPuntajeLineasCodigo(puntajeLineasCodigo);
        return this.puntaje.getPuntajeLineasCodigo();
    }

    getPorcentajeCobertura() {
        let porcentajeCobertura = this.calcularPorcentajeCobertura();
        this.puntaje.setPorcentajeCobertura(porcentajeCobertura);
        return this.puntaje.getPuntajeCobertura();
    }

    calcularPorcentajePruebas() {
        let totalPruebas = 0;
        let totalPruebasAprobadas = 0;
        let porcentaje = 0;

        if (this.arrayCommit.getCommits().length > 0) {
            for (let commit of this.arrayCommit.getCommits()) {
                totalPruebas += commit.getCantPruebas();
                totalPruebasAprobadas += commit.getCantPruebasAprob();
            }
            porcentaje = (totalPruebasAprobadas / totalPruebas) * 100;
        }
        return porcentaje;
    }

    calcularPuntajeLineasCodigo() {
        const commits = this.arrayCommit.getCommits();
        let puntaje = 100;
        let lineasAnteriores = 0;
        let contadorDisminucion = 0;

        for (let i = 0; i < commits.length; i++) {
            const commit = commits[i];
            const lineasActuales = commit.getCantLineas();

            if (lineasActuales < lineasAnteriores) {
                contadorDisminucion++;
            } else {
                contadorDisminucion = 0;
            }

            if (lineasActuales - lineasAnteriores > 30 && i != 0) {
                puntaje -= 20;
            } else {
                if (lineasActuales > lineasAnteriores && i != 0) {
                    puntaje += 5;
                }
            }

            if (contadorDisminucion >= 3) {
                puntaje -= 20;
                contadorDisminucion = 0;
            }

            lineasAnteriores = lineasActuales;
        }
        puntaje = Math.max(Math.min(puntaje, 100), 0);
        return puntaje;
    }

    calcularPorcentajeCobertura() {
        let totalPorcentajes = 0;
        let porcentaje = 0;
        let cantPorcentajes = 0;

        if (this.arrayCommit.getCommits().length > 0) {
            for (let commit of this.arrayCommit.getCommits()) {
                totalPorcentajes += commit.getCobertura();
                cantPorcentajes++;
            }
            porcentaje = (totalPorcentajes / cantPorcentajes);
        }
        return porcentaje;
    }

    ingresarCommitsPor(rutaArchivoTxt) {
        const archivoTxt = fs.readFileSync(path.join(__dirname, rutaArchivoTxt), 'utf8').trim();
        if (archivoTxt.length === 0) {
            return "Archivo vacio";
        }

        const lines = archivoTxt.split('\n');
        for (let line of lines) {
            const [id, fechaHora, cantPruebas, cantLineas, cobertura, complejidad] = line.split(',').map(item => item.trim());
            const nuevoCommit = new Commit(Number(cantPruebas), Number(cantLineas), Number(cobertura), String(complejidad), String(fechaHora), Number(id));
            this.arrayCommit.aniadirCommitObj(nuevoCommit);
        }
        return "Archivo leido";
    }

    ingresarCommitsPorContenidoDe(ArchivoTxt) {
        const archivoTxt = ArchivoTxt.trim(); // Usar el contenido del archivo en lugar de leerlo de nuevo
        if (archivoTxt.length === 0) {
            return "Archivo vacio";
        }

        const lines = archivoTxt.split('\n');
        for (let line of lines) {
            const [id, fechaHora, cantPruebas, cantLineas, cobertura, complejidad] = line.split(',').map(item => item.trim());
            const nuevoCommit = new Commit(Number(cantPruebas), Number(cantLineas), Number(cobertura), String(complejidad), String(fechaHora), Number(id));
            this.arrayCommit.aniadirCommitObj(nuevoCommit);
        }
        return "Archivo leido";
    }

    ///////////////////////////////////////
    objeterPuntajes(porcentajePruebasNuevas) {
        if (porcentajePruebasNuevas === 100)
            return 20;
        else if (porcentajePruebasNuevas < 100 && porcentajePruebasNuevas >= 80)
            return 16;
        else
            return 12;
    }

    tieneCommits(arrayCommit) {
        return arrayCommit.getCommits().length !== 0;
    }

    calcularPorcentaje(arrayCommit) {
        let contCommitsPruebas = 0;
        let totalPruebas = 0;
        for (let commit of arrayCommit.getCommits()) {
            if (commit.getCantPruebas() > 0)
                contCommitsPruebas++;
            totalPruebas++;
        }
        return (contCommitsPruebas / totalPruebas) * 100;
    }

    getPuntajeCantPruebas(arrayCommit) {
        if (this.tieneCommits(arrayCommit)) {
            return this.objeterPuntajes(this.calcularPorcentaje(arrayCommit));
        } else
            return 8;
    }

    objeterPuntajesCantLineas(promedioLineas) {
        if (promedioLineas < 20)
            return 20;
        else if (promedioLineas < 40 && promedioLineas >= 20)
            return 16;
        else
            return 12;
    }

    calcularPromedioLineas(arrayCommit) {
        let totalLineas = 0;
        for (let commit of arrayCommit.getCommits()) {
            totalLineas += commit.getCantLineas();
        }
        return totalLineas / arrayCommit.getCommits().length;
    }

    getPuntajeCantLineas(arrayCommit) {
        if (this.tieneCommits(arrayCommit)) {
            return this.objeterPuntajesCantLineas(this.calcularPromedioLineas(arrayCommit));
        } else {
            return 8;
        }
    }

    objeterPuntajesCobertura(promedioCobertura) {
        if (promedioCobertura > 90)
            return 20;
        else if (promedioCobertura <= 90 && promedioCobertura >= 80)
            return 16;
        else if (promedioCobertura < 80 && promedioCobertura >= 70)
            return 12;
        else
            return 8;
    }

    calcularPromedioCobertura(arrayCommit) {
        let totalCobertura = 0;
        let totalCommits = arrayCommit.getCommits().length;

        for (let commit of arrayCommit.getCommits()) {
            totalCobertura += commit.getCobertura();
        }

        return totalCobertura / totalCommits;
    }

    getPuntajeCobertura(arrayCommit) {
        if (this.tieneCommits(arrayCommit)) {
            return this.objeterPuntajesCobertura(this.calcularPromedioCobertura(arrayCommit));
        } else
            return 8;
    }

    getPuntajeComplejidad(arrayCommit) {
        if (this.tieneCommits(arrayCommit)) {
            const promedioComplejidad = this.calcularPromedioComplejidad(arrayCommit);

            return this.asignarPuntajeComplejidad(promedioComplejidad);
        } else {
            return 8;
        }
    }

    calcularPromedioComplejidad(arrayCommit) {
        const complejidades = arrayCommit.getCommits().map(commit => {
            switch (commit.getComplejidad().toLowerCase()) {
                case 'excelente':
                    return 1;
                case 'bueno':
                    return 2;
                case 'regular':
                    return 3;
                case 'deficiente':
                    return 4;
            }
        });

        const sumaComplejidad = complejidades.reduce((acc, complejidad) => acc + complejidad, 0);
        return sumaComplejidad / complejidades.length;
    }

    asignarPuntajeComplejidad(promedioComplejidad) {
        if (promedioComplejidad <= 1.5) return 20;
        if (promedioComplejidad <= 2.5) return 16;
        if (promedioComplejidad <= 3.5) return 12;
        return 8;
    }

    //////////////////////////////////////////////////////////
    getPuntajeFrecuenciaCommits(arrayCommit) {
        const frecuencia = arrayCommit.calcularPromedioFrecuenciaCommits();
        return this.asignarPuntajeFrecuencia(frecuencia);
    }

    asignarPuntajeFrecuencia(frecuencia) {
        switch (frecuencia) {
            case "Excelente":
                return 20;
            case "Bueno":
                return 16;
            case "Regular":
                return 12;
            case "Deficiente":
            default:
                return 8;
        }
    }

    obterPuntuacionTexto(puntuacion) {
        if (puntuacion === 20) {
            return "Excelente";
        } else if (puntuacion === 16) {
            return "Bueno";
        } else if (puntuacion === 12) {
            return "Regular";
        } else {
            return "Deficiente";
        }
    }

    obtenerPuntuacionTotalProyecto(){
        if( this.tieneCommits(this.arrayCommit) ){
            let total = this.getPuntajeCantPruebas(this.arrayCommit) + this.getPuntajeCantLineas(this.arrayCommit) + this.getPuntajeCobertura(this.arrayCommit) + this.getPuntajeFrecuenciaCommits(this.arrayCommit) + this.getPuntajeComplejidad(this.arrayCommit);
            return total;
        }
        return 0;
    }
}
export default Proyecto;
