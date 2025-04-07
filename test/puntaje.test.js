import { expect } from 'chai';
import Puntaje from '../src/OBJETOS/puntaje.js';

describe('Puntaje Class Tests', function() {
  let puntaje;
  
  beforeEach(function() {
    puntaje = new Puntaje();
  });

  describe('Constructor', function() {
    it('debe inicializar con valores por defecto correctos', function() {
      expect(puntaje.puntajePruebas).to.equal(0);
      expect(puntaje.puntajeLineas).to.equal(100);
      expect(puntaje.puntajeCobertura).to.equal(0);
    });
  });

});