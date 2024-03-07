/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_elL8HOjn.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as $$Card, $ as $$Layout } from './blogs_CosvH6tc.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="flex flex-col mx-8 my-8 items-center"> <div class="lg:max-w-[900px] p-6 pt-10 max-w-[100vw]"> <h3 class="text-xl py-1">Hey There 👋🏻</h3> <h1 class="text-5xl font-bold">I'm Juan Pablo Delgado</h1> <h2 class="text-3xl py-3 font-bold">Full Stack and Mobile Developer</h2> <p class="text-xl my-8">
Full Stack Developer with a passion for building responsive and
          interactive web applications. Proficient in front-end and back-end
          technologies, with expertise in JavaScript, React, Node.js, and
          MongoDB. Skilled in creating scalable solutions that deliver
          exceptional user experiences.
</p> <h2 class="text-3xl w-full mb-12 font-bold">My last project ${"</>"}</h2> ${renderComponent($$result2, "Card", $$Card, { "name": "yes-no-app", "summary": "The AutoResponse Chat App streamlines communication by automatically generating predefined messages for yes and no responses. Users can customize messages and set up triggers easily. Available on web, mobile, and desktop platforms, it ensures prompt and efficient replies across various channels.", "img": "src/assets/yes-no-app.png", "ref": "https://github.com/JuanPDN/yes_no_app" })} ${renderComponent($$result2, "Card", $$Card, { "name": "cinemapedia", "summary": "The Upcoming Movies App keeps users informed about the latest releases and upcoming films in theaters. With a user-friendly interface, it provides details such as release dates, trailers, cast information, and reviews. Users can explore upcoming movies, bookmark favorites, and receive notifications for premiere dates.", "img": "src/assets/cinemapedia.png", "ref": "https://github.com/JuanPDN/cinemapedia" })} ${renderComponent($$result2, "Card", $$Card, { "name": "app_shop", "summary": "The Product Management App is a user-friendly tool tailored for businesses to efficiently oversee their product inventory. With a focus on simplicity and effectiveness, this app simplifies the process of adding, editing, and organizing products. It enables users to maintain accurate product information, streamline inventory management, and make informed decisions to optimize product offerings.", "img": "src/assets/shop app.png", "ref": "https://github.com/JuanPDN/app_shop" })} </div> </div> </main> ` })}`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/juandelgadonivia/Documents/Portfolio/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
