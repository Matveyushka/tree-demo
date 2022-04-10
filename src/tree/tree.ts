import { Gene } from "../state/types"

enum TreeNodeType {
    OR,
    AND
}

type ModuleInstanceName = {
    name: string,
    index: number
}

type Feature = {
    name: string,
    values: string[]
}

type TreeNodeValue = {
    moduleList: ModuleInstanceName[],
    value: Feature
}

type TreeNode = {
    type: TreeNodeType,
    children: number[],
    content: TreeNodeValue[],
    savedValues: object
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

export type { ModuleInstanceName, Feature, TreeNodeValue, TreeNode }
export { TreeNodeType, GetGenotypeStruct }