// variables para almacenar el estado del formulario
let formularioValido = false;
let categoriasSeleccionadas = false;
let reglasAceptadas = false;

// elementos del DOM
const formulario = document.getElementById('formularioRegistro');
const nombreEquipo = document.getElementById('nombreEquipo');
const institucion = document.getElementById('institucion');
const otraInstitucionDiv = document.getElementById('otraInstitucion');
const institucionOtra = document.getElementById('institucionOtra');
const emailResponsable = document.getElementById('emailResponsable');
const fotoPerfil = document.getElementById('fotoPerfil');
const previewFoto = document.getElementById('previewFoto');
const categorias = document.querySelectorAll('input[name="categorias[]"]');
const categoriaSumo = document.getElementById('categoriaSumo');
const categoriaMinisumo = document.getElementById('categoriaMinisumo');
const campoSeguridad = document.getElementById('campoSeguridad');
const certificadoSeguridad = document.getElementById('certificadoSeguridad');
const disenioRobot = document.getElementById('disenioRobot');
const previewDisenio = document.getElementById('previewDisenio');
const previewCertificado = document.getElementById('previewCertificado');
const aceptoReglas = document.getElementById('aceptoReglas');
const botonRegistrar = document.getElementById('registrarEquipo');
const botonBorrar = document.getElementById('borrarFormulario');
const botonAgregarEstudiante = document.getElementById('agregarEstudiante');
const contenedorEstudiantes = document.getElementById('contenedorEstudiantes');

// elementos de error
const errorNombreEquipo = document.getElementById('errorNombreEquipo');
const errorEmail = document.getElementById('errorEmail');
const errorFoto = document.getElementById('errorFoto');
const errorCategorias = document.getElementById('errorCategorias');
const errorDisenio = document.getElementById('errorDisenio');
const errorCertificado = document.getElementById('errorCertificado');
const errorReglas = document.getElementById('errorReglas');

// contador de equipos (usando localStorage)
const contadorEquipos = document.getElementById('numeroEquipos');
let equiposRegistrados = localStorage.getItem('equiposRegistrados') || 0;
contadorEquipos.textContent = equiposRegistrados;

// evento que se activa cuando la pagina termina de cargar
document.addEventListener('DOMContentLoaded', function() {
    // inicializar validaciones
    verificarFormulario();
    
    // event listeners para validaciones en tiempo real
    nombreEquipo.addEventListener('input', validarNombreEquipo);
    emailResponsable.addEventListener('input', validarEmail);
    fotoPerfil.addEventListener('change', manejarFotoPerfil);
    disenioRobot.addEventListener('change', manejarDisenioRobot);
    certificadoSeguridad.addEventListener('change', manejarCertificado);
    
    // mostrar campo "Otra institución" si se selecciona "Otro"
    institucion.addEventListener('change', function() {
        if (this.value === 'otro') {
            otraInstitucionDiv.style.display = 'block';
            institucionOtra.setAttribute('required', true);
        } else {
            otraInstitucionDiv.style.display = 'none';
            institucionOtra.removeAttribute('required');
        }
        verificarFormulario();
    });
    
    // event listeners para categorias
    categorias.forEach(categoria => {
        categoria.addEventListener('change', function() {
            validarCategorias();
            manejarCategoriasEspeciales();
            verificarFormulario();
        });
    });
    
    // event listener para reglas
    aceptoReglas.addEventListener('change', function() {
        reglasAceptadas = this.checked;
        if (!reglasAceptadas) {
            errorReglas.textContent = "Debes aceptar las reglas para participar";
        } else {
            errorReglas.textContent = "";
        }
        verificarFormulario();
    });
    
    botonAgregarEstudiante.addEventListener('click', agregarEstudiante);
    
    botonBorrar.addEventListener('click', borrarFormulario);
    
    formulario.addEventListener('submit', manejarEnvio);
});

function validarNombreEquipo() {
    const valor = nombreEquipo.value.trim();
    
    if (valor === '') {
        errorNombreEquipo.textContent = "El nombre del equipo es obligatorio";
        return false;
    } else if (valor.length > 30) {
        errorNombreEquipo.textContent = "El nombre no puede tener más de 30 caracteres";
        return false;
    } else {
        errorNombreEquipo.textContent = "";
        return true;
    }
}

function validarEmail() {
    const valor = emailResponsable.value.trim();
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (valor === '') {
        errorEmail.textContent = "El email es obligatorio";
        return false;
    } else if (!patronEmail.test(valor)) {
        errorEmail.textContent = "Ingresa un email válido";
        return false;
    } else {
        // validar dominios aceptados 
        const dominio = valor.split('@')[1];
        if (dominio && (dominio.includes('edu.ar') || dominio.includes('escuela') || dominio.includes('gmail.com'))) {
            errorEmail.textContent = "";
            return true;
        } else {
            errorEmail.textContent = "Por favor usa un email institucional o personal válido";
            return false;
        }
    }
}

