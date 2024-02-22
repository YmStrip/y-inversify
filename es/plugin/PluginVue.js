import { Plugin } from "../lib/Plugin";
import { reactive, ref } from "vue";
export class PluginVue extends Plugin {
    init(app) {
        const that = this;
        app.api.vue = {
            setInject(func) {
                that.inject = func;
            },
            setProvide(func) {
                that.provide = func;
            }
        };
    }
    initBindApi() {
        return data => {
            const bind = data.bind;
            bind.vueRef = ref({});
            bind.toVueReactiveClass = (data) => {
                const c = bind.to(data);
                c.inSingletonScope();
                c.onActivation((context, instance) => {
                    return reactive(instance);
                });
                return c;
            };
            bind.toVueReactiveValue = (data) => {
                const c = bind.toDynamicValue((context) => {
                    return reactive(data);
                });
                c.inSingletonScope();
                return c;
            };
            bind.toVueRefClass = (data) => {
                const c = bind.to(data);
                c.inSingletonScope();
                c.onActivation((context, instance) => {
                    return ref(instance);
                });
                return c;
            };
            bind.toVueRefValue = (data) => {
                const c = bind.toDynamicValue((context) => {
                    return ref(data);
                });
                c.inSingletonScope();
                return c;
            };
        };
    }
    afterGet() {
        return data => {
            const bind = data.bind;
            bind.vueRef.value = data.data;
        };
    }
}
//# sourceMappingURL=PluginVue.js.map