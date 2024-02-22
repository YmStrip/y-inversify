import {injectable} from "inversify";
import {org} from "../../Org";

@injectable()
export class ProviderB {
	b: string = 'b'
}
org.a.providerB.toVueReactiveClass(ProviderB)
