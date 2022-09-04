declare class svg extends HTMLElement {
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    get src(): string;
    set src(val: string);
    render(): Promise<void>;
}
