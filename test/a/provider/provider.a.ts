import {injectable} from "inversify";
import {org} from "../../Org";

@injectable()
export class ProviderA {
	a: string = 'a'
}
org.a.providerA.toVueReactiveClass(ProviderA)
