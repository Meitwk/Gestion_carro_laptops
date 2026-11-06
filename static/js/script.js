let estado = "Disponible";

function mostrarPantalla(idPantalla, idNav) {
    // Ocultar todas las páginas
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));

    // Desactivar todos los botones de menú
    document.querySelectorAll(".btn-nav").forEach(nav => nav.classList.remove("active"));

    // Activar pantalla seleccionada
    const selectedPage = document.getElementById(`page-${idPantalla}`);
    if (selectedPage) selectedPage.classList.add("active");

    // Activar ítems de navegación (Desktop y Mobile)
    const navDesktop = document.getElementById(`nav-${idNav}`);
    const navMobile = document.getElementById(`mob-${idNav}`);
    if (navDesktop) navDesktop.classList.add("active");
    if (navMobile) navMobile.classList.add("active");
}

function cambiarEstado(nuevoEstado) {
    estado = nuevoEstado;
    document.querySelectorAll(".txt-estado").forEach(el => {
        el.textContent = estado;
    });
}

// Event Listeners seguros usando event delegation o verificación condicional
document.addEventListener("DOMContentLoaded", () => {
    // Menú PC
    document.getElementById("nav-inicio")?.addEventListener("click", () => mostrarPantalla("inicio", "inicio"));
    document.getElementById("nav-carro")?.addEventListener("click", () => mostrarPantalla("carro", "carro"));
    document.getElementById("nav-fallas")?.addEventListener("click", () => mostrarPantalla("fallas", "fallas"));

    // Menú Móvil
    document.getElementById("mob-inicio")?.addEventListener("click", () => mostrarPantalla("inicio", "inicio"));
    document.getElementById("mob-carro")?.addEventListener("click", () => mostrarPantalla("carro", "carro"));
    document.getElementById("mob-fallas")?.addEventListener("click", () => mostrarPantalla("fallas", "fallas"));

    // Botones de las tarjetas de Inicio
    document.getElementById("btn-ir-carro")?.addEventListener("click", () => mostrarPantalla("carro", "carro"));
    document.getElementById("btn-ir-fallas")?.addEventListener("click", () => mostrarPantalla("fallas", "fallas"));

    // Botones "Volver"
    document.getElementById("back-carro")?.addEventListener("click", () => mostrarPantalla("inicio", "inicio"));
    document.getElementById("back-fallas")?.addEventListener("click", () => mostrarPantalla("inicio", "inicio"));

    // Botones de Retirar y Devolver (Fijar clic sobre el contenedor o sobre la imagen)
    document.getElementById("btn-retirar")?.addEventListener("click", () => cambiarEstado("En Uso"));
    document.getElementById("btn-devolver")?.addEventListener("click", () => cambiarEstado("Disponible"));

    // Formulario
    document.getElementById("form-falla")?.addEventListener("submit", (e) => {
        e.preventDefault();
        e.target.reset();
        mostrarPantalla("inicio", "inicio");
    });
});