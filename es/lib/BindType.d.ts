import { interfaces } from "inversify";
export type BindType<Data = any> = interfaces.BindingToSyntax<Data> & {
    class: string;
    name: string;
    symbol: symbol;
    getSimpleName(): string;
    get(): Data;
    lastValue: Data;
};
