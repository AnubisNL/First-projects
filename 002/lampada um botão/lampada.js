let turnOn = document.getElementById('turnOn');
let turnOff = document.getElementById('turnOff');
let lamp = document.getElementById('lamp');

function isLampBroken() {
    return lamp.src.indexOf('quebrada') > -1;
}

function lampOn () {
    if (!isLampBroken()) {
    lamp.src = './img/ligada.jpg';
}
}
function lampOff () {
    if (!isLampBroken()){
lamp.src = './img/desligada.jpg';
}}
function lampBroken() {
    lamp.src = './img/quebrada.jpg';
}

button.addEventListener('click', () => {

if (button.textContent === 'Ligar') {
   lampOn();
    button.textContent = 'Desligar';
}
else {
    lampOff();
    button.textContent = 'Ligar';
}
});
lamp.addEventListener('mouseover', lampOn);
lamp.addEventListener('mouseout', lampOff);
lamp.addEventListener('dblclick', lampBroken);