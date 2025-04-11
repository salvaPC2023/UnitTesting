

import { expect } from 'chai';
import Proyecto from '../src/OBJETOS/proyecto.js';
import Commit from '../src/OBJETOS/commit.js';
import path from 'path';
import Puntaje from '../src/OBJETOS/puntaje.js';

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

  });





