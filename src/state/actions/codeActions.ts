import { CodeActionType } from "../action-types/codeActionTypes";

interface SetCodeAction {
    type: CodeActionType.SET_CODE,
    payload: string
}

type CodeAction = SetCodeAction

export type {
    CodeAction,
    SetCodeAction
}