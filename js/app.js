//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar"
    listaCursos.addEventListener('click',agregarCurso);

    //Eliman cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar el carrito
    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = [];//Reseteamos el html
        limpiarHTML();//Eliminamos todo el HTML
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//Elimna un curso del carrito
function eliminarCurso(e) {

    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

//Lee el contenido del HTML
function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio .oferta').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos
        const cursos = articulosCarrito.map(curso=>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al arreglo de carrito
         articulosCarrito = [...articulosCarrito, infoCurso];
    }   

    
       console.log(articulosCarrito);
       carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y crea el HTML
    articulosCarrito.forEach(curso=>{

        const {imagen, titulo, precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}"></td>    
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;

        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML() {

    // contenedorCarrito.innerHTML ='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}