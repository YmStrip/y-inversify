import {interfaces} from "inversify";
import {Plugin} from "../lib/Plugin";
import {App} from "../lib/App";
import {TypeAfterGet, TypeInitBindApi} from "../lib/Type";
import {reactive, ref, Ref} from "vue";
import {BindType} from "../lib/BindType";
import Newable = interfaces.Newable;

export type PluginVueBind<T = any, D extends BindType<T> = BindType<T>> = D & {
	//实例缓存
	vueRef: Ref<T>
	//将类绑定到reactive单例
	toVueReactiveClass(data: Newable<T>): interfaces.BindingInWhenOnSyntax<T>
	//将值绑定到reactive单例
	toVueReactiveValue(data: T): interfaces.BindingInWhenOnSyntax<T>
	//将类绑定到ref单例
	toVueRefClass(data: Newable<T>): interfaces.BindingInWhenOnSyntax<T>
	//将值绑定到ref单例
	toVueRefValue(data: T): interfaces.BindingInWhenOnSyntax<T>
	//获取ref类
}
export interface PluginVueApi {
	setInject(func: any)
	setProvide(func: any)
}
export class PluginVue extends Plugin {
	protected inject;
	protected provide;
	//提供vue - 返回reactive 并且 提供注入函数
	bind: PluginVueBind
	api: {
		vue: PluginVueApi
	}
	init(app: App<PluginVue['api'], PluginVue['bind']>) {
		const that = this
		this.api.vue = {
			setInject(func: any) {
				that.inject = func
			},
			setProvide(func: any) {
				that.provide = func
			}
		}
	}
	initBind(): (data: TypeInitBindApi) => any {
		return data => {
			const bind: PluginVueBind = <any>data.bind;
			bind.vueRef = ref({})
			bind.toVueReactiveClass = (data) => {
				const c = bind.to(data)
				c.inSingletonScope()
				c.onActivation((context, instance) => {
					return <any>reactive(instance)
				})
				return c
			}
			bind.toVueReactiveValue = (data) => {
				const c = bind.toDynamicValue((context) => {
					return reactive(data)
				})
				c.inSingletonScope()
				return c
			}
			bind.toVueRefClass = (data) => {
				const c = bind.to(data)
				c.inSingletonScope()
				c.onActivation((context, instance) => {
					return <any>ref(instance)
				})
				return c
			}
			bind.toVueRefValue = (data) => {
				const c = bind.toDynamicValue((context) => {
					return ref(data)
				})
				c.inSingletonScope()
				return c
			}
		}
	}
	afterGet(): (data: TypeAfterGet) => any {
		return data => {
			const bind: PluginVueBind = <any>data.bind;
			bind.vueRef.value = data.data
		}
	}
}
