export interface Projects {
    category: string,
    list: Project[]
}

export interface Project {
    name: string,
    summary: string,
    image: string,
    ref: string
}