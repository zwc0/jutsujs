import './components/pager';
import jSvg, {JSvg} from './components/svg';
import jMask from './components/mask';
import jDownloader, {JDownloader} from './components/downloader';

jSvg();
jMask();

//#region jDownloader
//default
jDownloader();
//fetchOverride - loaded
//jDownloader({fetchOverride: async (e)=>{console.log(e.href);}});
//fetchOverride - throw
//jDownloader({fetchOverride: async (e)=>{console.log(e.href); throw 'fail test';}});
document.querySelector<JDownloader>('a').addEventListener('statechange',
    e=>console.log(e.detail.state === 'failed' ? e.detail.error : e.detail.state)
);
//#endregion jDownloader

const svg = document.querySelector<JSvg>('j-svg');
svg.addEventListener('click', (e: Event) =>{
    if (e.currentTarget instanceof JSvg)
        e.currentTarget.src = e.currentTarget.src === 'img/arrowDown.svg' ? 'img/arrowUp.svg' : 'img/arrowDown.svg';
});

const container = document.createElement('div');
container.textContent = 'Init test';
document.body.appendChild(container);