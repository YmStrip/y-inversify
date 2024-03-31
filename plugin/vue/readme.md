# inversify封装
```typescript
//org.ts
export class Org extends App<PluginVueApi, PluginVueBind> {
	a = this.tree({
		providerA: this.bind(),
		providerB: this.bind(),
		controllerA: this.bind(),
	})
	constructor() {
		super("root");
		this.use(new Index())
		this.init()
	}
}
export const org = new Org()
```


```typescript
import {inject, injectable, postConstruct} from "inversify";
@injectable()
export class cls {
    @inject(org.a.providerA.symbol) a;
    @postConstruct()
	protected init() {
		console.log("init")
		console.log(this)
	}
}
```

```typescript
//test
import {inject,computed} from "vue"
org.a.providerA.toVueReactiveValue(computed(()=>inject('xxx')))
org.a.providerA.toVueReactiveClass(cls)
```

```
//in xxx
const req = org.a..providerA.get()
console.log(req)
```
