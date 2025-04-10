# Formulario de Registro LNR - Campeonato de Robótica

## 📋 Descripción

Este proyecto implementa un formulario de registro interactivo para la participación de equipos en la Liga Nacional de Robótica (LNR) 2025. El formulario permite a estudiantes y escuelas inscribirse en diferentes categorías de competencia robótica con una interfaz moderna, validaciones en tiempo real y efecto visual estilo neón.

![Vista previa del formulario](![vista principal](https://github.com/user-attachments/assets/8e2cb61b-022d-4ba5-bde9-8bce02e9f67b)
)

## ✨ Características

- Interfaz de usuario moderna con estilo futurista
- Validaciones en tiempo real de todos los campos
- Previsualización de imágenes y archivos subidos
- Gestión dinámica de estudiantes (agregar/quitar)
- Validaciones específicas por categoría
- Integración con LocalStorage para guardar conteo de registros
- Diseño completamente responsivo para dispositivos móviles y desktop
- Efectos visuales atractivos (glow, hover, animaciones)
- Simulación de envío del formulario

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica del documento
- **CSS3**: Estilos avanzados con variables CSS, animaciones y transiciones
- **JavaScript**: Validación de formularios y manipulación del DOM
- **Font Awesome**: Iconografía a través de CDN

## 🔍 Funcionalidades principales

### Validación de datos
- Nombre del equipo (obligatorio, máx. 30 caracteres)
- Email del responsable (validación de formato y dominio)
- Foto del equipo (JPG/PNG, máx. 2MB)
- Selección de categorías (al menos una)
- Validación de certificado de seguridad para categorías específicas

### Gestión de estudiantes
- Agregar hasta 5 estudiantes por equipo
- Eliminación dinámica de estudiantes
- Renumeración automática

### Características adicionales
- Contador persistente de equipos registrados (LocalStorage)
- Previsualización de archivos subidos
- Validación de archivos por tipo y tamaño
- Campos condicionales según selecciones previas

## 📱 Responsividad

El formulario está completamente adaptado para distintos dispositivos:
- **Desktop**: Layout completo y amplio
- **Tablet**: Ajuste de grids a 2 columnas 
- **Mobile**: Layout de una columna, ajustes de tamaño y distribución

![Responsive views](![image](https://github.com/user-attachments/assets/058c2a3a-da50-429c-a146-fe3883faaee4)
)

## 🚀 Instrucciones de instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/formulario-lnr.git
```

2. Navega al directorio del proyecto:
```bash
cd formulario-lnr
```

3. Abre el archivo `index.html` en tu navegador o usa un servidor local.

## 💻 Instrucciones de uso

1. Completa todos los campos obligatorios marcados con un asterisco (*)
2. Sube una foto del equipo (JPG o PNG, máx. 2MB)
3. Añade al menos un estudiante con su nombre y DNI
4. Selecciona al menos una categoría de competencia
5. Si eliges "Sumo" o "Minisumo", deberás adjuntar un certificado de seguridad
6. Acepta las reglas del campeonato
7. Haz clic en "Registrar Equipo"

## 📝 Estructura del proyecto

```
formulario-lnr/
│
├── index.html          # Estructura del formulario
├── style.css           # Estilos y animaciones
├── index.js            # Lógica y validaciones
└── README.md           # Documentación
```

## 🧩 Estructura del código

### HTML
- Estructura semántica con secciones claramente diferenciadas
- Uso de etiquetas semánticas (header, section, footer)
- Atributos de accesibilidad y campos requeridos

### CSS
- Variables CSS para una paleta de colores consistente
- Efectos neón con sombras y gradientes
- Animaciones sutiles para mejorar la experiencia
- Media queries para diferentes tamaños de pantalla

### JavaScript
- Validación en tiempo real de todos los campos
- Manejo dinámico del DOM para agregar/eliminar estudiantes
- Previsualización de archivos e imágenes
- Almacenamiento local para contador de equipos
- Sanitización de datos para prevenir XSS

## 👨‍💻 Desarrollado por

Franco Fernandez Devicenzi - Estudiante de EEST N°1 "Eduardo Ader" Vicente López - 7° 2° - 2025
