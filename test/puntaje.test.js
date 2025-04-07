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

  describe('Métodos puntajePruebas', function() {
    it('getPuntajePruebas debe retornar el valor inicial', function() {
      expect(puntaje.getPuntajePruebas()).to.equal(0);
    });

    it('setPuntajePruebas debe cambiar el valor correctamente', function() {
      puntaje.setPuntajePruebas(85);
      expect(puntaje.getPuntajePruebas()).to.equal(85);
    });

    it('setPuntajePruebas debe aceptar el valor 0', function() {
      puntaje.setPuntajePruebas(50);
      puntaje.setPuntajePruebas(0);
      expect(puntaje.getPuntajePruebas()).to.equal(0);
    });

    it('setPuntajePruebas debe manejar valores negativos', function() {
      puntaje.setPuntajePruebas(-10);
      expect(puntaje.getPuntajePruebas()).to.equal(-10);
    });
  });

  describe('Métodos puntajeLineasCodigo', function() {
    it('getPuntajeLineasCodigo debe retornar el valor inicial', function() {
      expect(puntaje.getPuntajeLineasCodigo()).to.equal(100);
    });

    it('setPuntajeLineasCodigo debe cambiar el valor correctamente', function() {
      puntaje.setPuntajeLineasCodigo(200);
      expect(puntaje.getPuntajeLineasCodigo()).to.equal(200);
    });

    it('setPuntajeLineasCodigo debe aceptar el valor 0', function() {
      puntaje.setPuntajeLineasCodigo(0);
      expect(puntaje.getPuntajeLineasCodigo()).to.equal(0);
    });

    it('setPuntajeLineasCodigo debe manejar valores negativos', function() {
      puntaje.setPuntajeLineasCodigo(-50);
      expect(puntaje.getPuntajeLineasCodigo()).to.equal(-50);
    });
  });
});