import './components/pager';
import jSvg from './components/svg';
import jMask from './components/mask';

jSvg();
jMask();
const svg = document.querySelector('j-svg');
svg?.addEventListener('click', e=>{
    e.currentTarget.src = e.currentTarget.src === 'img/arrowDown.svg' ? 'img/arrowUp.svg' : 'img/arrowDown.svg';
});

const container = document.createElement('div');
container.textContent = 'Init test';
document.body.appendChild(container);

