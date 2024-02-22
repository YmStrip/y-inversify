import { App } from "./App";
import { TypeAfterGet, TypeInitBindApi } from "./Type";
export declare class Plugin {
    bind: Record<string, any>;
    api: Record<any, any>;
    init(app: App<any, any>): void;
    initBind(): (data: TypeInitBindApi) => any;
    afterGet(): (data: TypeAfterGet) => any;
}
