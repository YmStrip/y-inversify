export class CallList<T> {
	protected _on: any[] = []
	protected _once: any[] = []
	on(call: (data: T) => any) {
		this._on.push(call)
		return this
	}
	once(call: (data: T) => any) {
		this._on.push(call)
		return this
	}
	off(call: any) {
		const on = this._on.indexOf(call)
		const once = this._once.indexOf(call)
		if (on > -1) this._on.splice(on, 1)
		if (once > -1) this._once.splice(on, 1)
		return this
	}
	emit(data: T) {
		for (let i of this._once) {
			try {
				i(data)
			} catch (e) {
				console.log(e)
			}
		}
		this._once.splice(0, this._once.length)
		for (let i of this._on) {
			try {
				i(data)
			} catch (e) {
				console.log(e)
			}
		}
	}
}
