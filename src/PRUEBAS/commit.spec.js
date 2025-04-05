import Commit from "../OBJETOS/commit";

describe("Commits", () => {
  let commit;

  it("Despues de ingresar un commit editar la cantidad de pruebas", () => {
    commit = new Commit(2, 10, 100);
    commit.editarCantPruebas(1);
    expect(commit.getCantPruebas()).toEqual(1);
  });

  it("Despues de ingresar un commit editar la cantidad de pruebas", () => {
    commit = new Commit(2, 10, 100);
    commit.editarCantLineas(15);
    expect(commit.getCantLineas()).toEqual(15);
  });

  it("Despues de ingresar un commit editar la cobertura", () => {
    commit = new Commit(2, 10, 100);
    commit.editarCobertura(80);
    expect(commit.getCobertura()).toEqual(80);
  });

  it("Despues de ingresar un commit editar la complejidad", () => {
    commit = new Commit(2, 10, 100, "Excelente");
    commit.editarComplejidad("Regular");
    expect(commit.getComplejidad()).toEqual("Regular");
  });

  it("Despues de ingresar un commit editar la Fecha y la hora del commit", () => {
    let commit = new Commit(4, 100, 100, "Excelente", "2024/05/20-09:23");
    commit.editarFechaHora("2024/05/21-10:00");
    expect(commit.getFechaHora()).toEqual("2024/05/21-10:00");
  });

  // Tercera Historia de Usuario -> Patrick *********************************
  it("Se debe añadir un la cantidad de prueba para un commit", () => {
    let cantPruebas = 1;

    let commit2 = new Commit(cantPruebas);
    expect(commit2.getCantPruebas()).toEqual(1);
  });

  it("Se debe añadir un la cantidad de lineas para un commit", () => {
    let cantPruebas = 1;
    let cantLineas = 10;

    let commit2 = new Commit(cantPruebas, cantLineas);
    expect(commit2.getCantLineas()).toEqual(10);
  });

  it("Se debe añadir un la cobertura para un commit", () => {
    let cantPruebas = 1;
    let cantLineas = 10;
    let cobertura = 15;

    let commit2 = new Commit(cantPruebas, cantLineas, cobertura);
    expect(commit2.getCobertura()).toEqual(15);
  });

  // ********************************************************************
  // 7ta HU Arturo

  it("Deberia devolver cero para cantidad de lineas de cobertura", () => {
    let commit2 = new Commit(4, 2, 0);

    expect(commit2.getCobertura()).toEqual(0);
  });

  it("Deberia devolver 0 para cobertura igual a 0", () => {
    let commit2 = new Commit(4, 2, 0);
    expect(commit2.getCobertura()).toEqual(0);
  });

  it("El commit deberia de devolver 10 de porcentaje de cobertura", () => {
    let commit2 = new Commit(4, 2, 10);
    expect(commit2.getCobertura()).toEqual(10);
  });

  it("El commit deberia de devolver 100% de porcentaje de cobertura", () => {
    let commit2 = new Commit(4, 2, 100);
    expect(commit2.getCobertura()).toEqual(100);
  });

  it("El commit deberia de devolver 50% de porcentaje de cobertura enviado como parametro", () => {
    let commit2 = new Commit(4, 2, 50);
    expect(commit2.getCobertura()).toEqual(50);
  });

  it("El commit deberia de devolver un de porcentaje de cobertura enviado por parametro", () => {
    let commit2 = new Commit(4, 4, 100);
    expect(commit2.getCobertura()).toEqual(100);
  });

  it("El commit deberia de devolver un de porcentaje de cobertura como entrada", () => {
    let commit2 = new Commit(4, 100, 100);
    expect(commit2.getCobertura()).toEqual(100);
  });

  it("El commit deberia de devolver un porcentaje de cobertura enviado como parametro", () => {
    let commit2 = new Commit(4, 100, 5);
    expect(commit2.getCobertura()).toEqual(5);
  });

  // ********************************************************************
  // 8tavo Salvador
  it("El commit debería generar la recomendacion por defecto", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(4);
    let texto = "Buen trabajo en las pruebas aprobadas. ";
    expect(commitrec.getRecomendacion()).toEqual(texto);
  });

  it("El commit debería generar una recomendación positiva debido a las pruebas aprobadas", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(4);
    let texto = "Buen trabajo en las pruebas aprobadas. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("El commit debería generar una recomendación para mejorar debido a la poca cantidad de pruebas aprobadas", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(2);
    let texto = "Se recomienda mejorar la cantidad de pruebas aprobadas. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("El commit debería generar una recomendación debido a la cantidad regular de pruebas aprobadas", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("Generacion de un mensaje adicional de recomendacion referenciado a la cantidad de lineas de codigo", () => {
    let commitrec = new Commit(4, 501, 100);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("El commit deberia generar una recomendacion positiva en cuanto al manejo de la cantidad de las lineas de codigo", () => {
    let commitrec = new Commit(4, 102, 100);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("Generacion de un ultimo mensaje de recomendacion en base a la cobertura del commit dentro del proyecto", () => {
    let commitrec = new Commit(4, 102, 60);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. La cobertura de código es baja, considera añadir más pruebas.";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  // ********************************************************************
  // 2do Salvador
  it("El commit debería almacenar y devolver correctamente la complejidad", () => {
    let commit = new Commit(4, 100, 100, "Excelente");
    expect(commit.getComplejidad()).toEqual("Excelente");
  });



  // 4ta HU 2do SPRINT
  it("El commit debería de devolver la fecha correspondiente", () => {
    let commit = new Commit(4, 100, 100, "Excelente", "12/04/2024-08:24");
    expect(commit.getFechaHora()).toEqual("12/04/2024-08:24");
  });

  it("El commit debería de devolver la fecha ingresada en el constructor", () => {
    let commit = new Commit(4, 100, 100, "Excelente", "2024/05/20-09:23");
    expect(commit.getFechaHora()).toEqual("2024/05/20-09:23");
  });

  it("El commit debería de devolver la fecha ingresada con set", () => {
    let commit = new Commit(4, 100, 100, "Excelente", "2024-05-20");
    commit.setFechaHora("20/20/05-04:23");
    expect(commit.getFechaHora()).toEqual("20/20/05-04:23");
  });


  it("Se deberia poder crear un commit ahora con ID", () => {
    let commit = new Commit(4, 100, 100, "Excelente", "2024-05-20", 1);
    expect(commit.getId()).toEqual(1);
  });

});