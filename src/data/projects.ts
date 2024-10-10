import type { Projects } from "./interfaces";

const projects: Projects[] = [
    {
        category: "Últimos Proyectos",
        list: [
            {
                name: "Cargador de imágenes simple",
                summary: "Una aplicación full-stack para subir imágenes que permite a los usuarios cargar imágenes de manera simple e intuitiva. Permite subir imágenes en formato JPG, PNG o GIF con un tamaño máximo de 2MB, funcionalidad de arrastrar y soltar para subir archivos, botón para compartir la dirección de la imagen, botón de descarga para guardar la imagen y opción de examinar y seleccionar archivos para cargar.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Aplicación para compartir código - NoteCode",
                summary: "Aplicación para compartir fragmentos de código que permite a los usuarios almacenar y compartir código con un ID generado. Incluye la opción de elegir el lenguaje y tema, y deshabilitar el botón de compartir hasta que se realicen ediciones. Diseño responsive para todos los dispositivos.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            },
            {
                name: "Página de países",
                summary: "Una página de clasificación de países que muestra datos como población, área y nombre en una tabla. Permite ordenar, filtrar por regiones y estado (miembros de la ONU, independientes) y buscar por nombre. Proporciona detalles de cada país y sus vecinos en páginas individuales. Diseño responsive y opción de paginación.",
                image: "countryPage.webp",
                stack: ["NextJS", "Tailwind", "Typescript", "React"],
                ref: "https://country-page-jp.vercel.app",
                repo: "https://github.com/JuanPDN/country-page"
            }
        ]
    },
    {
        category: "Proyectos web",
        list: [
            {
                name: "Página de países",
                summary: "Una página de clasificación de países que muestra datos como población, área y nombre en una tabla. Permite ordenar, filtrar por regiones y estado (miembros de la ONU, independientes) y buscar por nombre. Proporciona detalles de cada país y sus vecinos en páginas individuales. Diseño responsive y opción de paginación.",
                image: "countryPage.webp",
                stack: ["NextJS", "Tailwind", "Typescript", "React"],
                ref: "https://country-page-jp.vercel.app",
                repo: "https://github.com/JuanPDN/country-page"
            },
            {
                name: "Cita aleatoria",
                summary: "Aplicación para generar citas aleatorias utilizando HTML, CSS y JavaScript. Incluye la visualización de citas aleatorias, un botón para generar nuevas citas y la opción de copiar citas al portapapeles. Diseño responsive para diferentes tamaños de pantalla.",
                image: "randomQuote.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://random-quote-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/random-quote"
            },
            {
                name: "Perfil de GitHub",
                summary: "Aplicación de búsqueda de perfiles de GitHub utilizando HTML, CSS y JavaScript. Permite buscar por nombre de usuario, ver seguidores, ubicaciones y repositorios, y acceder a detalles de cada repositorio. Diseño funcional y responsive.",
                image: "githubProfile.webp",
                stack: ["Typescript", "Tailwind", "React", "NextJS"],
                ref: "https://git-hub-profile-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/GitHub-profile"
            },
            {
                name: "Página de contacto",
                summary: "Desarrollo de una página de contacto que utiliza HTML y CSS para crear un formulario funcional y un diseño responsive. Incluye íconos, campos de entrada con marcadores de posición, un menú desplegable con opciones y un botón, todo adaptado para diferentes tamaños de pantalla.",
                image: "contactPage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://contact-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/contact-page"
            },
            {
                name: "Listado simple de café",
                summary: "Página de listado de café utilizando Svelte. Incluye un componente de tarjeta reutilizable con imagen, nombre, precio, calificación y número de votos. Muestra etiquetas y estados de disponibilidad de manera condicional, y permite listar todos los productos o solo los disponibles. Utiliza datos de una API o archivo JS.",
                image: "listCoffee.webp",
                stack: ["Svelte", "CSS", "Typescript"],
                ref: "https://simple-coffee-listing-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/Simple-Coffee-Listing"
            },
            {
                name: "Página de inicio simple",
                summary: "Página de inicio utilizando HTML, CSS y JavaScript. Incluye un logotipo, encabezado, descripción, enlaces y botones, con funcionalidades para cambiar entre modo claro y oscuro y navegación lateral en móviles. Diseño responsive para diferentes tamaños de pantalla.",
                image: "homePage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://home-page-dev.vercel.app/",
                repo: "https://github.com/JuanPDN/home-page"
            },
            {
                name: "Página de testimonios",
                summary: "Creación de una página de testimonios utilizando HTML y CSS avanzados, incluyendo grid, media queries e íconos. El proyecto incluye dos tarjetas de testimonios y un diseño responsive para diferentes tamaños de pantalla.",
                image: "testimonialPage.webp",
                stack: ["JavaScript", "Tailwind", "HTML"],
                ref: "https://testimonial-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/testimonial-page"
            },
            {
                name: "Blog de Café",
                summary: "Un completo blog de café que ofrece artículos, reseñas, técnicas de preparación, discusiones sobre la cultura del café y cursos para que los entusiastas profundicen su conocimiento y habilidades en el mundo del café.",
                image: "blog-cafe.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://3rdsite.netlify.app",
            }
        ]
    },
    {
        category: "Proyectos móviles",
        list: [
            {
                name: "TokTik",
                summary: "La aplicación TikTokClone es una plataforma de redes sociales visualmente impresionante, diseñada para replicar la experiencia de usuario atractiva y entretenida de la popular aplicación TikTok.",
                image: "totik.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/TokTik",
            },
            {
                name: "Aplicación de respuestas automáticas",
                summary: "La AutoResponse Chat App simplifica la comunicación generando automáticamente mensajes predefinidos para respuestas de sí y no. Los usuarios pueden personalizar los mensajes y configurar activadores fácilmente. Disponible en plataformas web, móviles y de escritorio, garantiza respuestas rápidas y eficientes en diversos canales.",
                image: "yes-no-app.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/yes_no_app",
            },
            {
                name: "Cinemapedia",
                summary: "La aplicación de películas próximas mantiene a los usuarios informados sobre los últimos estrenos y las películas próximas en cines. Con una interfaz fácil de usar, proporciona detalles como fechas de estreno, tráilers, información del reparto y reseñas. Los usuarios pueden explorar películas próximas, marcar favoritos y recibir notificaciones para fechas de estreno.",
                image: "cinemapedia.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/cinemapedia",
            },
            {
                name: "Aplicación de tienda",
                summary: "La aplicación de gestión de productos es una herramienta fácil de usar, diseñada para que las empresas supervisen su inventario de productos de manera eficiente. Con un enfoque en la simplicidad y efectividad, esta app simplifica el proceso de agregar, editar y organizar productos. Permite a los usuarios mantener información precisa de los productos, optimizar la gestión del inventario y tomar decisiones informadas.",
                image: "shop app.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/app_shop",
            }
        ]
    },
    {
        category: "Aplicaciones web",
        list: [
            {
                name: "Cargador de imágenes simple",
                summary: "Una aplicación full-stack para subir imágenes que permite a los usuarios cargar imágenes de manera simple e intuitiva. Permite subir imágenes en formato JPG, PNG o GIF con un tamaño máximo de 2MB, funcionalidad de arrastrar y soltar para subir archivos, botón para compartir la dirección de la imagen, botón de descarga para guardar la imagen y opción de examinar y seleccionar archivos para cargar.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Aplicación para compartir código - NoteCode",
                summary: "Aplicación para compartir fragmentos de código que permite a los usuarios almacenar y compartir código con un ID generado. Incluye la opción de elegir el lenguaje y tema, y deshabilitar el botón de compartir hasta que se realicen ediciones. Diseño responsive para todos los dispositivos.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            }
        ]
    }
];


export default projects