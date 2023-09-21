import StringKeyOf from './StringKeyOf';

export interface EventEmitter<ECM extends Record<string, any[]> = Record<string, any[]>> {

	trigger<E extends StringKeyOf<ECM>>(event: E, ...eventParameters: ECM[E]): this;

}
