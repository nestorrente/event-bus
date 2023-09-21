import {Listener} from './Listener';
import {EventSource} from "./EventSource";
import {EventEmitter} from "./EventEmitter";

export default class EventBus implements EventEmitter, EventSource {

	/**
	 * We use a Map<Listener, Listener> because in some cases, like in the {@link once} method,
	 * we will register a different listener that the one we received, but still want to be able
	 * to cancel it by calling {@link off} with the original listener.
	 * @private
	 */
	private listeners: Record<string, Map<Listener, Listener>> = {};

	public on(event: string, listener: Listener): this {
		this.registerListener(event, listener, listener);
		return this;
	}

	private registerListener(event: string, keyListener: Listener, realListener: Listener): void {

		if (!this.listeners.hasOwnProperty(event)) {
			this.listeners[event] = new Map();
		}

		this.listeners[event].set(keyListener, realListener);

	}

	public off(event: string, listener?: Listener): this {

		if (this.listeners.hasOwnProperty(event)) {
			if (listener !== undefined) {
				this.unregisterListener(event, listener);
			} else {
				this.unregisterAllListeners(event);
			}
		}

		return this;

	}

	private unregisterListener(event: string, listener: Listener): void {

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

	public once(event: string, listener: Listener): this {

		const onceListener: Listener = (...args: any[]) => {
			listener(...args);
			this.off(event, listener);
		};

		this.registerListener(event, listener, onceListener);

		return this;

	}

	public trigger<A extends any[]>(event: string, ...eventParameters: A): this {

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
