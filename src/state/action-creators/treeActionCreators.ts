import { TreeNode } from "../../tree/tree"
import { TreeActionType } from "../action-types/treeActionTypes"
import { CompileTreeFailureAction, CompileTreeRequestAction, CompileTreeSuccessAction } from "../actions/treeActions"


export const compileTreeRequest = (text: string): CompileTreeRequestAction => ({
    type: TreeActionType.COMPILE_TREE_REQUEST,
    payload: text
})

export const compileTreeSuccess = (
    payload: TreeNode[]
): CompileTreeSuccessAction => ({
    type: TreeActionType.COMPILE_TREE_SUCCESS,
    payload
})

export const compileTreeFailure = (
    payload: string
): CompileTreeFailureAction => ({
    type: TreeActionType.COMPILE_TREE_FAILURE,
    payload
})