import { expect } from 'chai';
import ArrayCommit from '../src/OBJETOS/commitsArray.js'; 

describe('ArrayCommit Class Tests', () => {

  describe('constructor', () => {
    it('debería inicializar un array vacío', () => {
      const arrayCommit = new ArrayCommit();
      expect(arrayCommit.arrayCommit).to.be.an('array');
      expect(arrayCommit.arrayCommit).to.have.lengthOf(0);
    });
  });


 // Prueba para aniadirCommit
 describe('aniadirCommit', () => {
    it('debería crear un nuevo Commit y añadirlo al array', () => {
      // Arrange
      const arrayCommit = new ArrayCommit();
      const cantPruebas = 5;
      const cantLineas = 200;
      const cobertura = 75;
      const complejidad = 3;
      const fecha = '2025-04-13';
      const id = 'test123';
      
      // Act
      arrayCommit.aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad, fecha, id);
      
      // Assert
      expect(arrayCommit.arrayCommit).to.have.lengthOf(1);
      
      // Verificamos las propiedades del commit creado
      const commit = arrayCommit.arrayCommit[0];
      expect(commit.getId()).to.equal(id);
      expect(commit.getFechaHora()).to.equal(fecha);
      expect(commit.getCantPruebas()).to.equal(cantPruebas);
      expect(commit.getCantLineas()).to.equal(cantLineas);
      expect(commit.getCobertura()).to.equal(cobertura);
      expect(commit.getComplejidad()).to.equal(complejidad);
    });
    
  });

  describe('aniadirCommitObj', () => {
    it('debería añadir un objeto Commit existente al array', () => {
      // Arrange
      const arrayCommit = new ArrayCommit();
      const mockCommit = {
        getId: () => 'abc123',
        getFechaHora: () => '2025-04-13T10:00:00',
        getCantPruebas: () => 10,
        getCantLineas: () => 100,
        getCobertura: () => 80,
        getComplejidad: () => 5
      };
      
      // Act
      arrayCommit.aniadirCommitObj(mockCommit);
      
      // Assert
      expect(arrayCommit.arrayCommit).to.have.lengthOf(1);
      expect(arrayCommit.arrayCommit[0]).to.equal(mockCommit);
    });
  });


  // Pruebas para mostrarCommitCompleto
  describe('mostrarCommitCompleto', () => {
    it('debería mostrar información completa de todos los commits', () => {
      // Arrange
      const arrayCommit = new ArrayCommit();
      const mockCommit = {
        getId: () => 'abc123',
        getFechaHora: () => '2025-04-13T10:00:00',
        getCantPruebas: () => 10,
        getCantLineas: () => 100,
        getCobertura: () => 80,
        getComplejidad: () => 5,
        getRecomendacion: () => 'Todo bien',
        getFrecuencia: () => 'Alta'
      };
      
      arrayCommit.aniadirCommitObj(mockCommit);
      
      // Act
      const resultado = arrayCommit.mostrarCommitCompleto();
      
      // Assert
      expect(resultado).to.be.an('array');
      expect(resultado).to.have.lengthOf(1);
      expect(resultado[0]).to.deep.equal({
        idCommit: 'abc123',
        fechaHora: '2025-04-13T10:00:00',
        cantPruebas: 10,
        cantLineas: 100,
        cobertura: 80,
        complejidad: 5,
        recomendacion: 'Todo bien',
        frecuencia: 'Alta'
      });
    });
  });



  // Pruebas para eliminarUltimoCommit
  describe('eliminarUltimoCommit', () => {
    it('debería eliminar el último commit añadido', () => {
      // Arrange
      const arrayCommit = new ArrayCommit();
      const mockCommit1 = { id: 'commit1' };
      const mockCommit2 = { id: 'commit2' };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      
      // Act
      const resultado = arrayCommit.eliminarUltimoCommit();
      
      // Assert
      expect(resultado).to.be.an('array');
      expect(resultado).to.have.lengthOf(1);
      expect(resultado[0]).to.equal(mockCommit1);
    });

    it('no debería hacer nada si el array ya está vacío', () => {
        // Arrange
        const arrayCommit = new ArrayCommit();
        
        // Act
        const resultado = arrayCommit.eliminarUltimoCommit();
        
        // Assert
        expect(resultado).to.be.an('array');
        expect(resultado).to.have.lengthOf(0);
    });
  });   
 describe('getCommits', () => {
    it('debería devolver el array de commits', () => {
      // Arrange
      const arrayCommit = new ArrayCommit();
      const mockCommit1 = { id: 'commit1' };
      const mockCommit2 = { id: 'commit2' };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      
      // Act
      const resultado = arrayCommit.getCommits();
      
      // Assert
      expect(resultado).to.be.an('array');
      expect(resultado).to.have.lengthOf(2);
      expect(resultado[0]).to.equal(mockCommit1);
      expect(resultado[1]).to.equal(mockCommit2);
    });
  });



  describe('ArrayCommit - calcularFrecuenciaCommits', () => {
    let arrayCommit;
    
    beforeEach(() => {
      arrayCommit = new ArrayCommit();
      
      arrayCommit.parseFecha = (fechaString) => {
        return new Date(fechaString);
      };
    });
    
    // TC1: Array vacío (this.arrayCommit.length = 0)
    it('TC1: debería manejar correctamente un array vacío de commits', () => {

      const resultado = arrayCommit.calcularFrecuenciaCommits();
      expect(resultado).to.equal('No hay commits suficientes para calcular la frecuencia');
    });
    
    // TC2: Array con 1 commit (this.arrayCommit.length = 1)
    it('TC2: debería establecer frecuencia "Regular" para un único commit', () => {
      const mockCommit = {
        getFechaHora: () => '2025-04-10T10:00:00',
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      arrayCommit.aniadirCommitObj(mockCommit);
      
      const resultado = arrayCommit.calcularFrecuenciaCommits();
      
      expect(resultado).to.equal('Regular');
      expect(mockCommit.getFrecuencia()).to.equal('Regular');
    });
    
    // TC3: Diferencia < 2 días (Excelente)
    it('TC3: debería establecer frecuencia "Excelente" cuando la diferencia es menor a 2 días', () => {
      const mockCommit1 = {
        getFechaHora: () => '2025-04-10T10:00:00',
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-11T10:00:00', // 1 día después
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      
      const resultado = arrayCommit.calcularFrecuenciaCommits();
      
      expect(resultado).to.equal('Excelente');
      expect(mockCommit2.getFrecuencia()).to.equal('Excelente');
    });
    
    // TC4: Diferencia entre 2-3 días (Bueno)
    it('TC4: debería establecer frecuencia "Bueno" cuando la diferencia está entre 2 y 3 días', () => {
      const mockCommit1 = {
        getFechaHora: () => '2025-04-10T10:00:00',
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-12T10:00:00', // 2 días después
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      
      const resultado = arrayCommit.calcularFrecuenciaCommits();
      
      // Assert
      expect(resultado).to.equal('Bueno');
      expect(mockCommit2.getFrecuencia()).to.equal('Bueno');
    });
    
    // TC5: Diferencia entre 3-7 días (Regular)
    it('TC5: debería establecer frecuencia "Regular" cuando la diferencia está entre 3 y 7 días', () => {
      const mockCommit1 = {
        getFechaHora: () => '2025-04-10T10:00:00',
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-15T10:00:00', // 5 días después
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      const resultado = arrayCommit.calcularFrecuenciaCommits();
      
      expect(resultado).to.equal('Regular');
      expect(mockCommit2.getFrecuencia()).to.equal('Regular');
    });
    
    // TC6: Diferencia >= 7 días (Deficiente)
    it('TC6: debería establecer frecuencia "Deficiente" cuando la diferencia es mayor o igual a 7 días', () => {

      const mockCommit1 = {
        getFechaHora: () => '2025-04-10T10:00:00',
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-17T10:00:00', // 7 días después (Deficiente)
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      
      const resultado = arrayCommit.calcularFrecuenciaCommits();
      
      expect(resultado).to.equal('Deficiente');
      expect(mockCommit2.getFrecuencia()).to.equal('Deficiente');
    });
    
    // TC7: Múltiples commits con diferentes frecuencias
    it('TC7: debería calcular correctamente las frecuencias para múltiples commits', () => {
      const mockCommit1 = {
        getFechaHora: () => '2025-04-01T10:00:00',
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-02T10:00:00', // 1 día (Excelente)
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit3 = {
        getFechaHora: () => '2025-04-04T10:00:00', // 2 días (Bueno)
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit4 = {
        getFechaHora: () => '2025-04-08T10:00:00', // 4 días (Regular)
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      const mockCommit5 = {
        getFechaHora: () => '2025-04-16T10:00:00', // 8 días (Deficiente)
        setFrecuencia: function(valor) { this.frecuencia = valor; },
        getFrecuencia: function() { return this.frecuencia; }
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      arrayCommit.aniadirCommitObj(mockCommit3);
      arrayCommit.aniadirCommitObj(mockCommit4);
      arrayCommit.aniadirCommitObj(mockCommit5);
      

      const resultado = arrayCommit.calcularFrecuenciaCommits();
      expect(resultado).to.equal('Deficiente'); // El último commit
      expect(mockCommit2.getFrecuencia()).to.equal('Excelente');
      expect(mockCommit3.getFrecuencia()).to.equal('Bueno');
      expect(mockCommit4.getFrecuencia()).to.equal('Regular');
      expect(mockCommit5.getFrecuencia()).to.equal('Deficiente');
    });
  });





  describe('ArrayCommit - calcularPromedioFrecuenciaCommits', () => {
    let arrayCommit;
    
    beforeEach(() => {
      arrayCommit = new ArrayCommit();
      
      // Mock para el método parseFecha
      arrayCommit.parseFecha = (fechaString) => {
        // Simplemente convertimos la string a fecha
        return new Date(fechaString);
      };
    });
    
    // TC1: Array con menos de 2 commits
    it('TC1: debería retornar "Deficiente" cuando hay menos de 2 commits', () => {
      // Arrange: caso 1 - array vacío
      
      // Act
      let resultado = arrayCommit.calcularPromedioFrecuenciaCommits();
      
      // Assert
      expect(resultado).to.equal('Deficiente');
      
      // Arrange: caso 2 - array con un commit
      const mockCommit = {
        getFechaHora: () => '2025-04-10T10:00:00'
      };
      
      arrayCommit.aniadirCommitObj(mockCommit);
      
      // Act
      resultado = arrayCommit.calcularPromedioFrecuenciaCommits();
      
      // Assert
      expect(resultado).to.equal('Deficiente');
    });
    
    // TC2: Promedio de días < 2 (Excelente)
    it('TC2: debería retornar "Excelente" cuando el promedio de días es menor a 2', () => {
      // Arrange
      const mockCommit1 = {
        getFechaHora: () => '2025-04-10T10:00:00'
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-11T10:00:00' // 1 día
      };
      
      const mockCommit3 = {
        getFechaHora: () => '2025-04-12T10:00:00' // 1 día
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      arrayCommit.aniadirCommitObj(mockCommit3);
      
      // Act
      const resultado = arrayCommit.calcularPromedioFrecuenciaCommits();
      
      // Assert
      expect(resultado).to.equal('Excelente');
    });
    
    // TC3: Promedio de días entre 2 y 3 (Bueno)
    it('TC3: debería retornar "Bueno" cuando el promedio de días está entre 2 y 3', () => {
      // Arrange
      const mockCommit1 = {
        getFechaHora: () => '2025-04-10T10:00:00'
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-12T10:00:00' // 2 días
      };
      
      const mockCommit3 = {
        getFechaHora: () => '2025-04-15T10:00:00' // 3 días
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      arrayCommit.aniadirCommitObj(mockCommit3);
      
      // Act
      const resultado = arrayCommit.calcularPromedioFrecuenciaCommits();
      
      // Assert
      // Promedio = (2+3)/2 = 2.5 días
      expect(resultado).to.equal('Bueno');
    });
    
    // TC4: Promedio de días entre 3 y 7 (Regular)
    it('TC4: debería retornar "Regular" cuando el promedio de días está entre 3 y 7', () => {
      // Arrange
      const mockCommit1 = {
        getFechaHora: () => '2025-04-10T10:00:00'
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-15T10:00:00' // 5 días
      };
      
      const mockCommit3 = {
        getFechaHora: () => '2025-04-21T10:00:00' // 6 días
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      arrayCommit.aniadirCommitObj(mockCommit3);
      
      // Act
      const resultado = arrayCommit.calcularPromedioFrecuenciaCommits();
      
      // Assert
      // Promedio = (5+6)/2 = 5.5 días
      expect(resultado).to.equal('Regular');
    });
    
    // TC5: Promedio de días mayor o igual a 7 (Deficiente)
    it('TC5: debería retornar "Deficiente" cuando el promedio de días es mayor o igual a 7', () => {
      // Arrange
      const mockCommit1 = {
        getFechaHora: () => '2025-04-01T10:00:00'
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-08T10:00:00' // 7 días
      };
      
      const mockCommit3 = {
        getFechaHora: () => '2025-04-22T10:00:00' // 14 días
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      arrayCommit.aniadirCommitObj(mockCommit3);
      
      // Act
      const resultado = arrayCommit.calcularPromedioFrecuenciaCommits();
      
      // Assert
      // Promedio = (7+14)/2 = 10.5 días
      expect(resultado).to.equal('Deficiente');
    });
    
    // Caso adicional: Verificación de cálculo correcto del promedio
    it('debería calcular correctamente el promedio con diferentes diferencias de días', () => {
      // Arrange
      const mockCommit1 = {
        getFechaHora: () => '2025-04-01T10:00:00'
      };
      
      const mockCommit2 = {
        getFechaHora: () => '2025-04-03T10:00:00' // 2 días
      };
      
      const mockCommit3 = {
        getFechaHora: () => '2025-04-04T10:00:00' // 1 día
      };
      
      const mockCommit4 = {
        getFechaHora: () => '2025-04-08T10:00:00' // 4 días
      };
      
      arrayCommit.aniadirCommitObj(mockCommit1);
      arrayCommit.aniadirCommitObj(mockCommit2);
      arrayCommit.aniadirCommitObj(mockCommit3);
      arrayCommit.aniadirCommitObj(mockCommit4);
      
      // Act
      const resultado = arrayCommit.calcularPromedioFrecuenciaCommits();
      
      // Assert
      // Promedio = (2+1+4)/3 = 2.33 días
      expect(resultado).to.equal('Bueno');
    });
  });


describe('ArrayCommit - parseFecha', () => {
    let arrayCommit;
    
    beforeEach(() => {
      arrayCommit = new ArrayCommit();
    });
    
    // TC1: Único camino posible - formato de fecha estándar
    it('TC1: debería parsear correctamente una fecha en formato DD/MM/YYYY-HH:MM', () => {
      // Arrange
      const fechaHoraStr = "10/04/2025-14:30";
      const expectedDate = new Date(2025, 3, 10, 14, 30);
      
      // Act
      const resultado = arrayCommit.parseFecha(fechaHoraStr);
      
      // Assert
      expect(resultado).to.be.an.instanceof(Date);
      expect(resultado.getFullYear()).to.equal(2025);
      expect(resultado.getMonth()).to.equal(3); // Abril (0-indexado)
      expect(resultado.getDate()).to.equal(10);
      expect(resultado.getHours()).to.equal(14);
      expect(resultado.getMinutes()).to.equal(30);
    });
});

});