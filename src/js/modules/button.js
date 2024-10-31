

function button() {

    const button = document.createElement('button');
    button.classList.add('button');
    button.setAttribute('id', 'button');
    button.setAttribute('type', 'submit');
    button.innerText = 'Отправить';

    document.querySelector('.label').appendChild(button);
}

export default button;