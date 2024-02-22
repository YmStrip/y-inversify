import { BindType } from "./BindType";
import { App } from "./App";
export interface TypeInitBindApi {
    app: App<any, any>;
    bind: BindType<any>;
}
export interface TypeAfterGet {
    app: App<any, any>;
    bind: BindType<any>;
    data: any;
}
