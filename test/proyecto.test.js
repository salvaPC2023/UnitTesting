
import { expect } from 'chai';
import Proyecto from '../src/OBJETOS/proyecto.js';
import path from 'path';
import fs from "fs";
import ArrayCommit from "../src/OBJETOS/commitsArray.js";
import Puntaje from '../src/OBJETOS/commit.js';
import Commit from '../src/OBJETOS/commit.js';
//r
import sinon from 'sinon';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

describe('Proyecto Class Tests', function() {

    let proyecto;
    
    beforeEach(() => {
        proyecto = new Proyecto("Mi Proyecto");
      });
    
            
     it('debería asignar correctamente el título', () => {
            
            expect(proyecto.getTitulo()).to.equal('Mi Proyecto');
        });
        
     
        it("debería añadir un commit correctamente", () => {
          const proyecto = new Proyecto("Test");
          proyecto.aniadirCommit(3, 100, 80, "regular", "2025-04-11");
          
          const commits = proyecto.mostrarCommits();
          expect(commits[0].cantPruebas).to.equal(3);
          expect(commits[0].cantLineas).to.equal(100);
          expect(commits[0].cobertura).to.equal(80);
          expect(commits[0].complejidad).to.equal("regular");
          expect(commits[0].recomendacion.trim()).to.equal("Se recomienda mejorar la cantidad de pruebas aprobadas.");
          expect(commits[0].frecuencia).to.equal("Regular");
        });
        
        
                

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

      // Calcular % de prueba
      describe('Método calcularPorcentajePruebas', function() {
  
        // TC1: Camino 1 → 2 ->3 → FIN (no hay commits)
        it('debería retornar 0 cuando no hay commits', () => {
          const proyecto = new Proyecto("Sin commits");
      
          // Simula que no hay commits
          proyecto.arrayCommit.getCommits = () => [];
      
          const resultado = proyecto.calcularPorcentajePruebas();
          expect(resultado).to.equal(0);
        });
      
        // TC2: Camino 1 → 3 → 4 → 5 → 6 → FIN (hay commits, todas las pruebas aprobadas)
        it('debería retornar 100 cuando todas las pruebas están aprobadas', () => {
          const proyecto = new Proyecto("Todo aprobado");
      
          const commitMock = {
            getCantPruebas: () => 10,
            getCantPruebasAprob: () => 10
          };
          proyecto.arrayCommit.getCommits = () => [commitMock];
      
          const resultado = proyecto.calcularPorcentajePruebas();
          expect(resultado).to.equal(100);
        });
      
        // TC3: Camino 1 → 3 → 4 → 5 → 6 → 7→FIN (hay commits, no todas aprobadas)
        it('debería retornar 50 cuando la mitad de las pruebas están aprobadas', () => {
          const proyecto = new Proyecto("Mitad aprobado");
      
          const commitMock = {
            getCantPruebas: () => 4,
            getCantPruebasAprob: () => 2
          };
          proyecto.arrayCommit.getCommits = () => [commitMock];
      
          const resultado = proyecto.calcularPorcentajePruebas();
          expect(resultado).to.equal(50);
        });
      
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


    // calclula puntaje de lineas de codigo

    describe('Método calcularPuntajeLineasCodigo', function () {

      // TC1: Caso sin commits
      it('debería retornar 100 cuando no hay commits', () => {
          const proyecto = new Proyecto("TestProyecto");
          proyecto.arrayCommit = {
              getCommits: () => []
          };
          const resultado = proyecto.calcularPuntajeLineasCodigo();
          expect(resultado).to.equal(100);
      });
  
      // TC2: Caso con aumentos normales (≤30 líneas)
      it('debería sumar 5 puntos por cada aumento ≤30 líneas', () => {
          const proyecto = new Proyecto("TestProyecto");
          proyecto.arrayCommit = {
              getCommits: () => [
                  { getCantLineas: () => 50 },
                  { getCantLineas: () => 55 }
              ]
          };
          const resultado = proyecto.calcularPuntajeLineasCodigo();
          expect(resultado).to.equal(100);
      });
  
      // TC3: Caso con aumento brusco (>30 líneas)
      it('debería restar 20 puntos por aumento >30 líneas', () => {
          const proyecto = new Proyecto("TestProyecto");
          proyecto.arrayCommit = {
              getCommits: () => [
                  { getCantLineas: () => 50 },
                  { getCantLineas: () => 85 }
              ]
          };
          const resultado = proyecto.calcularPuntajeLineasCodigo();
          expect(resultado).to.equal(80);
      });
  
      // TC4: Caso con 3 disminuciones consecutivas
      it('debería restar 20 puntos por 3 disminuciones consecutivas', () => {
          const proyecto = new Proyecto("TestProyecto");
          proyecto.arrayCommit = {
              getCommits: () => [
                  { getCantLineas: () => 100 },
                  { getCantLineas: () => 95 },
                  { getCantLineas: () => 90 },
                  { getCantLineas: () => 85 }
              ]
          };
          const resultado = proyecto.calcularPuntajeLineasCodigo();
          expect(resultado).to.equal(80);
      });
  
      // TC5: Caso combinado (aumento brusco + disminuciones + aumento normal)
      it('debería calcular correctamente con cambios combinados', () => {
          const proyecto = new Proyecto("TestProyecto");
          proyecto.arrayCommit = {
              getCommits: () => [
                  { getCantLineas: () => 50 },
                  { getCantLineas: () => 85 }, // +35 (-20)
                  { getCantLineas: () => 80 }, // -5 (+1 disminución)
                  { getCantLineas: () => 75 }, // -5 (+2 disminuciones)
                  { getCantLineas: () => 90 }  // +15 (+5)
              ]
          };
          const resultado = proyecto.calcularPuntajeLineasCodigo();
          expect(resultado).to.equal(85);
      });
  
      
  });
    
    

  //Calcular % de covertura 
  describe('calcularPorcentajeCobertura', function() {
    // Camino 1: Sin commits
    it('debería retornar 0 cuando no hay commits', function() {
      const proyecto = new Proyecto("TestProyecto");
      proyecto.arrayCommit = {
        getCommits: () => []
      };
      expect(proyecto.calcularPorcentajeCobertura()).to.equal(0);
    });
  
    // Camino 2: Un commit
    it('debería retornar el mismo porcentaje con un commit', function() {
      const proyecto = new Proyecto("TestProyecto");
      proyecto.arrayCommit = {
        getCommits: () => [
          { getCobertura: () => 80 }
        ]
      };
      expect(proyecto.calcularPorcentajeCobertura()).to.equal(80);
    });
  
    // Camino 3: Múltiples commits
    it('debería calcular el promedio con múltiples commits', function() {
      const proyecto = new Proyecto("TestProyecto");
      proyecto.arrayCommit = {
        getCommits: () => [
          { getCobertura: () => 80 },
          { getCobertura: () => 90 }
        ]
      };
      expect(proyecto.calcularPorcentajeCobertura()).to.equal(85);
    });
  });

  describe('Método ingresarCommitsPor', function() {
    let proyecto;
    let fsReadFileStub;
    let originalReadFile;
    
    beforeEach(function() {
      proyecto = new Proyecto("TestProyecto");
      
      // Guardar la implementación original de readFileSync
      originalReadFile = fs.readFileSync;
      
      // Crear stub para fs.readFileSync solamente
      fsReadFileStub = sinon.stub(fs, "readFileSync");
      
      if (typeof global.__dirname === 'undefined') {
        const __filename = fileURLToPath(import.meta.url);
        global.__dirname = dirname(__filename);
      }
    });
    
    afterEach(function() {
      sinon.restore();
      
      // Limpiar las variables globales definidas si es necesario
      // delete global.__dirname;
    });
    
    // TC1: Archivo vacío
    it('debería retornar "Archivo vacio" cuando el archivo está vacío', function() {
      fsReadFileStub.returns('');

      const resultado = proyecto.ingresarCommitsPor('ruta/archivo_vacio.txt');

      expect(resultado).to.equal('Archivo vacio');
      expect(fsReadFileStub.called).to.be.true;
    });
    
    // TC2: Archivo con un solo commit
    it('debería procesar correctamente un archivo con un solo commit', function() {
      const contenidoArchivo = '1,2023-04-10,10,100,85,excelente';
      fsReadFileStub.returns(contenidoArchivo);

      const aniadirSpy = sinon.spy(proyecto.arrayCommit, "aniadirCommitObj");

      const resultado = proyecto.ingresarCommitsPor('ruta/archivo_un_commit.txt');

      expect(resultado).to.equal('Archivo leido');
      expect(fsReadFileStub.called).to.be.true;
      expect(aniadirSpy.calledOnce).to.be.true;

      const commitCreado = aniadirSpy.firstCall.args[0];
      expect(commitCreado).to.be.an.instanceof(Commit);
      expect(commitCreado.getId()).to.equal(1);
      expect(commitCreado.getFechaHora()).to.equal('2023-04-10');
      expect(commitCreado.getCantPruebas()).to.equal(10);
      expect(commitCreado.getCantLineas()).to.equal(100);
      expect(commitCreado.getCobertura()).to.equal(85);
      expect(commitCreado.getComplejidad()).to.equal('excelente');
    });
    
    // TC3: Archivo con múltiples commits
    it('debería procesar correctamente un archivo con múltiples commits', function() {
      const contenidoArchivo = 
        '1,2023-04-10,10,100,85,excelente\n' +
        '2,2023-04-11,15,110,90,bueno\n' +
        '3,2023-04-12,8,105,80,regular';
      fsReadFileStub.returns(contenidoArchivo);

      const aniadirSpy = sinon.spy(proyecto.arrayCommit, "aniadirCommitObj");

      const resultado = proyecto.ingresarCommitsPor('ruta/archivo_multiples_commits.txt');

      expect(resultado).to.equal('Archivo leido');
      expect(fsReadFileStub.called).to.be.true;
      expect(aniadirSpy.callCount).to.equal(3);
    });
    
    // TC4: Archivo con formato incorrecto
    it('debería manejar correctamente un archivo con formato incorrecto', function() {
      const contenidoArchivo = 'formato_incorrecto_sin_comas';
      fsReadFileStub.returns(contenidoArchivo);

      const resultado = proyecto.ingresarCommitsPor('ruta/archivo_formato_incorrecto.txt');

      expect(resultado).to.equal('Archivo leido');
      expect(fsReadFileStub.called).to.be.true;
    });
    
    // TC5: Error en la lectura del archivo
    it('debería manejar correctamente errores en la lectura del archivo', function() {
      fsReadFileStub.throws(new Error('Error al leer el archivo'));

      let error;
      try {
        proyecto.ingresarCommitsPor('ruta/archivo_inexistente.txt');
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an('error');
      expect(error.message).to.equal('Error al leer el archivo');
      expect(fsReadFileStub.called).to.be.true;
    });
    
    // TC6: Archivo con espacios extra alrededor de los valores
    it('debería procesar correctamente un archivo con espacios extra', function() {
      const contenidoArchivo = '1 , 2023-04-10 , 10 , 100 , 85 , excelente ';
      fsReadFileStub.returns(contenidoArchivo);

      const aniadirSpy = sinon.spy(proyecto.arrayCommit, "aniadirCommitObj");

      const resultado = proyecto.ingresarCommitsPor('ruta/archivo_con_espacios.txt');

      expect(resultado).to.equal('Archivo leido');
      expect(fsReadFileStub.called).to.be.true;
      expect(aniadirSpy.calledOnce).to.be.true;

      const commitCreado = aniadirSpy.firstCall.args[0];
      expect(commitCreado).to.be.an.instanceof(Commit);
      expect(commitCreado.getCantPruebas()).to.equal(10);
      expect(commitCreado.getCantLineas()).to.equal(100);
      expect(commitCreado.getCobertura()).to.equal(85);
      expect(commitCreado.getComplejidad()).to.equal('excelente');
    });
    
    // TC7: Probar el método alternativo ingresarCommitsPorContenidoDe
    it('debería procesar correctamente un archivo usando ingresarCommitsPorContenidoDe', function() {
      sinon.restore();

      const aniadirSpy = sinon.spy(proyecto.arrayCommit, "aniadirCommitObj");

      const contenidoArchivo = '1,2023-04-10,10,100,85,excelente';
      
      const resultado = proyecto.ingresarCommitsPorContenidoDe(contenidoArchivo);

      expect(resultado).to.equal('Archivo leido');
      expect(aniadirSpy.calledOnce).to.be.true;

      const commitCreado = aniadirSpy.firstCall.args[0];
      expect(commitCreado).to.be.an.instanceof(Commit);
      expect(commitCreado.getId()).to.equal(1);
      expect(commitCreado.getFechaHora()).to.equal('2023-04-10');
      expect(commitCreado.getCantPruebas()).to.equal(10);
      expect(commitCreado.getCantLineas()).to.equal(100);
      expect(commitCreado.getCobertura()).to.equal(85);
      expect(commitCreado.getComplejidad()).to.equal('excelente');
    });
  });



  describe('Proyecto Class Tests', function() {
    
    
    // Se ejecuta antes de cada prueba
    beforeEach(function() {
      proyecto = new Proyecto("TestProyecto");
    });
  
    describe('Método calcularPorcentaje', function() {
      
          
      it('debería retornar 100 cuando todos los commits tienen pruebas', function() {
        // Configuración
        const mockArrayCommit = { 
          getCommits: () => [
            { getCantPruebas: () => 1 },
            { getCantPruebas: () => 1 }
          ] 
        };
        
        // Ejecución y Verificación
        expect(proyecto.calcularPorcentaje(mockArrayCommit)).to.equal(100);
      });
    
      it('debería retornar ~66.67 cuando 2 de 3 commits tienen pruebas', function() {
        // Configuración
        const mockArrayCommit = {
          getCommits: () => [
            { getCantPruebas: () => 1 },
            { getCantPruebas: () => 0 },
            { getCantPruebas: () => 1 }
          ]
        };
        
        // Ejecución y Verificación
        expect(proyecto.calcularPorcentaje(mockArrayCommit)).to.be.closeTo(66.67, 0.01);
      });
  
      it('debería retornar 0 cuando ningún commit tiene pruebas', function() {
        // Configuración
        const mockArrayCommit = { 
          getCommits: () => [
            { getCantPruebas: () => 0 },
            { getCantPruebas: () => 0 }
          ] 
        };
        
        // Ejecución y Verificación
        expect(proyecto.calcularPorcentaje(mockArrayCommit)).to.equal(0);
      });
    });
  });

  describe('Método getPuntajeCantPruebas', function() {
    let proyecto;
    let originalTieneCommits, originalCalcularPorcentaje, originalObjeterPuntajes;
    
    beforeEach(function() {
        proyecto = new Proyecto("TestProyecto");
        
        // Guardar implementaciones originales
        originalTieneCommits = proyecto.tieneCommits;
        originalCalcularPorcentaje = proyecto.calcularPorcentaje;
        originalObjeterPuntajes = proyecto.objeterPuntajes;
    });

    afterEach(function() {
        // Restaurar implementaciones originales
        proyecto.tieneCommits = originalTieneCommits;
        proyecto.calcularPorcentaje = originalCalcularPorcentaje;
        proyecto.objeterPuntajes = originalObjeterPuntajes;
    });

    it('debería retornar 8 cuando no hay commits', function() {
        proyecto.tieneCommits = () => false;
        const resultado = proyecto.getPuntajeCantPruebas([]);
        expect(resultado).to.equal(8);
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

    describe('Método asignarPuntajeComplejidad', function() {
    
      // TC1: promedioComplejidad ≤ 1.5
      it('debería retornar 20 cuando la complejidad promedio es menor o igual a 1.5', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeComplejidad(1.2);
        expect(resultado).to.equal(20);
      });
      
      // TC2: 1.5 < promedioComplejidad ≤ 2.5
      it('debería retornar 16 cuando la complejidad promedio es mayor a 1.5 y menor o igual a 2.5', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeComplejidad(2.0);
        expect(resultado).to.equal(16);
      });
      
      // TC3: 2.5 < promedioComplejidad ≤ 3.5
      it('debería retornar 12 cuando la complejidad promedio es mayor a 2.5 y menor o igual a 3.5', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeComplejidad(3.0);
        expect(resultado).to.equal(12);
      });
      
      // TC4: promedioComplejidad > 3.5
      it('debería retornar 8 cuando la complejidad promedio es mayor a 3.5', () => {
        const proyecto = new Proyecto("TestProyecto");
        const resultado = proyecto.asignarPuntajeComplejidad(4.0);
        expect(resultado).to.equal(8);
      });
    });

    describe('Método calcularPromedioComplejidad', function() {
    
      // TC1: Procesamiento de commit con complejidad 'excelente'
      it('debería retornar 1 cuando todos los commits tienen complejidad "excelente"', () => {
        const proyecto = new Proyecto("TestProyecto");
        // Creamos un mock de arrayCommit con un solo commit de complejidad 'excelente'
        const mockArrayCommit = {
          getCommits: () => [
            { getComplejidad: () => 'excelente' }
          ]
        };
        
        const resultado = proyecto.calcularPromedioComplejidad(mockArrayCommit);
        expect(resultado).to.equal(1);
      });
      
      // TC2: Procesamiento de commit con complejidad 'bueno'
      it('debería retornar 2 cuando todos los commits tienen complejidad "bueno"', () => {
        const proyecto = new Proyecto("TestProyecto");
        const mockArrayCommit = {
          getCommits: () => [
            { getComplejidad: () => 'bueno' }
          ]
        };
        
        const resultado = proyecto.calcularPromedioComplejidad(mockArrayCommit);
        expect(resultado).to.equal(2);
      });
      
      // TC3: Procesamiento de commit con complejidad 'regular'
      it('debería retornar 3 cuando todos los commits tienen complejidad "regular"', () => {
        const proyecto = new Proyecto("TestProyecto");
        const mockArrayCommit = {
          getCommits: () => [
            { getComplejidad: () => 'regular' }
          ]
        };
        
        const resultado = proyecto.calcularPromedioComplejidad(mockArrayCommit);
        expect(resultado).to.equal(3);
      });
      
      // TC4: Procesamiento de commit con complejidad 'deficiente'
      it('debería retornar 4 cuando todos los commits tienen complejidad "deficiente"', () => {
        const proyecto = new Proyecto("TestProyecto");
        const mockArrayCommit = {
          getCommits: () => [
            { getComplejidad: () => 'deficiente' }
          ]
        };
        
        const resultado = proyecto.calcularPromedioComplejidad(mockArrayCommit);
        expect(resultado).to.equal(4);
      });
      
      // TC5: Array vacío
      it('debería manejar correctamente un array de commits vacío', () => {
        const proyecto = new Proyecto("TestProyecto");
        const mockArrayCommit = {
          getCommits: () => []
        };
        
        const resultado = proyecto.calcularPromedioComplejidad(mockArrayCommit);
        expect(isNaN(resultado)).to.be.true;
      });
      
      // TC6: Combinación de diferentes complejidades
      it('debería calcular correctamente el promedio de diferentes complejidades', () => {
        const proyecto = new Proyecto("TestProyecto");
        const mockArrayCommit = {
          getCommits: () => [
            { getComplejidad: () => 'excelente' }, // 1
            { getComplejidad: () => 'bueno' },     // 2
            { getComplejidad: () => 'regular' },   // 3
            { getComplejidad: () => 'deficiente' } // 4
          ]
        };
        
        const resultado = proyecto.calcularPromedioComplejidad(mockArrayCommit);
        expect(resultado).to.equal(2.5); // (1+2+3+4)/4 = 2.5
      });
    });

  });





