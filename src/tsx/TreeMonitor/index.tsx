import React from 'react'
import { useResizeDetector } from 'react-resize-detector'
import '../../css/TreeMonitor.css'
import drawTree, { calculateNodeEntities, NodeEntity } from './TreeDrawer'
import { useSelector } from 'react-redux'
import { State } from '../../state'
import { TreeNodeType } from '../../tree/tree'

type CanvasPosition = {
    x: number,
    y: number
}

const TreeMonitor = () => {
    const [position, setPosition] = React.useState<CanvasPosition>({ x: 0, y: 0 })
    const [positionMoving, setPositionMoving] = React.useState<boolean>(false)
    const [scale, setScale] = React.useState<number>(1)
    const [nodeEntities, setNodeEntities] = React.useState<NodeEntity[]>([])
    const [showId, setShowId] = React.useState<boolean>(false)

    const [info, setInfo] = React.useState("")

    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const treeState = useSelector((state: State) => state.tree)
    const genotype = useSelector((state: State) => state.genotype.choosenGenotype)

    const container = useResizeDetector<HTMLDivElement>({
        onResize: () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.width = container.ref.current?.clientWidth || 0
                canvasRef.current.height = container.ref.current?.clientHeight || 0
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

                drawTree(ctx, nodeEntities, scale, position, containerWidth, containerHeight, showId, genotype)
            }
        }
    }, [container.ref, nodeEntities, position, scale, genotype, showId])

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

            let infoSet = false

            nodeEntities.forEach((nodeEntity, index) => {
                const x = (nodeEntity.x + position.x) * scale + (container.ref.current?.clientWidth ?? 0) / 2
                const y = (nodeEntity.y + position.y) * scale + (container.ref.current?.clientHeight ?? 0) / 2

                if (Math.sqrt(Math.pow((mouseX - x), 2) + Math.pow((mouseY - y), 2)) < nodeEntity.radius * scale) {
                    if (nodeEntity.node.content !== undefined)
                    {
                        setInfo(index + ";" + nodeEntity.node.content)
                    }
                    infoSet = true
                }
            })

            if (infoSet === false) {
                setInfo("")
            }
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

    const getOptionsAmount = () => {
        let nodeSize: number[] = []
        for (let i = treeState.tree.length - 1; i >= 0; i--)
        {
            if (treeState.tree[i].children.length === 0) {
                nodeSize[i] = 1
            }
            else if (treeState.tree[i].type === TreeNodeType.AND)
            {
                nodeSize[i] = treeState.tree[i].children.reduce((acc, value) => acc * nodeSize[value], 1)
            }
            else
            {
                nodeSize[i] = treeState.tree[i].children.reduce((acc, value) => acc + nodeSize[value], 0)
            }
        }
        return nodeSize[0] ?? 0
    }

    React.useEffect(() => {
        draw()
    }, [draw])

    React.useEffect(() => {
        if (treeState.tree) {
            setNodeEntities(calculateNodeEntities(treeState.tree))
        }
    }, [treeState])

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
            <div className='tree-size'>
            {
                (treeState.tree?.length ?? 0) + " : " +
                (treeState.tree?.filter(node => node.type === TreeNodeType.OR && node.children.length !== 0).length ?? 0) + " : " +
                getOptionsAmount()
            } 
            </div>
            {info !== "" ? (<div className='tree-info'>
                {
                    info.split(";").map((content, index) => <div key={index}>{content}</div>)
                }</div>) : ""
            }
            <div className='scale-control'>
                <button id='scale-button-minus' className='scale-control-button' onClick={() => setShowId(!showId)}>Id</button>
                <button id='scale-button-minus' className='scale-control-button' onClick={() => lowerScale()}>-</button>
                <div className='scale-control-label'>{Math.round(scale * 10) / 10}</div>
                <button id='scale-button-plus' className='scale-control-button' onClick={() => raiseScale()}>+</button>
            </div>
        </div>
    )
}

export default TreeMonitor

export type { CanvasPosition }