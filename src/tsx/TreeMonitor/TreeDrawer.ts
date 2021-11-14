import { CanvasPosition } from '.'
import { TreeNode, TreeNodeType } from '../../tree/tree'

const nodeAreaWidth = 20
const nodeAreaHeight = 40

type NodeEntity = {
    node: TreeNode,
    x: number,
    y: number,
    radius: number,
}

const calculateNodeEntity = (
    nodeEntities: NodeEntity[],
    index: number,
    treeArray: Array<TreeNode>,
    widthTree: Array<number>,
    heightTree: Array<number>,
    level: number,
    offset: number
) => {
    const x = ((offset + widthTree[index] / 2) * nodeAreaWidth - widthTree[0] * nodeAreaWidth / 2)
    const y = ((level) * nodeAreaHeight - heightTree[0] * nodeAreaWidth / 2)
    const radius = 5

    nodeEntities[index] = {
        node: treeArray[index],
        x,
        y,
        radius
    }

    let currentOffset = offset
    for (let i = 0; i !== treeArray[index].children.length; i++) {
        calculateNodeEntity(
            nodeEntities,
            treeArray[index].children[i],
            treeArray,
            widthTree,
            heightTree,
            level + 1,
            currentOffset)
        currentOffset += widthTree[treeArray[index].children[i]]
    }
}

const calculateNodeEntities = (
    treeArray: Array<TreeNode>
): NodeEntity[] => {
    const widthTree: Array<number> = []
    const heightTree: Array<number> = []
    for (let nodeIndex = treeArray.length - 1; nodeIndex >= 0; nodeIndex--) {
        if (treeArray[nodeIndex].children.length === 0) {
            widthTree[nodeIndex] = 1
            heightTree[nodeIndex] = 1
        } else {
            widthTree[nodeIndex] = treeArray[nodeIndex].children.reduce((sum, child) => sum + widthTree[child], 0)
            heightTree[nodeIndex] = treeArray[nodeIndex].children.reduce((height, child) => Math.max(height, heightTree[child]), 0) + 1
        }
    }

    const nodeEntities: NodeEntity[] = []

    if (treeArray.length > 0) {
        calculateNodeEntity(
            nodeEntities,
            0,
            treeArray,
            widthTree,
            heightTree,
            0,
            0
        )
    }

    return nodeEntities;
}

const drawTree = (
    context: CanvasRenderingContext2D,
    nodeEntities: NodeEntity[],
    scale: number,
    position: CanvasPosition,
    canvasWidth: number,
    canvasHeight: number) => {

    nodeEntities.forEach(nodeEntity => {
        const x = (nodeEntity.x + position.x) * scale + canvasWidth / 2
        const y = (nodeEntity.y + position.y) * scale + canvasHeight / 2

        nodeEntity.node.children.forEach(child => {
            const childX = (nodeEntities[child].x + position.x) * scale + canvasWidth / 2
            const childY = (nodeEntities[child].y + position.y) * scale + canvasHeight / 2

            context.beginPath()
            context.moveTo(x, y)
            context.lineTo(childX, childY)
            context.stroke()
        })

        context.fillStyle = nodeEntity.node.type === TreeNodeType.AND ?
            'black' :
            'white'
        context.beginPath()
        context.arc(x, y, nodeEntity.radius * scale, 0, 2 * Math.PI)
        context.fill()
        context.fillStyle = 'black'
        context.stroke();
    })
}

export default drawTree

export { calculateNodeEntities }

export type { NodeEntity }