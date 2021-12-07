import { CodeActionType } from "../action-types/codeActionTypes"

interface SetM1CodeAction {
    type: CodeActionType.SET_M1_CODE,
    payload: string
}

interface SetM2CodeAction {
    type: CodeActionType.SET_M2_CODE,
    payload: string
}

type CodeAction = SetM1CodeAction | SetM2CodeAction

export type {
    CodeAction,
    SetM1CodeAction,
    SetM2CodeAction
}