function manejarFotoPerfil() {
    const archivo = fotoPerfil.files[0];
    
    if (!archivo) {
        errorFoto.textContent = "Debes subir una foto del equipo";
        previewFoto.style.backgroundImage = "";
        previewFoto.textContent = "Vista previa";
        return false;
    }
    
    // validar formato (solo JPG y PNG)
    if (archivo.type !== 'image/jpeg' && archivo.type !== 'image/png') {
        errorFoto.textContent = "Solo se permiten archivos JPG o PNG";
        previewFoto.style.backgroundImage = "";
        previewFoto.textContent = "Formato inválido";
        return false;
    }
    
    // validar tamaño (maximo 2MB)
    if (archivo.size > 2 * 1024 * 1024) {
        errorFoto.textContent = "La imagen no debe superar los 2MB";
        previewFoto.style.backgroundImage = "";
        previewFoto.textContent = "Imagen demasiado grande";
        return false;
    }
    
    // mostrar vista previa
    const reader = new FileReader();
    reader.onload = function(e) {
        previewFoto.style.backgroundImage = `url(${e.target.result})`;
        previewFoto.textContent = "";
    };
    reader.readAsDataURL(archivo);
    
    errorFoto.textContent = "";
    return true;
}

function validarCategorias() {
    let seleccionado = false;
    categorias.forEach(categoria => {
        if (categoria.checked) {
            seleccionado = true;
        }
    });
    
    categoriasSeleccionadas = seleccionado;
    
    if (!seleccionado) {
        errorCategorias.textContent = "Debes seleccionar al menos una categoría";
        return false;
    } else {
        errorCategorias.textContent = "";
        return true;
    }
}

// funcion para las categorias especiales (Sumo/Minisumo)
function manejarCategoriasEspeciales() {
    if (categoriaSumo.checked || categoriaMinisumo.checked) {
        campoSeguridad.style.display = 'block';
        certificadoSeguridad.setAttribute('required', true);
    } else {
        campoSeguridad.style.display = 'none';
        certificadoSeguridad.removeAttribute('required');
    }
}

function manejarDisenioRobot() {
    const archivo = disenioRobot.files[0];
    
    if (!archivo) {
        previewDisenio.style.display = "none";
        return true; // no es obligatorio
    }
    
    // validar formato (PDF, JPG, PNG)
    const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!tiposPermitidos.includes(archivo.type)) {
        errorDisenio.textContent = "Solo se permiten archivos PDF, JPG o PNG";
        previewDisenio.style.display = "none";
        return false;
    }
    
    // validar tamaño (maximo 5MB)
    if (archivo.size > 5 * 1024 * 1024) {
        errorDisenio.textContent = "El archivo no debe superar los 5MB";
        previewDisenio.style.display = "none";
        return false;
    }
    
    // mostrar vista previa
    previewDisenio.style.display = "block";
    if (archivo.type === 'application/pdf') {
        previewDisenio.innerHTML = `<i class="fas fa-file-pdf"></i> ${archivo.name} (${Math.round(archivo.size / 1024)} KB)`;
    } else {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewDisenio.innerHTML = `<img src="${e.target.result}" style="max-width: 100px; max-height: 100px;"> ${archivo.name} (${Math.round(archivo.size / 1024)} KB)`;
        };
        reader.readAsDataURL(archivo);
    }
    
    errorDisenio.textContent = "";
    return true;
}

function manejarCertificado() {
    const archivo = certificadoSeguridad.files[0];
    
    // si no es requerido y no hay archivo, esta ok
    if (campoSeguridad.style.display === 'none' || !certificadoSeguridad.hasAttribute('required')) {
        return true;
    }
    
    if (!archivo && certificadoSeguridad.hasAttribute('required')) {
        errorCertificado.textContent = "El certificado es obligatorio para Sumo/Minisumo";
        previewCertificado.style.display = "none";
        return false;
    }
    
    // validar formato (solo PDF)
    if (archivo.type !== 'application/pdf') {
        errorCertificado.textContent = "Solo se permiten archivos PDF";
        previewCertificado.style.display = "none";
        return false;
    }
    
    // validar tamaño (máximo 2MB)
    if (archivo.size > 2 * 1024 * 1024) {
        errorCertificado.textContent = "El archivo no debe superar los 2MB";
        previewCertificado.style.display = "none";
        return false;
    }
    
    // mostrar vista previa
    previewCertificado.style.display = "block";
    previewCertificado.innerHTML = `<i class="fas fa-file-pdf"></i> ${archivo.name} (${Math.round(archivo.size / 1024)} KB)`;
    
    errorCertificado.textContent = "";
    return true;
}

