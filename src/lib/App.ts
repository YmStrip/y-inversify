import {Container} from "inversify";
import {Plugin} from "./Plugin";
import {CallList} from "./CallList";
import {TypeAfterGet, TypeInitBindApi} from "./Type";
import {BindType} from "./BindType";

export class App<Api extends Record<string, any>, BindApi extends Record<string, any>> {
	container = new Container()
	protected bindList: Record<string, BindType<any>> = {}
	protected name: string
	protected tree<T extends Record<string, any>>(data: T) {
		(<any>data)._is_bind_tree = true;
		return data
	}
	protected bind<T>(): BindType<T> & BindApi {
		return <any>true
	}
	//api列表
	protected onList = {
		//init-bind-api处理
		initBindApi: new CallList<TypeInitBindApi>(),
		//get处理
		afterGet: new CallList<TypeAfterGet>()
	}
	//初始化绑定api
	protected init() {
		const use_bind = (name: string): BindType<any> => {
			const symbol = Symbol.for(name)
			const b: BindType<any> = <any>this.container.bind(symbol);
			b.getSimpleName = () => {
				return name.split('.').pop()
			}
			b.get = () => {
				const last = this.container.get(symbol)
				b.lastValue = last
				this.onList.afterGet.emit({
					app: this,
					bind: b,
					data: last
				})
			}
			b.symbol = symbol
			b.name = b.class = name
			this.bindList[name] = b
			this.onList.initBindApi.emit({
				app: this,
				bind: b
			})
			return b
		}
		const rec_bind = (t: any, name: string) => {
			if (!t._is_bind_tree) return
			for (let i in t) {
				if (i.includes('.')) throw new Error("error name " + i)
				if (t[i] == true) {
					t[i] = use_bind(name + '.' + i)
				}
				//
				else if (t[i]) {
					rec_bind(t[i], name + '.' + i)
				}
			}
		}
	}
	//plugin - module
	use(data: Plugin) {
		data.init(this)
		return this
	}
	api: Api = <any>{}
	constructor(name: string) {
		this.name = name
	}
}



















