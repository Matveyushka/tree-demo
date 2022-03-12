import { Link } from "./link"

type ModuleBase = {
    name: string,
    submodules: Map<string, Module[]>,
    links: Array<Link>,
    x: number | null,
    y: number | null
}

export type CircleModule = ModuleBase & {
    portQuantity: number
}

export type RectangleModule = ModuleBase & {
    west: number,
    north: number,
    east: number,
    south: number,
}

export const isCircle = (module: Module) : module is CircleModule => {
    if ((module as CircleModule).portQuantity !== undefined) {
        return true
    }
    return false
}

export const isRectangle = (module: Module) : module is RectangleModule => {
    if ((module as RectangleModule).west !== undefined) {
        return true
    }
    return false
}

export type Module = CircleModule | RectangleModule;