import { TreeNode, TreeNodeType } from "../../tree/tree"
import { TreeActionType } from "../action-types/treeActionTypes"
import { TreeAction } from "../actions/treeActions"

const initialState: Array<TreeNode> = [
    {  
        type: TreeNodeType.OR,
        children: [1, 2, 3]
    },
    {  
        type: TreeNodeType.AND,
        children: [4, 5]
    },
    {  
        type: TreeNodeType.OR,
        children: []
    },
    {  
        type: TreeNodeType.AND,
        children: [6, 7, 8, 9]
    },
    {  
        type: TreeNodeType.OR,
        children: []
    },
    {  
        type: TreeNodeType.OR,
        children: []
    },
    {  
        type: TreeNodeType.OR,
        children: []
    },
    {  
        type: TreeNodeType.OR,
        children: []
    },
    {  
        type: TreeNodeType.OR,
        children: []
    },
    {  
        type: TreeNodeType.OR,
        children: []
    },
] 

const reducer = (
    state: Array<TreeNode> = initialState, 
    action: TreeAction) => {
    switch (action.type) {
        case TreeActionType.SET_TREE:
            return action.payload
        default:
            return state
    }
}

export default reducer