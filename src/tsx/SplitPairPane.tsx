import React from 'react'
import '../css/SplitPairPane.css';

enum SplitPairPaneOrientation {
    HORIZONTAL = 'row',
    VERTICAL = 'column'
}

type SplitPairPaneProps = {
    position?: number,
    orientaion: SplitPairPaneOrientation,
    children: React.ReactNode
}

const SplitPairPane = (props: SplitPairPaneProps) => {
    const [position, setPosition] = React.useState(0)
    const [dividerSize, setDividerSize] = React.useState(0)
    const dividerRef = React.useRef<HTMLDivElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    if (React.Children.count(props.children) !== 2) {
        throw Error("SplitPairPane component must contain exactly 2 children")
    }

    const childrenArray = React.Children.toArray(props.children)

    React.useEffect(() => {
        if (dividerRef != null) {
            setDividerSize(props.orientaion === SplitPairPaneOrientation.HORIZONTAL ?
                (dividerRef?.current?.clientWidth ?? 0) :
                (dividerRef?.current?.clientHeight ?? 0))
        }
    }, [dividerRef, props.orientaion])

    React.useEffect(() => {
        const containerWidth = containerRef.current?.clientWidth ?? 0
            const containerHeight = containerRef.current?.clientHeight ?? 0

            const coef = ((props.position ?? 0) / 100) ?? 0.5

            if (props.orientaion === SplitPairPaneOrientation.HORIZONTAL) {
                setPosition(containerWidth * coef - dividerSize / 2)
            } else {
                setPosition(containerHeight * coef - dividerSize / 2)
            }
    }, [dividerSize, props.orientaion, props.position])

    const dragPreventDefault = (event: React.DragEvent) => event.preventDefault()

    const dragHandler = (event: React.DragEvent) => {
        dragPreventDefault(event)

        if (event.clientX !== 0 || event.clientY !== 0) {
            setPosition(props.orientaion === SplitPairPaneOrientation.HORIZONTAL ?
                event.clientX - dividerSize / 2 :
                event.clientY - dividerSize / 2)
        }
    }

    return (
        <div className='split-pair-pane' style={{ flexDirection: props.orientaion }} ref={containerRef}>
            <div className={`split-pair-pane-content-wrapper split-pair-pane-content-wrapper-${props.orientaion}`}
                style={props.orientaion === SplitPairPaneOrientation.HORIZONTAL ?
                    { width: `${position}px` } :
                    { height: `${position}px` }}>
                {childrenArray[0]}
            </div>
            <div ref={dividerRef}
                className={`split-pair-pane-divider split-pair-pane-divider-${props.orientaion}`}>
                    <div className={`split-pair-pane-divider-invisible split-pair-pane-divider-${props.orientaion}-invisible`}
                    draggable='true'
                    onMouseDownCapture={event => event?.stopPropagation()}
                    onDragStart={event => {
                        event.dataTransfer.effectAllowed = 'move'
                        event.dataTransfer.setDragImage(new Image(0, 0), 0, 0)
                    }}
                    onDragEnter={event => event.dataTransfer.dropEffect = 'move'}
                    onDrag={dragHandler}
                    onDragEnd={dragHandler}></div>
                </div>
            <div className={`split-pair-pane-content-wrapper split-pair-pane-content-wrapper-${props.orientaion}`}
                style={props.orientaion === SplitPairPaneOrientation.HORIZONTAL ?
                    { width: `${(containerRef.current?.clientWidth ?? 0) - position - (dividerRef.current?.clientWidth ?? 0)}px` } :
                    { height: `${(containerRef.current?.clientHeight ?? 0) - position - (dividerRef.current?.clientHeight ?? 0)}px` }}>
                {childrenArray[1]}
            </div>
        </div>
    )
}

export default SplitPairPane
export { SplitPairPaneOrientation }