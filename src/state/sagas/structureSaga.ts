import axios, { AxiosResponse } from "axios"
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { writeM2Error, writeM2Info } from "../action-creators/infoActionCreators"
import { buildStructureFailure, buildStructureSuccess } from "../action-creators/structureActionCreators"
import { StructureActionTypes } from "../action-types/structureActionTypes"
import { BuildStructureRequestAction } from "../actions/structureActions"
import { Structure } from "../reducers/structureReducer"

const buildStructure = (code: string) => {
    return axios.post('https://localhost:5001/buildstructura', code)
}

function* buildStructureSaga(action: BuildStructureRequestAction) {
    try {
        yield put(writeM2Info("M2 Compiling..."))
        const response: AxiosResponse<Structure> = yield call(buildStructure, action.payload)
        //yield put(buildStructureSuccess("hello"))
        yield put(writeM2Info("M2 Compiled successfully"))
    } catch (e: any) {
        yield put(
            buildStructureFailure("Fail")
        )
        if (e.response !== undefined) {
            yield put(
                writeM2Error(e.response.data)
            )
        } else {
            yield put(
                writeM2Error("It looks like server does not response!")
            )   
        }
    }
}

function* structureSaga() {
    yield all([takeLatest(
        StructureActionTypes.BUILD_STRUCTURE_REQUEST,
        buildStructureSaga
    )])
}

export default structureSaga