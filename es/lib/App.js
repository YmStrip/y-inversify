import { Container } from "inversify";
import { CallList } from "./CallList";
import "reflect-metadata";
export class AppData {
    constructor(app) {
        this.container = new Container();
        this.bindList = {};
        this.onList = {
            initBindApi: new CallList(),
            afterGet: new CallList()
        };
        this.app = app;
    }
}
export class AppApi {
    isIgnoreKey(name) {
        return ['name', 'data', 'api', 'use', 'init', 'tree', 'bind', 'constructor'].includes(name);
    }
    init() {
        const app = this.app;
        const container = this.app.data.container;
        const onList = this.app.data.onList;
        const bindList = this.app.data.bindList;
        const use_bind = (name) => {
            const symbol = Symbol.for(name);
            const b = container.bind(symbol);
            b.getSimpleName = () => {
                return name.split('.').pop();
            };
            b.get = () => {
                const last = container.get(symbol);
                b.lastValue = last;
                this.app.data.onList.afterGet.emit({
                    app,
                    bind: b,
                    data: last
                });
                return last;
            };
            b.symbol = symbol;
            b.name = b.class = name;
            bindList[name] = b;
            onList.initBindApi.emit({
                app,
                bind: b
            });
            return b;
        };
        const rec_bind = (t, name) => {
            if (!t._is_bind_tree)
                return;
            for (let i in t) {
                if (i == '_is_bind_tree')
                    continue;
                if (i.includes('.'))
                    throw new Error("error name " + i);
                if (t[i] == true) {
                    t[i] = use_bind(name + '.' + i);
                }
                else if (Array.isArray(t[i])) {
                }
                else if (typeof (t[i]) === 'object') {
                    rec_bind(t[i], name + '.' + i);
                }
            }
        };
        const keys = Object.keys(app);
        for (const i of keys) {
            if (this.isIgnoreKey(i))
                continue;
            if (app[i] == true) {
                use_bind(app.data.name + '.' + i);
            }
            else if (Array.isArray(app[i])) {
            }
            else if (typeof (app[i]) === 'object') {
                rec_bind(app[i], app.data.name + '.' + i);
            }
        }
    }
    use(data) {
        data.init(this.app);
        const afterGet = data.afterGet();
        if (afterGet)
            this.app.data.onList.afterGet.on(afterGet);
        const initBindApi = data.initBindApi();
        if (initBindApi)
            this.app.data.onList.initBindApi.on(initBindApi);
        return this;
    }
    constructor(app) {
        this.app = app;
    }
}
export class App {
    bind() {
        return true;
    }
    tree(data) {
        data._is_bind_tree = true;
        return data;
    }
    use(data) {
        this.api.use(data);
        return this;
    }
    init() {
        this.api.init();
        return this;
    }
    constructor(name) {
        this.data = new AppData(this);
        this.api = new AppApi(this);
        this.data.name = name;
    }
}
//# sourceMappingURL=App.js.map