import { NavigationActionType } from "../action-types/navigationActionTypes"

interface SetLeft {
    type: NavigationActionType.SET_LEFT,
    payload: number
}

interface SetRight {
    type: NavigationActionType.SET_RIGHT,
    payload: number
}

type NavigationAction = SetLeft |
    SetRight

export type { 
    NavigationAction, 
    SetLeft,
    SetRight
 }