import { Gene } from "../state/types"

enum TreeNodeType {
    OR,
    AND
}

type TreeNode = {
    type: TreeNodeType,
    children: Array<number>,
    content: string
}

const GetGenotypeStruct = (tree: TreeNode[] ): Gene[] => {
    let genotype: Gene[] = []
    for (let i = 0; i !== tree.length; i++)
    {
        if (NodeNeedsGene(tree[i]))
        {
            genotype = [
                ...genotype, 
                GetGeneFromNode(i, tree[i])
            ]
        }
    }
    return genotype
}

const NodeNeedsGene = (node: TreeNode): boolean => {
    return node.type === TreeNodeType.OR && node.children.length > 0
}

const GetGeneFromNode = (index: number, node: TreeNode): Gene => ({
    nodeIndex: index,
    value: node.children.length
})

export type { TreeNode }
export { TreeNodeType, GetGenotypeStruct }