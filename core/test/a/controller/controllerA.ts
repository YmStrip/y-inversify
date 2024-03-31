import {inject, injectable, postConstruct} from "inversify";
import {org} from "../../org";

@injectable()
export class ControllerA {
	@inject(org.a.providerA.symbol) a;
	@postConstruct()
	init() {
		console.log("init")
	}
	constructor(
		@inject(org.a.providerB.symbol) private readonly b,
	) {
		console.log('set:'+b)
	}
}

