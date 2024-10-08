import type { Projects } from "./interfaces";

const projects: Projects[] = [
    {
        category: "last Projects",
        list: [
            {
                name: "Simple image uploader",
                summary: "A full-stack image upload application that allows users to upload images in a simple and intuitive way, Upload images in JPG, PNG, or GIF format with a maximum size of 2MB, Drag and drop file upload functionality, Share button to copy image address, Download button to save image, Browse and select files for upload.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Code Sharing App - NoteCode",
                summary: "Application for sharing code snippets that allows users to store and share code with a generated ID. Include the option to choose language and theme, and disable the share button until edits are made. Responsive design for all devices.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            },
            {
                name: "Country Page",
                summary: "A country ranking page displaying data such as population, area, and name in a table. It allows sorting, filtering by regions and status (UN members, independent), and searching by name. It provides details of each country and its neighbors on individual pages. Responsive design and pagination option.",
                image: "countryPage.webp",
                stack: ["NextJS", "Tailwind", "Typescript", "React"],
                ref: "https://country-page-jp.vercel.app",
                repo: "https://github.com/JuanPDN/country-page"
            }
        ]
    },
    {
        category: "web projects",
        list: [
            {
                name: "Country Page",
                summary: "A country ranking page displaying data such as population, area, and name in a table. It allows sorting, filtering by regions and status (UN members, independent), and searching by name. It provides details of each country and its neighbors on individual pages. Responsive design and pagination option.",
                image: "countryPage.webp",
                stack: ["NextJS", "Tailwind", "Typescript", "React"],
                ref: "https://country-page-jp.vercel.app",
                repo: "https://github.com/JuanPDN/country-page"
            },
            {
                name: "Random Quote",
                summary: "Application to generate random quotes using HTML, CSS and JavaScript. It includes the display of random quotes, a button to generate new quotes, and the option to copy quotes to the clipboard. Responsive design for different screen sizes.",
                image: "randomQuote.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://random-quote-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/random-quote"
            },
            {
                name: "GitHub Profile",
                summary: "GitHub profile search application using HTML, CSS and JavaScript. It allows you to search by username, view followers, followers, location and repositories, and access details of each repository. Responsive and functional design.",
                image: "githubProfile.webp",
                stack: ["Typescript", "Tailwind", "React", "NextJS"],
                ref: "https://git-hub-profile-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/GitHub-profile"
            },
            {
                name: "Contact Page",
                summary: "Development of a contact page that uses HTML and CSS to create a functional form and responsive design. It includes icons, input fields with placeholders, a dropdown with options, and a button, all adapted for different screen sizes.",
                image: "contactPage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://contact-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/contact-page"
            },
            {
                name: "Simple Coffee Listing",
                summary: "Coffee listing page using Svelte. Includes a reusable card component with image, name, price, rating and number of votes. Displays labels and availability statuses conditionally and allows you to list all products or only those available. Uses data from an API or JS file.",
                image: "listCoffee.webp",
                stack: ["Svelte", "CSS", "Typescript"],
                ref: "https://simple-coffee-listing-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/Simple-Coffee-Listing"
            },
            {
                name: "Simple Homepage",
                summary: "Home page using HTML, CSS and JavaScript. It includes a logo, header, description, links and buttons, with functionalities to switch between light and dark mode and lateral navigation on mobiles. Responsive design for different screen sizes.",
                image: "homePage.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://home-page-dev.vercel.app/",
                repo: "https://github.com/JuanPDN/home-page"
            },
            {
                name: "Testimonial Page",
                summary: "Creation of a testimonial page using advanced HTML and CSS, including grid, media queries and icons. The project includes two testimonial cards and a responsive design for different screen sizes.",
                image: "testimonialPage.webp",
                stack: ["JavaScript", "Tailwind", "HTML"],
                ref: "https://testimonial-page-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/testimonial-page"
            },
            {
                name: "Blog de Cafe",
                summary: "A comprehensive coffee blog offering articles, reviews, brewing techniques, discussions about coffee culture, and courses for enthusiasts to deepen their knowledge and skills in the world of coffee.",
                image: "blog-cafe.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://3rdsite.netlify.app",
            }
        ]
    },
    {
        category: "mobile projects",
        list: [

            {
                name: "TokTik",
                summary: "The TikTokClone application is a visually stunning social media platform designed to replicate the engaging and entertaining user experience of the popular TikTok app.",
                image: "totik.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/TokTik",
            },

            {
                name: "yes no app",
                summary: "The AutoResponse Chat App streamlines communication by automatically generating predefined messages for yes and no responses. Users can customize messages and set up triggers easily. Available on web, mobile, and desktop platforms, it ensures prompt and efficient replies across various channels.",
                image: "yes-no-app.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/yes_no_app",
            },
            {
                name: "cinemapedia",
                summary: "The Upcoming Movies App keeps users informed about the latest releases and upcoming films in theaters. With a user-friendly interface, it provides details such as release dates, trailers, cast information, and reviews. Users can explore upcoming movies, bookmark favorites, and receive notifications for premiere dates.",
                image: "cinemapedia.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/cinemapedia",
            },
            {
                name: "app shop",
                summary: "The Product Management App is a user-friendly tool tailored for businesses to efficiently oversee their product inventory. With a focus on simplicity and effectiveness, this app simplifies the process of adding, editing, and organizing products. It enables users to maintain accurate product information, streamline inventory management, and make informed decisions to optimize product offerings.",
                image: "shop app.webp",
                stack: ["Flutter", "Dart"],
                repo: "https://github.com/JuanPDN/app_shop",
            }

        ]
    },
    {
        category: "web applications",
        list: [
            {
                name: "Simple image uploader",
                summary: "A full-stack image upload application that allows users to upload images in a simple and intuitive way, Upload images in JPG, PNG, or GIF format with a maximum size of 2MB, Drag and drop file upload functionality, Share button to copy image address, Download button to save image, Browse and select files for upload.",
                image: "imageUpload.webp",
                stack: ["NextJS", "Tailwind", "MySQL", "Docker", "NestJS", "Typescript", "React"],
                ref: "https://simple-image-uploader-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/simple-image-uploader"
            },
            {
                name: "Code Sharing App - NoteCode",
                summary: "Application for sharing code snippets that allows users to store and share code with a generated ID. Include the option to choose language and theme, and disable the share button until edits are made. Responsive design for all devices.",
                image: "codeSharing.webp",
                stack: ["VueJS", "MongoDB", "Typescript", "Docker", "ExpressJS", "NodeJS"],
                ref: "https://code-sharing-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/code-sharing-app"
            },
            {
                name: "QR Code Generator",
                summary: "Generate QR codes with HTML, CSS and JavaScript. It allows you to enter a URL, generate a QR code, download the image and copy the code to the clipboard. Responsive design for different screen sizes.",
                image: "qrCode.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://qr-code-generator-jp.vercel.app",
                repo: "https://github.com/JuanPDN/qr-code-generator"
            },
            {
                name: "Music Player",
                summary: "Music player with HTML, CSS and JavaScript. Play, stop, fast forward and rewind songs, and adjust playback with a progress bar. Responsive design.",
                image: "musicPlayer.webp",
                stack: ["JavaScript", "CSS", "HTML"],
                ref: "https://music-player-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/music-player"
            },
            {
                name: "Translate App",
                summary: "Translation application using an API, with support to translate texts of up to 500 characters. It includes options to translate between multiple languages, see updates in real time, listen to translated texts and copy the text. Interactive and functional design.",
                image: "translateApp.webp",
                stack: ["Typescript", "React", "Tailwind"],
                ref: "https://translate-app-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/translate-app"
            }

        ]
    },
    {
        category: "web games",
        list: [
            {
                name: "Guess The Word Game",
                summary: "Game in which users guess a messy word. Using HTML, CSS and JavaScript. It includes letter input, error tracking, and buttons to regenerate words and restart the game. Responsive design for various screen sizes.",
                image: "guessWord.webp",
                stack: ["JavaScript", "CSS", "HTML", "Tailwind"],
                ref: "https://juanpdn.github.io/Guess-the-word/",
                repo: "https://github.com/JuanPDN/Guess-the-word"
            },
            {
                name: "Country Quiz",
                summary: "Application of questionnaire on countries using an API to generate 10 questions with 4 options each. It shows the correct answer immediately, allows you to navigate between questions, and presents a page of results and congratulations when completing the questionnaire. Interactive and functional design.",
                image: "countryQuiz.webp",
                stack: ["Typescript", "Angular", "HTML", "CSS"],
                ref: "https://country-quiz-jp.vercel.app/",
                repo: "https://github.com/JuanPDN/country-quiz"
            }
        ]
    }
]

export default projects