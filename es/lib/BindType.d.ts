import { interfaces } from "inversify";
export type BindType<T = any, List extends Record<string, any> = {}> = interfaces.BindingToSyntax<any> & List & {
    get(): T;
    lastValue: T;
    symbol(): symbol;
    name(): string;
};
