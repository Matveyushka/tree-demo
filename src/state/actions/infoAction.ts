import { InfoActionType } from "../action-types/infoActionTypes"

interface WriteM1InfoAction {
    type: InfoActionType.WRITE_M1_INFO,
    payload: string
}

interface WriteM1ErrorAction {
    type: InfoActionType.WRITE_M1_ERROR,
    payload: string
}

interface WriteM2InfoAction {
    type: InfoActionType.WRITE_M2_INFO,
    payload: string
}

interface WriteM2ErrorAction {
    type: InfoActionType.WRITE_M2_ERROR,
    payload: string
}

interface ClearM1Action {
    type: InfoActionType.CLEAR_M1
}

interface ClearM2Action {
    type: InfoActionType.CLEAR_M2
}

type InfoAction = WriteM1InfoAction |
    WriteM1ErrorAction |
    WriteM2InfoAction |
    WriteM2ErrorAction |
    ClearM1Action |
    ClearM2Action

export type { 
    InfoAction,
    WriteM1InfoAction,
    WriteM1ErrorAction,
    WriteM2InfoAction,
    WriteM2ErrorAction,
    ClearM1Action,
    ClearM2Action
 }