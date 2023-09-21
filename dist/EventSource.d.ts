import { Listener } from './Listener';
import StringKeyOf from './StringKeyOf';
export interface EventSource<ECM extends Record<string, any[]> = Record<string, any[]>> {
    on<E extends StringKeyOf<ECM>>(event: E, listener: Listener<ECM[E]>): this;
    off<E extends StringKeyOf<ECM>>(event: E, listener?: Listener<ECM[E]>): this;
    once<E extends StringKeyOf<ECM>>(event: E, listener: Listener<ECM[E]>): this;
}
//# sourceMappingURL=EventSource.d.ts.map