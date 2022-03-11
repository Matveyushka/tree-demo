
import React from 'react'
import { useSelector } from 'react-redux'
import '../../css/StructureIdMonitor.css'
import { State } from '../../state'
import { Gene } from '../../state/types'
import { TreeNode, TreeNodeType } from '../../tree/tree'
import IdTree from './IdTree'

type Identificator = {
    name: string,
    features: Map<string, string>
    submodules: Identificator[]
}

const extractContent = (tree: TreeNode[], genotype: Gene[]) => {
    let content: string[] = []
    let included: number[] = [0]
    if (tree.length === 0) {
        return []
    }
    tree.forEach((node, index) => {
        if (included.includes(index)) {
            if (node.type === TreeNodeType.AND) {
                node.children.forEach(i => included.push(i))
            }
            else if ((node.children.length ?? 0) > 0 && genotype.length > 0) {
                const gene = genotype.filter(gene => gene.nodeIndex === index)[0]
                included.push(node.children[gene.value - 1])
            }
            else {
                content.push(node.content)
            }
        }
    })
    return content
}

const handleContent = (content: string[], id: Identificator) => {
    if (content.length === 3) {
        id.name = content[0]
        id.features.set(content[1], content[2])
    }
    else {
        const subId = id.submodules.filter(child => child.name === content[1])[0]
        if (subId !== undefined) {
            handleContent(content.slice(1), subId)
        }
        else {
            id.submodules.push({
                name: content[1],
                features: new Map(),
                submodules: []
            })
            handleContent(content.slice(1), id.submodules[id.submodules.length - 1])
        }
    }
}

const divideContent = (content: string[]): Identificator | null => {
    const divided = content.map(str => str.split(/[;:. ]+/))
    for (let i = 0; i !== divided.length; i++) {
        divided[i].pop()
    }

    if (divided.length === 0) {
        return null
    }

    const id: Identificator = {
        name: divided[0][0],
        features: new Map(),
        submodules: []
    }

    for (let i = 0; i !== divided.length; i++) {
        handleContent(divided[i], id)
    }

    return id
}

export const getIdFromTree = (tree: TreeNode[], genotype: Gene[]) => divideContent(extractContent(tree, genotype))

const StructureIdMonitor = () => {
    const { tree, genotype } = useSelector((state: State) => ({ tree: state.tree.tree, genotype: state.genotype.choosenGenotype }))
    
    const id: Identificator | null = getIdFromTree(tree, genotype)

    return (
        <div className="structure-id-monitor">
            {id !== null ? <IdTree id={id} /> : ''}
        </div>
    )
}

export type { Identificator }

export default StructureIdMonitor