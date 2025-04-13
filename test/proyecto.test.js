

import { expect } from 'chai';
import Proyecto from '../src/OBJETOS/proyecto.js';
import path from 'path';


describe('Proyecto Class Tests', function() {

    let proyecto;
    
    beforeEach(() => {
        proyecto = new Proyecto("Mi Proyecto");
      });
    
            
     it('debería asignar correctamente el título', () => {
            
            expect(proyecto.getTitulo()).to.equal('Mi Proyecto');
        });
        
     
     //it("debería añadir un commit correctamente", () => {
       // const proyecto = new Proyecto("Test");
      
        //proyecto.aniadirCommit(3, 100, 80, "regular");
      
     //   expect(proyecto.mostrarCommits()).to.deep.equal([
       //   {
         //   idCommit: 1, 
           // cantPruebas: 3,
            //cantLineas: 100,
            //cobertura: 80,
            //complejidad: "regular",
            //fechaHora: "2025-04-11",
            //recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas.",
            //frecuencia: "Regular"
         // }
        //]);
     // });

      it("debería eliminar un commit desde un objeto proyecto", () => {
        const proyecto = new Proyecto("Elim");
    
        proyecto.aniadirCommit(4, 4, 4); 
        proyecto.eliminarUltimoCommit(); 
    
        expect(proyecto.mostrarCommits()).to.deep.equal([]);
      });
    
      it('El proyecto debería devolver el puntaje de 0', () => {
        const proyecto = new Proyecto("Proyecto1");
        expect(proyecto.getPuntajePruebas()).to.equal(0);
      });


       //método obterPuntuacionTexto
    describe('Método obterPuntuacionTexto', function() {
        // TC1: Camino 1→2→FIN (puntuacion === 20)
      it('debería retornar "Excelente" cuando la puntuación es 20', () => {
          const proyecto = new Proyecto("Test1");
          const resultado = proyecto.obterPuntuacionTexto(20);
          expect(resultado).to.equal('Excelente');
      });
        
      // TC2: Camino 1→3→4→FIN (puntuacion === 16)
       it('debería retornar "Bueno" cuando la puntuación es 16', () => {
           const proyecto = new Proyecto("Test2");
          const resultado = proyecto.obterPuntuacionTexto(16);
          expect(resultado).to.equal('Bueno');
       });
        
       // TC3: Camino 1→3→5→6→FIN (puntuacion === 12)
       it('debería retornar "Regular" cuando la puntuación es 12', () => {
           const proyecto = new Proyecto("Test3");
          const resultado = proyecto.obterPuntuacionTexto(12);
          expect(resultado).to.equal('Regular');
      });
        
      // TC4: Camino 1→3→5→7→FIN (puntuacion no es 20, 16 ni 12)
      it('debería retornar "Deficiente" cuando la puntuación no es 20, 16 ni 12', () => {
          const proyecto = new Proyecto("Test4");
          const resultado = proyecto.obterPuntuacionTexto(8);
          expect(resultado).to.equal('Deficiente');
      });
    });


    describe('Método asignarPuntajeFrecuencia', function() {
    
      // TC1: Caso "Excelente"
      it('debería retornar 20 cuando la frecuencia es "Excelente"', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeFrecuencia("Excelente");
        expect(resultado).to.equal(20);
      });
      
      // TC2: Caso "Bueno"
      it('debería retornar 16 cuando la frecuencia es "Bueno"', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeFrecuencia("Bueno");
        expect(resultado).to.equal(16);
      });
      
      // TC3: Caso "Regular"
      it('debería retornar 12 cuando la frecuencia es "Regular"', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeFrecuencia("Regular");
        expect(resultado).to.equal(12);
      });
      
      // TC4: Caso "Deficiente" o cualquier otro valor (default)
      it('debería retornar 8 cuando la frecuencia es "Deficiente"', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeFrecuencia("Deficiente");
        expect(resultado).to.equal(8);
      });
      
    });



  });





