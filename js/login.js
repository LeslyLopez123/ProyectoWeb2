// Menú hamburguesa
function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

// Mostrar Login
function mostrarLogin() {
    document.getElementById('login').style.left = "4px";
    document.getElementById('register').style.right = "-520px";
    document.getElementById('loginBtn').className += " white-btn";
    document.getElementById('registerBtn').className = "btn";
    document.getElementById('login').style.opacity = 1;
    document.getElementById('register').style.opacity = 0;
}

// Mostrar Registro
function mostrarRegistro() {
    document.getElementById('login').style.left = "-510px";
    document.getElementById('register').style.right = "5px";
    document.getElementById('loginBtn').className = "btn";
    document.getElementById('registerBtn').className += " white-btn";
    document.getElementById('login').style.opacity = 0;
    document.getElementById('register').style.opacity = 1;
}

// Registrar usuario
function registrar() {
    const nombre = document.getElementById('NombreUsuario').value;
    const apellido = document.getElementById('ApellidoUsuario').value;
    const correo = document.getElementById('CorreoUsua').value;
    const clave = document.getElementById('ClaveUsuario').value;
    const mensajeRegistro = document.getElementById('mensajeRegistro');

    if (nombre && apellido && correo && clave) {
        sessionStorage.setItem('usuarioCorreo', correo);
        sessionStorage.setItem('usuarioClave', clave);
        sessionStorage.setItem('usuarioNombre', nombre + " " + apellido);

        mensajeRegistro.style.color = "green";
        mensajeRegistro.textContent = "¡Registro exitoso! Ahora puedes ingresar.";

        setTimeout(() => {
            mostrarLogin();
            mensajeRegistro.textContent = "";
        }, 1500);
    } else {
        mensajeRegistro.style.color = "red";
        mensajeRegistro.textContent = "Completa todos los campos.";
    }
}

// Login usuario
function login() {
    const correoIngresado = document.getElementById('loginCorreo').value;
    const claveIngresada = document.getElementById('loginClave').value;
    const mensajeLogin = document.getElementById('mensajeLogin');

    const correoGuardado = sessionStorage.getItem('usuarioCorreo');
    const claveGuardada = sessionStorage.getItem('usuarioClave');

    // Comprobación de admin quemado
    if (correoIngresado === 'admin@admin.com' && claveIngresada === 'admin123**') {
        sessionStorage.setItem('logueado', 'true');
        sessionStorage.setItem('rol', 'admin');
        window.location.href = "../dashboard/html/index.html";
    }
    // Comprobación de usuario registrado
    else if (correoIngresado === correoGuardado && claveIngresada === claveGuardada) {
        sessionStorage.setItem('logueado', 'true');
        sessionStorage.setItem('rol', 'usuario');
        window.location.href = "../dashboard/html/index.html";
    } else {
        mensajeLogin.textContent = "Correo o contraseña incorrectos.";
    }
}

