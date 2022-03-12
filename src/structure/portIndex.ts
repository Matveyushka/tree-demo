export type SimplePortIndex = {
    portIndex: number
}

export type DirectedPortIndex = {
    portIndex: number,
    portDirection: number
}

export type PortIndex = SimplePortIndex | DirectedPortIndex

export const isDirectedPortIndex = (portIndex: PortIndex) : portIndex is DirectedPortIndex => {
    if ((portIndex as DirectedPortIndex).portDirection !== undefined)
    {
        return true
    }
    return false
}

export const isSimplePortIndex = (portIndex: PortIndex) : portIndex is SimplePortIndex => isDirectedPortIndex(portIndex) === false