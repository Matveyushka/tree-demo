import { useSelector } from "react-redux"
import { State } from "../../state"
import { buildStructureRequest } from "../../state/action-creators/structureActionCreators"
import CompilatorControlPanel from "../CompilatorControlPanel"

const M2CompilatorControlPanel = () => {
    const code = useSelector((state: State) => state.code.m2code)
    const info = useSelector((state: State) => state.info.m2Messages)

    return (
        <CompilatorControlPanel code={code} messages={info} compileAction={buildStructureRequest} />
    )
}

export default M2CompilatorControlPanel