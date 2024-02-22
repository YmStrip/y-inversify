import {Container} from "inversify";
import {Plugin} from "./Plugin";
import {CallList} from "./CallList";
import {TypeAfterGet, TypeInitBindApi} from "./Type";
import {BindType} from "./BindType";
import "reflect-metadata"
export class AppData<T extends App> {
	app: T
	container = new Container()
	bindList: Record<string, BindType<any>> = {}
	onList = {
		//init-bind-api处理
		initBindApi: new CallList<TypeInitBindApi>(),
		//get处理
		afterGet: new CallList<TypeAfterGet>()
	}
	name: string
	constructor(app: T) {
		this.app = app
	}
}
export class AppApi<T extends App> {
	app: T
	isIgnoreKey(name: string) {
		return ['name', 'data', 'api', 'use', 'init', 'tree', 'bind', 'constructor'].includes(name)
	}
	init() {
		const app = this.app
		const container = this.app.data.container
		const onList = this.app.data.onList
		const bindList = this.app.data.bindList
		const use_bind = (name: string): BindType => {
			const symbol = Symbol.for(name)
			const b: BindType = <any>container.bind(symbol);
			b.getSimpleName = () => {
				return name.split('.').pop()
			}
			b.get = () => {
				const last = <any>container.get(symbol)
				b.lastValue = last
				this.app.data.onList.afterGet.emit({
					app,
					bind: b,
					data: last
				})
				return last
			}
			b.symbol = symbol
			b.name = b.class = name
			bindList[name] = b
			onList.initBindApi.emit({
				app,
				bind: b
			})
			return b
		}
		const rec_bind = (t: any, name: string) => {
			if (!t._is_bind_tree) return
			for (let i in t) {
				if (i == '_is_bind_tree') continue
				if (i.includes('.')) throw new Error("error name " + i)
				if (t[i] == true) {
					t[i] = use_bind(name + '.' + i)
				}
				//
				else if (Array.isArray(t[i])) {
				}
				//
				else if (typeof (t[i]) === 'object') {
					rec_bind(t[i], name + '.' + i)
				}
			}
		}
		const keys = Object.keys(app)
		for (const i of keys) {
			if (this.isIgnoreKey(i)) continue
			if (app[i] == true) {
				use_bind(app.data.name + '.' + i)
			}
			//
			else if (Array.isArray(app[i])) {
			
			}
			//
			else if (typeof (app[i]) === 'object') {
				rec_bind(app[i], app.data.name + '.' + i)
			}
		}
	}
	use(data: Plugin) {
		data.init(this.app)
		const afterGet = data.afterGet()
		if (afterGet) this.app.data.onList.afterGet.on(afterGet)
		const initBindApi = data.initBindApi()
		if (initBindApi) this.app.data.onList.initBindApi.on(initBindApi)
		return this
	}
	constructor(app: T) {
		this.app = app
	}
}
export class App<Api extends Record<string, any> = {}, BindApi extends BindType = BindType> {
	data: AppData<this> = new AppData(this)
	api: Api & AppApi<this> = <any>new AppApi(this)
	protected bind<T>(): BindType<T> & BindApi {
		return <any>true
	}
	protected tree<T extends Record<string, any>>(data: T) {
		(<any>data)._is_bind_tree = true;
		return data
	}
	protected use<T extends Plugin>(data: T) {
		this.api.use(data)
		return this
	}
	protected init() {
		this.api.init()
		return this
	}
	constructor(name: string) {
		this.data.name = name
	}
}



















