import { PortIndex } from "./portIndex"

type PortBase = {
    portIndex: PortIndex
}

export type ChildPort = PortBase & {
    submoduleName: string,
    submoduleIndex: number
}

export type SelfPort = PortBase

export const isChildPort = (port: Port) : port is ChildPort => {
    if ((port as ChildPort).submoduleName !== undefined)
    {
        return true
    }
    return false
}

export const isSelfPort = (port: Port) : port is SelfPort => isChildPort(port) === false

export type Port = ChildPort | SelfPort