import { CanvasPosition } from "."
import { Link } from "../../structure/link"
import { CircleModule, isCircle, isRectangle, Module, RectangleModule } from "../../structure/module"
import { isChildPort, isSelfPort, Port } from "../../structure/port"
import { isDirectedPortIndex, isSimplePortIndex } from "../../structure/portIndex"

type Position = {
    x: number,
    y: number
}

type Size = {
    width: number,
    height: number
}

const unit = 10

const getLinkPortPosition = (
    port: Port,
    module: Module,
    size: Size
) => {
    let position: Position = { x: 0, y: 0 }

    console.log(port)

    if (isSelfPort(port)) {
        console.log('selfport')
        if (isSimplePortIndex(port.portIndex) && isCircle(module)) {
            console.log('simpleport')
            return getCircleModulePortPosition(module, size, port.portIndex.portIndex)
        } else if (isDirectedPortIndex(port.portIndex) && isRectangle(module)) {
            console.log('directedport')
            console.log(getRectangleModulePortPosition(module, size, port.portIndex.portIndex, port.portIndex.portDirection))
            return getRectangleModulePortPosition(module, size, port.portIndex.portIndex, port.portIndex.portDirection)
        }
    }
    if (isChildPort(port)) {
        console.log('childport')
        const submodules = module.submodules.get(port.submoduleName)
        const submodule = (submodules !== undefined) ? submodules[port.submoduleIndex] : null
        if (isSimplePortIndex(port.portIndex)
            && submodule
            && isCircle(submodule)) {
                console.log('simpleport')
            
            const childPosition = getCircleModulePortPosition(submodule, getModuleSize(submodule), port.portIndex.portIndex)

            childPosition.x += (module.x ?? 0) + 10
            childPosition.y += (module.y ?? 0) + 10

            return childPosition
        } else if (isDirectedPortIndex(port.portIndex) 
        && submodule 
        && isRectangle(submodule)) {
            console.log('directedport')
            console.log(getRectangleModulePortPosition(submodule, getModuleSize(submodule), port.portIndex.portIndex, port.portIndex.portDirection))
            const childPosition = getRectangleModulePortPosition(submodule, getModuleSize(submodule), port.portIndex.portIndex, port.portIndex.portDirection)

            childPosition.x += (module.x ?? 0) + 10
            childPosition.y += (module.y ?? 0) + 10

            return childPosition
        }
    }
    return position
}

const getRectangleModulePortPosition = (module: RectangleModule, size: Size, index: number, direction: number): Position => {
    if (direction === 0) {
        return {
            x: (module.x ?? 0),
            y: (module.y ?? 0) + size.height / (module.west + 1) * (index + 1)
        }
    } else if (direction === 1) {
        return {
            x: (module.x ?? 0) + size.width / (module.north + 1) * (index + 1),
            y: (module.y ?? 0),
        }
    } else if (direction === 2) {
        return {
            x: (module.x ?? 0) + size.width,
            y: (module.y ?? 0) + size.height / (module.west + 1) * (index + 1)
        }
    } else {
        return {
            x: (module.x ?? 0) + size.width / (module.south + 1) * (index + 1),
            y: (module.y ?? 0) + size.height,
        }
    }
}

const getCircleModulePortPosition = (module: CircleModule, size: Size, index: number): Position => ({
    x: (module.x ?? 0) + size.width / 2 + size.width / 2 * Math.cos(Math.PI * 2 / module.portQuantity * index),
    y: (module.y ?? 0) + size.width / 2 + size.width / 2 * Math.sin(Math.PI * 2 / module.portQuantity * index)
})

const flatSubmodules = (module: Module): Module[] => Array
    .from(module.submodules, ([key, value]) => value)
    .flat()

const getRightSubmodulesBorder = (module: Module) => flatSubmodules(module)
    .reduce((rightest, submodule) => Math.max(rightest, 10 + (submodule.x ?? 0) + getModuleSize(submodule).width), 0)

const getBottomSubmodulesBorder = (module: Module) => flatSubmodules(module)
    .reduce((bottomest, submodule) => Math.max(bottomest, 10 + (submodule.y ?? 0) + getModuleSize(submodule).height), 0)

const getModuleSize = (module: Module): Size => {
    let portMinimumSize: Size = { width: 0, height: 0 }
    if (isCircle(module)) {
        portMinimumSize.width = (module as CircleModule).portQuantity * unit
        portMinimumSize.height = (module as CircleModule).portQuantity * unit
        if (module.submodules !== undefined && Array.from(module.submodules).length === 0) {
            return { width: portMinimumSize.width * 2, height: portMinimumSize.height * 2 }
        }
        else {
            return {
                width: Math.max((10 + getRightSubmodulesBorder(module)) / Math.SQRT2 * 2, portMinimumSize.width),
                height: Math.max((10 + getBottomSubmodulesBorder(module)) / Math.SQRT2 * 2, portMinimumSize.height)
            }
        }
    }
    if (isRectangle(module)) {
        portMinimumSize.width = Math.max(((module as RectangleModule).north + 1) * unit, ((module as RectangleModule).south + 1) * unit)
        portMinimumSize.height = Math.max(((module as RectangleModule).west + 1) * unit, ((module as RectangleModule).east + 1) * unit)
        if (module.submodules !== undefined && Array.from(module.submodules).length === 0) {
            return { width: portMinimumSize.width, height: portMinimumSize.height }
        }
        else {
            return {
                width: Math.max(10 + getRightSubmodulesBorder(module), portMinimumSize.width),
                height: Math.max(10 + getBottomSubmodulesBorder(module), portMinimumSize.height)
            }
        }
    }
    return { width: 0, height: 0 }
}

