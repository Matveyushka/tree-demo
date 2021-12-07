import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../css/Navigation.css'
import { State } from '../../state'
import { setLeft, setRight } from '../../state/action-creators/navigationActionCreators'

const Navigation = () => {
    const navigationNames = [
        "M1 editor",
        "M1 Tree observer",
        "M1 out",
        "M2 editor",
        "M2 Structure observer"
    ]

    const dispatch = useDispatch()
    const navigation = useSelector((state: State) => state.navigation)

    const handleActiveLeft = (index: number) => navigation.left === index ? ' active-left' : ''
    const handleActiveRight = (index: number) => navigation.right === index ? ' active-right' : ''

    const handleLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        if (navigation.right !== index) {
            dispatch(setLeft(index))
        }
    }

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        e.preventDefault()
        if (navigation.left !== index) {
            dispatch(setRight(index))
        }
    }

    return (
        <div className="navigation">
            {
                navigationNames.map((name, index) => (
                    <div
                        className={`navigation-button${handleActiveLeft(index)}${handleActiveRight(index)}`}
                        key={index}
                        onClick={e => handleLeftClick(e, index)}
                        onContextMenu={e => handleRightClick(e, index)}
                        >{name}
                    </div>
                ))
            }
        </div>
    )
}

export default Navigation