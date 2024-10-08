export interface Projects {
    category: string,
    list: Project[]
}

const stackItems = [
    "HTML", "CSS", "JavaScript", "Typescript", "Tailwind", "React",
    "Angular", "NextJS", "VueJS", "Svelte", "Astro", "MySQL", "MongoDB",
    "PostgreSQL", "Dart", "Flutter", "Docker", "NestJS", "NodeJS", "ExpressJS",
] as const
type StackItem = typeof stackItems[number]

interface Project {
    name: string,
    summary: string,
    image: string,
    stack: StackItem[],
    ref?: string,
    repo?: string
}