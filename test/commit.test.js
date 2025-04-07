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


  //T.28 Realizar TC1-TC6 de clase COMMIT.JS de funcion generarRecomendacion().
  describe('Pruebas para generarRecomendacion', function() {
    // TC1: puntaje_provisional = 1, cantLineas > 500, cobertura < 70
    it('TC1: Debe generar recomendación para 100% pruebas aprobadas, cantLineas > 500, cobertura < 70', function() {
      
      const testCommit = new Commit(10, 600, 60, 5, '2025-04-06T12:00:00', 'tc1');
      testCommit.setPruebasAprob(10); // 100% de pruebas aprobadas
      
      
      const resultado = testCommit.getRecomendacion();
      
            const esperado = "Buen trabajo en las pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });
    
    // TC2: puntaje_provisional = 1, cantLineas > 500, cobertura >= 70
    it('TC2: Debe generar recomendación para 100% pruebas aprobadas, cantLineas > 500, cobertura >= 70', function() {
      
      const testCommit = new Commit(5, 550, 80, 5, '2025-04-06T12:00:00', 'tc2');
      testCommit.setPruebasAprob(5); // 100% de pruebas aprobadas
      
      
      const resultado = testCommit.getRecomendacion();
      
            const esperado = "Buen trabajo en las pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
      expect(resultado).to.equal(esperado);
    });
    
    // TC3: puntaje_provisional = 1, 100 < cantLineas <= 500, cobertura < 70
    it('TC3: Debe generar recomendación para 100% pruebas aprobadas, 100 < cantLineas <= 500, cobertura < 70', function() {
      
      const testCommit = new Commit(8, 300, 65, 5, '2025-04-06T12:00:00', 'tc3');
      testCommit.setPruebasAprob(8); // 100% de pruebas aprobadas
      
      
      const resultado = testCommit.getRecomendacion();
      
            const esperado = "Buen trabajo en las pruebas aprobadas. Buen manejo de la cantidad de líneas de código. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });
    
    // TC4: puntaje_provisional = 1, 100 < cantLineas <= 500, cobertura >= 70
    it('TC4: Debe generar recomendación para 100% pruebas aprobadas, 100 < cantLineas <= 500, cobertura >= 70', function() {
      
      const testCommit = new Commit(6, 250, 75, 5, '2025-04-06T12:00:00', 'tc4');
      testCommit.setPruebasAprob(6); // 100% de pruebas aprobadas
      
      
      const resultado = testCommit.getRecomendacion();
      
            const esperado = "Buen trabajo en las pruebas aprobadas. Buen manejo de la cantidad de líneas de código. ";
      expect(resultado).to.equal(esperado);
    });
    
    // TC5: puntaje_provisional = 1, cantLineas <= 100, cobertura < 70
    it('TC5: Debe generar recomendación para 100% pruebas aprobadas, cantLineas <= 100, cobertura < 70', function() {
      
      const testCommit = new Commit(7, 50, 60, 5, '2025-04-06T12:00:00', 'tc5');
      testCommit.setPruebasAprob(7); // 100% de pruebas aprobadas
      
      
      const resultado = testCommit.getRecomendacion();
      
            const esperado = "Buen trabajo en las pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });
    
    // TC6: puntaje_provisional = 1, cantLineas <= 100, cobertura >= 70
    it('TC6: Debe generar recomendación para 100% pruebas aprobadas, cantLineas <= 100, cobertura >= 70', function() {
      
      const testCommit = new Commit(4, 95, 80, 5, '2025-04-06T12:00:00', 'tc6');
      testCommit.setPruebasAprob(4); // 100% de pruebas aprobadas
      
      
      const resultado = testCommit.getRecomendacion();
      
            const esperado = "Buen trabajo en las pruebas aprobadas. ";
      expect(resultado).to.equal(esperado);
    });

    // TC7-TC12 para generarRecomendacion
    it('TC7: Debe generar recomendación para 0.6 <= pruebas aprobadas < 1, cantLineas > 500, cobertura < 70', function() {
      const testCommit = new Commit(10, 600, 60, 5, '2025-04-06T12:00:00', 'tc7');
      testCommit.setPruebasAprob(7); // 70% de pruebas aprobadas (entre 0.6 y 1)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });

    it('TC8: Debe generar recomendación para 0.6 <= pruebas aprobadas < 1, cantLineas > 500, cobertura >= 70', function() {
      const testCommit = new Commit(10, 550, 75, 5, '2025-04-06T12:00:00', 'tc8');
      testCommit.setPruebasAprob(6); // 60% de pruebas aprobadas (igual a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
      expect(resultado).to.equal(esperado);
    });

    it('TC9: Debe generar recomendación para 0.6 <= pruebas aprobadas < 1, 100 < cantLineas <= 500, cobertura < 70', function() {
      const testCommit = new Commit(10, 300, 65, 5, '2025-04-06T12:00:00', 'tc9');
      testCommit.setPruebasAprob(8); // 80% de pruebas aprobadas (entre 0.6 y 1)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });

    it('TC10: Debe generar recomendación para 0.6 <= pruebas aprobadas < 1, 100 < cantLineas <= 500, cobertura >= 70', function() {
      const testCommit = new Commit(10, 250, 80, 5, '2025-04-06T12:00:00', 'tc10');
      testCommit.setPruebasAprob(9); // 90% de pruebas aprobadas (entre 0.6 y 1)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. ";
      expect(resultado).to.equal(esperado);
    });

    it('TC11: Debe generar recomendación para 0.6 <= pruebas aprobadas < 1, cantLineas <= 100, cobertura < 70', function() {
      const testCommit = new Commit(10, 80, 60, 5, '2025-04-06T12:00:00', 'tc11');
      testCommit.setPruebasAprob(7); // 70% de pruebas aprobadas (entre 0.6 y 1)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });

    it('TC12: Debe generar recomendación para 0.6 <= pruebas aprobadas < 1, cantLineas <= 100, cobertura >= 70', function() {
      const testCommit = new Commit(10, 90, 80, 5, '2025-04-06T12:00:00', 'tc12');
      testCommit.setPruebasAprob(6); // 60% de pruebas aprobadas (igual a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. ";
      expect(resultado).to.equal(esperado);
    });

    // TC13-TC18 para generarRecomendacion
    it('TC13: Debe generar recomendación para pruebas aprobadas < 0.6, cantLineas > 500, cobertura < 70', function() {
      const testCommit = new Commit(10, 600, 60, 5, '2025-04-06T12:00:00', 'tc13');
      testCommit.setPruebasAprob(5); // 50% de pruebas aprobadas (menor a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Se recomienda mejorar la cantidad de pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });

    it('TC14: Debe generar recomendación para pruebas aprobadas < 0.6, cantLineas > 500, cobertura >= 70', function() {
      const testCommit = new Commit(10, 550, 75, 5, '2025-04-06T12:00:00', 'tc14');
      testCommit.setPruebasAprob(3); // 30% de pruebas aprobadas (menor a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Se recomienda mejorar la cantidad de pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
      expect(resultado).to.equal(esperado);
    });

    it('TC15: Debe generar recomendación para pruebas aprobadas < 0.6, 100 < cantLineas <= 500, cobertura < 70', function() {
      const testCommit = new Commit(10, 300, 65, 5, '2025-04-06T12:00:00', 'tc15');
      testCommit.setPruebasAprob(4); // 40% de pruebas aprobadas (menor a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Se recomienda mejorar la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });

    it('TC16: Debe generar recomendación para pruebas aprobadas < 0.6, 100 < cantLineas <= 500, cobertura >= 70', function() {
      const testCommit = new Commit(10, 250, 80, 5, '2025-04-06T12:00:00', 'tc16');
      testCommit.setPruebasAprob(5); // 50% de pruebas aprobadas (menor a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Se recomienda mejorar la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. ";
      expect(resultado).to.equal(esperado);
    });

    it('TC17: Debe generar recomendación para pruebas aprobadas < 0.6, cantLineas <= 100, cobertura < 70', function() {
      const testCommit = new Commit(10, 80, 60, 5, '2025-04-06T12:00:00', 'tc17');
      testCommit.setPruebasAprob(2); // 20% de pruebas aprobadas (menor a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas.";
      expect(resultado).to.equal(esperado);
    });

    it('TC18: Debe generar recomendación para pruebas aprobadas < 0.6, cantLineas <= 100, cobertura >= 70', function() {
      const testCommit = new Commit(10, 90, 80, 5, '2025-04-06T12:00:00', 'tc18');
      testCommit.setPruebasAprob(0); // 0% de pruebas aprobadas (menor a 0.6)
      
      const resultado = testCommit.getRecomendacion();
      
      const esperado = "Se recomienda mejorar la cantidad de pruebas aprobadas. ";
      expect(resultado).to.equal(esperado);
    });


    
  });

  


  
  
});