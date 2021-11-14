enum TreeNodeType {
    OR,
    AND
}

type TreeNode = {
    type: TreeNodeType,
    children: Array<number>,
    content: string
}

export type { TreeNode }
export { TreeNodeType }