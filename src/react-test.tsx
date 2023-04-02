import { DOMAttributes, useState } from "react";
import {createRoot} from "react-dom/client";
import jSvg, {JSvg} from './components/svg';

type CustomEvents<K extends string> = { [key in K] : (event: CustomEvent) => void };
type CustomElement<T, K extends string> =
    Partial<T & DOMAttributes<T> & {children: any, class: string} & CustomEvents<`on${K}`>>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['j-svg']: CustomElement<JSvg, null>;
        }
    }
}

jSvg();

const App = () => {
    const [jSvgSrc, setJSvgSrc] = useState<string>('img/arrowDown.svg');

    function toggleJSvgSrc(){
        setJSvgSrc(o=>o === 'img/arrowDown.svg' ? 'img/arrowUp.svg' : 'img/arrowDown.svg');
    }

    return <>
        test
        <j-svg class="w-6 text-pink-500"
            src={jSvgSrc} onClick={toggleJSvgSrc}></j-svg>
    </>;
}

createRoot(document.getElementById('root') as HTMLElement)
    .render(<App />);