declare type Config = {
    prefix?: string;
};
declare class JSvg extends HTMLElement {
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    get src(): string;
    set src(val: string);
    render(): Promise<void>;
}
export default function init({ prefix }?: Config): void;
export { JSvg };
