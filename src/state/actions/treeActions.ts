import { TreeNode } from "../../tree/tree"
import { TreeActionType } from "../action-types/treeActionTypes"

interface CompileTreeRequestAction {
    type: TreeActionType.COMPILE_TREE_REQUEST,
    payload: string
}

interface CompileTreeSuccessAction {
    type: TreeActionType.COMPILE_TREE_SUCCESS,
    payload: TreeNode[]
}

interface CompileTreeFailureAction {
    type: TreeActionType.COMPILE_TREE_FAILURE
    payload: string
}

type TreeAction = CompileTreeRequestAction |
    CompileTreeSuccessAction |
    CompileTreeFailureAction

export type { 
    TreeAction, 
    CompileTreeRequestAction,
    CompileTreeSuccessAction,
    CompileTreeFailureAction
 }