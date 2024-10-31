function arror() {
    const arror = document.createElement('div');
    arror.classList.add('arror');
    arror.classList.add('display-none');
    document.querySelector('.app-wrapper').appendChild(arror);

    const arrorText = document.createElement('p');
    arrorText.classList.add('arror-text');
    arrorText.innerText = 'ОШИБКА!: ';
    arror.appendChild(arrorText);

    const arrorText2 = document.createElement('p');
    arrorText2.classList.add('arror-text2');
    arrorText2.innerText = 'yfpfl';
    arror.appendChild(arrorText2);



    const arrorBtn = document.createElement('button');
    arrorBtn.classList.add('arror-btn');
    arrorBtn.innerText = 'назад';
    arror.appendChild(arrorBtn);

    document.querySelector('.arror-btn').addEventListener('click', function () {
        document.querySelector('.arror').classList.toggle('display-none');
        document.querySelector('.fake-bg').classList.toggle('display-block');
    });
}

export default arror;