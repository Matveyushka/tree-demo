import { CodeActionType } from "../action-types/codeActionTypes"

interface SetM1CodeAction {
    type: CodeActionType.SET_M1_CODE,
    payload: string
}

interface SetM2CodeAction {
    type: CodeActionType.SET_M2_CODE,
    payload: string
}

interface SetM1CompiledAction {
    type: CodeActionType.SET_M1_COMPILED,
    payload: boolean
}

interface SetM2CompiledAction {
    type: CodeActionType.SET_M2_COMPILED,
    payload: boolean
}

type CodeAction = SetM1CodeAction | SetM2CodeAction | SetM1CompiledAction | SetM2CompiledAction

export type {
    CodeAction,
    SetM1CodeAction,
    SetM2CodeAction,
    SetM1CompiledAction,
    SetM2CompiledAction
}