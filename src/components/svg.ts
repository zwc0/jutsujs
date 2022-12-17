type Config = {
    prefix?: string;
}

class JSvg extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    static get observedAttributes(){
        return ['src'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (name === 'src' && oldValue !== newValue)
            this.render();
    }

    get src(){ return this.getAttribute('src'); }
    set src(val){ this.setAttribute('src', val); }

    async render(){
        const src = this.getAttribute('src');
        if (!src)
            return;
        const text = await fetch(src).then(e=>e.text());
        const parser = new DOMParser();
        const fragment = parser.parseFromString(text, 'image/svg+xml');
        fragment.querySelectorAll('script').forEach(e=>e.remove());
        this.childNodes.forEach(e=>e.remove());
        fragment.childNodes.forEach(e=>this.appendChild(e));
    }
}

export default function init({prefix = 'j'}: Config = {}){
    customElements.define(`${prefix}-svg`, JSvg);
}

export {JSvg};