import { combineReducers } from 'redux'
import treeReducer from './treeReducer'

const reducers = combineReducers({
    tree: treeReducer
})

export default reducers

export type State = ReturnType<typeof reducers>