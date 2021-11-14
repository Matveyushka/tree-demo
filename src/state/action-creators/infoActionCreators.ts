import { InfoActionType } from "../action-types/infoActionTypes";

export const writeInfo = (info: string) => ({
    type: InfoActionType.WRITE_INFO,
    payload: info
})

export const writeError = (error: string) => ({
    type: InfoActionType.WRITE_ERROR,
    payload: error
})

export const clearInfo = () => ({
    type: InfoActionType.CLEAR,
})