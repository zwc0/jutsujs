class svg extends HTMLElement {
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
        this.innerHTML = text;
    }
}

customElements.define('j-svg', svg);