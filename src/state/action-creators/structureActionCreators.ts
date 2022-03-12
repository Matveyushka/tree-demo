import { Module } from "../../structure/module"
import { Identificator } from "../../tsx/StructureIdMonitor"
import { StructureActionTypes } from "../action-types/structureActionTypes"
import { 
    BuildStructureFailureAction, 
    BuildStructureRequestAction, 
    BuildStructureSuccessAction } from "../actions/structureActions"


export const buildStructureRequest = (code: string): 
BuildStructureRequestAction => ({
    type: StructureActionTypes.BUILD_STRUCTURE_REQUEST,
    payload: code
})

export const buildStructureSuccess = (
    payload: Module
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