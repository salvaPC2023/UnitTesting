import { expect } from 'chai';
import ArrayProyectos from '../src/OBJETOS/proyectosArray.js';

describe('ArrayProyectos Class Tests', () => {
    describe('Métodos basicos como getters y setters', () => {
        it('debería añadir un nuevo proyecto usando aniadirProyecto()', () => {
            const arrayProyectos = new ArrayProyectos();
            arrayProyectos.aniadirProyecto('Proyecto X');

            const titulos = arrayProyectos.getProyectos();
            expect(titulos).to.include('Proyecto X');
        });

        it('debería devolver un array de títulos con getProyectos()', () => {
            const mockProyecto1 = {
            getTitulo: () => 'Proyecto 1'
            };
            const mockProyecto2 = {
            getTitulo: () => 'Proyecto 2'
            };

            const arrayProyectos = new ArrayProyectos();
            arrayProyectos.aniadirProyectoObj(mockProyecto1);
            arrayProyectos.aniadirProyectoObj(mockProyecto2);

            const titulos = arrayProyectos.getProyectos();
            expect(titulos).to.deep.equal(['Proyecto 1', 'Proyecto 2']);
        });

        it('debería eliminar un proyecto existente con borrarProyecto()', () => {
            const mockProyecto = {
            getTitulo: () => 'Proyecto Eliminable'
            };

            const arrayProyectos = new ArrayProyectos();
            arrayProyectos.aniadirProyectoObj(mockProyecto);
            
            arrayProyectos.borrarProyecto('Proyecto Eliminable');

            const titulos = arrayProyectos.getProyectos();
            expect(titulos).to.not.include('Proyecto Eliminable');
            expect(titulos).to.have.lengthOf(0);
        });

        it('debería no eliminar ningún proyecto si el título no coincide en borrarProyecto()', () => {
            const mockProyecto = {
            getTitulo: () => 'Proyecto Persistente'
            };

            const arrayProyectos = new ArrayProyectos();
            arrayProyectos.aniadirProyectoObj(mockProyecto);
            
            arrayProyectos.borrarProyecto('Otro Proyecto');

            const titulos = arrayProyectos.getProyectos();
            expect(titulos).to.include('Proyecto Persistente');
            expect(titulos).to.have.lengthOf(1);
        });
    });

    describe('obtenerRankingDeProyectos', () => {
        it('TC1: debería devolver un array vacío cuando no hay proyectos', () => {
        const arrayProyectos = new ArrayProyectos();
        
        const resultado = arrayProyectos.obtenerRankingDeProyectos();
        
        expect(resultado).to.be.an('array');
        expect(resultado).to.have.lengthOf(0);
        });
        
        it('TC2: debería devolver un ranking con un solo proyecto cuando solo hay uno', () => {
        const arrayProyectos = new ArrayProyectos();
        const mockProyecto = {
            getTitulo: () => 'Proyecto A',
            obtenerPuntuacionTotalProyecto: () => 85
        };
        
        arrayProyectos.aniadirProyectoObj(mockProyecto);
        
        const resultado = arrayProyectos.obtenerRankingDeProyectos();
        
        expect(resultado).to.be.an('array');
        expect(resultado).to.have.lengthOf(1);
        expect(resultado[0]).to.deep.equal({
            titulo: 'Proyecto A',
            puntajeTotal: 85
        });
        });
        
        it('TC3: debería ordenar correctamente múltiples proyectos por puntaje descendente', () => {
        const arrayProyectos = new ArrayProyectos();
        
        const proyectoA = {
            getTitulo: () => 'Proyecto A',
            obtenerPuntuacionTotalProyecto: () => 75
        };
        
        const proyectoB = {
            getTitulo: () => 'Proyecto B',
            obtenerPuntuacionTotalProyecto: () => 90
        };
        
        const proyectoC = {
            getTitulo: () => 'Proyecto C',
            obtenerPuntuacionTotalProyecto: () => 60
        };
        
        arrayProyectos.aniadirProyectoObj(proyectoA);
        arrayProyectos.aniadirProyectoObj(proyectoB);
        arrayProyectos.aniadirProyectoObj(proyectoC);
        
        const resultado = arrayProyectos.obtenerRankingDeProyectos();
        
        expect(resultado).to.be.an('array');
        expect(resultado).to.have.lengthOf(3);
        
        expect(resultado[0].titulo).to.equal('Proyecto B');
        expect(resultado[0].puntajeTotal).to.equal(90);
        
        expect(resultado[1].titulo).to.equal('Proyecto A');
        expect(resultado[1].puntajeTotal).to.equal(75);
        
        expect(resultado[2].titulo).to.equal('Proyecto C');
        expect(resultado[2].puntajeTotal).to.equal(60);
        });
        
        it('TC4: debería mantener el orden de inserción para proyectos con puntajes iguales', () => {
        const arrayProyectos = new ArrayProyectos();
        
        const proyectoA = {
            getTitulo: () => 'Proyecto A',
            obtenerPuntuacionTotalProyecto: () => 80
        };
        
        const proyectoB = {
            getTitulo: () => 'Proyecto B',
            obtenerPuntuacionTotalProyecto: () => 80
        };
        
        const proyectoC = {
            getTitulo: () => 'Proyecto C',
            obtenerPuntuacionTotalProyecto: () => 90
        };
        
        arrayProyectos.aniadirProyectoObj(proyectoA);
        arrayProyectos.aniadirProyectoObj(proyectoB);
        arrayProyectos.aniadirProyectoObj(proyectoC);
        
        const resultado = arrayProyectos.obtenerRankingDeProyectos();
        
        expect(resultado).to.be.an('array');
        expect(resultado).to.have.lengthOf(3);
        
        expect(resultado[0].titulo).to.equal('Proyecto C');
        expect(resultado[0].puntajeTotal).to.equal(90);
        
        expect(resultado[1].puntajeTotal).to.equal(80);
        expect(resultado[2].puntajeTotal).to.equal(80);
        });
        
        it('TC5: debería manejar correctamente proyectos con puntajes negativos o cero', () => {
        const arrayProyectos = new ArrayProyectos();
        
        const proyectoA = {
            getTitulo: () => 'Proyecto A',
            obtenerPuntuacionTotalProyecto: () => 0
        };
        
        const proyectoB = {
            getTitulo: () => 'Proyecto B',
            obtenerPuntuacionTotalProyecto: () => -10
        };
        
        const proyectoC = {
            getTitulo: () => 'Proyecto C',
            obtenerPuntuacionTotalProyecto: () => 50
        };
        
        arrayProyectos.aniadirProyectoObj(proyectoA);
        arrayProyectos.aniadirProyectoObj(proyectoB);
        arrayProyectos.aniadirProyectoObj(proyectoC);
        
        const resultado = arrayProyectos.obtenerRankingDeProyectos();
        
        expect(resultado).to.be.an('array');
        expect(resultado).to.have.lengthOf(3);
        
        expect(resultado[0].titulo).to.equal('Proyecto C');
        expect(resultado[0].puntajeTotal).to.equal(50);
        
        expect(resultado[1].titulo).to.equal('Proyecto A');
        expect(resultado[1].puntajeTotal).to.equal(0);
        
        expect(resultado[2].titulo).to.equal('Proyecto B');
        expect(resultado[2].puntajeTotal).to.equal(-10);
        });
    });
});