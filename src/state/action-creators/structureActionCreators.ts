import { StructureActionTypes } from "../action-types/structureActionTypes"
import { 
    BuildStructureFailureAction, 
    BuildStructureRequestAction, 
    BuildStructureSuccessAction } from "../actions/structureActions"
import { Structure } from "../reducers/structureReducer"


export const buildStructureRequest = (text: string): 
BuildStructureRequestAction => ({
    type: StructureActionTypes.BUILD_STRUCTURE_REQUEST,
    payload: text
})

export const buildStructureSuccess = (
    payload: Structure
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