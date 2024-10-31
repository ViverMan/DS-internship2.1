
//---- создал контейнер ----//
function container() {
    const bg = document.createElement('img');
    bg.classList.add('bg');
    document.querySelector('body').appendChild(bg);


    const fakeBg = document.createElement('div');
    fakeBg.classList.add('fake-bg');
    document.querySelector('body').appendChild(fakeBg);



    const app = document.querySelector('#app');
    const container = document.createElement('div');
    container.classList.add('container');
    app.appendChild(container);

    const wrapper = document.createElement('div');
    wrapper.classList.add('app-wrapper');
    container.appendChild(wrapper);

    return container;
}

export default container;