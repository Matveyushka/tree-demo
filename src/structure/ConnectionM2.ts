export type ConnectionPort = {
    moduleName: string,
    moduleIndex: number,
    portIndex: number
}

export type ConnectionM2 = {
    from: ConnectionPort | string,
    to: ConnectionPort | string
}