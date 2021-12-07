import { CodeActionType } from "../action-types/codeActionTypes"
import { SetM1CodeAction, SetM2CodeAction } from "../actions/codeActions"

export const setM1Code = (code: string): SetM1CodeAction => ({
    type: CodeActionType.SET_M1_CODE,
    payload: code
})

export const setM2Code = (code: string): SetM2CodeAction => ({
    type: CodeActionType.SET_M2_CODE,
    payload: code
})