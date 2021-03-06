import React, { useRef } from 'react'
import '../css/CompilatorControlPanel.css'
import { useDispatch } from 'react-redux'
import { InfoMessage } from '../state/reducers/infoReducer'

interface CompilatoControlPanelParams {
    code: any,
    compileAction: (code: any) => void
    messages: InfoMessage[]
}

const CompilatorControlPanel = (params: CompilatoControlPanelParams) => {
    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()

    React.useEffect(() => {
        ref!.current!.scrollTop = ref!.current!.scrollHeight
    })

    return (
        <div className='compilator-control-panel'>
            <div className='compilator-control-panel-buttons'>
                <button className='compilator-control-panel-button' onClick={() => {
                    const compileAction = params.compileAction(params.code)
                    if (compileAction !== null)
                    {
                        dispatch(compileAction)
                    }
                }}>Compile</button>
            </div>
            <div ref={ref} className='compilator-control-panel-info flat-scrollbar'>
                {
                    params.messages.map((message, index) => (<div key={index} style={{ color: message.color }}>
                        {message.value}
                    </div>))
                }
            </div>
        </div>
    )
}

export default CompilatorControlPanel