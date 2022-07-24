declare class pager extends HTMLElement {
    _index: number;
    constructor();
    get index(): number;
    set index(index: number);
    render(): void;
    next(skip?: number): void;
    prev(skip?: number): void;
}
