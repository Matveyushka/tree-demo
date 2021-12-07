import { combineReducers } from 'redux'
import treeReducer from './treeReducer'
import codeReducer from './codeReducer'
import infoReducer from './infoReducer'
import genotypeReducer from './genotypeReducer'
import navigationReducer from './navigationReducer'

const reducers = combineReducers({
    tree: treeReducer,
    code: codeReducer,
    info: infoReducer,
    genotype: genotypeReducer,
    navigation: navigationReducer
})

export default reducers

export type State = ReturnType<typeof reducers>