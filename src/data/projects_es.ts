import type { Projects } from "./interfaces";

export const projectsEs: Projects[] = [
    {
        category: "Últimos Proyectos",
        list: [
            {
                name: "Cargador simple de imágenes",
                summary: "Una aplicación full-stack para cargar imágenes que permite a los usuarios subir imágenes de manera simple e intuitiva. Carga imágenes en formato JPG, PNG o GIF con un tamaño máximo de 2MB. Funcionalidad de arrastrar y soltar para subir archivos, botón para copiar la dirección de la imagen, botón de descarga para guardar la imagen, explorar y seleccionar archivos para cargar.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Aplicación para Compartir Código - NoteCode",
                summary: "Aplicación para compartir fragmentos de código que permite a los usuarios almacenar y compartir código con un ID generado. Incluye la opción de elegir el lenguaje y tema, y deshabilitar el botón de compartir hasta que se realicen ediciones. Diseño responsivo para todos los dispositivos.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            },
            {
                name: "Página de Países",
                summary: "Una página de ranking de países que muestra datos como población, área y nombre en una tabla. Permite ordenar, filtrar por regiones y estado (miembros de la ONU, independientes), y buscar por nombre. Proporciona detalles de cada país y sus vecinos en páginas individuales. Diseño responsivo y opción de paginación.",
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
                name: "Página de Países",
                summary: "Una página de ranking de países que muestra datos como población, área y nombre en una tabla. Permite ordenar, filtrar por regiones y estado (miembros de la ONU, independientes), y buscar por nombre. Proporciona detalles de cada país y sus vecinos en páginas individuales. Diseño responsivo y opción de paginación.",
                image: "countryPage.webp",
                stack: ["NextJS", "Tailwind", "Typescript", "React"],
                ref: "https://country-page-jp.vercel.app",
                repo: "https://github.com/JuanPDN/country-page"
            },
            {
                name: "Citas Aleatorias",
                summary: "Aplicación para generar citas aleatorias utilizando HTML, CSS y JavaScript. Incluye la visualización de citas aleatorias, un botón para generar nuevas citas, y la opción de copiar citas al portapapeles. Diseño responsivo para diferentes tamaños de pantalla.",
                image: "randomQuote.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://random-quote-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/random-quote"
            },
            {
                name: "Perfil de GitHub",
                summary: "Aplicación de búsqueda de perfiles de GitHub utilizando HTML, CSS y JavaScript. Permite buscar por nombre de usuario, ver seguidores, seguidos, ubicación y repositorios, y acceder a detalles de cada repositorio. Diseño funcional y responsivo.",
                image: "githubProfile.webp",
                stack: ["Typescript", "Tailwind", "React", "NextJS"],
                ref: "https://git-hub-profile-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/GitHub-profile"
            },
            {
                name: "Página de Contacto",
                summary: "Desarrollo de una página de contacto que utiliza HTML y CSS para crear un formulario funcional y diseño responsivo. Incluye iconos, campos de entrada con marcadores de posición, un desplegable con opciones y un botón, todo adaptado para diferentes tamaños de pantalla.",
                image: "contactPage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://contact-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/contact-page"
            },
            {
                name: "Listado Simple de Cafés",
                summary: "Página de listado de cafés utilizando Svelte. Incluye un componente reutilizable de tarjeta con imagen, nombre, precio, calificación y número de votos. Muestra etiquetas y estados de disponibilidad de forma condicional y permite listar todos los productos o solo los disponibles. Utiliza datos de una API o archivo JS.",
                image: "listCoffee.webp",
                stack: ["Svelte", "CSS", "Typescript"],
                ref: "https://simple-coffee-listing-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/Simple-Coffee-Listing"
            },
            {
                name: "Página de Inicio Simple",
                summary: "Página de inicio utilizando HTML, CSS y JavaScript. Incluye un logotipo, encabezado, descripción, enlaces y botones, con funcionalidades para alternar entre modo claro y oscuro y navegación lateral en móviles. Diseño responsivo para diferentes tamaños de pantalla.",
                image: "homePage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://home-page-dev.vercel.app/",
                repo: "https://github.com/JuanPDN/home-page"
            },
            {
                name: "Página de Testimonios",
                summary: "Creación de una página de testimonios utilizando HTML y CSS avanzado, incluyendo grid, media queries e iconos. El proyecto incluye dos tarjetas de testimonios y un diseño responsivo para diferentes tamaños de pantalla.",
                image: "testimonialPage.webp",
                stack: ["JavaScript", "Tailwind", "HTML"],
                ref: "https://testimonial-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/testimonial-page"
            },
            {
                name: "Blog de Café",
                summary: "Un blog completo sobre café que ofrece artículos, reseñas, técnicas de preparación, discusiones sobre la cultura del café y cursos para que los entusiastas profundicen sus conocimientos y habilidades en el mundo del café.",
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
                summary: "La aplicación TikTokClone es una plataforma de redes sociales visualmente impresionante, diseñada para replicar la experiencia de usuario atractiva y entretenida de la popular app TikTok.",
                image: "totik.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/TokTik"
            },
            {
                name: "yes no app",
                summary: "La aplicación de Chat de Respuesta Automática facilita la comunicación generando automáticamente mensajes predefinidos para respuestas de sí y no. Los usuarios pueden personalizar los mensajes y configurar activadores fácilmente. Disponible en plataformas web, móvil y de escritorio, asegura respuestas rápidas y eficientes en varios canales.",
                image: "yes-no-app.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/yes_no_app"
            },
            {
                name: "cinemapedia",
                summary: "La aplicación de Próximos Estrenos mantiene a los usuarios informados sobre los últimos lanzamientos y próximas películas en los cines. Con una interfaz amigable, ofrece detalles como fechas de estreno, tráilers, información del reparto y reseñas. Los usuarios pueden explorar las próximas películas, marcar sus favoritas y recibir notificaciones de las fechas de estreno.",
                image: "cinemapedia.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/cinemapedia"
            },
            {
                name: "app shop",
                summary: "La aplicación de Gestión de Productos es una herramienta fácil de usar, diseñada para que las empresas supervisen de manera eficiente su inventario de productos. Con un enfoque en la simplicidad y efectividad, esta aplicación simplifica el proceso de agregar, editar y organizar productos. Permite a los usuarios mantener información precisa de los productos, optimizar la gestión del inventario y tomar decisiones informadas para mejorar las ofertas de productos.",
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
                name: "Cargador simple de imágenes",
                summary: "Una aplicación full-stack para cargar imágenes que permite a los usuarios subir imágenes de forma simple e intuitiva. Sube imágenes en formato JPG, PNG o GIF con un tamaño máximo de 2 MB. Funcionalidad de arrastrar y soltar para subir archivos, botón de compartir para copiar la dirección de la imagen, botón de descargar para guardar la imagen, y la opción de examinar y seleccionar archivos para cargar.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Aplicación para compartir código - NoteCode",
                summary: "Aplicación para compartir fragmentos de código que permite a los usuarios almacenar y compartir código con un ID generado. Incluye la opción de elegir el lenguaje y tema, y deshabilitar el botón de compartir hasta que se realicen ediciones. Diseño responsivo para todos los dispositivos.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            },
            {
                name: "Generador de códigos QR",
                summary: "Genera códigos QR con HTML, CSS y JavaScript. Te permite ingresar una URL, generar un código QR, descargar la imagen y copiar el código al portapapeles. Diseño responsivo para diferentes tamaños de pantalla.",
                image: "qrCode.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://qr-code-generator-jp.vercel.app",
                repo: "https://github.com/JuanPDN/qr-code-generator"
            },
            {
                name: "Reproductor de música",
                summary: "Reproductor de música con HTML, CSS y JavaScript. Reproduce, detiene, avanza y retrocede canciones, y ajusta la reproducción con una barra de progreso. Diseño responsivo.",
                image: "musicPlayer.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://music-player-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/music-player"
            },
            {
                name: "Aplicación de traducción",
                summary: "Aplicación de traducción utilizando una API, con soporte para traducir textos de hasta 500 caracteres. Incluye opciones para traducir entre múltiples idiomas, ver actualizaciones en tiempo real, escuchar los textos traducidos y copiar el texto. Diseño interactivo y funcional.",
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
                name: "Juego Adivina la Palabra",
                summary: "Juego en el que los usuarios adivinan una palabra desordenada. Usando HTML, CSS y JavaScript. Incluye entrada de letras, seguimiento de errores y botones para regenerar palabras y reiniciar el juego. Diseño responsivo para varios tamaños de pantalla.",
                image: "guessWord.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://juanpdn.github.io/Guess-the-word/",
                repo: "https://github.com/JuanPDN/Guess-the-word"
            },
            {
                name: "Quiz de Países",
                summary: "Aplicación de cuestionario sobre países usando una API para generar 10 preguntas con 4 opciones cada una. Muestra la respuesta correcta de inmediato, permite navegar entre preguntas y presenta una página de resultados y felicitaciones al completar el cuestionario. Diseño interactivo y funcional.",
                image: "countryQuiz.webp",
                stack: ["Typescript", "Angular", "HTML", "CSS"],
                ref: "https://country-quiz-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/country-quiz"
            }
        ]
    }

]