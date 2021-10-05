enum TreeNodeType {
    OR,
    AND
}

type TreeNode = {
    type: TreeNodeType,
    children: Array<number>
}

export type { TreeNode }
export { TreeNodeType }