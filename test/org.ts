import {App} from "../src/lib/App";
import {PluginVue, PluginVueApi, PluginVueBind} from "../src/plugin/PluginVue";

export class Org extends App<PluginVueApi, PluginVueBind> {
	a = this.tree({
		providerA: this.bind(),
		providerB: this.bind(),
		controllerA: this.bind(),
	})
	constructor() {
		super("root");
		this.use(new PluginVue())
		this.init()
	}
}
export const org = new Org()



