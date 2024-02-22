import { interfaces } from "inversify";
import { Plugin } from "../lib/Plugin";
import { App } from "../lib/App";
import { TypeAfterGet, TypeInitBindApi } from "../lib/Type";
import { Ref } from "vue";
import { BindType } from "../lib/BindType";
import Newable = interfaces.Newable;
export type PluginVueBind<T = any, D extends BindType<T> = BindType<T>> = D & {
    vueRef: Ref<T>;
    toVueReactiveClass(data: Newable<T>): interfaces.BindingInWhenOnSyntax<T>;
    toVueReactiveValue(data: T): interfaces.BindingInWhenOnSyntax<T>;
    toVueRefClass(data: Newable<T>): interfaces.BindingInWhenOnSyntax<T>;
    toVueRefValue(data: T): interfaces.BindingInWhenOnSyntax<T>;
};
export interface PluginVueApi {
    setInject(func: any): any;
    setProvide(func: any): any;
}
export declare class PluginVue extends Plugin {
    protected inject: any;
    protected provide: any;
    bind: PluginVueBind;
    api: {
        vue: PluginVueApi;
    };
    init(app: App<PluginVue['api'], PluginVue['bind']>): void;
    initBind(): (data: TypeInitBindApi) => any;
    afterGet(): (data: TypeAfterGet) => any;
}
