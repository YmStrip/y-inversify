import {inject, injectable, postConstruct} from "inversify";
import {org} from "../../Org";

@injectable()
export class ControllerA {
	@inject(org.a.providerA.symbol) a;
	@postConstruct()
	init() {
		console.log(this.a)
		console.log(this.b)
	}
	constructor(
		@inject(org.a.providerB.symbol) private readonly b,
	) {
	
	}
}

