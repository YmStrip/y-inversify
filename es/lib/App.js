import { Container } from "inversify";
import { CallList } from "./CallList";
export class App {
    tree(data) {
        data._is_bind_tree = true;
        return data;
    }
    bind() {
        return true;
    }
    init() {
        const use_bind = (name) => {
            const symbol = Symbol.for(name);
            const b = this.container.bind(symbol);
            b.get = () => {
                const last = this.container.get(symbol);
                b.lastValue = last;
                this.onList.afterGet.emit({
                    app: this,
                    bind: b,
                    data: last
                });
            };
            b.symbol = () => {
                return symbol;
            };
            b.name = () => {
                return name;
            };
            this.bindList[name] = b;
            this.onList.initBindApi.emit({
                app: this,
                bind: b
            });
            return b;
        };
        const rec_bind = (t, name) => {
            if (!t._is_bind_tree)
                return;
            for (let i in t) {
                if (t[i] == true) {
                    t[i] = use_bind(name + '.' + i);
                }
                else if (t[i]) {
                    rec_bind(t[i], name + '.' + i);
                }
            }
        };
    }
    use(data) {
        data.init(this);
        return this;
    }
    constructor(name) {
        this.container = new Container();
        this.bindList = {};
        this.onList = {
            initBindApi: new CallList(),
            afterGet: new CallList()
        };
        this.api = {};
        this.name = name;
    }
}
//# sourceMappingURL=App.js.map