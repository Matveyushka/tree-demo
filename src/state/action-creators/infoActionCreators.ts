import { InfoActionType } from "../action-types/infoActionTypes"

export const writeM1Info = (info: string) => ({
    type: InfoActionType.WRITE_M1_INFO,
    payload: info
})

export const writeM1Error = (error: string) => ({
    type: InfoActionType.WRITE_M1_ERROR,
    payload: error
})

export const clearM1Info = () => ({
    type: InfoActionType.CLEAR_M1,
})

export const writeM2Info = (info: string) => ({
    type: InfoActionType.WRITE_M2_INFO,
    payload: info
})

export const writeM2Error = (error: string) => ({
    type: InfoActionType.WRITE_M2_ERROR,
    payload: error
})

export const clearM2Info = () => ({
    type: InfoActionType.CLEAR_M2,
})