declare type Config = {
    prefix?: string;
    fetchOverride?: (element: JDownloader) => void;
};
declare type EventState = {
    state: 'pending' | 'loaded' | 'failed';
};
declare type JDownloaderEventMap = HTMLElementEventMap & {
    'statechange': CustomEvent<EventState>;
};
declare class JDownloader extends HTMLAnchorElement {
    constructor();
    set _state(detail: EventState);
    _onClick(e: MouseEvent): Promise<void>;
    addEventListener<T extends keyof JDownloaderEventMap>(type: T, listener: (this: JDownloader, ev: JDownloaderEventMap[T]) => any, options?: boolean | AddEventListenerOptions): void;
}
declare const _default: ({ prefix }?: Config) => void;
export default _default;
export { JDownloader };
