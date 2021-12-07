import { useSelector } from "react-redux"
import { State } from "../../state"
import { compileTreeRequest } from "../../state/action-creators/treeActionCreators"
import CompilatorControlPanel from "../CompilatorControlPanel"

const M1CompilatorControlPanel = () => {
    const code = useSelector((state: State) => state.code.m1code)
    const info = useSelector((state: State) => state.info.m1Messages)

    return (
        <CompilatorControlPanel code={code} messages={info} compileAction={compileTreeRequest} />
    )
}

export default M1CompilatorControlPanel