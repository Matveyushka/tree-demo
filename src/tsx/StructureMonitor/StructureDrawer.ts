import { CanvasPosition, ConnectionEntity, ModuleEntity } from "."

const drawStructure = (
    context: CanvasRenderingContext2D,
    modules: ModuleEntity[],
    connections: ConnectionEntity[],
    scale: number,
    position: CanvasPosition,
    canvasWidth: number,
    canvasHeight: number,
) => {
    modules.forEach((nodeEntity, index) => {
        const x = (nodeEntity.x + position.x) * scale + canvasWidth / 2
        const y = (nodeEntity.y + position.y) * scale + canvasHeight / 2

        context.fillStyle = 'black'
        context.lineWidth = 1
        context.beginPath()
        context.arc(x, y, 20 * scale, 0, 2 * Math.PI)
        context.fill()
        context.strokeStyle = 'black'
        context.stroke()
    })
}

export { drawStructure }