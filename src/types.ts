export interface Dictionary<T> {
	[key: string]: T;
}

export type Listener = (...args: any[]) => void;
