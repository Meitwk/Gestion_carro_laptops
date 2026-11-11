
let totalEquipos = 30;
let fallasPendientes = 0;

let movimientos = [];

let estadoCarro = "Disponible";



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



function updateStatus() {

    document.getElementById("home-status").textContent =
        "Estado: " + estadoCarro;

    document.getElementById("cart-status").textContent =
        "Estado: " + estadoCarro;

    document.getElementById("dashboard-status").textContent =
        estadoCarro == "Disponible"
            ? "Disponible para retirar"
            : estadoCarro == "En uso"
                ? "Actualmente en uso"
                : "Necesita revisión";

}



function addActivity(title, description, icon) {

    let now = new Date();

    let time = now.toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit"
    });

    movimientos.unshift({
        title: title,
        description: description,
        icon: icon,
        time: time
    });


    if (movimientos.length > 5) {
        movimientos.pop();
    }

    renderActivity();

}



function renderActivity() {

    let activityList = document.getElementById("activity-list");

    activityList.innerHTML = "";

    if (movimientos.length == 0) {

        let empty = document.createElement("div");

        empty.className = "empty-activity";

        empty.innerHTML =
            '<span>◷</span>' +
            '<p>Aún no hay movimientos registrados.</p>' +
            '<small>Las actividades aparecerán aquí.</small>';

        activityList.appendChild(empty);

        return;
    }

    for (let i = 0; i < movimientos.length; i++) {

        let movement = movimientos[i];

        let item = document.createElement("article");

        item.className = "activity-item";

        let icon = document.createElement("div");
        icon.className = "activity-icon";
        icon.textContent = movement.icon;

        let details = document.createElement("div");
        details.className = "activity-details";

        let title = document.createElement("strong");
        title.textContent = movement.title;

        let description = document.createElement("p");
        description.textContent = movement.description;

        let time = document.createElement("span");
        time.className = "activity-time";
        time.textContent = movement.time;

        details.appendChild(title);
        details.appendChild(description);

        item.appendChild(icon);
        item.appendChild(details);
        item.appendChild(time);

        activityList.appendChild(item);

    }

}



function updateDashboard() {

    document.getElementById("dashboard-count").textContent =
        totalEquipos;

    document.getElementById("pending-count").textContent =
        fallasPendientes;

    document.getElementById("home-count").textContent =
        totalEquipos;

    document.getElementById("cart-count").textContent =
        totalEquipos;

    updateStatus();

}



function openCarroAction(action) {

    if (action == "retirar") {

        if (estadoCarro != "Disponible") {

            alert("El carro no está disponible para retirar.");

            return;
        }

        document.getElementById("dialog-title").textContent =
            "Retirar carro";

        document.getElementById("dialog-content").innerHTML =
            "<p>¿Confirmas que retirarás el carro de laptops CL-001?</p>";

        document.getElementById("dialog-confirm").onclick = function () {

            estadoCarro = "En uso";

            updateDashboard();

            addActivity(
                "Retiro del carro",
                "El carro CL-001 fue retirado.",
                "↗"
            );

            closeDialog();

            showScreen("carro");

            alert("Retiro registrado correctamente.");

        };

        document.getElementById("dialog-overlay").hidden = false;

    }

}



function openReturnDialog() {

    if (estadoCarro != "En uso") {

        alert("El carro no figura como retirado.");

        return;
    }

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

            estadoCarro = "Disponible";

            updateDashboard();

            addActivity(
                "Devolución del carro",
                "Los equipos fueron devueltos en buen estado.",
                "✓"
            );

            alert("Devolución registrada. ¡Gracias!");

        } else {

            estadoCarro = "Revisión requerida";

            updateDashboard();

            addActivity(
                "Devolución con observaciones",
                "Se indicó que hay equipos con fallas.",
                "!"
            );

            showScreen("fallas");

            document.getElementById("tipo").focus();

        }

    };

    document.getElementById("dialog-overlay").hidden = false;

}



function closeDialog() {

    document.getElementById("dialog-overlay").hidden = true;

}



document.getElementById("failure-form").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        let codigo = document.getElementById("codigo").value.trim();

        let tipo = document.getElementById("tipo").value;

        let descripcion =
            document.getElementById("descripcion").value.trim();


        if (codigo == "" || tipo == "" || descripcion == "") {

            alert("Completa todos los campos antes de enviar.");

            return;
        }


        fallasPendientes++;

        estadoCarro = "Revisión requerida";

        updateDashboard();


        addActivity(
            "Nuevo reporte de falla",
            codigo + " · " + tipo,
            "!"
        );


        document.getElementById("report-message").textContent =
            "Reporte registrado correctamente para " + codigo + ".";


        this.reset();

    }
);



updateDashboard();

renderActivity();
