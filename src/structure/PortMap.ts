type RectanglePortMap = {
    left: number,
    top: number,
    right: number,
    bottom: number
}

type RoundPortMap = {
    amount: number
}

type PortMap = RectanglePortMap | RoundPortMap

export type { 
    RectanglePortMap, 
    RoundPortMap, 
    PortMap 
}