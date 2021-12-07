import React from "react"
import { Identificator } from "."

interface IdTreeParams {
    id: Identificator
}

const IdTree = (params: IdTreeParams) => {
    const [isOpen, setIsOpen] = React.useState(false)

    console.log(params.id)

    return (
        <div className={`id-tree`}>
            <div className={`id-tree-head`} onClick={() => setIsOpen(!isOpen)}> {`${isOpen ? 'v' : '>'} ${params.id.name}`}</div>
            {isOpen ? (<div className='id-tree-body'>
                {Array.from(params.id.features).map(([key, value]) => <div className='id-tree-'>{`- ${key}: ${value}`}</div>)}
                {params.id.children.map(child => <IdTree id={child} />)}
            </div>) : ''}
        </div>
    )
}


export default IdTree