const drawPort = (
    context: CanvasRenderingContext2D,
    beginX: number,
    beginY: number,
    position: Position,
    scale: number,
    cnvsposition: CanvasPosition,
    canvasWidth: number,
    canvasHeight: number,
) => {
    const x = (beginX + position.x + cnvsposition.x) * scale + canvasWidth / 2
    const y = (beginY + position.y + cnvsposition.y) * scale + canvasHeight / 2
    context.strokeStyle = 'black'
    context.fillStyle = 'black'
    context.lineWidth = 1
    context.beginPath()
    context.arc(x, y, 1.5 * scale, 0, 2 * Math.PI)
    context.fill()
    context.stroke()
}

const drawLink = (
    context: CanvasRenderingContext2D,
    beginX: number,
    beginY: number,
    link: Link,
    module: Module,
    size: Size,
    scale: number,
    cnvsposition: CanvasPosition,
    canvasWidth: number,
    canvasHeight: number,
) => {
    console.log('---')
    console.log(module)
    console.log(link)

    const fromPosition = getLinkPortPosition(link.from, module, size)
    const toPosition = getLinkPortPosition(link.to, module, size)

    const x1 = (beginX + (fromPosition.x ?? 0) + cnvsposition.x) * scale + canvasWidth / 2
    const y1 = (beginY + (fromPosition.y ?? 0) + cnvsposition.y) * scale + canvasHeight / 2

    const x2 = (beginX + (toPosition.x ?? 0) + cnvsposition.x) * scale + canvasWidth / 2
    const y2 = (beginY + (toPosition.y ?? 0) + cnvsposition.y) * scale + canvasHeight / 2

    context.strokeStyle = 'red'
    context.lineWidth = 2
    context.beginPath()

    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}

const drawModule = (
    context: CanvasRenderingContext2D,
    beginX: number,
    beginY: number,
    module: Module,
    scale: number,
    position: CanvasPosition,
    canvasWidth: number,
    canvasHeight: number,
) => {
    const x = (beginX + (module.x ?? 0) + position.x) * scale + canvasWidth / 2
    const y = (beginY + (module.y ?? 0) + position.y) * scale + canvasHeight / 2
    const size = getModuleSize(module)

    const offsetX = beginX + (isRectangle(module) ? 10 : ((size.width - size.width / Math.SQRT2) / 2 + 10))
    const offsetY = beginY + (isRectangle(module) ? 10 : ((size.width - size.width / Math.SQRT2) / 2 + 10))

    context.strokeStyle = 'black'
    context.lineWidth = 1
    
    if (isRectangle(module)) {
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(x + size.width * scale, y)
        context.lineTo(x + size.width * scale, y + size.height * scale)
        context.lineTo(x, y + size.height * scale)
        context.lineTo(x, y)
        context.stroke()

        Array(module.west).fill(0).forEach((_, index) => drawPort(
            context, beginX, beginY, getRectangleModulePortPosition(module, size, index, 0), scale, position, canvasWidth, canvasHeight,
        ))
        Array(module.north).fill(0).forEach((_, index) => drawPort(
            context, beginX, beginY, getRectangleModulePortPosition(module, size, index, 1), scale, position, canvasWidth, canvasHeight,
        ))
        Array(module.east).fill(0).forEach((_, index) => drawPort(
            context, beginX, beginY, getRectangleModulePortPosition(module, size, index, 2), scale, position, canvasWidth, canvasHeight,
        ))
        Array(module.south).fill(0).forEach((_, index) => drawPort(
            context, beginX, beginY, getRectangleModulePortPosition(module, size, index, 3), scale, position, canvasWidth, canvasHeight,
        ))
    }
    else if (isCircle(module)) {
        context.beginPath()
        context.arc(x + size.width / 2 * scale, y + size.height / 2 * scale, size.width / 2 * scale, 0, 2 * Math.PI)
        context.stroke()
        Array(module.portQuantity).fill(0).forEach((_, index) => drawPort(
            context, beginX, beginY, getCircleModulePortPosition(module, size, index), scale, position, canvasWidth, canvasHeight,
        ))
    }

    module.links.forEach(link => drawLink(context, beginX, beginY, link, module, size, scale, position, canvasWidth, canvasHeight))
    
    flatSubmodules(module).forEach(submodule => drawModule(
        context,
        (module.x ?? 0) + offsetX,
        (module.y ?? 0) + offsetY,
        submodule,
        scale,
        position,
        canvasWidth,
        canvasHeight))
}

const drawStructure = (
    context: CanvasRenderingContext2D,
    structure: Module,
    scale: number,
    position: CanvasPosition,
    canvasWidth: number,
    canvasHeight: number,
) => {
    drawModule(context, 0, 0, structure, scale, position, canvasWidth, canvasHeight)
}

export { drawStructure }