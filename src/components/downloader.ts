type Config = {
    prefix?: string;
    fetchOverride?: (element: JDownloader) => Promise<void | never>;
};

type EventState = {
    state: 'pending' | 'loaded';
} | {
    state: 'failed',
    error: any
};

type JDownloaderEventMap = HTMLElementEventMap & {
    'statechange': CustomEvent<EventState>;
}

const fetchAndDownload = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok)
        throw res;
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download;
    a.target = '_blank';
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(a.href);
    }, 100 * 60);
}

const init = ({ prefix = 'j', fetchOverride }: Config = {}) => {
    class JDownloader extends HTMLAnchorElement {
        constructor() {
            super();
            this.addEventListener('click', this._onClick.bind(this));
        }
    
        set _state(detail: EventState) {
            const event = new CustomEvent<EventState>('statechange', { detail });
            this.dispatchEvent(event);
        }
    
        async _onClick(e: MouseEvent) {
            e.preventDefault();
            try {
                this._state = { state: 'pending' };
                fetchOverride ? await fetchOverride(this) : await fetchAndDownload(this.href);
                this._state = { state: 'loaded' };
            } catch (error) {
                this._state = { state: 'failed', error };
            }
        }
    
        addEventListener<T extends keyof JDownloaderEventMap>(
            type: T,
            listener: (this: JDownloader, ev: JDownloaderEventMap[T]) => any,
            options?: boolean | AddEventListenerOptions
        ): void {
            super.addEventListener(type, listener, options);
        }
    }
    customElements.define(`${prefix}-downloader`, JDownloader, { extends: 'a' });
    return JDownloader;
}

export default init;
type JDownloader = InstanceType<ReturnType<typeof init>>;
export {JDownloader};