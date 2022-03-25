import { CodeActionType } from "../action-types/codeActionTypes"
import { CodeAction } from "../actions/codeActions"

type CodeState = {
    m1code: string,
    m1compiled: boolean,
    m2code: string
    m2compiled: boolean
}

const initialCodeState: CodeState = {
    m1code: `Module Pole2H
    
    Module Pole2V
        Feature Dummy value
        
        Generate 1 modules Pole2H
        
    Module PoleLC
        Feature Type simple
        Feature Size 1 2 3 4 5
        
        Generate Size + 1 modules Pole2H,
                 Size modules Pole2V
    
    Create PoleLC`,
    m1compiled: false,
    m2code: `Structura Pole2H 1-0-1-0

    Structura Pole2V 0-1-0-1
        Feature Dummy
            Case value
                List Pole2H
                    On First
                        Link
                            Port 0n - Pole2H[I](0w),
                            Port 0s - Pole2H[I](0e)
    
    Structura PoleLC 1-0-1-1
        Position Pole2H
            On Any Place I * 60, 0
        Position Pole2V
            On Any Place I * 60 + 20, 40
        Feature Type
            Case simple
                List Pole2H
                    On First
                        Link 
                            Port 0w - Pole2H[I](0w),
                            Pole2H[I](0e) - Pole2V[I](0n)
                    On Last
                        Link
                            Pole2V[I - 1](0n) - Pole2H[I](0w),
                            Pole2H[I](0e) - Port 0e
                    On not First, not Last
                        Link
                            Pole2H[I](0w) - Pole2V[I-1](0n),
                            Pole2H[I](0e) - Pole2V[I](0n)
                List Pole2V
                    On Any
                        Link Pole2V[I](0s) - Port 0s`,
    m2compiled: false
}

const codeReducer = (
    state: CodeState = initialCodeState,
    action: CodeAction) => {
    switch (action.type) {
        case CodeActionType.SET_M1_CODE:
            return {
                ...state,
                m1code: action.payload,
                m1compiled: false
            }
        case CodeActionType.SET_M2_CODE:
            return {
                ...state,
                m2code: action.payload,
                m2compiled: false
            }
        case CodeActionType.SET_M1_COMPILED:
            return {
                ...state,
                m1compiled: action.payload
            }
        case CodeActionType.SET_M2_COMPILED:
            return {
                ...state,
                m2compiled: action.payload
            }
        default:
            return state
    }
}

export default codeReducer

export { initialCodeState }