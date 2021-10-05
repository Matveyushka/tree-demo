import React from 'react'
import { useResizeDetector } from 'react-resize-detector';
import '../../css/TreeMonitor.css'
import { TreeNode, TreeNodeType } from '../../tree/tree';
import drawTree from './TreeDrawer';
import { useSelector } from 'react-redux'
import { State } from '../../state';

type CanvasPosition = {
    x: number,
    y: number
}

const TreeMonitor = () => {
    const [position, setPosition] = React.useState<CanvasPosition>({x: 0, y: 0})
    const [positionMoving, setPositionMoving] = React.useState<boolean>(false)
    const [scale, setScale] = React.useState<number>(1)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const tree = useSelector((state: State) => state.tree)

    const draw = () => {
        if (canvasRef && canvasRef.current && canvasRef.current.getContext) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const containerWidth = container.ref.current?.clientWidth ?? 0
                const containerHeight = container.ref.current?.clientHeight ?? 0

                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

                drawTree(ctx, tree, scale, position, containerWidth, containerHeight)
                ctx.fillStyle = 'rgb(200, 0, 0)'
                ctx.fillRect(
                    -400 * scale + position.x * scale + containerWidth / 2, 
                    -400 * scale + position.y * scale + containerHeight / 2, 
                    50 * scale, 50 * scale)

                ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
                ctx.fillRect(
                    30 * scale + position.x * scale + containerWidth / 2, 
                    30 * scale + position.y * scale + containerHeight / 2, 
                    50 * scale, 50 * scale)
            }
        }
    }

    const container = useResizeDetector<HTMLDivElement>({
        onResize: () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.width = container.ref.current?.clientWidth || 0
                canvasRef.current.height = container.ref.current?.clientHeight || 0
            }
            draw()
        }
    })

    const startMovePosition = (event: React.MouseEvent) => {
        console.log('editor')
        setPositionMoving(true)
    }

    const handlePositionMoving = (event: React.MouseEvent) => {
        if (positionMoving) {
            setPosition({x: position.x + event.movementX / scale, y: position.y + event.movementY / scale})
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
    }, [position, scale, draw])

    return (
        <div ref={container.ref} className='tree-monitor' 
            onWheel={wheelHandler}
            onMouseDown={startMovePosition}
            onMouseMove={handlePositionMoving}
            onMouseUp={finishMovePosition}
            onMouseLeave={finishMovePosition}>
            <canvas ref={canvasRef} className='tree-canvas'
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