import {Listener} from './Listener';

export interface EventSource {
    on(event: string, listener: Listener): this;
    off(event: string, listener?: Listener): this;
    once(event: string, listener: Listener): this;
}
