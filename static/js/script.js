
// CAMBIAR ENTRE LAS TRES PANTALLAS

function showScreen(screenName) {

    let screens = document.getElementsByClassName("screen");

    for (let i = 0; i < screens.length; i++) {
        screens[i].classList.remove("active");
    }

    document.getElementById(screenName).classList.add("active");

    let navItems = document.getElementsByClassName("nav-item");

    for (let i = 0; i < navItems.length; i++) {

        navItems[i].classList.remove("active");

        if (navItems[i].getAttribute("data-screen") == screenName) {
            navItems[i].classList.add("active");
        }

    }

    document.getElementById("report-message").textContent = "";

}


// RETIRAR EL CARRO

function openCarroAction(action) {

    if (action == "retirar") {

        document.getElementById("dialog-title").textContent =
            "Retirar carro";

        document.getElementById("dialog-content").innerHTML =
            "<p>¿Confirmas que retirarás el carro de laptops CL-001?</p>";

        document.getElementById("dialog-confirm").onclick = function () {

            document.getElementById("home-status").textContent =
                "Estado: En uso";

            document.getElementById("cart-status").textContent =
                "Estado: En uso";

            closeDialog();

            showScreen("carro");

            alert("Retiro registrado correctamente.");

        };

        document.getElementById("dialog-overlay").hidden = false;

    }

}


// DEVOLVER EL CARRO

function openReturnDialog() {

    document.getElementById("dialog-title").textContent =
        "Devolver carro";

    document.getElementById("dialog-content").innerHTML =

        '<p>Selecciona el estado de los equipos:</p>' +

        '<label><input type="radio" name="estado" value="bueno" checked> Todos los equipos están en buen estado.</label>' +

        '<label><input type="radio" name="estado" value="falla"> Hay equipos con fallas o daños.</label>';


    document.getElementById("dialog-confirm").onclick = function () {

        let selected = document.querySelector(
            'input[name="estado"]:checked'
        ).value;

        closeDialog();

        if (selected == "bueno") {

            document.getElementById("home-status").textContent =
                "Estado: Disponible";

            document.getElementById("cart-status").textContent =
                "Estado: Disponible";

            alert("Devolución registrada. ¡Gracias!");

        } else {

            showScreen("fallas");

            document.getElementById("tipo").focus();

        }

    };

    document.getElementById("dialog-overlay").hidden = false;

}


// CERRAR VENTANA

function closeDialog() {

    document.getElementById("dialog-overlay").hidden = true;

}


// ENVIAR REPORTE DE FALLA

document.getElementById("failure-form").addEventListener("submit", function(event) {

    event.preventDefault();

    let codigo = document.getElementById("codigo").value;

    let tipo = document.getElementById("tipo").value;

    let descripcion = document.getElementById("descripcion").value;


    document.getElementById("report-message").textContent =

        "Reporte registrado: " + codigo +
        " — " + tipo + ". " + descripcion;


    this.reset();

});
