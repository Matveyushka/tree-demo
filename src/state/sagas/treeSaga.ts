import axios, { AxiosError, AxiosResponse } from "axios"
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TreeNode } from "../../tree/tree"
import { writeError, writeInfo } from "../action-creators/infoActionCreators"
import { compileTreeFailure, compileTreeSuccess } from "../action-creators/treeActionCreators"
import { TreeActionType } from "../action-types/treeActionTypes"
import { CompileTreeRequestAction } from "../actions/treeActions"


const compileTree = (code: string) => {
    return axios.post('https://localhost:5001/compiletree', { code })
}

function* compileTreeSaga(action: CompileTreeRequestAction) {
    try {
        yield put(writeInfo("Compiling..."))
        const response: AxiosResponse<TreeNode[]> = yield call(compileTree, action.payload)
        yield put(compileTreeSuccess(response.data))
        yield put(writeInfo("Compiled successfully"))
    } catch (e: any) {
        yield put(
            compileTreeFailure("Fail")
        )
        if (e.response !== undefined) {
            yield put(
                writeError(e.response.data)
            )
        } else {
            yield put(
                writeError("It looks like server does not response!")
            )   
        }
    }
}

function* treeSaga() {
    yield all([takeLatest(
        TreeActionType.COMPILE_TREE_REQUEST,
        compileTreeSaga
    )])
}

export default treeSaga