/// <reference no-default-lib="false"/>
/// <reference lib="ES2015" />
/// <reference lib="dom" />
/// <reference lib="webworker" />

/* 
In progress.
This file includes helper functions to apply a callback on specified anchor elements to execute methods
before fetching the request and after receiving a response. For example, if you want to display a spinner
while waiting on a response from the server, use onBefore in downloader to show the indicator, then
onComplete to hide the indicator once a response is received. onComplete will also receive the ok status
so the developer can separately handle errors.
 */

type TDownloaderResponse = {
    type: 'downloaderResponse';
    ok: boolean;
    url: string;
};

async function sw(req: Request){
    const res = await fetch(req);
    const data: TDownloaderResponse = {
        type: 'downloaderResponse',
        ok: res.ok,
        url: res.url
    };
    (self as unknown as ServiceWorkerGlobalScope).clients.matchAll()
        .then(x=>x.map(client=>client.postMessage(data)));
    return res;
}

function downloader({attr = 'data-j-downloader', onBefore, onComplete }
    : {attr?: string, onBefore?: ({el, url}: {el: HTMLElement, url: string}) => void, onComplete: (data: TDownloaderResponse) => void}){
    document.body.addEventListener('click', e => {
        const target = e.target as HTMLElement;
        const el: HTMLElement = target.hasAttribute(attr) ? target : target.closest(`[${attr}]`);
        if (!el)
            return;
        const url = el.getAttribute('src');
        onBefore?.({el, url});
        function messageHandler(e: MessageEvent<TDownloaderResponse>){
            if (e.data.type !== 'downloaderResponse' || e.data.url !== url)
                return;
            navigator.serviceWorker.removeEventListener('message', messageHandler);
            onComplete(e.data);
        }
        navigator.serviceWorker.addEventListener('message', messageHandler);
    });
}

export {TDownloaderResponse,
    sw, downloader};