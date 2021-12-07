import { NavigationActionType } from "../action-types/navigationActionTypes"
import { NavigationAction } from "../actions/navigationActions"

type NavigationState = {
    left: number,
    right: number
}

const initialNavigationState: NavigationState = {
    left: 0,
    right: 1
}

const treeReducer = (
    state: NavigationState = initialNavigationState,
    action: NavigationAction) => {
    switch (action.type) {
        case NavigationActionType.SET_LEFT:
            return {
                ...state,
                left: action.payload
            }
        case NavigationActionType.SET_RIGHT:
            return {
                ...state,
                right: action.payload
            }
        default:
            return state
    }
}

export default treeReducer

export { initialNavigationState }