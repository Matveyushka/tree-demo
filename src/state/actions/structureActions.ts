import { StructureActionTypes } from "../action-types/structureActionTypes"

interface BuildStructureRequestAction {
    type: StructureActionTypes.BUILD_STRUCTURE_REQUEST,
    payload: string
}

interface BuildStructureSuccessAction {
    type: StructureActionTypes.BUILD_STRUCTURE_SUCCESS,
    payload: string
}

interface BuildStructureFailureAction {
    type: StructureActionTypes.BUILD_STRUCTURE_FAILURE
    payload: string
}

type StructureAction = BuildStructureRequestAction |
    BuildStructureSuccessAction |
    BuildStructureFailureAction

export type {
    StructureAction,
    BuildStructureRequestAction,
    BuildStructureSuccessAction,
    BuildStructureFailureAction
}