import {injectable} from "inversify";
import {org} from "../../org";

@injectable()
export class ProviderA {
	a: string = 'a'
}
org.a.providerA.to(ProviderA)
