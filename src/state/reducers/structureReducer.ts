import { Reducer } from "redux"
import { ConnectionM2 } from "../../structure/ConnectionM2"
import { ModuleM2 } from "../../structure/ModuleM2"
import { StructureActionTypes } from "../action-types/structureActionTypes"
import { StructureAction } from "../actions/structureActions"

export type Structure = {
    modules: ModuleM2[],
    connections: ConnectionM2[]
}

type StructureState = {
    awaiting: boolean,
    structure: Structure,
    error: string
}

const initialStructureState: StructureState = {
    awaiting: false,
    structure: {
        modules: [
            {
                name: 'big module',
                portMap: {
                    left: 3,
                    top: 2,
                    right: 4,
                    bottom: 0
                }
            },
            {
                name: 'round module',
                portMap: {
                    amount: 5
                }
            },
            {
                name: 'small module',
                portMap: {
                    left: 2,
                    top: 0,
                    right: 2,
                    bottom: 0
                }
            },
            {
                name: 'small module',
                portMap: {
                    left: 2,
                    top: 0,
                    right: 2,
                    bottom: 0
                }
            },
        ],
        connections: [
            {
                from: {
                    moduleName: 'big module',
                    moduleIndex: 0,
                    portIndex: 6
                },
                to: {
                    moduleName: 'small module',
                    moduleIndex: 0,
                    portIndex: 1
                }
            },
            {
                from: {
                    moduleName: 'small module',
                    moduleIndex: 1,
                    portIndex: 3
                },
                to: {
                    moduleName: 'round module',
                    moduleIndex: 0,
                    portIndex: 3
                }
            },
        ]
    },
    error: ''
}  

const structureReducer = (
    state: StructureState = initialStructureState, 
    action: StructureAction) => {
    switch (action.type) {
        case StructureActionTypes.BUILD_STRUCTURE_REQUEST:
            return {
                ...state,
                awaiting: true
            }
        case StructureActionTypes.BUILD_STRUCTURE_SUCCESS:
            return {
                ...state,
                awaiting: false,
                structure: action.payload,
                error: "",
            }
        case StructureActionTypes.BUILD_STRUCTURE_FAILURE:
            return {
                ...state,
                awaiting: false,
                structure: { modules: [], connections: [] },
                error: action.payload,
            }
        default:
            return state
    }
}

export default structureReducer

export { initialStructureState }