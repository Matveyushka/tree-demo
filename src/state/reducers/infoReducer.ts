import { InfoActionType } from "../action-types/infoActionTypes"
import { InfoAction } from "../actions/infoAction"

type InfoMessage = {
    value: string,
    color: string
}

const createInfoMessage = (value: string): InfoMessage => ({
    value,
    color: "#000000"
})

const createErrorMessage = (value: string): InfoMessage => ({
    value,
    color: "#ff0000"
})

type InfoState = {
    messages: InfoMessage[]
}

const initialState: InfoState = {
    messages: []
}

const infoReducer = (
    state: InfoState = initialState,
    action: InfoAction) => {
    switch(action.type) {
        case InfoActionType.WRITE_INFO:
            return {
                ...state,
                messages: [...state.messages, createInfoMessage(action.payload)]
            }
        case InfoActionType.WRITE_ERROR:
            return {
                ...state,
                messages: [...state.messages, createErrorMessage(action.payload)]
            }
        case InfoActionType.CLEAR:
            return {
                ...state,
                messages: []
            }
        default:
            return state
    }
}

export default infoReducer
export type { InfoState }