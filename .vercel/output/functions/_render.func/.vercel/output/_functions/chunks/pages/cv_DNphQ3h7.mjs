/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_elL8HOjn.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './blogs_CosvH6tc.mjs';

const $$Astro = createAstro();
const $$Cv = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cv;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resume" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="flex flex-col mx-8 my-8 items-center"> <div class="lg:max-w-[900px] p-6 pt-10 max-w-[100vw]"> <h2 class="text-3xl py-3 w-full font-bold">Profile</h2> <p class="text-justify my-8">
Full Stack Developer with a background in business administration,
          specializing in Front-end, Back-end, and mobile development.
          Proficient in HTML5, CSS3, JavaScript, React, Redux, MySQL, MongoDB,
          PostgreSQL, and CSS frameworks. Experienced in agile methodologies,
          GIT, data structures, and algorithms. Strong analytical skills with
          the ability to work collaboratively in teams. Possesses adaptability,
          effective communication, and teamwork abilities. English proficiency
          level: B1.
</p> <h2 class="text-3xl py-3 w-full font-bold">Education</h2> <ul> <li class="my-7"> <h3 class="font-bold">Flutter developer</h3> <p>2023 to 2024 at Udemy, virtual</p> </li> <li class="my-7"> <h3 class="font-bold">Fullstack developer</h3> <p>2023 to 2023 at Bootcamp, virtual</p> </li> <li class="my-7"> <h3 class="font-bold">Computer Systems Programming Methodology</h3> <p>2020 at SENA, Bogota, Colombia</p> </li> <li class="my-7"> <h3 class="font-bold">Business Administrator</h3> <p>2017 to 2019 at Fundacion Universitaria del Area Andina, Bogota, Colombia</p> </li> </ul> <p class="text-justify my-8"></p> <h2 class="text-3xl py-3 w-full font-bold">Skills</h2> <ul class="list-disc md:columns-5 columns-2 mx-6"> <li>HTML5</li> <li>CSS</li> <li>Tailwind</li> <li>Typescript</li> <li>Javascript</li> <li>React</li> <li>Redux</li> <li>MySQL</li> <li>MongoDB</li> <li>PostgreSQL</li> <li>Dart</li> <li>Flutter</li> <li>Docker</li> </ul> </div> </div> </main> ` })}`;
}, "/Users/juandelgadonivia/Documents/Portfolio/src/pages/cv.astro", void 0);

const $$file = "/Users/juandelgadonivia/Documents/Portfolio/src/pages/cv.astro";
const $$url = "/cv";

export { $$Cv as default, $$file as file, $$url as url };
