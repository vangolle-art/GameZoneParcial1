const formularioRegistro = document.getElementById("formularioRegistro");

if (formularioRegistro != null) {
    formularioRegistro.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena =
            document.getElementById("confirmarContrasena").value;
        const telefono = document.getElementById("telefono").value.trim();
        const generos =
            document.querySelectorAll("input[name='genero']:checked");

        const errorNombre = document.getElementById("errorNombre");
        const errorCorreo = document.getElementById("errorCorreo");
        const errorContrasena =
            document.getElementById("errorContrasena");
        const errorConfirmar =
            document.getElementById("errorConfirmar");
        const errorTelefono = document.getElementById("errorTelefono");
        const errorGenero = document.getElementById("errorGenero");
        const mensajeRegistro =
            document.getElementById("mensajeRegistro");

        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorContrasena.textContent = "";
        errorConfirmar.textContent = "";
        errorTelefono.textContent = "";
        errorGenero.textContent = "";
        mensajeRegistro.textContent = "";

        let formularioValido = true;

        const formatoNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
        const formatoCorreo = /^[^\s@]+@duoc\.cl$/;
        const formatoTelefono = /^[0-9]{9,12}$/;
        const tieneMayuscula = /[A-Z]/;
        const tieneMinuscula = /[a-z]/;
        const tieneNumero = /[0-9]/;
        const tieneEspecial = /[@#$%]/;

        if (nombre === "") {
            errorNombre.textContent =
                "Debes ingresar tu nombre completo.";
            formularioValido = false;
        } else if (!formatoNombre.test(nombre)) {
            errorNombre.textContent =
                "El nombre solo puede contener letras y espacios.";
            formularioValido = false;
        } else if (nombre.length > 100) {
            errorNombre.textContent =
                "El nombre no puede superar los 100 caracteres.";
            formularioValido = false;
        }

        if (correo === "") {
            errorCorreo.textContent =
                "Debes ingresar tu correo electrónico.";
            formularioValido = false;
        } else if (!formatoCorreo.test(correo)) {
            errorCorreo.textContent =
                "El correo debe terminar en @duoc.cl.";
            formularioValido = false;
        } else if (correo.length > 60) {
            errorCorreo.textContent =
                "El correo no puede superar los 60 caracteres.";
            formularioValido = false;
        } else if (localStorage.getItem(correo) != null) {
            errorCorreo.textContent =
                "Este correo ya se encuentra registrado.";
            formularioValido = false;
        }

        if (contrasena === "") {
            errorContrasena.textContent =
                "Debes ingresar una contraseña.";
            formularioValido = false;
        } else if (contrasena.length < 10) {
            errorContrasena.textContent =
                "La contraseña debe tener al menos 10 caracteres.";
            formularioValido = false;
        } else if (!tieneMayuscula.test(contrasena)) {
            errorContrasena.textContent =
                "La contraseña debe incluir una letra mayúscula.";
            formularioValido = false;
        } else if (!tieneMinuscula.test(contrasena)) {
            errorContrasena.textContent =
                "La contraseña debe incluir una letra minúscula.";
            formularioValido = false;
        } else if (!tieneNumero.test(contrasena)) {
            errorContrasena.textContent =
                "La contraseña debe incluir un número.";
            formularioValido = false;
        } else if (!tieneEspecial.test(contrasena)) {
            errorContrasena.textContent =
                "La contraseña debe incluir @, #, $ o %.";
            formularioValido = false;
        }

        if (confirmarContrasena === "") {
            errorConfirmar.textContent =
                "Debes confirmar tu contraseña.";
            formularioValido = false;
        } else if (confirmarContrasena !== contrasena) {
            errorConfirmar.textContent =
                "Las contraseñas no coinciden.";
            formularioValido = false;
        }

        if (telefono !== "" && !formatoTelefono.test(telefono)) {
            errorTelefono.textContent =
                "El teléfono debe contener entre 9 y 12 números.";
            formularioValido = false;
        }

        if (generos.length === 0) {
            errorGenero.textContent =
                "Debes seleccionar al menos un género.";
            formularioValido = false;
        }

        if (formularioValido === true) {
            const usuario = {
                nombre: nombre,
                correo: correo,
                contrasena: contrasena,
                telefono: telefono
            };

            localStorage.setItem(correo, JSON.stringify(usuario));

            mensajeRegistro.textContent =
                "Registro realizado correctamente.";

            formularioRegistro.reset();
        }
    });
}

const formularioLogin = document.getElementById("formularioLogin");

if (formularioLogin != null) {
    formularioLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const correo =
            document.getElementById("correoLogin").value.trim();
        const contrasena =
            document.getElementById("contrasenaLogin").value;

        const errorCorreo =
            document.getElementById("errorCorreoLogin");
        const errorContrasena =
            document.getElementById("errorContrasenaLogin");
        const mensajeLogin =
            document.getElementById("mensajeLogin");

        errorCorreo.textContent = "";
        errorContrasena.textContent = "";
        mensajeLogin.textContent = "";

        if (correo === "") {
            errorCorreo.textContent =
                "Debes ingresar tu correo electrónico.";
            return;
        }

        if (contrasena === "") {
            errorContrasena.textContent =
                "Debes ingresar tu contraseña.";
            return;
        }

        const usuarioGuardado = localStorage.getItem(correo);

        if (usuarioGuardado == null) {
            errorCorreo.textContent =
                "El correo ingresado no está registrado.";
            return;
        }

        const usuario = JSON.parse(usuarioGuardado);

        if (usuario.contrasena !== contrasena) {
            errorContrasena.textContent =
                "La contraseña ingresada es incorrecta.";
            return;
        }

        mensajeLogin.textContent =
            "Inicio de sesión realizado correctamente.";

        formularioLogin.reset();
    });
}