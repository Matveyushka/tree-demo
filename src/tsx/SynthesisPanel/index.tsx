import axios from "axios"
import { useSelector } from "react-redux"
import { State } from "../../state"
import { getIdFromTree, parseModuleIdentifierToSend } from "../StructureIdMonitor"

const SynthesisPanel = () => {
    const code = useSelector((state: State) => state.code)
    const { tree, genotype } = useSelector((state: State) => ({ tree: state.tree.tree, genotype: state.genotype.choosenGenotype }))

    return (
        <div className="synthesis-panel">
            <button className="synthesis-button" onClick={() => axios.post('https://localhost:5001/synthesis', {
                m1code: code.m1code,
                m2code: code.m2code,
                identifier: parseModuleIdentifierToSend(getIdFromTree(tree, genotype))
            })}>
            СИНТЕЗИРОВАТЬ
            </button>
        </div>
    )
}

export default SynthesisPanel