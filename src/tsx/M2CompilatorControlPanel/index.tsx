import { useDispatch, useSelector } from "react-redux"
import { State } from "../../state"
import { writeM2Error } from "../../state/action-creators/infoActionCreators"
import { buildStructureRequest } from "../../state/action-creators/structureActionCreators"
import CompilatorControlPanel from "../CompilatorControlPanel"
import { getIdFromTree, Identificator } from "../StructureIdMonitor"

type IdDto = {
    name: string,
    features: { [key: string]: string; },
    submodules: Map<string, Identificator[]>
}

const M2CompilatorControlPanel = () => {
    const dispatch = useDispatch()

    const {
        code, 
        m1compiled,
        info,
    } = useSelector((state: State) => ({
        code: state.code.m2code,
        m1compiled: state.code.m1compiled,
        info: state.info.m2Messages
    }))

    const m2compileAction = (code: string) => {
        if (m1compiled)
        {
            return buildStructureRequest(code)
        }
        dispatch(writeM2Error("Compile M1 first!"))
        return null
    }

    return (
        <CompilatorControlPanel code={code} messages={info} compileAction={m2compileAction} />
    )
}

export default M2CompilatorControlPanel