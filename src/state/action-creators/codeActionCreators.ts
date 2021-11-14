import { CodeActionType } from "../action-types/codeActionTypes";
import { SetCodeAction } from "../actions/codeActions";

export const setCode = (code: string): SetCodeAction => ({
    type: CodeActionType.SET_CODE,
    payload: code
})