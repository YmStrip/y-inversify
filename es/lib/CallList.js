export class CallList {
    constructor() {
        this._on = [];
        this._once = [];
    }
    on(call) {
        this._on.push(call);
        return this;
    }
    once(call) {
        this._on.push(call);
        return this;
    }
    off(call) {
        const on = this._on.indexOf(call);
        const once = this._once.indexOf(call);
        if (on > -1)
            this._on.splice(on, 1);
        if (once > -1)
            this._once.splice(on, 1);
        return this;
    }
    emit(data) {
        for (let i of this._once) {
            try {
                i(data);
            }
            catch (e) {
                console.log(e);
            }
        }
        this._once.splice(0, this._once.length);
        for (let i of this._on) {
            try {
                i(data);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
}
//# sourceMappingURL=CallList.js.map