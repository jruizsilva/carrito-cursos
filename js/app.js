// Funciones
const agregarCurso = (e) => {
	e.preventDefault();
	if (e.target.classList.contains("boton")) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		const datosCurso = obtenerDatos(cursoSeleccionado);

		// Valida si el curso ya se encuentra en el carrito
		if (cursosEnCarrito.some((curso) => curso.id === datosCurso.id)) {
			// Incrementamos la cantidad
			cursosEnCarrito = cursosEnCarrito.map((curso) => {
				if (curso.id === datosCurso.id) {
					curso.cantidad++;
					return curso;
				} else {
					return curso;
				}
			});
		} else {
			// Agregamos el curso
			cursosEnCarrito = [...cursosEnCarrito, datosCurso];
		}
		// Muestra los cursos agregados en el carrito
		mostrarCurso();
		console.log(cursosEnCarrito);
	}
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
	cursosEnCarrito.forEach((curso) => {
		const { titulo, src, precio, cantidad, id } = curso;
		const tableRow = document.createElement("tr");
		tableRow.innerHTML = `
        <td>
            <img src="${src}" />
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>`;
		listaCursosDelCarrito.appendChild(tableRow);
	});
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
		cursosEnCarrito = cursosEnCarrito.filter((curso) => curso.id !== idCurso);

		mostrarCurso();
	}
};
const vaciarCarrito = (e) => {
	e.preventDefault();
	cursosEnCarrito = [];
	limpiarHTML();
};

// Variables
const listaCursos = document.querySelector(".cursos");
const listaCursosDelCarrito = document.querySelector("#lista-carrito tbody");
const carrito = document.querySelector(".carrito-compras");
const btnVaciarCarrito = document.querySelector("#btn-vaciar-carrito");
let cursosEnCarrito = [];

const cargarEventListeners = () => {
	listaCursos.addEventListener("click", agregarCurso);
	carrito.addEventListener("click", eliminarCurso);
	btnVaciarCarrito.addEventListener("click", vaciarCarrito);
};
cargarEventListeners();
