import { all, fork } from 'redux-saga/effects'
import structureSaga from './structureSaga'
import treeSaga from './treeSaga'

export function* rootSaga() {
    yield all([
        fork(treeSaga),
        fork(structureSaga)
    ])
}