import { GenotypeActionType } from "../action-types/genotypeActionTypes"
import { ClearGenotypeAction, ClearGenotypeStructAction, SetGenotypeAction, SetGenotypeStructAction } from "../actions/genotypeActions"
import { Gene } from "../types"

export const setGenotype = (genotype: Gene[]): SetGenotypeAction => ({
    type: GenotypeActionType.SET_GENOTYPE,
    payload: genotype
})

export const clearGenotype = (): ClearGenotypeAction => ({
    type: GenotypeActionType.CLEAR_GENOTYPE
})

export const setGenotypeStruct = (genotype: Gene[]): SetGenotypeStructAction => ({
    type: GenotypeActionType.SET_GENOTYPE_STRUCT,
    payload: genotype
})

export const clearGenotypeStruct = (): ClearGenotypeStructAction => ({
    type: GenotypeActionType.CLEAR_GENOTYPE_STRUCT
})