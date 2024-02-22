import { Container } from "inversify";
import { Plugin } from "./Plugin";
import { CallList } from "./CallList";
import { TypeAfterGet, TypeInitBindApi } from "./Type";
import { BindType } from "./BindType";
export declare class App<Api extends Record<string, any>, BindApi extends Record<string, any>> {
    container: Container;
    protected bindList: Record<string, BindType<any>>;
    protected name: string;
    protected tree<T extends Record<string, any>>(data: T): T;
    protected bind<T>(): BindType<T> & BindApi;
    protected onList: {
        initBindApi: CallList<TypeInitBindApi>;
        afterGet: CallList<TypeAfterGet>;
    };
    protected init(): void;
    use(data: Plugin): this;
    api: Api;
    constructor(name: string);
}
