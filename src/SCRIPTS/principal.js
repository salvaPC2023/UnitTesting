import ArrayCommit from "../OBJETOS/commitsArray";
import ArrayProyectos from "../OBJETOS/proyectosArray";
import crearElemento from "./crearElemento";
import formatearFecha from "./formatearFecha";

const arrayProyectos = new ArrayProyectos();

const btnAniadirProyecto = document.getElementById('btnAniadirProyecto');
const formularioProyecto = document.getElementById('proyectoForm');
const inputTituloProyecto = document.getElementById('inputTitulo');
const btnConfirmarProyecto = document.getElementById('btnConfirmProyecto');
const contenedorProyectos = document.getElementById('proyectoContainer');
const mensajeError = document.getElementById('mensajeError');

const btnMostrarRanking = document.getElementById('btnMostrarRanking');

let estilo = "none";
let estiloCommit = "none";

btnAniadirProyecto.addEventListener('click', mostrarFormularioProyecto);
btnConfirmarProyecto.addEventListener('click', confirmarProyecto);

btnMostrarRanking.addEventListener('click', mostrarRankingProyectos);

function mostrarFormularioProyecto() {
    btnAniadirProyecto.style.display = 'none';
    formularioProyecto.style.display = 'block';
}

function manejarArchivoSeleccionado(event, proyecto) {
    const archivo = event.target.files[0];
    const lector = new FileReader();

    lector.onload = function (event) {
        const contenidoArch = event.target.result;

        const proyectoSeleccionado = arrayProyectos.proyectosArray.find(p => p.getTitulo() === proyecto);

        const resultado = proyectoSeleccionado.ingresarCommitsPorContenidoDe(contenidoArch); // Pasar la ruta y el contenido

        if (resultado === "Archivo leido") {
            alert("Commits añadidos con éxito desde el archivo, pulsa el boton ver commits.");
            actualizarListaProyectos(); // Actualizar la lista de proyectos después de añadir los commits
        } else {
            alert("Archivo.txt vacio sin contenido");
        }
    };

    lector.onerror = function () {
        mostrarMensajeError("Error al cargar el archivo.");
    };

    lector.readAsText(archivo);
}



function confirmarProyecto() {
    const tituloProyecto = inputTituloProyecto.value;
    if (tituloProyecto) {
        arrayProyectos.aniadirProyecto(tituloProyecto);
        inputTituloProyecto.value = '';
        formularioProyecto.style.display = 'none';
        actualizarListaProyectos();

        mostrarMensajeExito("Proyecto añadido con éxito");

        btnAniadirProyecto.style.display = 'block';
        mensajeError.textContent = '';
        mensajeError.style.display = 'none';
    } else {
        mensajeError.textContent = 'Por favor ingrese un título para el proyecto.';
        mensajeError.style.display = 'block';
    }
}

function mostrarMensajeExito(mensaje) {
    const mensajeExito = crearElemento("div", mensaje);
    const botonAceptar = crearElemento("button", "Aceptar");

    botonAceptar.addEventListener('click', () => {
        contenedorProyectos.removeChild(mensajeExito);
    });

    mensajeExito.appendChild(botonAceptar);
    contenedorProyectos.appendChild(mensajeExito);
}

function actualizarListaProyectos() {
    btnMostrarRanking.style.display = 'block';
    contenedorProyectos.innerHTML = '';
    const proyectos = arrayProyectos.getProyectos();
    proyectos.forEach(proyecto => {
        const proyectoElement = crearElementoProyecto(proyecto);
        contenedorProyectos.appendChild(proyectoElement);
    });
}

