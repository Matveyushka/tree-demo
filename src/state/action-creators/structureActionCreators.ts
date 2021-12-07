import { StructureActionTypes } from "../action-types/structureActionTypes"
import { 
    BuildStructureFailureAction, 
    BuildStructureRequestAction, 
    BuildStructureSuccessAction } from "../actions/structureActions"


export const buildStructureRequest = (text: string): 
BuildStructureRequestAction => ({
    type: StructureActionTypes.BUILD_STRUCTURE_REQUEST,
    payload: text
})

export const buildStructureSuccess = (
    payload: string
): BuildStructureSuccessAction => ({
    type: StructureActionTypes.BUILD_STRUCTURE_SUCCESS,
    payload
})

export const buildStructureFailure = (
    payload: string
): BuildStructureFailureAction => ({
    type: StructureActionTypes.BUILD_STRUCTURE_FAILURE,
    payload
})