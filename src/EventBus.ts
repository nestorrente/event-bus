import { Listener } from './Listener';
import { EventSource } from './EventSource';
import { EventEmitter } from './EventEmitter';
import StringKeyOf from './StringKeyOf';

export default class EventBus<ECM extends Record<string, any[]> = Record<string, any[]>>
		implements EventEmitter<ECM>, EventSource<ECM> {

	/**
	 * We use a Map<Listener, Listener> because in some cases, like in the {@link once} method,
	 * we will register a different listener that the one we received, but still want to be able
	 * to cancel it by calling {@link off} with the original listener.
	 * @private
	 */
	private listeners: Record<string, Map<Listener<any>, Listener<any>>> = {};

	public on<E extends StringKeyOf<ECM>>(event: E, listener: Listener<ECM[E]>): this {
		this.registerListener(event, listener, listener);
		return this;
	}

	private registerListener<E extends StringKeyOf<ECM>>(event: E, keyListener: Listener<ECM[E]>, realListener: Listener<ECM[E]>): void {

		if (!this.listeners.hasOwnProperty(event)) {
			this.listeners[event] = new Map();
		}

		this.listeners[event].set(keyListener, realListener);

	}

	public off<E extends StringKeyOf<ECM>>(event: E, listener?: Listener<ECM[E]>): this {

		if (this.listeners.hasOwnProperty(event)) {
			if (listener !== undefined) {
				this.unregisterListener(event, listener);
			} else {
				this.unregisterAllListeners(event);
			}
		}

		return this;

	}

	private unregisterListener<E extends StringKeyOf<ECM>>(event: E, listener: Listener<ECM[E]>): void {

		const deleted = this.listeners[event].delete(listener);

		if (deleted) {
			this.removeListenersMapIfEmpty(event);
		}

	}

	private removeListenersMapIfEmpty(event: string): void {
		if (this.listeners[event].size === 0) {
			this.unregisterAllListeners(event);
		}
	}

	private unregisterAllListeners(event: string): void {
		delete this.listeners[event];
	}

	public once<E extends StringKeyOf<ECM>>(event: E, listener: Listener<ECM[E]>): this {

		const onceListener: Listener = (...args: any) => {
			listener(...args);
			this.off(event, listener);
		};

		this.registerListener(event, listener, onceListener);

		return this;

	}

	public trigger<E extends StringKeyOf<ECM>>(event: E, ...eventParameters: ECM[E]): this {

		if (this.listeners.hasOwnProperty(event)) {

			for (const listener of this.listeners[event].values()) {
				try {
					listener(...eventParameters);
				} catch (e) {
					console.error(e);
				}
			}

		}

		return this;

	}

}
