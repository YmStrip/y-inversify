export declare class CallList<T> {
    protected _on: any[];
    protected _once: any[];
    on(call: (data: T) => any): this;
    once(call: (data: T) => any): this;
    off(call: any): this;
    emit(data: T): void;
}
