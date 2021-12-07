import { NavigationActionType } from "../action-types/navigationActionTypes"

export const setLeft = (tab: number) => ({
    type: NavigationActionType.SET_LEFT,
    payload: tab
})

export const setRight = (tab: number) => ({
    type: NavigationActionType.SET_RIGHT,
    payload: tab
})