import { TreeNode } from "../../tree/tree"
import { TreeActionType } from "../action-types/treeActionTypes"
import { TreeAction } from "../actions/treeActions"

type TreeState = {
    awaiting: boolean,
    tree: TreeNode[] | null,
    error: string
}

const initialTreeState: TreeState = {
    awaiting: false,
    tree: null,
    error: ''
}  

const treeReducer = (
    state: TreeState = initialTreeState, 
    action: TreeAction) => {
    switch (action.type) {
        case TreeActionType.COMPILE_TREE_REQUEST:
            return {
                ...state,
                awaiting: true
            }
        case TreeActionType.COMPILE_TREE_SUCCESS:
            return {
                ...state,
                awaiting: false,
                tree: action.payload,
                error: "",
            }
        case TreeActionType.COMPILE_TREE_FAILURE:
            return {
                ...state,
                awaiting: false,
                tree: [],
                error: action.payload,
            }
        default:
            return state
    }
}

export default treeReducer

export { initialTreeState }