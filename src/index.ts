interface Dictionary<T> {
	[key: string]: T;
}

export type Listener = (...args: any[]) => void;

export default class EventBus {

	private listeners: Dictionary<Listener[]> = {};

	public on(event: string, listener: Listener): EventBus {

		if (!this.listeners.hasOwnProperty(event)) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(listener);

		return this;

	}

	public off(event: string, listener?: Listener): EventBus {

		if (this.listeners.hasOwnProperty(event)) {
			if (listener === undefined) {
				this.removeAllListeners(event);
			} else {
				this.removeListener(event, listener);
			}
		}

		return this;

	}

	private removeListener(event: string, listener: Listener): void {

		const index = this.listeners[event].indexOf(listener);

		if (index !== -1) {
			this.listeners[event].splice(index, 1);
		}

		this.removeListenersArrayIfEmpty(event);

	}

	private removeAllListeners(event: string): void {
		delete this.listeners[event];
	}

	private removeListenersArrayIfEmpty(event: string): void {
		if (this.listeners[event].length === 0) {
			this.removeAllListeners(event);
		}
	}

	public once(event: string, listener: Listener): EventBus {

		const onceListener: Listener = (...args: any[]) => {
			listener(...args);
			this.off(event, onceListener);
		};

		return this.on(event, onceListener);

	}

	public trigger(event: string, ...eventParameters: any[]): EventBus {

		if (this.listeners.hasOwnProperty(event)) {

			for (const listener of this.listeners[event]) {
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