function crearElementoProyecto(proyecto) {
    const proyectoElement = crearElemento("div", proyecto);

    const btnIngresarCommitsPorArchivoTxt = crearElemento("button", "subir commits en archivo.txt");
    btnIngresarCommitsPorArchivoTxt.addEventListener('click', () => {
        // Estilo de bloquear otros elementos mientras se carga el archivo
        estilo = "none";
        estiloCommit = "none";

        // Crear input para seleccionar archivo y disparar su evento de cambio
        const inputArchivo = document.createElement('input');
        inputArchivo.type = 'file';
        inputArchivo.accept = '.txt'; // Aceptar solo archivos de texto
        inputArchivo.addEventListener('change', (event) => {
            manejarArchivoSeleccionado(event, proyecto);
        });
        inputArchivo.click(); // Simular clic en el input de archivo
    });
    proyectoElement.appendChild(btnIngresarCommitsPorArchivoTxt);


    const btnVerCommits = crearElemento("button", "Ver Commits");
    btnVerCommits.addEventListener('click', () => {
        estilo = "none";
        estiloCommit = "none";
        ingresarAlProyecto(proyecto);
    });
    proyectoElement.appendChild(btnVerCommits);

    const btnVerPuntaje = crearElemento("button", "Ver Puntaje del Proyecto");
    btnVerPuntaje.addEventListener('click', () => {
        estilo = "none";
        estiloCommit = "none";
        ingresarPuntajeProyecto(proyecto);
    });
    proyectoElement.appendChild(btnVerPuntaje);

    const btnEliminarProyecto = crearElemento("button", "Eliminar Proyecto");
    btnEliminarProyecto.addEventListener('click', () => {
        if (window.confirm('¿Estás seguro de que deseas borrar este proyecto?')) {
            arrayProyectos.borrarProyecto(proyecto);
            actualizarListaProyectos();
        }
    });
    proyectoElement.appendChild(btnEliminarProyecto);

    return proyectoElement;
}

function ingresarAlProyecto(nombreProyecto) {
    const proyectoSeleccionado = arrayProyectos.proyectosArray.find(proyecto => proyecto.getTitulo() === nombreProyecto);
    if (proyectoSeleccionado) {
        contenedorProyectos.innerHTML = '';
        const tituloProyectoElement = crearElemento('h2', `Proyecto: ${nombreProyecto}`);
        contenedorProyectos.appendChild(tituloProyectoElement);

        const btnVolver = crearElemento('button', 'Volver a la lista de proyectos');
        btnVolver.addEventListener('click', actualizarListaProyectos);
        contenedorProyectos.appendChild(btnVolver);

        const ultimoCommitBorrado = crearElemento('div', 'Último commit borrado correctamente');
        const botonAceptarCommitBorrado = crearElemento('button', 'Aceptar');
        ultimoCommitBorrado.style.display = estiloCommit;
        botonAceptarCommitBorrado.addEventListener('click', () => {
            contenedorProyectos.removeChild(ultimoCommitBorrado);
        });
        ultimoCommitBorrado.appendChild(botonAceptarCommitBorrado);
        contenedorProyectos.appendChild(ultimoCommitBorrado);
        proyectoSeleccionado.getArrayCommit().calcularFrecuenciaCommits();
        mostrarCommits(proyectoSeleccionado);

        const formularioCommit = crearFormularioCommit(proyectoSeleccionado, nombreProyecto);
        contenedorProyectos.appendChild(formularioCommit);
    }
}

function mostrarCommits(proyectoSeleccionado) {

    const commitsProyecto = proyectoSeleccionado.mostrarCommits();

    const listaCommits = crearElemento('ul');

    if (commitsProyecto.length > 0) {
        const btnEliminarUltimoCommit = crearElemento('button', 'Eliminar Último Commit');
        btnEliminarUltimoCommit.addEventListener('click', () => {
            btnEliminarUltimoCommit.style.display = 'none';
            const confirmMessage = crearElemento('div', '¿Está seguro de que desea eliminar el último commit?');
            confirmMessage.style.color = 'red';
            const btnConfirmar = crearElemento('button', 'Confirmar');
            btnConfirmar.style.backgroundColor = 'red';
            btnConfirmar.addEventListener('click', () => {
                estilo = 'none';
                proyectoSeleccionado.eliminarUltimoCommit();
                estiloCommit = "block";
                ingresarAlProyecto(proyectoSeleccionado.getTitulo());
            });
            contenedorProyectos.appendChild(confirmMessage);
            contenedorProyectos.appendChild(btnConfirmar);
        });
        contenedorProyectos.appendChild(btnEliminarUltimoCommit);
    }

    commitsProyecto.forEach(commit => {
        const commitItem = crearElemento('li', `Pruebas: ${commit.cantPruebas}, Líneas: ${commit.cantLineas}, Cobertura: ${commit.cobertura}%, Complejidad: ${commit.complejidad}, Frecuencia: ${commit.frecuencia}`);
        // const btnMostrarRecomendacion = crearElemento('button', 'Ver recomendación');
        // let paragraph;
        /*
        btnMostrarRecomendacion.addEventListener('click', () => {
            if (!paragraph) {
                paragraph = crearElemento('p', commit.recomendacion);
                commitItem.appendChild(paragraph);
                btnMostrarRecomendacion.textContent = 'Ocultar recomendación';
            } else {
                commitItem.removeChild(paragraph);
                paragraph = null;
                btnMostrarRecomendacion.textContent = 'Ver recomendación';
            }
        });
        */
        // commitItem.appendChild(btnMostrarRecomendacion);
        listaCommits.appendChild(commitItem);
    });
    contenedorProyectos.appendChild(listaCommits);
}

