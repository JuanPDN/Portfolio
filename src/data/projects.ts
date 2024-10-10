import type { Projects } from "./interfaces";

const projects: Projects[] = [
    {
        category: "últimos proyectos",
        list: [
            {
                name: "Cargador de imágenes simple",
                summary: "Una aplicación de carga de imágenes de pila completa que permite a los usuarios cargar imágenes de manera simple e intuitiva. Carga imágenes en formato JPG, PNG o GIF con un tamaño máximo de 2MB, funcionalidad de arrastrar y soltar para la carga de archivos, botón de compartir para copiar la dirección de la imagen, botón de descarga para guardar la imagen, navegar y seleccionar archivos para cargar.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Aplicación de Compartición de Código - NoteCode",
                summary: "Aplicación para compartir fragmentos de código que permite a los usuarios almacenar y compartir código con un ID generado. Incluye la opción de elegir idioma y tema, y deshabilitar el botón de compartir hasta que se realicen ediciones. Diseño responsivo para todos los dispositivos.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            },
            {
                name: "Página de País",
                summary: "Una página de clasificación de países que muestra datos como población, área y nombre en una tabla. Permite ordenar, filtrar por regiones y estado (miembros de la ONU, independientes) y buscar por nombre. Proporciona detalles de cada país y sus vecinos en páginas individuales. Diseño responsivo y opción de paginación.",
                image: "countryPage.webp",
                stack: ["NextJS", "Tailwind", "Typescript", "React"],
                ref: "https://country-page-jp.vercel.app",
                repo: "https://github.com/JuanPDN/country-page"
            }
        ]
    },
    {
        category: "proyectos web",
        list: [
            {
                name: "Página de País",
                summary: "Una página de clasificación de países que muestra datos como población, área y nombre en una tabla. Permite ordenar, filtrar por regiones y estado (miembros de la ONU, independientes) y buscar por nombre. Proporciona detalles de cada país y sus vecinos en páginas individuales. Diseño responsivo y opción de paginación.",
                image: "countryPage.webp",
                stack: ["NextJS", "Tailwind", "Typescript", "React"],
                ref: "https://country-page-jp.vercel.app",
                repo: "https://github.com/JuanPDN/country-page"
            },
            {
                name: "Cita Aleatoria",
                summary: "Aplicación para generar citas aleatorias utilizando HTML, CSS y JavaScript. Incluye la visualización de citas aleatorias, un botón para generar nuevas citas y la opción de copiar citas al portapapeles. Diseño responsivo para diferentes tamaños de pantalla.",
                image: "randomQuote.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://random-quote-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/random-quote"
            },
            {
                name: "Perfil de GitHub",
                summary: "Aplicación de búsqueda de perfil de GitHub utilizando HTML, CSS y JavaScript. Permite buscar por nombre de usuario, ver seguidores, seguidos, ubicación y repositorios, y acceder a detalles de cada repositorio. Diseño responsivo y funcional.",
                image: "githubProfile.webp",
                stack: ["Typescript", "Tailwind", "React", "NextJS"],
                ref: "https://git-hub-profile-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/GitHub-profile"
            },
            {
                name: "Página de Contacto",
                summary: "Desarrollo de una página de contacto que utiliza HTML y CSS para crear un formulario funcional y un diseño responsivo. Incluye íconos, campos de entrada con marcadores de posición, un desplegable con opciones y un botón, todo adaptado para diferentes tamaños de pantalla.",
                image: "contactPage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://contact-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/contact-page"
            },
            {
                name: "Listado de Café Simple",
                summary: "Página de listado de café utilizando Svelte. Incluye un componente de tarjeta reutilizable con imagen, nombre, precio, calificación y número de votos. Muestra etiquetas y estados de disponibilidad de forma condicional y permite listar todos los productos o solo los disponibles. Utiliza datos de una API o archivo JS.",
                image: "listCoffee.webp",
                stack: ["Svelte", "CSS", "Typescript"],
                ref: "https://simple-coffee-listing-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/Simple-Coffee-Listing"
            },
            {
                name: "Página de Inicio Simple",
                summary: "Página de inicio utilizando HTML, CSS y JavaScript. Incluye un logotipo, encabezado, descripción, enlaces y botones, con funcionalidades para alternar entre modo claro y oscuro y navegación lateral en dispositivos móviles. Diseño responsivo para diferentes tamaños de pantalla.",
                image: "homePage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://home-page-dev.vercel.app/",
                repo: "https://github.com/JuanPDN/home-page"
            },
            {
                name: "Página de Testimonios",
                summary: "Creación de una página de testimonios utilizando HTML y CSS avanzados, incluyendo grid, media queries e íconos. El proyecto incluye dos tarjetas de testimonios y un diseño responsivo para diferentes tamaños de pantalla.",
                image: "testimonialPage.webp",
                stack: ["JavaScript", "Tailwind", "HTML"],
                ref: "https://testimonial-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/testimonial-page"
            },
            {
                name: "Blog de Café",
                summary: "Un blog de café integral que ofrece artículos, reseñas, técnicas de preparación, discusiones sobre la cultura del café y cursos para entusiastas que deseen profundizar su conocimiento y habilidades en el mundo del café.",
                image: "blog-cafe.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://3rdsite.netlify.app"
            }
        ]
    },
    {
        category: "proyectos móviles",
        list: [
            {
                name: "TokTik",
                summary: "La aplicación TikTokClone es una plataforma de redes sociales visualmente impresionante diseñada para replicar la experiencia de usuario atractiva y entretenida de la popular aplicación TikTok.",
                image: "totik.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/TokTik"
            },
            {
                name: "Aplicación de Sí o No",
                summary: "La aplicación de chat AutoResponse simplifica la comunicación generando automáticamente mensajes predefinidos para respuestas de sí y no. Los usuarios pueden personalizar mensajes y configurar disparadores fácilmente. Disponible en plataformas web, móviles y de escritorio, garantiza respuestas rápidas y eficientes a través de varios canales.",
                image: "yes-no-app.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/yes_no_app"
            },
            {
                name: "Cinemapedia",
                summary: "La aplicación Upcoming Movies mantiene a los usuarios informados sobre los últimos estrenos y películas próximas en los cines. Con una interfaz fácil de usar, proporciona detalles como fechas de lanzamiento, tráileres, información del elenco y reseñas. Los usuarios pueden explorar las próximas películas, marcar sus favoritas y recibir notificaciones sobre las fechas de estreno.",
                image: "cinemapedia.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/cinemapedia"
            },
            {
                name: "Tienda de Aplicaciones",
                summary: "La aplicación de gestión de productos es una herramienta fácil de usar, diseñada para que las empresas supervisen de manera eficiente su inventario de productos. Con un enfoque en la simplicidad y la efectividad, esta aplicación simplifica el proceso de agregar, editar y organizar productos. Permite a los usuarios mantener información precisa sobre los productos, optimizar la gestión del inventario y tomar decisiones informadas para mejorar la oferta de productos.",
                image: "shop app.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/app_shop"
            }
        ]
    },
    {
        category: "aplicaciones web",
        list: [
            {
                name: "Cargador de imágenes simple",
                summary: "Una aplicación de carga de imágenes de pila completa que permite a los usuarios subir imágenes de manera simple e intuitiva. Carga imágenes en formato JPG, PNG o GIF con un tamaño máximo de 2MB, funcionalidad de arrastrar y soltar archivos, botón de compartir para copiar la dirección de la imagen, botón de descarga para guardar la imagen, navegar y seleccionar archivos para cargar.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Aplicación de Compartición de Código - NoteCode",
                summary: "Aplicación para compartir fragmentos de código que permite a los usuarios almacenar y compartir código con un ID generado. Incluye la opción de elegir el idioma y el tema, y desactivar el botón de compartir hasta que se realicen ediciones. Diseño responsivo para todos los dispositivos.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            },
            {
                name: "Generador de Código QR",
                summary: "Genera códigos QR con HTML, CSS y JavaScript. Permite ingresar una URL, generar un código QR, descargar la imagen y copiar el código al portapapeles. Diseño responsivo para diferentes tamaños de pantalla.",
                image: "qrCode.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://qr-code-generator-jp.vercel.app",
                repo: "https://github.com/JuanPDN/qr-code-generator"
            },
            {
                name: "Reproductor de Música",
                summary: "Reproductor de música con HTML, CSS y JavaScript. Reproduce, detiene, adelanta y rebobina canciones, y ajusta la reproducción con una barra de progreso. Diseño responsivo.",
                image: "musicPlayer.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://music-player-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/music-player"
            },
            {
                name: "Aplicación de Traducción",
                summary: "Aplicación de traducción utilizando una API, con soporte para traducir textos de hasta 500 caracteres. Incluye opciones para traducir entre varios idiomas, ver actualizaciones en tiempo real, escuchar textos traducidos y copiar el texto. Diseño interactivo y funcional.",
                image: "translateApp.webp",
                stack: ["Typescript", "React", "Tailwind"],
                ref: "https://translate-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/translate-app"
            }
        ]
    },
    {
        category: "juegos web",
        list: [
            {
                name: "Juego de Adivinar la Palabra",
                summary: "Juego en el que los usuarios adivinan una palabra desordenada. Utiliza HTML, CSS y JavaScript. Incluye entrada de letras, seguimiento de errores y botones para regenerar palabras y reiniciar el juego. Diseño responsivo para varios tamaños de pantalla.",
                image: "guessWord.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://juanpdn.github.io/Guess-the-word/",
                repo: "https://github.com/JuanPDN/Guess-the-word"
            },
            {
                name: "Cuestionario de Países",
                summary: "Aplicación de cuestionario sobre países utilizando una API para generar 10 preguntas con 4 opciones cada una. Muestra la respuesta correcta de inmediato, permite navegar entre preguntas y presenta una página de resultados y felicitaciones al completar el cuestionario. Diseño interactivo y funcional.",
                image: "countryQuiz.webp",
                stack: ["Typescript", "Angular", "HTML", "CSS"],
                ref: "https://country-quiz-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/country-quiz"
            }
        ]
    }
]

export default projects