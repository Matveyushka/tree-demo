import { Module } from "../../structure/module"
import { StructureActionTypes } from "../action-types/structureActionTypes"
import { StructureAction } from "../actions/structureActions"

export type StructureState = {
    awaiting: boolean,
    structure: Module | null,
    error: string
}

const initialStructureState: StructureState = {
    awaiting: false,
    structure: null,
    error: ''
}  

const structureReducer = (
    state: StructureState = initialStructureState, 
    action: StructureAction) => {
    switch (action.type) {
        case StructureActionTypes.BUILD_STRUCTURE_REQUEST:
            return {
                ...state,
                awaiting: true
            }
        case StructureActionTypes.BUILD_STRUCTURE_SUCCESS:
            return {
                ...state,
                awaiting: false,
                structure: action.payload,
                error: "",
            }
        case StructureActionTypes.BUILD_STRUCTURE_FAILURE:
            return {
                ...state,
                awaiting: false,
                structure: null,
                error: action.payload,
            }
        default:
            return state
    }
}

export default structureReducer

export { initialStructureState }