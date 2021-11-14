import { InfoActionType } from "../action-types/infoActionTypes";

interface WriteInfoAction {
    type: InfoActionType.WRITE_INFO,
    payload: string
}

interface WriteErrorAction {
    type: InfoActionType.WRITE_ERROR,
    payload: string
}

interface ClearAction {
    type: InfoActionType.CLEAR
}

type InfoAction = WriteInfoAction |
    WriteErrorAction |
    ClearAction

export type {
    InfoAction,
    WriteInfoAction,
    WriteErrorAction,
    ClearAction
}