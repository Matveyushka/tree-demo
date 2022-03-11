import { useSelector } from "react-redux"
import { State } from "../../state"
import { buildStructureRequest } from "../../state/action-creators/structureActionCreators"
import CompilatorControlPanel from "../CompilatorControlPanel"
import { getIdFromTree, Identificator } from "../StructureIdMonitor"

type IdDto = {
    name: string,
    features: { [key: string]: string; },
    submodules: (IdDto | null)[]
}

const M2CompilatorControlPanel = () => {
    const {
        code, 
        tree, 
        genotype,
        info,
    } = useSelector((state: State) => ({
        code: state.code.m2code,
        tree: state.tree.tree,
        genotype: state.genotype.choosenGenotype,
        info: state.info.m2Messages
    }))

    const getId = (id: Identificator | null): IdDto | null => {
        if (id !== null)
        {
            let featuresArray: { [key: string]: string; } = {}
            Array.from(id.features).forEach(([key, value]) => featuresArray[key] = value)
            return ({
                name: id.name,
                features: featuresArray,
                submodules: id.submodules.map(submodule => getId(submodule))
            })
        }
        return null
    }

    return (
        <CompilatorControlPanel code={{
            code,
            id: getId(getIdFromTree(tree, genotype))
        }} messages={info} compileAction={buildStructureRequest} />
    )
}

export default M2CompilatorControlPanel