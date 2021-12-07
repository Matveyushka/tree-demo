
import * as React from 'react'
import { Gene } from '../../state/types'

interface GeneControllerParams {
    index: number
    geneStruct: Gene,
    geneValue: Gene,
    changeCallback: (newValue: number) => void
}

const GeneController = (params: GeneControllerParams) => {

    const validateNewValue = (newValue: number) => {
        if (newValue < 1) {
            return 1
        } else if (newValue > params.geneStruct.value) {
            return params.geneStruct.value
        } else {
            return newValue
        }
    }

    return (
        <div className="gene-controller-wrapper">
            <div className="gene-controller">
                {params.geneStruct.nodeIndex}
                <button onClick={() => params.changeCallback(validateNewValue(params.geneValue.value + 1))}>+</button>
                <div>{params.geneValue.value} / {params.geneStruct.value}</div>
                <button onClick={() => params.changeCallback(validateNewValue(params.geneValue.value - 1))}>-</button>
            </div>
        </div>
    )
}

export default GeneController