import {injectable} from "inversify";
import {org} from "../../org";

@injectable()
export class ProviderB {
	b: string = 'b'
}
org.a.providerB.to(ProviderB)
