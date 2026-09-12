const USUARIO_VALIDO = "admin";
const PASSWORD_VALIDO = "1234";

function validarLogin(event) {
    event.preventDefault(); 

    const usuario = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("login-mensaje");

    if (usuario === "" || password === "") {
        mostrarMensajeLogin(mensaje, "Por favor completa ambos campos.", "danger");
        return;
    }

    if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {
        mostrarMensajeLogin(mensaje, "Inicio de sesión exitoso. Redirigiendo...", "success");
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1200);
    } else {
        mostrarMensajeLogin(mensaje, "Usuario o contraseña incorrectos.", "danger");
    }
}

function mostrarMensajeLogin(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `alert alert-${tipo} mt-3`;
    elemento.classList.remove("d-none");
}

function inicializarLogin() {
    const form = document.getElementById("login-form");
    if (form) {
        form.addEventListener("submit", validarLogin);
    }
}

function inicializarBotonesDemo() {
    const btnSaludo = document.getElementById("btn-saludo");
    const salidaSaludo = document.getElementById("salida-saludo");

    if (btnSaludo && salidaSaludo) {
        btnSaludo.addEventListener("click", () => {
            const hora = new Date().toLocaleTimeString();
            salidaSaludo.textContent = `¡Hola! Hiciste clic a las ${hora}.`;
        });
    }

    const btnContador = document.getElementById("btn-contador");
    const salidaContador = document.getElementById("salida-contador");
    let contador = 0;

    if (btnContador && salidaContador) {
        btnContador.addEventListener("click", () => {
            contador++;
            salidaContador.textContent = `Has hecho clic ${contador} vez(ces).`;
        });
    }
}

function inicializarRadioButtons() {
    const radios = document.querySelectorAll('input[name="contacto"]');
    const campoEmail = document.getElementById("campo-email");
    const campoTelefono = document.getElementById("campo-telefono");

    if (radios.length === 0) return; 

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            campoEmail.classList.add("d-none");
            campoTelefono.classList.add("d-none");

            if (radio.value === "email" && radio.checked) {
                campoEmail.classList.remove("d-none");
            } else if (radio.value === "telefono" && radio.checked) {
                campoTelefono.classList.remove("d-none");
            }
        });
    });
}

function inicializarDropdownsPaisRegion() {
    const selectPais = document.getElementById("select-pais");
    const selectRegion = document.getElementById("select-region");

    if (!selectPais || typeof countryRegionData === "undefined") return;

    countryRegionData.forEach((pais, index) => {
        const option = document.createElement("option");
        option.value = index; 
        option.textContent = pais.countryName;
        selectPais.appendChild(option);
    });

    selectPais.addEventListener("change", () => {
        selectRegion.innerHTML = "";

        const indice = selectPais.value;

        if (indice === "") {
            selectRegion.innerHTML = '<option value="">Primero selecciona un país...</option>';
            selectRegion.disabled = true;
            return;
        }

        const pais = countryRegionData[indice];
        const regiones = pais.regions || [];

        if (regiones.length === 0) {
            selectRegion.innerHTML = '<option value="">Este país no tiene regiones registradas</option>';
            selectRegion.disabled = true;
            return;
        }

        selectRegion.innerHTML = '<option value="">Selecciona una región...</option>';
        regiones.forEach((region) => {
            const option = document.createElement("option");
            option.value = region.shortCode;
            option.textContent = region.name;
            selectRegion.appendChild(option);
        });

        selectRegion.disabled = false;
    });
}

function inicializarCheckboxes() {
    const check1 = document.getElementById("check-terminos");
    const check2 = document.getElementById("check-privacidad");
    const btnEnviar = document.getElementById("btn-enviar");

    if (!check1 || !check2 || !btnEnviar) return;

    function actualizarBoton() {
        btnEnviar.disabled = !(check1.checked && check2.checked);
    }

    check1.addEventListener("change", actualizarBoton);
    check2.addEventListener("change", actualizarBoton);
}

function inicializarEnvioFormulario() {
    const form = document.getElementById("practica-form");
    const mensaje = document.getElementById("form-mensaje");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        mensaje.textContent = "¡Formulario enviado correctamente!";
        mensaje.className = "alert alert-success mt-3";
        mensaje.classList.remove("d-none");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarLogin();
    inicializarBotonesDemo();
    inicializarRadioButtons();
    inicializarDropdownsPaisRegion();
    inicializarCheckboxes();
    inicializarEnvioFormulario();
});