function crearFormularioCommit(proyectoSeleccionado, nombreProyecto) {
    const tituloCommit = crearElemento('h3', 'Añadir commit');
    const formularioCommit = crearElemento('form');
    const labelFecha = crearElemento('label', 'Fecha y Hora:');
    const inputFecha = crearElemento('input', '');
    inputFecha.type = 'datetime-local';
    inputFecha.id = 'datetime';
    const inputCantPruebas = crearInputNumerico('Cantidad de pruebas');

    const inputCantLineas = crearInputNumerico('Cantidad de líneas');
    const inputCobertura = crearInputNumerico('Porcentaje de cobertura');
    const inputComplejidad = crearElemento('input', '');
    inputComplejidad.type = 'text';
    inputComplejidad.placeholder = 'Complejidad (Excelente, Bueno, Regular, Deficiente)';
    const btnConfirmarCommit = crearElemento('button', 'Agregar Commit');

    const commitExito = crearElemento('div', 'Commit añadido con éxito');
    const botonAceptarCommit = crearElemento('button', 'Aceptar');
    commitExito.style.display = estilo;
    botonAceptarCommit.addEventListener('click', () => {
        contenedorProyectos.removeChild(commitExito);
    });
    commitExito.appendChild(botonAceptarCommit);
    contenedorProyectos.appendChild(commitExito);

    btnConfirmarCommit.addEventListener('click', () => {
        const cantPruebas = parseInt(inputCantPruebas.value);
        const fechaOriginal = inputFecha.value;
        const Fecha = formatearFecha(fechaOriginal);
        const cantLineas = parseInt(inputCantLineas.value);
        const cobertura = parseInt(inputCobertura.value);
        const complejidad = inputComplejidad.value;
        if (!isNaN(cantPruebas) && !isNaN(cantLineas) && cantPruebas >= 0 && cantLineas >= 0) {
            proyectoSeleccionado.aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad, Fecha);
            estilo = "block";
            estiloCommit = "none";
            ingresarAlProyecto(nombreProyecto);
        } else {
            mostrarMensajeError('Por favor ingrese valores numéricos válidos.');
            estilo = "none";
            estiloCommit = "none";
            ingresarAlProyecto(nombreProyecto);
        }
    });

    formularioCommit.appendChild(tituloCommit);
    formularioCommit.appendChild(labelFecha);
    formularioCommit.appendChild(inputFecha);
    formularioCommit.appendChild(inputCantPruebas);

    formularioCommit.appendChild(inputCantLineas);
    formularioCommit.appendChild(inputCobertura);
    formularioCommit.appendChild(inputComplejidad);
    formularioCommit.appendChild(btnConfirmarCommit);
    return formularioCommit;
}

function crearInputNumerico(placeholder) {
    const input = crearElemento('input', '');
    input.type = 'number';
    input.placeholder = placeholder;
    return input;
}

function mostrarMensajeError(mensaje) {
    const mensajeError = crearElemento('div', mensaje);
    contenedorProyectos.appendChild(mensajeError);
}

