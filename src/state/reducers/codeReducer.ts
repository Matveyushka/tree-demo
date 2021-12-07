import { CodeActionType } from "../action-types/codeActionTypes"
import { CodeAction } from "../actions/codeActions"

type CodeState = {
    m1code: string,
    m2code: string
}

const initialCodeState: CodeState = {
    m1code: "",
    m2code: ""
}

const codeReducer = (
    state: CodeState = initialCodeState,
    action: CodeAction) => {
    switch (action.type) {
        case CodeActionType.SET_M1_CODE:
            return {
                ...state,
                m1code: action.payload
            }
        case CodeActionType.SET_M2_CODE:
            return {
                ...state,
                m2code: action.payload
            }
        default:
            return state
    }
}

export default codeReducer

export { initialCodeState }