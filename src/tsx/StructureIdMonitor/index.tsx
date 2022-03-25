
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
    submodules: Map<string, Identificator[]>
}

const extractContent = (tree: TreeNode[], genotype: Gene[]) => {
    let content: string[] = []
    let included: number[] = [0]
    if (tree.length === 0) {
        return []
    }
    tree.forEach((node, index) => {
        if (included.includes(index)) {
            content.push(node.moduleList + "!")
            if (node.type === TreeNodeType.AND && (node.children.length ?? 0) > 0) {
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
        return
    } else if (content.length === 4) {
        id.features.set(content[2], content[3])
    } else if (content.length % 2 === 1) {
        const submoduleName = content[content.length - 3]
        const submoduleIndex = parseInt(content[content.length - 2])
        const subId = id.submodules.get(submoduleName)
        if (subId === undefined) {
            id.submodules.set(submoduleName, [{
                name: submoduleName,
                features: new Map(),
                submodules: new Map()
            }])
        }
        else {
            if (subId[submoduleIndex] === undefined) {
                subId[submoduleIndex] = {
                    name: submoduleName,
                    features: new Map(),
                    submodules: new Map()
                }
            }
        }
    }
    const subId = id.submodules.get(content[2])
    if (subId !== undefined) {
        handleContent(content.slice(2), subId[parseInt(content[3])])
    }
}

const divideContent = (content: string[]): Identificator | null => {
    const divided = content
        .map(str => str
            .split(/[[\];:. ]+/)
            .filter(token => token.length > 0))
        .filter(dividedContent => dividedContent.length > 1)

    if (divided.length === 0) {
        return null
    }

    const id: Identificator = {
        name: divided[0][0],
        features: new Map(),
        submodules: new Map()
    }

    for (let i = 0; i !== divided.length; i++) {
        handleContent(divided[i], id)
    }

    return id
}

export const getIdFromTree = (tree: TreeNode[] | null, genotype: Gene[]) => tree !== null
    ? divideContent(extractContent(tree, genotype))
    : null

const StructureIdMonitor = () => {
    const { tree, genotype } = useSelector((state: State) => ({ tree: state.tree.tree, genotype: state.genotype.choosenGenotype }))

    const id: Identificator | null = getIdFromTree(tree, genotype)

    return (
        <div className="structure-id-monitor">
            {id !== null ? <IdTree id={id} index={0} /> : ''}
        </div>
    )
}

export type { Identificator }

export default StructureIdMonitor