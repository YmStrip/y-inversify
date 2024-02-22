import {interfaces} from "inversify";

export type BindType<T = any, List extends Record<string, any> = {}> = interfaces.BindingToSyntax<any> & List & {
	class: string
	name: string
	symbol: symbol
	getSimpleName(): string
	get(): T
	lastValue: T
}
