import { combineReducers } from 'redux'
import treeReducer from './treeReducer'
import codeReducer from './codeReducer'
import infoReducer from './infoReducer'

const reducers = combineReducers({
    tree: treeReducer,
    code: codeReducer,
    info: infoReducer
})

export default reducers

export type State = ReturnType<typeof reducers>