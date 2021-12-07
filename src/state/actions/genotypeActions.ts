import { GenotypeActionType } from "../action-types/genotypeActionTypes"
import { Gene } from "../types"

interface SetGenotypeAction {
    type: GenotypeActionType.SET_GENOTYPE,
    payload: Gene[]
}

interface ClearGenotypeAction {
    type: GenotypeActionType.CLEAR_GENOTYPE,
}

interface SetGenotypeStructAction {
    type: GenotypeActionType.SET_GENOTYPE_STRUCT,
    payload: Gene[]
}

interface ClearGenotypeStructAction {
    type: GenotypeActionType.CLEAR_GENOTYPE_STRUCT,
}

type GenotypeAction = SetGenotypeAction |
    ClearGenotypeAction |
    SetGenotypeStructAction |
    ClearGenotypeStructAction

export type {
    GenotypeAction,
    SetGenotypeAction,
    ClearGenotypeAction,
    SetGenotypeStructAction,
    ClearGenotypeStructAction
}