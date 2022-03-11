import React from 'react'
import { useSelector } from 'react-redux'
import { useResizeDetector } from 'react-resize-detector'
import '../../css/StructureMonitor.css'
import { State } from '../../state'
import { ConnectionM2 } from '../../structure/ConnectionM2'
import { ModuleM2 } from '../../structure/ModuleM2'
import { drawStructure } from './StructureDrawer'

type CanvasPosition = {
    x: number,
    y: number
}

export type ModuleEntity = {
    x: number,
    y: number,
    module: ModuleM2
}

export type ConnectionEntity = {
    connection: ConnectionM2
}

const TreeMonitor = () => {
    const [position, setPosition] = React.useState<CanvasPosition>({ x: 0, y: 0 })
    const [positionMoving, setPositionMoving] = React.useState<boolean>(false)
    const [modules, setModules] = React.useState<ModuleEntity[]>([])
    const [connections, setConnections] = React.useState<ConnectionEntity[]>([])
    const [scale, setScale] = React.useState<number>(1)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const structure = useSelector((state: State) => state.structure.structure)

    React.useEffect(() => {
        setModules(structure.modules.map((module, index) => ({
            x: 30 * index,
            y: 0,
            module
        })))
    }, [structure.modules])

    React.useEffect(() => {
        setConnections(structure.connections.map((connection, index) => ({
            connection
        })))
    }, [structure.connections])

    const container = useResizeDetector<HTMLDivElement>({
        onResize: () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.width = (container.ref.current?.clientWidth || 0)
                canvasRef.current.height = (container.ref.current?.clientHeight || 0) - 10
            }
            draw()
        }
    })

    const draw = React.useCallback(() => {
        if (canvasRef && canvasRef.current && canvasRef.current.getContext) {
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {
                const containerWidth = container.ref.current?.clientWidth ?? 0
                const containerHeight = container.ref.current?.clientHeight ?? 0

                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

                drawStructure(
                    ctx,
                    modules,
                    connections,
                    scale,
                    position,
                    containerWidth,
                    containerHeight
                )
            }
        }
    }, [connections, container.ref, modules, position, scale])

    const startMovePosition = (event: React.MouseEvent) => {
        setPositionMoving(true)
    }

    const handlePositionMoving = (event: React.MouseEvent) => {
        if (positionMoving) {
            setPosition({ x: position.x + event.movementX / scale, y: position.y + event.movementY / scale })
        }
        else {
            const clientRect = container.ref!.current!.getBoundingClientRect()
            const mouseX = event.clientX - Math.round(clientRect.x)
            const mouseY = event.clientY - Math.round(clientRect.y)
        }
    }

    const finishMovePosition = (event: React.MouseEvent) => {
        setPositionMoving(false)
    }

    const raiseScale = () => {
        if (scale <= 2.95) {
            setScale(scale + 0.1)
        }
    }

    const lowerScale = () => {
        if (scale >= 0.15) {
            setScale(scale - 0.1)
        }
    }

    const wheelHandler = (event: React.WheelEvent) => {
        event.deltaY > 0 ? lowerScale() : raiseScale()
    }

    React.useEffect(() => {
        draw()
    }, [draw])

    return (
        <div ref={container.ref} className='structure-monitor'
            onWheel={wheelHandler}
            onMouseDown={startMovePosition}
            onMouseMove={handlePositionMoving}
            onMouseUp={finishMovePosition}
            onMouseLeave={finishMovePosition}>
            <canvas ref={canvasRef} className='structure-canvas'
                width="0" height="0" style={{ width: "100%", height: "100%" }}>
            </canvas>
            <div className='scale-control'>
                <button id='scale-button-minus' className='scale-control-button' onClick={() => lowerScale()}>-</button>
                <div className='scale-control-label'>{Math.round(scale * 10) / 10}</div>
                <button id='scale-button-plus' className='scale-control-button' onClick={() => raiseScale()}>+</button>
            </div>
        </div>
    )
}

export default TreeMonitor

export type { CanvasPosition }