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

    if (isSelfPort(port)) {
        if (isSimplePortIndex(port.portIndex) && isCircle(module)) {
            return getCircleModulePortPosition(module, size, port.portIndex.portIndex)
        } else if (isDirectedPortIndex(port.portIndex) && isRectangle(module)) {
            return getRectangleModulePortPosition(module, size, port.portIndex.portIndex, port.portIndex.portDirection)
        }
    }
    if (isChildPort(port)) {
        const submodules = module.submodules.get(port.submoduleName)
        const submodule = (submodules !== undefined) ? submodules[port.submoduleIndex] : null

        console.log(module.name)
        console.log(port.portIndex)
        if (isSimplePortIndex(port.portIndex)
            && submodule
            && isCircle(submodule)) {
            
            const childPosition = getCircleModulePortPosition(submodule, getModuleSize(submodule), port.portIndex.portIndex)

            childPosition.x += (module.x ?? 0) + (size.width - getWorkingWidth(module)) / 2
            childPosition.y += (module.y ?? 0) + (size.height - getWorkingHeight(module)) / 2

            return childPosition
        } else if (isDirectedPortIndex(port.portIndex) 
        && submodule 
        && isRectangle(submodule)) {
            const childPosition = getRectangleModulePortPosition(submodule, getModuleSize(submodule), port.portIndex.portIndex, port.portIndex.portDirection)

            childPosition.x += (module.x ?? 0) + (isCircle(module) ? ((size.width - getWorkingWidth(module)) / 2 ) : unit)
            childPosition.y += (module.y ?? 0) + (isCircle(module) ? ((size.height - getWorkingHeight(module)) / 2 ) : unit)

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

const getWorkingWidth = (module: Module) => {
    let submoduleX = 0
    return flatSubmodules(module)
    .reduce((rightest, submodule, index, submodules) => {
        submoduleX = module.x ?? (submoduleX + (index === 0 ? 0 : (getModuleSize(submodules[index - 1]).width + unit)))
        return Math.max(rightest, (submoduleX ?? 0) + getModuleSize(submodule).width)
    }, 0)
}

const getWorkingHeight = (module: Module) => flatSubmodules(module)
    .reduce((bottomest, submodule) => Math.max(bottomest, (submodule.y ?? 0) + getModuleSize(submodule).height), 0)

const getModuleSize = (module: Module): Size => {
    const workingWidth = getWorkingWidth(module)
    const workingHeight = getWorkingHeight(module)
    if (isCircle(module)) {
        const minDiameter = module.portQuantity * unit * 2
        if (module.submodules !== undefined && Array.from(module.submodules).length === 0) {
            return { width: minDiameter, height: minDiameter }
        }
        else {
            const actualWidth = workingWidth + 2 * unit
            const actualHeight = workingHeight + 2 * unit
            const diameter = 2 * Math.sqrt(actualWidth * actualWidth + actualHeight * actualHeight) / 2
            return {
                width: Math.max(diameter, minDiameter),
                height: Math.max(diameter, minDiameter)
            }
        }
    }
    if (isRectangle(module)) {
        let portMinimumSize: Size = { 
            width: Math.max(((module as RectangleModule).north + 1) * unit, ((module as RectangleModule).south + 1) * unit), 
            height: Math.max(((module as RectangleModule).west + 1) * unit, ((module as RectangleModule).east + 1) * unit) 
        }
        if (module.submodules !== undefined && Array.from(module.submodules).length === 0) {
            return { width: portMinimumSize.width, height: portMinimumSize.height }
        }
        else {
            return {
                width: Math.max(workingWidth + 2 * unit, portMinimumSize.width),
                height: Math.max(workingHeight + 2 * unit, portMinimumSize.height)
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

const drawWorkingArea = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    module: Module,
    scale: number
) => {
    const size = getModuleSize(module)
    context.strokeStyle = 'red'
    context.setLineDash([5, 5])
    context.lineWidth = 2
    context.beginPath()
    if (isRectangle(module)) {
        context.moveTo(x + unit * scale, y + unit * scale)
        context.lineTo(x + size.width * scale - unit * scale, y + unit * scale)
        context.lineTo(x + size.width * scale - unit * scale, y + size.height * scale - unit * scale)
        context.lineTo(x + unit * scale, y + size.height * scale - unit * scale)
        context.lineTo(x + unit * scale, y + unit * scale)
    } else if (isCircle(module)) {
        const w = getWorkingWidth(module) + unit * 2
        const h = getWorkingHeight(module) + unit * 2
        context.moveTo(x + (size.width - w) / 2 * scale, y + (size.height - h) / 2 * scale)
        context.lineTo(x + (size.width + w) / 2 * scale, y + (size.height - h) / 2 * scale)
        context.lineTo(x + (size.width + w) / 2 * scale, y + (size.height + h) / 2 * scale)
        context.lineTo(x + (size.width - w) / 2 * scale, y + (size.height + h) / 2 * scale)
        context.lineTo(x + (size.width - w) / 2 * scale, y + (size.height - h) / 2 * scale)
    }
    context.stroke()
    context.setLineDash([5, 0])
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

    const offsetX = beginX + (isRectangle(module) ? unit : ((size.width - getWorkingWidth(module)) / 2))
    const offsetY = beginY + (isRectangle(module) ? unit : ((size.width - getWorkingHeight(module)) / 2))

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
    
    let submoduleX = 0
    let submoduleY = 0 
    flatSubmodules(module).forEach((submodule, index, submodules) => {
        submoduleX = module.x ?? (submoduleX + (index === 0 ? 0 : (getModuleSize(submodules[index - 1]).width + unit)))
        submoduleY = module.y ?? 0

        drawModule(
            context,
            submoduleX + offsetX,
            submoduleY + offsetY,
            submodule,
            scale,
            position,
            canvasWidth,
            canvasHeight)
    })

    //drawWorkingArea(context, x, y, module, scale)
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