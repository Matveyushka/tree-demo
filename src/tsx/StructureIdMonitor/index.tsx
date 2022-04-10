
import React from 'react'
import { useSelector } from 'react-redux'
import '../../css/StructureIdMonitor.css'
import { State } from '../../state'
import { Gene } from '../../state/types'
import { TreeNode, TreeNodeType, TreeNodeValue } from '../../tree/tree'
import IdTree from './IdTree'

type Identificator = {
    name: string,
    features: Map<string, string>
    submodules: Map<string, Identificator[]>
}

const extractContent = (tree: TreeNode[], genotype: Gene[]) => {
    let content: TreeNodeValue[] = []
    let included: number[] = [0]
    if (tree.length === 0) {
        return []
    }
    tree.forEach((node, index) => {
        if (included.includes(index)) {
            if (node.type === TreeNodeType.AND && (node.children.length ?? 0) > 0) {
                node.children.forEach(i => included.push(i))
            }
            else if ((node.children.length ?? 0) > 0 && genotype.length > 0) {
                const gene = genotype.filter(gene => gene.nodeIndex === index)[0]
                included.push(node.children[gene.value - 1])
            }
            else {
                node.content.forEach(nodeValue => content.push(nodeValue))
            }
        }
    })
    return content
}

const divideContent = (content: TreeNodeValue[]): Identificator | null => {
    if (content.length === 0) {
        return null
    }

    const id: Identificator = {
        name: content[0].moduleList[0].name,
        features: new Map(),
        submodules: new Map()
    }

    content.forEach(nodeValue => {
        let currentId = id
        nodeValue.moduleList.forEach((module, index, moduleList) => {
            if (index > 0) {
                let submodules = currentId.submodules.get(module.name)
                if (submodules === undefined) {
                    currentId.submodules.set(module.name, [])
                }
                let submodule = currentId.submodules.get(module.name)![module.index]
                if (submodule === undefined) {
                    currentId.submodules.get(module.name)![module.index] = {
                        name: module.name,
                        features: new Map(),
                        submodules: new Map()
                    }
                }
                currentId = currentId.submodules.get(module.name)![module.index]
            }
            if (index === moduleList.length - 1) {
                if (nodeValue.value !== null) {
                    currentId.features.set(nodeValue.value.name, nodeValue.value.values[0])
                }
            }
        })
    })

    return id
}

const getObjectIdentifier = (identifier: Identificator | null) => {
    if (identifier === null) {
        return null
    }

    const submodules: any = {}
    Array.from(identifier.submodules).forEach(([key, value]) => submodules[key] = value.map(v => getObjectIdentifier(v)))

    let dict: any = {}
    dict['name'] = identifier.name
    dict['features'] = {}
    Array.from(identifier.features).forEach(([key, value], index) => dict['features'][key] = value)
    dict['submodules'] = submodules

    return dict
}

export const getIdFromTree = (tree: TreeNode[] | null, genotype: Gene[]) => tree !== null
    ? divideContent(extractContent(tree, genotype))
    : null

export const parseModuleIdentifierToSend = (id: Identificator | null) => getObjectIdentifier(id)

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