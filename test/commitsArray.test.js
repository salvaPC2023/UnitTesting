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

});