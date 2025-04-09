

import { expect } from 'chai';
import Proyecto from '../src/OBJETOS/proyecto.js';
import Commit from '../src/OBJETOS/commit.js';
import path from 'path';

describe('Proyecto Class Tests', function() {

    let proyecto;
    
    beforeEach(() => {
        proyecto = new Proyecto("Mi Proyecto");
      });
    
            
     it('debería asignar correctamente el título', () => {
            
            expect(proyecto.getTitulo()).to.equal('Mi Proyecto');
        });

    
    it("debería añadir un commit correctamente", () => {
        proyecto.aniadirCommit(3, 100, 80, "regular");
        
        const commits = proyecto.mostrarCommits();
        
        expect(commits[0]).to.deep.include({
            cantPruebas: 3,
            cantLineas: 100,
            cobertura: 80,
            complejidad: "regular",
            recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
            frecuencia: "Regular"
        });
     });
          


  });





