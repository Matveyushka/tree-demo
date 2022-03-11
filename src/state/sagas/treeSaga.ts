import axios, { AxiosResponse } from "axios"
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GetGenotypeStruct, TreeNode } from "../../tree/tree"
import { clearGenotypeStruct, setGenotypeStruct } from "../action-creators/genotypeActionCreators"
import { writeM1Error, writeM1Info } from "../action-creators/infoActionCreators"
import { compileTreeFailure, compileTreeSuccess } from "../action-creators/treeActionCreators"
import { TreeActionType } from "../action-types/treeActionTypes"
import { CompileTreeRequestAction } from "../actions/treeActions"


const compileTree = (code: string) => {
    return axios.post('https://localhost:5001/compiletree', { code })
}

function* compileTreeSaga(action: CompileTreeRequestAction) {
    try {
        yield put(writeM1Info("Compiling..."))
        const response: AxiosResponse<TreeNode[]> = yield call(compileTree, action.payload)
        yield put(clearGenotypeStruct())
        yield put(compileTreeSuccess(response.data))
        yield put(setGenotypeStruct(GetGenotypeStruct(response.data)))
        yield put(writeM1Info("Compiled successfully"))
    } catch (e: any) {
        yield put(
            compileTreeFailure("Fail")
        )
        if (e.response !== undefined) {
            yield put(
                writeM1Error(e.response.data)
            )
        } else {
            yield put(
                writeM1Error("It looks like server does not response!")
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