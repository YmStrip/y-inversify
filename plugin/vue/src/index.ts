import {interfaces} from "inversify";
import {App, BindType, Plugin, TypeAfterGet, TypeInitBindApi} from "y-inversify";
import {reactive, ref, Ref} from "vue";
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
	vue: {
		setInject(func: any)
		setProvide(func: any)
	}
}
export class PluginVue extends Plugin {
	protected inject;
	protected provide;
	init(app: App<PluginVueApi, PluginVueBind>) {
		const that = this
		app._api.vue = {
			setInject(func: any) {
				that.inject = func
			},
			setProvide(func: any) {
				that.provide = func
			}
		}
	}
	initBindApi(): (data: TypeInitBindApi) => any {
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
export default PluginVue