function agregarEstudiante() {
    const cantidadEstudiantes = contenedorEstudiantes.querySelectorAll('.estudiante').length + 1;
    
    if (cantidadEstudiantes > 5) {
        alert("No se pueden agregar más de 5 estudiantes por equipo");
        return;
    }
    
    const nuevoEstudiante = document.createElement('div');
    nuevoEstudiante.className = 'estudiante';
    nuevoEstudiante.innerHTML = `
        <div class="campo">
            <label>Estudiante ${cantidadEstudiantes} *</label>
            <input type="text" name="estudianteNombre[]" placeholder="Nombre y Apellido" required>
        </div>
        <div class="campo">
            <input type="number" name="estudianteDNI[]" placeholder="DNI" required>
        </div>
        <button type="button" class="boton-quitar" onclick="quitarEstudiante(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    contenedorEstudiantes.appendChild(nuevoEstudiante);
}

function quitarEstudiante(boton) {
    const estudiante = boton.parentElement;
    contenedorEstudiantes.removeChild(estudiante);
    
    // renumerar los estudiantes
    const etiquetas = contenedorEstudiantes.querySelectorAll('.estudiante label');
    etiquetas.forEach((etiqueta, index) => {
        etiqueta.textContent = `Estudiante ${index + 1} *`;
    });
}

function verificarFormulario() {
    const nombreValido = validarNombreEquipo();
    const emailValido = validarEmail();
    const fotoValida = fotoPerfil.files.length > 0;
    const categoriasValidas = validarCategorias();
    
    // verificar si el certificado es requerido y valido
    let certificadoValido = true;
    if (campoSeguridad.style.display !== 'none' && certificadoSeguridad.hasAttribute('required')) {
        certificadoValido = certificadoSeguridad.files.length > 0 && manejarCertificado();
    }
    
    // verificar diseño del robot si fue subido
    let disenioValido = true;
    if (disenioRobot.files.length > 0) {
        disenioValido = manejarDisenioRobot();
    }
    
    // verificar si hay al menos un estudiante
    const hayEstudiantes = contenedorEstudiantes.querySelectorAll('.estudiante').length > 0;
    
    // actualizar estado del formulario
    formularioValido = nombreValido && 
                      emailValido && 
                      fotoValida && 
                      categoriasValidas && 
                      certificadoValido && 
                      disenioValido && 
                      reglasAceptadas &&
                      hayEstudiantes;
    
    // habilitar o deshabilitar botón de registro
    botonRegistrar.disabled = !formularioValido;
}

// funcion para borrar el formulario
function borrarFormulario() {
    // pedir confirmacion
    if (!confirm("¿Estás seguro que queres borrar todos los datos del formulario?")) {
        return;
    }
    
    // resetear campos
    formulario.reset();
    
    // limpiar previsualizaciones
    previewFoto.style.backgroundImage = "";
    previewFoto.textContent = "Vista previa";
    previewDisenio.style.display = "none";
    previewCertificado.style.display = "none";
    
    // ocultar campo seguridad
    campoSeguridad.style.display = 'none';
    
    // resetear estudiantes (dejar solo uno)
    contenedorEstudiantes.innerHTML = `
        <div class="estudiante">
            <div class="campo">
                <label>Estudiante 1 *</label>
                <input type="text" name="estudianteNombre[]" placeholder="Nombre y Apellido" required>
            </div>
            <div class="campo">
                <input type="number" name="estudianteDNI[]" placeholder="DNI" required>
            </div>
        </div>
    `;
    
    // limpiar mensajes de error
    const mensajesError = document.querySelectorAll('.mensaje-error');
    mensajesError.forEach(mensaje => {
        mensaje.textContent = "";
    });
    
    // resetear estados
    formularioValido = false;
    categoriasSeleccionadas = false;
    reglasAceptadas = false;
    
    // deshabilitar botón de registro
    botonRegistrar.disabled = true;
}

// funcion para sanitizar texto 
function sanitizarTexto(texto) {
    if (!texto) return "";
    return texto.trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// funcion para manejar el envio del formulario
function manejarEnvio(evento) {
    evento.preventDefault();
    
    // doble verificacion
    verificarFormulario();
    
    if (!formularioValido) {
        alert("Por favor completa correctamente todos los campos obligatorios");
        return;
    }
    
    // simular envio
    botonRegistrar.disabled = true;
    botonRegistrar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // simulacion de envio exitoso despues de 1.5 segundos
    setTimeout(() => {
        // incrementar contador de equipos
        equiposRegistrados = parseInt(equiposRegistrados) + 1;
        localStorage.setItem('equiposRegistrados', equiposRegistrados);
        contadorEquipos.textContent = equiposRegistrados;
        
        // mensaje de exito
        alert("✅ Equipo registrado en LNR. ¡Buena suerte!");
        
        // resetear formulario
        borrarFormulario();
        
        // restaurar botón
        botonRegistrar.innerHTML = '<i class="fas fa-robot"></i> Registrar Equipo';
        botonRegistrar.disabled = true;
    }, 1500);
}