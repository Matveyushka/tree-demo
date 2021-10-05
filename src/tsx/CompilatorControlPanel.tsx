import react from 'react'
import '../css/CompilatorControlPanel.css'
import { useDispatch } from 'react-redux'
import { TreeNodeType } from '../tree/tree'
import { setTree } from '../state/action-creators'

const CompilatorControlPanel = () => {
    const dispatch = useDispatch()


    return (
        <div className='compilator-control-panel'>
            <div className='compilator-control-panel-buttons'>
                <button className='compilator-control-panel-button' onClick={() => {
                    dispatch(setTree([
                        {  
                            type: TreeNodeType.OR,
                            children: [1, 2]
                        },
                        {  
                            type: TreeNodeType.AND,
                            children: []
                        },
                        {  
                            type: TreeNodeType.OR,
                            children: []
                        }
                    ]))
                }}>Compile</button>
            </div>
            <div className='compilator-control-panel-info'></div>
        </div>
    )
}

export default CompilatorControlPanel