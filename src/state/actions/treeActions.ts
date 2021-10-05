import { TreeNode } from "../../tree/tree";
import { TreeActionType } from "../action-types/treeActionTypes";

interface SetTreeAction {
    type: TreeActionType.SET_TREE,
    payload: Array<TreeNode>
}

type TreeAction = SetTreeAction

export type { TreeAction }