import { InfoActionType } from "../action-types/infoActionTypes"
import { InfoAction } from "../actions/infoAction"

export type InfoMessage = {
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
    m1Messages: InfoMessage[],
    m2Messages: InfoMessage[]
}

const initialState: InfoState = {
    m1Messages: [],
    m2Messages: []
}

const infoReducer = (
    state: InfoState = initialState,
    action: InfoAction) => {
    switch (action.type) {
        case InfoActionType.WRITE_M1_INFO:
            return {
                ...state,
                m1Messages: [...state.m1Messages, createInfoMessage(action.payload)]
            }
        case InfoActionType.WRITE_M1_ERROR:
            return {
                ...state,
                m1Messages: [...state.m1Messages, createErrorMessage(action.payload)]
            }
        case InfoActionType.CLEAR_M1:
            return {
                ...state,
                m1Messages: []
            }
        case InfoActionType.WRITE_M2_INFO:
            return {
                ...state,
                m2Messages: [...state.m1Messages, createInfoMessage(action.payload)]
            }
        case InfoActionType.WRITE_M2_ERROR:
            return {
                ...state,
                m2Messages: [...state.m1Messages, createErrorMessage(action.payload)]
            }
        case InfoActionType.CLEAR_M2:
            return {
                ...state,
                m2Messages: []
            }
        default:
            return state
    }
}

export default infoReducer
export type { InfoState }