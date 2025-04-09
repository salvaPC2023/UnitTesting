

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
            // Comprobamos si el título se asigna correctamente
            expect(proyecto.getTitulo()).to.equal('Mi Proyecto');
        });


  });





