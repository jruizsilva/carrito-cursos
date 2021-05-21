// Funciones
const startApp = () => {
	getDataBD();
};
const agregarCurso = (e) => {
	e.preventDefault();
	if (e.target.classList.contains("boton")) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		const datosCurso = obtenerDatos(cursoSeleccionado);

		if (arrayCarrito.some((curso) => curso.id === datosCurso.id)) {
			increaseCourse(datosCurso);
		} else {
			arrayCarrito = [...arrayCarrito, datosCurso];
		}
		setDataDB();
		getDataBD();
	}
};
const increaseCourse = ({ id }) => {
	arrayCarrito = arrayCarrito.map((curso) => {
		if (curso.id === id) {
			curso.cantidad++;
			return curso;
		} else {
			return curso;
		}
	});
};
const obtenerDatos = (curso) => {
	return {
		titulo: curso.querySelector("h4").textContent,
		src: curso.querySelector("img").getAttribute("src"),
		precio: curso.querySelector(".precio .oferta").textContent,
		cantidad: 1,
		id: curso.querySelector("a").getAttribute("data-id"),
	};
};
const mostrarCurso = () => {
	limpiarHTML();
	const fragment = document.createDocumentFragment();
	const template = document.querySelector("#template").content;
	arrayCarrito.forEach((curso) => {
		const { titulo, src, precio, cantidad, id } = curso;
		template.querySelector("#template-img").setAttribute("src", src);
		template.querySelector("#template-titulo").textContent = titulo;
		template.querySelector("#template-precio").textContent = precio;
		template.querySelector("#template-cantidad").textContent = cantidad;
		template.querySelector("#template-btn").setAttribute("data-id", id);

		const clone = template.cloneNode(true);
		fragment.appendChild(clone);
	});
	listaCursosDelCarrito.appendChild(fragment);
};
const limpiarHTML = () => {
	while (listaCursosDelCarrito.firstChild) {
		listaCursosDelCarrito.removeChild(listaCursosDelCarrito.firstChild);
	}
};
const eliminarCurso = (e) => {
	e.preventDefault();
	if (e.target.classList.contains("borrar-curso")) {
		const idCurso = e.target.getAttribute("data-id");
		arrayCarrito = arrayCarrito.filter((curso) => curso.id !== idCurso);

		setDataDB();
		getDataBD();
	}
};
const vaciarCarrito = (e) => {
	e.preventDefault();
	arrayCarrito = [];
	limpiarHTML();
};
const setDataDB = () => {
	localStorage.setItem("cursos", JSON.stringify(arrayCarrito));
};
const getDataBD = () => {
	arrayCarrito = JSON.parse(localStorage.getItem("cursos")) || [];
	mostrarCurso();
};

// Variables
const listaCursos = document.querySelector(".cursos");
const listaCursosDelCarrito = document.querySelector("#lista-carrito tbody");
const carrito = document.querySelector(".carrito-compras");
const btnVaciarCarrito = document.querySelector("#btn-vaciar-carrito");
let arrayCarrito = [];

const cargarEventListeners = () => {
	listaCursos.addEventListener("click", agregarCurso);
	carrito.addEventListener("click", eliminarCurso);
	btnVaciarCarrito.addEventListener("click", vaciarCarrito);
	document.addEventListener("DOMContentLoaded", startApp);
};
cargarEventListeners();
