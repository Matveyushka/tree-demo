import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../css/TreeControlPanel.css'
import { State } from '../../state'
import { setGenotype } from '../../state/action-creators/genotypeActionCreators'
import { buildStructureRequest } from '../../state/action-creators/structureActionCreators'
import GeneController from './GeneController'

const TreeControlPanel = () => {
    const { genotypeState, structureCode, m2compiled } = useSelector((state: State) => ({
        genotypeState: state.genotype,
        structureCode: state.code.m2code,
        m2compiled: state.code.m2compiled
    }))
    const dispatch = useDispatch()

    const updateGenotype = (updatedIndex: number, newValue: number) => {
        const newGenotype = genotypeState.choosenGenotype.map((value, index) => {
            return (updatedIndex === value.nodeIndex) ? {
                nodeIndex: value.nodeIndex,
                value: newValue
            } : value
        })

        dispatch(setGenotype(newGenotype))
        if (m2compiled) {
            dispatch(buildStructureRequest(structureCode))
        }
    }

    return (
        <div className='tree-control-panel flat-scrollbar'>
            {
                genotypeState.genotypeStruct.map((geneStruct, index) =>
                    <GeneController
                        key={index}
                        index={index}
                        geneStruct={geneStruct}
                        geneValue={genotypeState.choosenGenotype[index]}
                        changeCallback={(newValue: number) => updateGenotype(geneStruct.nodeIndex, newValue)
                        } />)
            }
        </div>
    )
}

export default TreeControlPanel