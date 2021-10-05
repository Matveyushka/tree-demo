import { CanvasPosition } from '.'
import { TreeNode, TreeNodeType } from '../../tree/tree'

const nodeAreaWidth = 20
const nodeAreaHeight = 40

const drawNode = (
    context: CanvasRenderingContext2D,
    index: number,
    treeArray: Array<TreeNode>,
    widthTree: Array<number>,
    level: number,
    offset: number,
    scale: number,
    position: CanvasPosition,
    cw: number,
    ch: number) => {
    const treeNode = treeArray[index]

    const x = ((offset + widthTree[index] / 2) * nodeAreaWidth + position.x) * scale + cw / 2
    const y = ((level) * nodeAreaHeight + position.y) * scale + ch / 2
    const r = 5 * scale

    let currentOffset = offset
    for (let i = 0; i !== treeNode.children.length; i++) {
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(
            ((currentOffset + widthTree[treeNode.children[i]] / 2) * nodeAreaWidth + position.x) * scale + cw / 2,
            ((level + 1) * nodeAreaHeight + position.y) * scale + ch / 2
        )
        context.stroke()

        drawNode(
            context,
            treeNode.children[i],
            treeArray,
            widthTree,
            level + 1,
            currentOffset,
            scale,
            position,
            cw,
            ch)
        currentOffset += widthTree[treeNode.children[i]]
    }

    context.fillStyle = treeNode.type === TreeNodeType.AND ?
    'black' :
    'white'
    context.beginPath()
    context.arc(x, y, r, 0, 2 * Math.PI)
    context.fill()
    context.fillStyle = 'black'
    context.stroke();
}

const drawTree = (
    context: CanvasRenderingContext2D,
    treeArray: Array<TreeNode>,
    scale: number,
    position: CanvasPosition,
    cw: number,
    ch: number) => {
    const widthTree: Array<number> = []
    for (let nodeIndex = treeArray.length - 1; nodeIndex >= 0; nodeIndex--) {
        if (treeArray[nodeIndex].children.length === 0) {
            widthTree[nodeIndex] = 1
        } else {
            widthTree[nodeIndex] = treeArray[nodeIndex].children.reduce((sum, child) => sum + widthTree[child], 0)
        }
    }

    drawNode(
        context,
        0,
        treeArray,
        widthTree,
        0,
        0,
        scale,
        position,
        cw,
        ch
    )
}

export default drawTree