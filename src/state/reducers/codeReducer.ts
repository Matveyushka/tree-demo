import { CodeActionType } from "../action-types/codeActionTypes"
import { CodeAction } from "../actions/codeActions"

type CodeState = {
    m1code: string,
    m2code: string
}

const initialCodeState: CodeState = {
    m1code: `Structuralist

    ModuleM1 Basic
    
        ItemsGroup Dummy Value EndItemsGroup
    
    EndModuleM1
    
    
    ModuleM1 Complex
    
        ItemsGroup Size One Two EndItemsGroup
        
        ForCase Size One
        Repeat 1 LinkTo Basic
    
    EndModuleM1
    
    
    ModuleM1 Main
    
        ItemsGroup Type Rectangle EndItemsGroup
        
        ForCase Type Rectangle
        Repeat 10 LinkTo Basic
        
        ForCase Type Rectangle
        Repeat 2 LinkTo Complex
    
    EndModuleM1
    
    
    EndStructuralist
    
    Generate Main`,
    m2code: `Structura Basic 1-1-1-1

    Structura Complex 0-2-0-0
        Feature Size
            Case One
                List Basic
                    On First
                        Link    Port 0n - Basic[0](0w),
                                Port 1n - Basic[0](0e)
    
    Structura Main 1-0-1-0
        Position Basic
            On \\2 Place 20*I, 0
            On not \\2 Place 20*(I-1), 20
        Position Complex
            On First Place 10, 40
            On Last Place 130, 40
        Feature Type
            Case Rectangle
                List Basic
                    On First
                        Link    Port 0w - Basic[I](0w)
                    On Last
                        Link    Port 0e - Basic[I-1](0e),
                                Basic[I](0n) - Basic[I-1](0s)
                    On not \\2, not Last
                        Link    Basic[I](0n) - Basic[I-1](0s),
                                Basic[I](0e) - Basic[I+2](0w),
                                Basic[I-1](0e) - Basic[I+1](0w)
                    On 1
                        Link    Basic[I](0s) - Complex[0](0n)
                    On 3
                        Link    Basic[I](0s) - Complex[0](1n)
                    On Last
                        Link    Basic[I - 2](0s) - Complex[1](0n),
                                Basic[I](0s) - Complex[1](1n)`
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