import React from 'react'
import { useResizeDetector } from 'react-resize-detector'
import '../../css/StructureMonitor.css'

type CanvasPosition = {
    x: number,
    y: number
}

const TreeMonitor = () => {
    const [position, setPosition] = React.useState<CanvasPosition>({ x: 0, y: 0 })
    const [positionMoving, setPositionMoving] = React.useState<boolean>(false)
    const [scale, setScale] = React.useState<number>(1)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)

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

                ctx.fillStyle = 'blue'
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.arc(containerWidth / 2 * scale, containerHeight / 2 * scale, 20 * scale, 0, 2 * Math.PI)
                ctx.fill()
                ctx.strokeStyle = 'blue'
                ctx.stroke()
            }
        }
    }, [container.ref, scale])

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