
import React from 'react'
import { useSelector } from 'react-redux'
import '../../css/StructureIdMonitor.css'
import { State } from '../../state'
import { TreeNodeType } from '../../tree/tree'
import IdTree from './IdTree'

type Identificator = {
    name: string,
    features: Map<string, string>
    children: Identificator[]
}

const StructureIdMonitor = () => {
    const { treeState, genotype } = useSelector((state: State) => ({ treeState: state.tree, genotype: state.genotype }))

    const extractContent = () => {
        let content: string[] = []
        let included: number[] = [0]
        if (treeState.tree.length === 0) {
            return []
        }
        treeState.tree.forEach((node, index) => {
            if (included.includes(index))
            {
                if (node.type === TreeNodeType.AND) {
                    node.children.forEach(i => included.push(i))
                }
                else if ((node.children.length ?? 0) > 0 && genotype.choosenGenotype.length > 0) {
                    const gene = genotype.choosenGenotype.filter(gene => gene.nodeIndex === index)[0]
                    included.push(node.children[gene.value - 1])
                }
                else {
                    content.push(node.content)
                }
            }
        })
        return content
    }

    const handleContent = (content: string[], id: Identificator) =>
    {
        if (content.length === 3)
        {
            id.name = content[0]
            id.features.set(content[1], content[2])
        }
        else 
        {
            const subId = id.children.filter(child => child.name === content[1])[0]
            if (subId !== undefined)
            {
                handleContent(content.slice(1), subId)
            }
            else
            {
                id.children.push({
                    name: content[1],
                    features: new Map(),
                    children: []
                })
                handleContent(content.slice(1), id.children[id.children.length - 1])
            }
        }
    }

    const divideContent = (content: string[]) => {
        const divided = content.map(str => str.split(/[;:. ]+/))
        for (let i = 0; i !== divided.length; i++)
        {
            divided[i].pop()
        }
        
        if (divided.length === 0) {
            return null
        }

        const id: Identificator = {
            name: divided[0][0],
            features: new Map(),
            children: []
        }

        for (let i = 0; i !== divided.length; i++)
        {
            handleContent(divided[i], id)
        }
        
        return id
    }
    const id: Identificator | null = divideContent(extractContent())

    return (
        <div className="structure-id-monitor">
            {id !== null ? <IdTree id={id} /> : ''}          
        </div>
    )
}

export type { Identificator }

export default StructureIdMonitor