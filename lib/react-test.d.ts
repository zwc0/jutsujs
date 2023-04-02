import { DOMAttributes } from "react";
import { JSvg } from './components/svg';
declare type CustomEvents<K extends string> = {
    [key in K]: (event: CustomEvent) => void;
};
declare type CustomElement<T, K extends string> = Partial<T & DOMAttributes<T> & {
    children: any;
    class: string;
} & CustomEvents<`on${K}`>>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['j-svg']: CustomElement<JSvg, null>;
        }
    }
}
export {};
