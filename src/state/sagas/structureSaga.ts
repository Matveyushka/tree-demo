import axios, { AxiosResponse } from "axios"
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { Link } from "../../structure/link"
import { Module } from "../../structure/module"
import { getIdFromTree, Identificator, parseModuleIdentifierToSend } from "../../tsx/StructureIdMonitor"
import { setM2Compiled } from "../action-creators/codeActionCreators"
import { writeM2Error, writeM2Info } from "../action-creators/infoActionCreators"
import { buildStructureFailure, buildStructureSuccess } from "../action-creators/structureActionCreators"
import { StructureActionTypes } from "../action-types/structureActionTypes"
import { BuildStructureRequestAction } from "../actions/structureActions"
import store from "../store"

const buildStructure = (code: string) => {
    const state = store.getState()
    const identifier = parseModuleIdentifierToSend(getIdFromTree(state.tree.tree, state.genotype.choosenGenotype))
    return axios.post('https://localhost:5001/buildstructura', {
        code,
        identifier: identifier
    })
}

const parseModule = (data: any) : Module => {
    if (data.submodules === undefined || data.submodules === {}) { 
        if (data.portQuantity !== undefined)
        {
            return {
                name: data.name as string,
                links: data.links as Array<Link>,
                submodules: new Map<string, Module[]>(),
                x: data.x as number | null,
                y: data.y as number | null,
                portQuantity: data.portQuantity as number
            }
        } else if (data.west !== undefined && data.north !== undefined && data.east !== undefined && data.south !== undefined) {
            return {
                name: data.name as string,
                links: data.links as Array<Link>,
                submodules: new Map<string, Module[]>(),
                x: data.x as number | null,
                y: data.y as number | null,
                west: data.west as number,
                north: data.north as number,
                south: data.south as number,
                east: data.east as number,
            }
        }
    } else {
        const subobject = data.submodules
        let submodules = new Map<string, Module[]>()
        for (let key in subobject)
        {
            const subs = subobject[key]
            let modules: Module[] = []
            subs.forEach((sub: any) => modules.push(parseModule(sub)))
            submodules.set(key, modules)
        }
        if (data.portQuantity !== undefined)
        {
            return {
                name: data.name as string,
                links: data.links as Array<Link>,
                submodules,
                x: data.x as number | null,
                y: data.y as number | null,
                portQuantity: data.portQuantity as number
            }
        } else if (data.west !== undefined && data.north !== undefined && data.east !== undefined && data.south !== undefined) {
            return {
                name: data.name as string,
                links: data.links as Array<Link>,
                submodules,
                x: data.x as number | null,
                y: data.y as number | null,
                west: data.west as number,
                north: data.north as number,
                south: data.south as number,
                east: data.east as number,
            }
        }
    }
    return {
        name: "asd",
        links: [],
        submodules: new Map<string, Module[]>(),
        x: 0,
        y: 0,
        portQuantity: 0
    }
}

function* buildStructureSaga(action: BuildStructureRequestAction) {
    try {
        yield put(writeM2Info("M2 Compiling..."))
        const response: AxiosResponse<any> = yield call(buildStructure, action.payload)
        yield put(buildStructureSuccess(parseModule(response.data)))
        yield put(setM2Compiled(true))
        yield put(writeM2Info("M2 Compiled successfully"))
    } catch (e: any) {
        yield put(buildStructureFailure("Fail"))
        yield put(setM2Compiled(false))
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