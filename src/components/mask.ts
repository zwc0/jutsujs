function sanitizeNumber(str: string){
    return str.replace(/[^0-9]/g, "");
}

const applyPhoneMask = (el: Mask, isTrim = true) => {
    const oIndex = el.selectionEnd || 0;
    const oldValue = el.value;
    const raw = el.raw;
    if (!raw) {
        el.value = '';
        return el._checkValidity();
    }

    let selectionIndex = 
        oIndex < oldValue.length -1
        ? oIndex : oldValue.length;
    selectionIndex = fixPhoneIndex(selectionIndex);

    const p1 = raw.substring(0, 3);
    const p2 = raw.length <= 3 ? "" : raw.substring(3, 6);
    const p3 = raw.length <= 6 ? "" : raw.substring(6, isTrim ? 10 : undefined);

    let newValue = "(" + p1;
    if (p2.length > 0) newValue += ") " + p2;
    if (p3.length > 0) newValue += "-" + p3;

    el.value = newValue;
    el._checkValidity();
    el.setSelectionRange(selectionIndex, selectionIndex);
}
const applyPostalMask = (el: Mask, isTrim = true) => {
    const oIndex = el.selectionEnd || 0;
    const oldValue = el.value;
    const raw = el.raw;
    if (!raw) {
        el.value = '';
        return el._checkValidity();
    }

    let selectionIndex =
        oIndex < oldValue.length - 1
            ? oIndex : oldValue.length;
    selectionIndex = selectionIndex == 6 ? 7 : selectionIndex;

    const p1 = raw.substring(0, 5);
    const p2 = raw.length <= 5 ? "" : raw.substring(5, isTrim ? 9 : undefined);

    let newValue = p1;
    if (p2.length > 0) newValue += "-" + p2;

    el.value = newValue;
    el._checkValidity();
    el.setSelectionRange(selectionIndex, selectionIndex);
}

class Mask extends HTMLInputElement {
    constructor(){
        super();
        this.addEventListener('input', ()=>this.applyMask(false));
        this.addEventListener('change', ()=>this.applyMask(), {capture: true});
        this.applyMask();
    }
    get raw() { return sanitizeNumber(this.value); }
    _checkValidity() {
        const l = this.value.length;
        if (this.getAttribute('mask-type') === 'phone')
            this.setCustomValidity(!l ? '' : l === 14 ? '' : 'Phone number invalid');
        else
            this.setCustomValidity([0, 5, 10].includes(l) ? '' : 'Postal code invalid');

    }
    applyMask(isTrim = true){
        if (this.getAttribute('mask-type') === 'phone')
            applyPhoneMask(this, isTrim);
        else
            applyPostalMask(this, isTrim);
    }
}

function fixPhoneIndex(i: number){
    switch(i){
        case 1:
            return 2;
        case 5:
        case 6:
            return 7;
        case 10:
            return 11;
        default:
            return i;
    }
}

type Config = {
    prefix?: string;
}

export default ({prefix = 'j'}: Config = {})=> {
    customElements.define(`${prefix}-mask`, Mask, {extends: 'input'});
}