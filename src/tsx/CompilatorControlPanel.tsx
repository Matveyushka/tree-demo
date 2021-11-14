import React, { useRef } from 'react'
import '../css/CompilatorControlPanel.css'
import { useDispatch, useSelector } from 'react-redux'
import { compileTreeRequest } from '../state/action-creators/treeActionCreators'
import { State } from '../state/reducers'

const CompilatorControlPanel = () => {
    const code = useSelector((state: State) => state.code.code)

    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()

    const messages = useSelector((state: State) => state.info.messages)

    React.useEffect(() => {
        ref!.current!.scrollTop = ref!.current!.scrollHeight
    })

    return (
        <div className='compilator-control-panel'>
            <div className='compilator-control-panel-buttons'>
                <button className='compilator-control-panel-button' onClick={() => {
                    dispatch(compileTreeRequest(code))
                }}>Compile</button>
            </div>
            <div ref={ref} className='compilator-control-panel-info'>
                {
                    messages.map((message, index) => (<div key={index} style={{ color: message.color }}>
                        {message.value}
                    </div>))
                }
            </div>
        </div>
    )
}

export default CompilatorControlPanel