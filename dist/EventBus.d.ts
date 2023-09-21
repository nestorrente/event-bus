import { Listener } from './Listener';
import { EventSource } from "./EventSource";
import { EventEmitter } from "./EventEmitter";
export default class EventBus implements EventEmitter, EventSource {
    /**
     * We use a Map<Listener, Listener> because in some cases, like in the {@link once} method,
     * we will register a different listener that the one we received, but still want to be able
     * to cancel it by calling {@link off} with the original listener.
     * @private
     */
    private listeners;
    on(event: string, listener: Listener): this;
    private registerListener;
    off(event: string, listener?: Listener): this;
    private unregisterListener;
    private removeListenersMapIfEmpty;
    private unregisterAllListeners;
    once(event: string, listener: Listener): this;
    trigger<A extends any[]>(event: string, ...eventParameters: A): this;
}
//# sourceMappingURL=EventBus.d.ts.map