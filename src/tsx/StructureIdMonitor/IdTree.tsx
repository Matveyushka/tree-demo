import React from "react"
import { Identificator } from "."

interface IdTreeParams {
    id: Identificator,
    index: number
}

const IdTree = (params: IdTreeParams) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className={`id-tree`}>
            <div className={`id-tree-head`} onClick={() => setIsOpen(!isOpen)}> {`${isOpen ? 'v' : '>'} ${params.id.name}[${params.index}]`}</div>
            {isOpen ? (<div className='id-tree-body'>
                {Array.from(params.id.features).map(([key, value]) => <div className='id-tree-'>{`- ${key}: ${value}`}</div>)}
                {Array.from(params.id.submodules).map(([key, value]) => value.map((child, index) => <IdTree id={child} index={index} />)).flat()}
            </div>) : ''}
        </div>
    )
}


export default IdTree