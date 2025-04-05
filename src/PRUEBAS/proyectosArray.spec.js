import Proyecto from "../OBJETOS/proyecto";
import ArrayProyectos from "../OBJETOS/proyectosArray";

describe("Ingresar Proyectos", () => {
  // (INICIO PROYECTO) -> FABIO *************************************
  let arrayProyectos;
  let proyecto1;
  let proyecto2;
  let proyecto3;
  let proyecto4;
  let proyecto5;
  beforeEach(() => {
    arrayProyectos = new ArrayProyectos();
    proyecto1 = new Proyecto("Proyecto 1");
    proyecto2 = new Proyecto("Proyecto 2");
    proyecto3 = new Proyecto("Proyecto 3");
    proyecto4 = new Proyecto("Proyecto 4");
    proyecto5 = new Proyecto("Proyecto 5");
  });

  it("Si no ingreso nada, deberia devolverme un array de proyectos vacio", () => {
    expect(arrayProyectos.getProyectos()).toEqual([]);
  });

  it("Si ingreso un proyecto, deberia devolverme un array con ese proyecto", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    expect(arrayProyectos.getProyectos()).toEqual(["Proyecto1"]);
  });

  it("Si ingreso 2 proyectos, deberia devolverme un array con esos 2 proyectos", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    arrayProyectos.aniadirProyecto("Proyecto2");
    expect(arrayProyectos.getProyectos()).toEqual(["Proyecto1", "Proyecto2"]);
  });

  // Segunda Historia de Usuario -> Patrick *********************************
  it("Se debe borrar un proyecto", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    arrayProyectos.borrarProyecto("Proyecto1");
    expect(arrayProyectos.getProyectos()).toEqual([]);
  });

  it("Se debe borrar un proyecto", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    arrayProyectos.aniadirProyecto("Proyecto2");
    arrayProyectos.borrarProyecto("Proyecto1");
    expect(arrayProyectos.getProyectos()).toEqual(["Proyecto2"]);
  });

  // ********************************************************************

  /* Ranking de proyectos */
  it("Deberia pedirle el ranking y devolver un array vacio", () => {
    expect(arrayProyectos.obtenerRankingDeProyectos()).toEqual([]);
  });

  it("Si solo le ingreso un proyecto deberia devolverme ese mismo proyecto", () => {
    //proyecto1.aniadirCommit(10, 50, 20, "Buena", "01/06/2024-13:00", 1);
    arrayProyectos.aniadirProyectoObj(proyecto1);

    let expectedArray = [{
      "titulo": "Proyecto 1",
      "puntajeTotal": 0
    }];

    expect(arrayProyectos.obtenerRankingDeProyectos()).toEqual(expectedArray);
  });

  it("Si solo le ingreso 2 proyectos deberia devolverme un ranking de proyectos sin ordenar", () => {
    proyecto1.aniadirCommit(10, 50, 20, "Buena", "01/06/2024-13:00", 1);
    proyecto2.aniadirCommit(12, 40, 50, "Excelente", "2/06/2024-12:00", 2);
    arrayProyectos.aniadirProyectoObj(proyecto1);
    arrayProyectos.aniadirProyectoObj(proyecto2);

    let expectedArray = [
      {
        "titulo": "Proyecto 2",
        "puntajeTotal": 68
      },
      {
        "titulo": "Proyecto 1",
        "puntajeTotal": 56
      }
    ];

    expect(arrayProyectos.obtenerRankingDeProyectos()).toEqual(expectedArray);
  });

  it("Si solo le ingreso 2 proyectos deberia devolverme un ranking de proyectos sin ordenar", () => {
    proyecto1.aniadirCommit(10, 50, 20, "Buena", "01/06/2024-13:00", 1);
    proyecto2.aniadirCommit(12, 30, 60, "Excelente", "2/06/2024-12:00", 2);
    proyecto3.aniadirCommit(89, 20, 30, "Regular", "2/06/2024-12:00", 3);
    proyecto4.aniadirCommit(100, 90, 60, "Excelente", "2/06/2024-12:00", 4);
    proyecto5.aniadirCommit(22, 70, 50, "Buena", "2/06/2024-12:00", 5);
    arrayProyectos.aniadirProyectoObj(proyecto1);
    arrayProyectos.aniadirProyectoObj(proyecto2);
    arrayProyectos.aniadirProyectoObj(proyecto3);
    arrayProyectos.aniadirProyectoObj(proyecto4);
    arrayProyectos.aniadirProyectoObj(proyecto5);

    let expectedArray = [
      {
        "titulo": "Proyecto 2",
        "puntajeTotal": 72
      },
      {
        "titulo": "Proyecto 4",
        "puntajeTotal": 68
      },
      {
        "titulo": "Proyecto 3",
        "puntajeTotal": 64
      },
      {
        "titulo": "Proyecto 1",
        "puntajeTotal": 56
      },
      {
        "titulo": "Proyecto 5",
        "puntajeTotal": 56
      }
    ];

    expect(arrayProyectos.obtenerRankingDeProyectos()).toEqual(expectedArray);
  });
});