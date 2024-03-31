import {ProviderB} from "./a/provider/provider.b";
import {App} from "y-inversify";
import {PluginVue, PluginVueApi, PluginVueBind} from "../src";

export class Org extends App<PluginVueApi, PluginVueBind> {
	b = this.bind<ProviderB>()
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



