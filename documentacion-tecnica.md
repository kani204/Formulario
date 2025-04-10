# Documentación Técnica - Formulario LNR

## Estructura general del proyecto

El proyecto consiste en un formulario web interactivo desarrollado con HTML, CSS y JavaScript vanilla (sin frameworks). La aplicación permite a equipos escolares registrarse para participar en la Liga Nacional de Robótica 2025.

## Componentes principales

### 1. HTML (index.html)

El archivo HTML define la estructura del formulario, que se divide en varias secciones:

- **Header**: Encabezado con el título y subtítulo del formulario.
- **Secciones de formulario**:
  - Datos del Equipo (nombre, institución, email, foto)
  - Datos de Estudiantes (nombre y DNI de cada integrante)
  - Categorías de Competencia (opciones seleccionables)
  - Documentación Técnica (subida de archivos)
  - Términos y condiciones
- **Footer**: Pie de página con información de la institución.

### 2. CSS (style.css)

El archivo CSS define la apariencia visual con un diseño moderno inspirado en estética futurista/tecnológica:

- **Variables CSS**: Para mantener coherencia en colores y transiciones.
- **Layouts flexibles**: Usando Flexbox y Grid para diferentes secciones.
- **Efectos visuales**: Glows, gradientes, bordes iluminados.
- **Animaciones**: Efectos sutiles para mejorar la experiencia del usuario.
- **Media queries**: Para adaptación a dispositivos móviles.

### 3. JavaScript (index.js)

El JavaScript maneja toda la lógica de interacción y validación:

#### Funcionalidades principales:

1. **Validación en tiempo real**:
   - Cada campo se valida a medida que el usuario completa el formulario.
   - Los mensajes de error se muestran inmediatamente bajo cada campo.

2. **Gestión dinámica de estudiantes**:
   - Función para agregar estudiantes (hasta 5).
   - Función para eliminar estudiantes.
   - Renumeración automática de los estudiantes.

3. **Previsualización de archivos**:
   - Las imágenes se muestran en miniatura antes de enviar.
   - Los documentos PDF se muestran con su nombre y tamaño.

4. **Campos condicionales**:
   - Si se selecciona "Otra institución", aparece un campo adicional.
   - Para categorías Sumo/Minisumo, se requiere un certificado de seguridad.

5. **Almacenamiento local**:
   - Uso de localStorage para mantener un contador de equipos registrados.

## Flujo de funcionamiento

1. **Inicialización**:
   - Al cargar la página, se inicializan las validaciones y el contador.
   - Se añaden listeners a todos los campos relevantes.

2. **Validación continua**:
   - Cada vez que un campo cambia, se ejecuta su función de validación específica.
   - La función `verificarFormulario()` evalúa si todos los requisitos se cumplen.

3. **Manejo de estudiantes**:
   - `agregarEstudiante()`: Crea un nuevo set de campos para un estudiante.
   - `quitarEstudiante()`: Elimina un estudiante y renumera los restantes.

4. **Envío del formulario**:
   - Previene el envío por defecto con `preventDefault()`.
   - Simula una operación asíncrona de envío.
   - Actualiza el contador y resetea el formulario tras el envío exitoso.

## Validaciones implementadas

1. **Nombre del equipo**:
   - Campo obligatorio
   - Máximo 30 caracteres

2. **Email del responsable**:
   - Formato válido de email
   - Dominios específicos permitidos (edu.ar, escuela, gmail.com)

3. **Foto del equipo**:
   - Solo formatos JPG y PNG
   - Tamaño máximo de 2MB

4. **Categorías**:
   - Al menos una categoría seleccionada

5. **Certificado de seguridad**:
   - Obligatorio si se selecciona Sumo o Minisumo
   - Solo formato PDF
   - Tamaño máximo de 2MB

6. **Diseño del robot**:
   - Opcional
   - Formatos PDF, JPG o PNG
   - Tamaño máximo de 5MB

## Seguridad implementada

1. **Sanitización de datos**:
   - Función `sanitizarTexto()` para prevenir XSS en textos ingresados.

2. **Validación de archivos**:
   - Verificación de tamaño máximo.
   - Verificación de tipos MIME permitidos.

## Dependencias externas

- **Font Awesome 6.0.0**: Para iconografía (cargado vía CDN).
- No se utilizan frameworks o librerías JavaScript adicionales.
