export interface EventEmitter {
    trigger<A extends any[]>(event: string, ...eventParameters: A): this
}
