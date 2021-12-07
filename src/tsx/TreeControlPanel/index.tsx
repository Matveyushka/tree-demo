import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../css/TreeControlPanel.css'
import { State } from '../../state'
import { setGenotype } from '../../state/action-creators/genotypeActionCreators'
import GeneController from './GeneController'

const TreeControlPanel = () => {
    const genotypeState = useSelector((state: State) => state.genotype)
    const dispatch = useDispatch()

    const updateGenotype = (updatedIndex: number, newValue: number) => {
        dispatch(setGenotype(genotypeState.choosenGenotype.map((value, index) => {
            return (updatedIndex === value.nodeIndex) ? {
                nodeIndex: value.nodeIndex,
                value: newValue
            } : value
        })))
    }

    return (
        <div className='tree-control-panel'>
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