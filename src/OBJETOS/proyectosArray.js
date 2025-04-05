import Proyecto from "./proyecto";

class ArrayProyectos {
    constructor() {
        this.proyectosArray = [];
    }

    aniadirProyecto(tituloProyecto) {
        const nuevoProyecto = new Proyecto(tituloProyecto);
        this.proyectosArray.push(nuevoProyecto);
    }

    aniadirProyectoObj(nuevoProyecto) {
        this.proyectosArray.push(nuevoProyecto);
    }

    getProyectos() {
        return this.proyectosArray.map(proyecto => proyecto.getTitulo());
    }

    borrarProyecto(tituloProyecto) {
        this.proyectosArray = this.proyectosArray.filter(proyecto => proyecto.getTitulo() !== tituloProyecto);
        return this.proyectosArray;
    }

    obtenerRankingDeProyectos() {
        if (this.proyectosArray.length !== 0) {
            // Crear un array con objetos que contengan solo el título y el puntaje total
            let ranking = this.proyectosArray.map(proyecto => ({
                titulo: proyecto.getTitulo(),
                puntajeTotal: proyecto.obtenerPuntuacionTotalProyecto()
            }));
    
            // Ordenar el array por puntaje total en orden descendente
            ranking.sort((a, b) => b.puntajeTotal - a.puntajeTotal);
    
            return ranking;
        }
        return [];
    }
    
};

export default ArrayProyectos;