function ingresarPuntajeProyecto(nombreProyecto) {
    contenedorProyectos.innerHTML = '';
    const proyectoSeleccionado = arrayProyectos.proyectosArray.find(proyecto => proyecto.getTitulo() === nombreProyecto);
    if (!proyectoSeleccionado) {
        const mensajeError = crearElemento('p', 'No se encontró el proyecto seleccionado.');
        contenedorProyectos.appendChild(mensajeError);

        const btnVolver = crearElemento('button', 'Volver a la lista de proyectos');
        btnVolver.addEventListener('click', actualizarListaProyectos);
        contenedorProyectos.appendChild(btnVolver);

        return;
    }
    const tituloProyecto = crearElemento('h2', `Proyecto: ${nombreProyecto}`);
    contenedorProyectos.appendChild(tituloProyecto);

    const btnVolver = crearElemento('button', 'Volver a la lista de proyectos');
    btnVolver.addEventListener('click', actualizarListaProyectos);
    contenedorProyectos.appendChild(btnVolver);
    /////////////////////////////////
    const tituloCantPruebas = crearElemento('p', `Cantidad de Pruebas por Commit (20%)`);
    contenedorProyectos.appendChild(tituloCantPruebas);

    const puntajeCantPruebas = proyectoSeleccionado.getPuntajeCantPruebas(proyectoSeleccionado.getArrayCommit());
    const puntajeTextCantPruebas = proyectoSeleccionado.obterPuntuacionTexto(puntajeCantPruebas);
    const puntuacionCantPruebas = crearElemento('li', `${puntajeCantPruebas} puntos (${puntajeTextCantPruebas})`);
    contenedorProyectos.appendChild(puntuacionCantPruebas);
    ////////////////////////////////
    const tituloCantLineas = crearElemento('p', `Cantidad de Lineas por Commit (20%)`);
    contenedorProyectos.appendChild(tituloCantLineas);

    const puntajeCantLineas = proyectoSeleccionado.getPuntajeCantLineas(proyectoSeleccionado.getArrayCommit());
    const puntajeTextCantLineas = proyectoSeleccionado.obterPuntuacionTexto(puntajeCantPruebas);
    const puntuacionCantLineas = crearElemento('li', `${puntajeCantLineas} puntos (${puntajeTextCantLineas})`);
    contenedorProyectos.appendChild(puntuacionCantLineas);
    ///////////////////////////
    const tituloCobertura = crearElemento('p', `Porcentaje de Cobertura de Pruebas por Commit (20%)`);
    contenedorProyectos.appendChild(tituloCobertura);

    const puntajeCobertura = proyectoSeleccionado.getPuntajeCobertura(proyectoSeleccionado.getArrayCommit());
    const puntajeTextCobertura = proyectoSeleccionado.obterPuntuacionTexto(puntajeCobertura);
    const puntuacionCobertura = crearElemento('li', `${puntajeCobertura} puntos (${puntajeTextCobertura})`);
    contenedorProyectos.appendChild(puntuacionCobertura);
    //////////////////////////////
    const tituloFrecuencia = crearElemento('p', `Frecuencia de Commits (20%)`);
    contenedorProyectos.appendChild(tituloFrecuencia);

    const puntajeFrecuencia = proyectoSeleccionado.getPuntajeFrecuenciaCommits(proyectoSeleccionado.getArrayCommit());
    const puntajeTextFrecuencia = proyectoSeleccionado.obterPuntuacionTexto(puntajeFrecuencia);
    const puntuacionFrecuencia = crearElemento('li', `${puntajeFrecuencia} puntos (${puntajeTextFrecuencia})`);
    contenedorProyectos.appendChild(puntuacionFrecuencia);
    ////////////////////////////////
    const tituloComplejidad = crearElemento('p', `Complejidad de Código (20%)`);
    contenedorProyectos.appendChild(tituloComplejidad);

    const puntajeComplejidad = proyectoSeleccionado.getPuntajeFrecuenciaCommits(proyectoSeleccionado.getArrayCommit());
    const puntajeTextComplejidad = proyectoSeleccionado.obterPuntuacionTexto(puntajeComplejidad);
    const puntuacionComplejidad = crearElemento('li', `${puntajeComplejidad} puntos (${puntajeTextComplejidad})`);
    contenedorProyectos.appendChild(puntuacionComplejidad);
}

function mostrarRankingProyectos() {
    btnMostrarRanking.style.display = 'none';

    contenedorProyectos.innerHTML = '';
    const ranking = arrayProyectos.obtenerRankingDeProyectos();

    const listaRanking = crearElemento('ol');

    ranking.forEach(proyecto => {
        const itemRanking = crearElemento('li', `${proyecto.titulo} - Puntaje: ${proyecto.puntajeTotal}`);
        listaRanking.appendChild(itemRanking);
    });

    contenedorProyectos.appendChild(listaRanking);

    const btnVolver = crearElemento('button', 'Volver a la lista de proyectos');
    btnVolver.addEventListener('click', actualizarListaProyectos);
    contenedorProyectos.appendChild(btnVolver);
}

actualizarListaProyectos();