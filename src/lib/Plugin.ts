import {App} from "./App";
import {TypeAfterGet, TypeInitBindApi} from "./Type";

export class Plugin {
	bind: Record<string, any>
	api: Record<any, any>
	//增加get-api
	
	//初始化结构
	init(app: App<any, any>) {
	}
	initBind(): (data: TypeInitBindApi) => any {
		return null
	}
	afterGet(): (data:TypeAfterGet) => any {
		return null
	}
}
