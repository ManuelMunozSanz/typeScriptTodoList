import { Tarea } from "./tarea.js";
/* Tareas por defecto */
let allTask = {};
let clave = Object.keys(allTask).length;
allTask[clave++] = new Tarea("Tarea2", "Desc2", 2, 2);
allTask[clave++] = new Tarea("Tarea1", "Desc1", 1, 4);
allTask[clave++] = new Tarea("Tarea3", "Desc3", 1, 2);
allTask[clave++] = new Tarea("Tarea4", "Desc4", 1, 1);
allTask[clave++] = new Tarea("Tarea5", "Desc4", 3, 1);
allTask[clave++] = new Tarea("Tarea6", "Desc4", 4, 1);
allTask[clave++] = new Tarea("Tarea7", "Desc4", 3, 1);
allTask[clave++] = new Tarea("Tarea8", "Desc4", 4, 1);
// DEFINIMOS LOS UL 
const allTaskUl = document.getElementById("allTaskUl");
const todoUl = document.getElementById("todoUl");
const doingUl = document.getElementById("doingUl");
const doneUl = document.getElementById("doneUl");
const deletedUl = document.getElementById("deletedUl");
// DEFINIMOS LOS CAMPOS DEL FORMULARIO
const capaGris = document.getElementById("capaGris");
const desplegarAnadirTarea = document.getElementById("desplegarAnadirTarea");
const tareaForm = document.getElementById("tareaForm");
const nomForm = tareaForm["nomForm"];
const descForm = tareaForm["descForm"];
const estadoForm = tareaForm["tareasSelect"];
// DEFINIMOS EL ELEMENTO QUE QUEREMOS CLONAR 
const tareaAClonar = document.getElementById("componenteTareaCont");
const lista = tareaAClonar.firstElementChild;
// DEFINIMOS LOS ESTADOS DESPLEGABLES QUE QUEREMOS CLONAR
const estadosAClonar = document.getElementById("cambiarEstadoCont");
const estadosClonar = estadosAClonar.firstElementChild;
const estadosTemplate = estadosClonar.cloneNode(true);
const elementosLista = document.querySelector(".listas");
//DEFINIR BOTONES BORRAR LISTA
const todoDelete = document.getElementById("todoDelete");
const doingDelete = document.getElementById("doingDelete");
const doneDelete = document.getElementById("doneDelete");
mostrarElementos();
tareaForm.onsubmit = (e) => {
    e.preventDefault();
    tareaForm.style.display = "none";
    capaGris.style.display = "none";
    let nom = nomForm.value;
    let des = descForm.value;
    let est = parseInt(estadoForm.value);
    let claveAdd = clave++;
    let valorAdd = new Tarea(nom, des, est, 0);
    let claveValor = {};
    claveValor[claveAdd] = valorAdd;
    //Agrega al array la nueva tarea
    allTask[claveAdd] = valorAdd;
    addElemento(claveValor, true);
    tareaForm.reset();
};
function addElemento(element, creado) {
    let valor = Object.values(element)[0];
    let claveElement = Object.keys(element)[0];
    /* Clonamos la tarea, le introducimos el nombre y lo añadimos al ul */
    const template = lista.cloneNode(true);
    template.setAttribute("name", claveElement);
    const text = template.getElementsByClassName("nomTarea");
    text[0].innerHTML = valor.nombre;
    if (valor.estado === 1) {
        todoUl.appendChild(template);
    }
    else if (valor.estado === 2) {
        doingUl.appendChild(template);
    }
    else if (valor.estado === 3) {
        doneUl.appendChild(template);
    }
    else if (valor.estado === 4) {
        deletedUl.appendChild(template);
    }
    if (creado) {
        allTaskUl.appendChild(template.cloneNode(true));
    }
}
function mostrarElementos() {
    Object.entries(allTask).forEach(([key, value]) => {
        let claveValor = {};
        claveValor[key] = value;
        addElemento(claveValor, true);
    });
}
function borrarTarea(claveBorrar) {
    let valorBorrar = allTask[claveBorrar];
    valorBorrar.estado = 4;
    let claveValor = {};
    claveValor[claveBorrar] = valorBorrar;
    addElemento(claveValor, false);
}
function borrarLista(numLista) {
    let text = "¿Seguro que quieres borrar la lista?";
    if (confirm(text)) {
        Object.entries(allTask).forEach(([key, value]) => {
            if (value.estado === numLista) {
                value.estado = 4;
                let claveValor = {};
                claveValor[key] = value;
                addElemento(claveValor, false);
            }
        });
        vaciarLista(numLista);
    }
}
function cambiarEstado(claveCambiar, estadoCambiar) {
    let valorCambiar = allTask[claveCambiar];
    valorCambiar.estado = estadoCambiar;
    let claveValor = {};
    claveValor[claveCambiar] = valorCambiar;
    addElemento(claveValor, false);
}
function vaciarLista(lista) {
    if (lista === 1) {
        todoUl.innerHTML = "";
    }
    else if (lista === 2) {
        doingUl.innerHTML = "";
    }
    else if (lista === 3) {
        doneUl.innerHTML = "";
    }
}
// -------------------- LISTENERS ------------------------
desplegarAnadirTarea.addEventListener("click", (e) => {
    if (tareaForm.style.display === "none") {
        tareaForm.style.display = "block";
        capaGris.style.display = "block";
    }
    else {
        capaGris.style.display = "none";
    }
});
capaGris.addEventListener("click", (e) => {
    tareaForm.style.display = "none";
    capaGris.style.display = "none";
});
// BORRAR LISTA
todoDelete.addEventListener("click", (e) => {
    e.preventDefault();
    borrarLista(1);
});
doingDelete.addEventListener("click", (e) => {
    e.preventDefault();
    borrarLista(2);
});
doneDelete.addEventListener("click", (e) => {
    e.preventDefault();
    borrarLista(3);
});
elementosLista.addEventListener("click", (e) => {
    e.preventDefault();
    let targetEvento = e.target;
    // SOLO PERMITE UN DESPLEGABLE ABIERTO
    let numEstadoCont = document.getElementsByClassName("cambiarEstadoCont").length;
    if (targetEvento.className.includes("cambiarLista")) {
        if (numEstadoCont === 1) {
            let elementoLista = targetEvento.parentElement.parentElement;
            elementoLista.after(estadosTemplate);
        }
        else {
            estadosTemplate.remove();
        }
        // BORRAR TAREA
    }
    else if (targetEvento.className.includes("borrarTareaI")) {
        let tareaSeleccionada = targetEvento.parentElement.parentElement;
        let clave = tareaSeleccionada.getAttribute("name");
        tareaSeleccionada.remove();
        borrarTarea(clave);
        // CAMBIAR DE ESTADO
    }
    else if (targetEvento.className.includes("cambiarTodo")) {
        let tareaSeleccionada = targetEvento.parentElement.previousElementSibling;
        let desplegable = targetEvento.parentElement;
        let clave = tareaSeleccionada.getAttribute("name");
        desplegable.remove();
        tareaSeleccionada.remove();
        cambiarEstado(clave, 1);
    }
    else if (targetEvento.className.includes("cambiarDoing")) {
        let tareaSeleccionada = targetEvento.parentElement.previousElementSibling;
        let desplegable = targetEvento.parentElement;
        let clave = tareaSeleccionada.getAttribute("name");
        desplegable.remove();
        tareaSeleccionada.remove();
        cambiarEstado(clave, 2);
    }
    else if (targetEvento.className.includes("cambiarDone")) {
        let tareaSeleccionada = targetEvento.parentElement.previousElementSibling;
        let desplegable = targetEvento.parentElement;
        let clave = tareaSeleccionada.getAttribute("name");
        desplegable.remove();
        tareaSeleccionada.remove();
        cambiarEstado(clave, 3);
    }
});
