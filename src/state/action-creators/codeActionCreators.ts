import { CodeActionType } from "../action-types/codeActionTypes"
import { SetM1CodeAction, SetM1CompiledAction, SetM2CodeAction, SetM2CompiledAction } from "../actions/codeActions"

export const setM1Code = (code: string): SetM1CodeAction => ({
    type: CodeActionType.SET_M1_CODE,
    payload: code
})

export const setM2Code = (code: string): SetM2CodeAction => ({
    type: CodeActionType.SET_M2_CODE,
    payload: code
})

export const setM1Compiled = (compiled: boolean): SetM1CompiledAction => ({
    type: CodeActionType.SET_M1_COMPILED,
    payload: compiled
})

export const setM2Compiled = (compiled: boolean): SetM2CompiledAction => ({
    type: CodeActionType.SET_M2_COMPILED,
    payload: compiled
})