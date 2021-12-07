import { GenotypeActionType } from "../action-types/genotypeActionTypes"
import { GenotypeAction } from "../actions/genotypeActions"
import { Gene } from "../types"

type GenotypeState = {
    genotypeStruct: Gene[],
    choosenGenotype: Gene[]
}

const initialTreeState: GenotypeState = {
    genotypeStruct: [],
    choosenGenotype: []
}

const treeReducer = (
    state: GenotypeState = initialTreeState,
    action: GenotypeAction) => {
    switch (action.type) {
        case GenotypeActionType.SET_GENOTYPE:
            return {
                ...state,
                choosenGenotype: action.payload
            }
        case GenotypeActionType.CLEAR_GENOTYPE:
            return {
                ...state,
                choosenGenotype: []
            }
        case GenotypeActionType.SET_GENOTYPE_STRUCT:
            return {
                ...state,
                genotypeStruct: action.payload,
                choosenGenotype: action.payload.map(gene => ({ nodeIndex: gene.nodeIndex, value: 1 }))
            }
        case GenotypeActionType.CLEAR_GENOTYPE_STRUCT:
            return {
                ...state,
                genotypeStruct: [],
                choosenGenotype: []
            }
        default:
            return state
    }
}

export default treeReducer

export { initialTreeState }