import { Container } from "inversify";
import { Plugin } from "./Plugin";
import { CallList } from "./CallList";
import { TypeAfterGet, TypeInitBindApi } from "./Type";
import { BindType } from "./BindType";
import "reflect-metadata";
export declare class AppData<T extends App> {
    app: T;
    container: Container;
    bindList: Record<string, BindType<any>>;
    onList: {
        initBindApi: CallList<TypeInitBindApi>;
        afterGet: CallList<TypeAfterGet>;
    };
    name: string;
    constructor(app: T);
}
export declare class AppApi<T extends App> {
    app: T;
    isIgnoreKey(name: string): boolean;
    init(): void;
    use(data: Plugin): this;
    constructor(app: T);
}
export declare class App<Api extends Record<string, any> = {}, BindApi extends BindType = BindType> {
    data: AppData<this>;
    api: Api & AppApi<this>;
    protected bind<T>(): BindType<T> & BindApi;
    protected tree<T extends Record<string, any>>(data: T): T;
    protected use<T extends Plugin>(data: T): this;
    protected init(): this;
    constructor(name: string);
}
