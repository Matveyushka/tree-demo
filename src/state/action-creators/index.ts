import { TreeNode } from "../../tree/tree";
import { TreeActionType } from "../action-types/treeActionTypes";
import { Dispatch } from 'redux';
import { TreeAction } from "../actions/treeActions";

export const setTree = (tree: Array<TreeNode>) => {
    return {
            type: TreeActionType.SET_TREE,
            payload: tree
        }
    }