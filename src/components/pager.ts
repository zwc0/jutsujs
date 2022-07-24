class pager extends HTMLElement {
    _index: number;
    constructor(){
        super();
        this._index = +this.getAttribute('index') || 0;
        this.render();
        this.addEventListener('click', ()=>console.log('pager click'));
    }
    get index(){return this._index;}
    set index(index: number){
        const pageCount = this.childElementCount;
        this._index = (index >= pageCount) ? (pageCount - 1)
            : (index < 0) ? 0
            : index;
        this.render();
    }
    render(){
        [...this.children].forEach((el, i)=>i !== this._index ? el.classList.add('hidden') : el.classList.remove('hidden'));
    }
    next(skip = 1){
        this.index += skip;
    }
    prev(skip = 1){
        this.index -= skip;
    }
}

customElements.define('j-pager', pager);