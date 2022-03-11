import React, { useRef } from 'react'
import '../css/CompilatorControlPanel.css'
import { useDispatch } from 'react-redux'
import { clearGenotypeStruct } from '../state/action-creators/genotypeActionCreators'
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
                    console.log("CODE")
                    console.log(params.code)
                    dispatch(params.compileAction(params.code))
                }}>Compile</button>
            </div>
            <div ref={ref} className='compilator-control-panel-info'>
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