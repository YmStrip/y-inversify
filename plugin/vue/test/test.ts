import {ControllerA} from "./a/controller/controllerA";
import {org} from "./org";
import {ProviderA} from "./a/provider/provider.a";
import {ProviderB} from "./a/provider/provider.b";

org.a.controllerA.to(ControllerA)
org.a.providerA.to(ProviderA)
org.a.providerB.to(ProviderB)
org.b.to(ProviderB).inSingletonScope()
const instance = org.a.controllerA.get()
console.log(instance)
const instanceB = org.b.get()
console.log('B',instanceB)
