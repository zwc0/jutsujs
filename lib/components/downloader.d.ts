/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />
/// <reference lib="dom" />
/// <reference lib="webworker" />
declare type TDownloaderResponse = {
    type: 'downloaderResponse';
    ok: boolean;
    url: string;
};
declare function sw(req: Request): Promise<Response>;
declare function downloader({ attr, onBefore, onComplete }: {
    attr?: string;
    onBefore?: ({ el, url }: {
        el: HTMLElement;
        url: string;
    }) => void;
    onComplete: (data: TDownloaderResponse) => void;
}): void;
export { TDownloaderResponse, sw, downloader };
