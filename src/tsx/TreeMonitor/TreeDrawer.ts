import { CanvasPosition } from '.'
import { Gene } from '../../state/types'
import { TreeNode, TreeNodeType } from '../../tree/tree'

const nodeAreaWidth = 20
const nodeAreaHeight = 40

type NodeEntity = {
    node: TreeNode,
    x: number,
    y: number,
    radius: number,
    choosen: boolean,
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
        radius,
        choosen: false
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

    return nodeEntities
}

const drawTree = (
    context: CanvasRenderingContext2D,
    nodeEntities: NodeEntity[],
    scale: number,
    position: CanvasPosition,
    canvasWidth: number,
    canvasHeight: number,
    showGenotype: boolean,
    genotype: Gene[]
) => {

    nodeEntities.forEach(nodeEntity => nodeEntity.choosen = false)

    nodeEntities.forEach((nodeEntity, index) => {
        let choosen = nodeEntity.choosen && showGenotype
        if (index === 0) {
            choosen = showGenotype
        }
        if (choosen) {
            if (nodeEntity.node.type === TreeNodeType.AND) {
                nodeEntity.node.children.forEach(nodeIndex => nodeEntities[nodeIndex].choosen = true)
            }
            else {
                if (nodeEntity.node.children.length > 0) {
                    const gene = genotype.filter(gene => gene.nodeIndex === index)[0]
                    nodeEntities[nodeEntity.node.children[gene.value - 1]].choosen = true
                }
            }
        }

        const x = (nodeEntity.x + position.x) * scale + canvasWidth / 2
        const y = (nodeEntity.y + position.y) * scale + canvasHeight / 2

        let anyChildChoosen = false
        let leftChoosenBorderX = x
        let rightChoosenBorderX = x

        nodeEntity.node.children.forEach(child => {
            const childX = (nodeEntities[child].x + position.x) * scale + canvasWidth / 2
            const childY = (nodeEntities[child].y + position.y) * scale + canvasHeight / 2
            context.beginPath()
            if (nodeEntities[child].choosen === false) {
                context.strokeStyle = 'black'
                context.lineWidth = 1
                context.moveTo(childX, (childY + y) / 2)
                context.lineTo(childX, childY)
            } else {
                anyChildChoosen = true
                if (childX < leftChoosenBorderX) {
                    leftChoosenBorderX = childX
                }
                if (childX > rightChoosenBorderX) {
                    rightChoosenBorderX = childX
                }
                context.strokeStyle = 'red'
                context.lineWidth = 2
                context.moveTo(childX, (childY + y) / 2)
                context.lineTo(childX, childY)
            }
            context.stroke()
        })

        if (nodeEntity.node.children.length > 0)
        {
            const leftX = (position.x + nodeEntities[nodeEntity.node.children[0]].x) * scale + canvasWidth / 2
            const rightX = (position.x + nodeEntities[nodeEntity.node.children[nodeEntity.node.children.length - 1]].x) * scale + canvasWidth / 2
            const childY = (nodeEntities[nodeEntity.node.children[0]].y + position.y) * scale + canvasHeight / 2
            context.strokeStyle = 'black'
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(leftX, (childY + y) / 2)
            context.lineTo(leftChoosenBorderX, (childY + y) / 2)
            context.moveTo(rightChoosenBorderX, (childY + y) / 2)
            context.lineTo(rightX, (childY + y) / 2)
            context.stroke()
            context.beginPath()
            if (anyChildChoosen) {
                context.strokeStyle = 'red'
                context.lineWidth = 2
                context.beginPath()
                context.moveTo(leftChoosenBorderX, (childY + y) / 2)
                context.lineTo(rightChoosenBorderX, (childY + y) / 2)
                context.stroke()
            }
            context.moveTo(x, y)
            context.lineTo(x, (childY + y) / 2)
            context.stroke()
        }


        context.fillStyle = nodeEntity.node.type === TreeNodeType.AND ?
            (choosen ? 'red' : 'black') :
            'white'
        context.lineWidth = (choosen ? 2 : 1)
        context.beginPath()
        context.arc(x, y, nodeEntity.radius * scale, 0, 2 * Math.PI)
        context.fill()
        context.strokeStyle = choosen ? 'red' : 'black'
        context.stroke()
    })
}

export default drawTree

export { calculateNodeEntities }

export type { NodeEntity }