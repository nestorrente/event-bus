import { Listener } from './types';
export default class EventBus {
    private listeners;
    on(event: string, listener: Listener): EventBus;
    off(event: string, listener?: Listener): EventBus;
    private removeListener;
    private removeListenersArrayIfEmpty;
    private removeAllListeners;
    once(event: string, listener: Listener): EventBus;
    trigger(event: string, ...eventParameters: any[]): EventBus;
}
//# sourceMappingURL=EventBus.d.ts.map