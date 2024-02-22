import {ControllerA} from "./a/controller/controllerA";
import {org} from "./org";
import {ProviderA} from "./a/provider/provider.a";
import {ProviderB} from "./a/provider/provider.b";

org.a.controllerA.to(ControllerA)
org.a.providerA.to(ProviderA)
org.a.providerB.to(ProviderB)
const instance = org.a.controllerA.get()
console.log(instance)
