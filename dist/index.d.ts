export declare type Listener = (...args: any[]) => void;
export default class EventBus {
    private listeners;
    on(event: string, listener: Listener): EventBus;
    off(event: string, listener?: Listener): EventBus;
    private removeListener;
    private removeAllListeners;
    private removeListenersArrayIfEmpty;
    once(event: string, listener: Listener): EventBus;
    trigger(event: string, ...eventParameters: any[]): EventBus;
}
//# sourceMappingURL=index.d.ts.map