import { all, fork } from 'redux-saga/effects'
import treeSaga from './treeSaga'

export function* rootSaga() {
    yield all([fork(treeSaga)])
}