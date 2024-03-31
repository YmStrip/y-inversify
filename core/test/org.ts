import {ProviderB} from "./a/provider/provider.b";
import {App} from "../";

export class Org extends App {
	b = this.bind<ProviderB>()
	a = this.tree({
		providerA: this.bind(),
		providerB: this.bind(),
		controllerA: this.bind(),
	})
	constructor() {
		super("root");
		this.init()
	}
}
export const org = new Org()



