import { CodeActionType } from "../action-types/codeActionTypes"
import { CodeAction } from "../actions/codeActions"

type CodeState = {
    code: string
}

const initialCodeState: CodeState = {
    code: ""
}

const codeReducer = (
    state: CodeState = initialCodeState,
    action: CodeAction) => {
    switch (action.type) {
        case CodeActionType.SET_CODE:
            return {
                ...state,
                code: action.payload
            }
        default:
            return state
    }
}

export default codeReducer

export { initialCodeState }