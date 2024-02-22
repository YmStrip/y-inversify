"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginVue = void 0;
const Plugin_1 = require("../lib/Plugin");
const vue_1 = require("vue");
class PluginVue extends Plugin_1.Plugin {
    init(app) {
        const that = this;
        this.api.vue = {
            setInject(func) {
                that.inject = func;
            },
            setProvide(func) {
                that.provide = func;
            }
        };
    }
    initBind() {
        return data => {
            const bind = data.bind;
            bind.vueRef = (0, vue_1.ref)({});
            bind.toVueReactiveClass = (data) => {
                const c = bind.to(data);
                c.inSingletonScope();
                c.onActivation((context, instance) => {
                    return (0, vue_1.reactive)(instance);
                });
                return c;
            };
            bind.toVueReactiveValue = (data) => {
                const c = bind.toDynamicValue((context) => {
                    return (0, vue_1.reactive)(data);
                });
                c.inSingletonScope();
                return c;
            };
            bind.toVueRefClass = (data) => {
                const c = bind.to(data);
                c.inSingletonScope();
                c.onActivation((context, instance) => {
                    return (0, vue_1.ref)(instance);
                });
                return c;
            };
            bind.toVueRefValue = (data) => {
                const c = bind.toDynamicValue((context) => {
                    return (0, vue_1.ref)(data);
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
exports.PluginVue = PluginVue;
//# sourceMappingURL=PluginVue.js.map