// Commit.test.js
import { expect } from 'chai';
import Commit from '../src/OBJETOS/commit.js';

describe('Commit Class Tests', function() {
  // Fixture de datos
  let commit;
  
  beforeEach(function() {
    // Crear una instancia fresca para cada prueba
    commit = new Commit(10, 200, 80, 5, '2025-04-06T12:00:00', 'abc123');
  });

  describe('Constructor y getters básicos', function() {
    it('debe inicializar correctamente los valores', function() {
      expect(commit.getCantPruebas()).to.equal(10);
      expect(commit.getCantLineas()).to.equal(200);
      expect(commit.getCobertura()).to.equal(80);
      expect(commit.getComplejidad()).to.equal(5);
      expect(commit.getCantPruebasAprob()).to.equal(0);
      expect(commit.getFechaHora()).to.equal('2025-04-06T12:00:00');
      expect(commit.getId()).to.equal('abc123');
      expect(commit.getFrecuencia()).to.equal('Regular');
      expect(commit.getRecomendacion()).to.be.a('string');
    });
  });

  describe('Métodos getId y getters básicos', function() {
    it('getId debe retornar el id correcto', function() {
      expect(commit.getId()).to.equal('abc123');
    });
    
    it('getCantPruebas debe retornar la cantidad de pruebas correcta', function() {
      expect(commit.getCantPruebas()).to.equal(10);
    });
    
    it('getCantLineas debe retornar la cantidad de líneas correcta', function() {
      expect(commit.getCantLineas()).to.equal(200);
    });
    
    it('getCobertura debe retornar la cobertura correcta', function() {
      expect(commit.getCobertura()).to.equal(80);
    });
    
    it('getComplejidad debe retornar la complejidad correcta', function() {
      expect(commit.getComplejidad()).to.equal(5);
    });
    
    it('getCantPruebasAprob debe retornar la cantidad de pruebas aprobadas correcta', function() {
      expect(commit.getCantPruebasAprob()).to.equal(0);
    });
    
    it('getFechaHora debe retornar la fecha y hora correcta', function() {
      expect(commit.getFechaHora()).to.equal('2025-04-06T12:00:00');
    });
    
    it('getFrecuencia debe retornar la frecuencia correcta', function() {
      expect(commit.getFrecuencia()).to.equal('Regular');
    });
  });

  describe('Métodos setters', function() {
    it('setPruebasAprob debe actualizar correctamente', function() {
      commit.setPruebasAprob(8);
      expect(commit.getCantPruebasAprob()).to.equal(8);
    });
    
    it('setFechaHora debe actualizar correctamente', function() {
      commit.setFechaHora('2025-04-07T15:30:00');
      expect(commit.getFechaHora()).to.equal('2025-04-07T15:30:00');
    });
    
    it('setFrecuencia debe actualizar correctamente', function() {
      commit.setFrecuencia('Alta');
      expect(commit.getFrecuencia()).to.equal('Alta');
    });
  });


  describe('Métodos edit', function() {
    it('editarCantPruebas debe actualizar correctamente', function() {
      commit.editarCantPruebas(15);
      expect(commit.getCantPruebas()).to.equal(15);
    });
    
    it('editarCantLineas debe actualizar correctamente', function() {
      commit.editarCantLineas(300);
      expect(commit.getCantLineas()).to.equal(300);
    });
    
    it('editarCobertura debe actualizar correctamente', function() {
      commit.editarCobertura(90);
      expect(commit.getCobertura()).to.equal(90);
    });
    
    it('editarComplejidad debe actualizar correctamente', function() {
      commit.editarComplejidad(8);
      expect(commit.getComplejidad()).to.equal(8);
    });
    
    it('editarFechaHora debe actualizar correctamente', function() {
      commit.editarFechaHora('2025-04-08T10:00:00');
      expect(commit.getFechaHora()).to.equal('2025-04-08T10:00:00');
    });
  });
  
});