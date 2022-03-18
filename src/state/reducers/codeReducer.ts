import { CodeActionType } from "../action-types/codeActionTypes"
import { CodeAction } from "../actions/codeActions"

type CodeState = {
    m1code: string,
    m2code: string
}

const initialCodeState: CodeState = {
    m1code: `Module Basic
    Feature Dummy value

Module Complex
    Feature Size one two
    
    Case Size one
    Generate 1 modules Basic Simple
    
    Case Size two
    Generate 2 modules Basic Simple

Module Main
    Feature Type rectangle
    
    Case Type rectangle
    Generate 10 modules Basic
    , 1 + 1 modules Complex

Create Main`,
    m2code: `Structura Basic 1-1-1-1

    Structura Complex 2
        Position Basic
            On First Place 0, 0
            On Last Place 30, 0
        Feature Size
            Case one
                List Basic
                    On First
                        Link    Port 0 - Basic[0](0w),
                                Port 1 - Basic[0](0e)
    
    Structura Main 2
        Position Basic
            On \\2 Place 20*I, 0
            On not \\2 Place 20*(I-1), 20
        Position Complex
            On First Place 10, 40
            On Last Place 130, 40
        Feature Type
            Case rectangle
                List Basic
                    On First
                        Link    Port 1 - Basic[I](0w)
                    On Last
                        Link    Port 0 - Basic[I-1](0e),
                                Basic[I](0n) - Basic[I-1](0s)
                    On not \\2, not Last
                        Link    Basic[I](0n) - Basic[I-1](0s),
                                Basic[I](0e) - Basic[I+2](0w),
                                Basic[I-1](0e) - Basic[I+1](0w)
                    On 1
                        Link    Basic[I](0s) - Complex[0](0)
                    On 3
                        Link    Basic[I](0s) - Complex[0](1)
                    On Last
                        Link    Basic[I - 2](0s) - Complex[1](0),
                                Basic[I](0s) - Complex[1](1)`
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