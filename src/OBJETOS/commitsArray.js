import Commit from "./commit";

class ArrayCommit {
    constructor() {
        this.arrayCommit = [];
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad, fecha, id) {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura, complejidad, fecha, id);
        this.arrayCommit.push(nuevoCommit);

    }

    aniadirCommitObj(Commit) {
        this.arrayCommit.push(Commit);
    }


    mostrarCommitCompleto() {
        return this.arrayCommit.map(commit => ({
            idCommit: commit.getId(),
            fechaHora: commit.getFechaHora(),
            cantPruebas: commit.getCantPruebas(),
            cantLineas: commit.getCantLineas(),
            cobertura: commit.getCobertura(),
            complejidad: commit.getComplejidad(),
            recomendacion: commit.getRecomendacion(),
            frecuencia: commit.getFrecuencia(),
        }));
    }

    eliminarUltimoCommit() {
        if (this.arrayCommit.length > 0) {
            this.arrayCommit.pop();
        }
        return this.arrayCommit;
    }

    getCommits() {
        return this.arrayCommit;
    }


    calcularFrecuenciaCommits() {
        if (this.arrayCommit.length < 2) {
            if (this.arrayCommit.length === 1) {
                this.arrayCommit[0].setFrecuencia("Regular");
                return this.arrayCommit[0].getFrecuencia();
            }
            return "No hay commits suficientes para calcular la frecuencia";
        }

        for (let i = 1; i < this.arrayCommit.length; i++) {
            let fechaActual = this.parseFecha(this.arrayCommit[i].getFechaHora());
            let fechaAnterior = this.parseFecha(this.arrayCommit[i - 1].getFechaHora());
            let diferenciaDias = (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);

            let frecuencia = "Regular";
            if (diferenciaDias < 2) {
                frecuencia = "Excelente";
            } else if (diferenciaDias < 3) {
                frecuencia = "Bueno";
            } else if (diferenciaDias < 7) {
                frecuencia = "Regular";
            } else {
                frecuencia = "Deficiente";
            }

            this.arrayCommit[i].setFrecuencia(frecuencia);
        }

        return this.arrayCommit[this.arrayCommit.length - 1].getFrecuencia();
    }

    calcularPromedioFrecuenciaCommits() {
        if (this.arrayCommit.length < 2) {
            return "Deficiente"; // Consideramos 'Deficiente' si hay menos de 2 commits
        }

        let totalDias = 0;
        for (let i = 1; i < this.arrayCommit.length; i++) {
            let fechaActual = this.parseFecha(this.arrayCommit[i].getFechaHora());
            let fechaAnterior = this.parseFecha(this.arrayCommit[i - 1].getFechaHora());
            let diferenciaDias = (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);
            totalDias += diferenciaDias;
        }

        let promedioDias = totalDias / (this.arrayCommit.length - 1);

        if (promedioDias < 2) {
            return "Excelente";
        } else if (promedioDias < 3) {
            return "Bueno";
        } else if (promedioDias < 7) {
            return "Regular";
        } else {
            return "Deficiente";
        }
    }

    parseFecha(fechaHoraStr) {


        const partesFechaHora = fechaHoraStr.split('-');


        const [fecha, hora] = partesFechaHora;
        const partesFecha = fecha.split('/');
        const partesHora = hora.split(':');


        const [dia, mes, anio] = partesFecha.map(num => parseInt(num, 10));
        const [horas, minutos] = partesHora.map(num => parseInt(num, 10));

        return new Date(anio, mes - 1, dia, horas, minutos);
    }


}
export default ArrayCommit;
