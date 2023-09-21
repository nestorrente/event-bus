import { Listener } from './Listener';
import { EventSource } from './EventSource';
import { EventEmitter } from './EventEmitter';
import StringKeyOf from './StringKeyOf';
export default class EventBus<ECM extends Record<string, any[]> = Record<string, any[]>> implements EventEmitter<ECM>, EventSource<ECM> {
    /**
     * We use a Map<Listener, Listener> because in some cases, like in the {@link once} method,
     * we will register a different listener that the one we received, but still want to be able
     * to cancel it by calling {@link off} with the original listener.
     * @private
     */
    private listeners;
    on<E extends StringKeyOf<ECM>>(event: E, listener: Listener<ECM[E]>): this;
    private registerListener;
    off<E extends StringKeyOf<ECM>>(event: E, listener?: Listener<ECM[E]>): this;
    private unregisterListener;
    private removeListenersMapIfEmpty;
    private unregisterAllListeners;
    once<E extends StringKeyOf<ECM>>(event: E, listener: Listener<ECM[E]>): this;
    trigger<E extends StringKeyOf<ECM>>(event: E, ...eventParameters: ECM[E]): this;
}
//# sourceMappingURL=EventBus.d.ts.map