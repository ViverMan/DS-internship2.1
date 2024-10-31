function form() {
    //---- создал форму ----//
    const form = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('id', 'form');
    document.querySelector('.app-wrapper').appendChild(form);

    const formTitle = document.createElement('h2');
    formTitle.classList.add('form-title');
    formTitle.innerHTML = 'Загрузите изображения';
    form.appendChild(formTitle);

    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('field-wrapper');
    form.appendChild(fieldWrapper);

    //---- создал инпут ----//
    let inputElement = document.createElement('input');

    inputElement.classList.add('input');
    inputElement.setAttribute('id', 'input');
    inputElement.setAttribute('type', 'file');
    // inputElement.setAttribute('name', 'file[]');
    inputElement.setAttribute('accept', 'image/png, image/jpeg, image/jpg');
    inputElement.setAttribute('multiple', 'multiple');
    inputElement.setAttribute('metod', 'post');
    inputElement.setAttribute('enctype', 'multipart/form-data');
    //---- добавил инпут в контейнер ----//
    fieldWrapper.appendChild(inputElement);

    //---- создал label ----//
    let label = document.createElement('label');
    label.classList.add('label');
    label.setAttribute('id', 'label');
    label.setAttribute('for', 'input');

    //---- добавил label в контейнер ----//
    fieldWrapper.appendChild(label, inputElement);

    let field__file = document.createElement('div');
    field__file.classList.add('field__file');
    label.appendChild(field__file);
    field__file.innerHTML = 'Файл не выбран';

    let field__button = document.createElement('div');
    field__button.classList.add('field__button');
    label.appendChild(field__button);
    field__button.innerHTML = 'Загрузить';

    const uploadZone = document.createElement('div');
    uploadZone.classList.add('upload-zone');
    document.querySelector('.form').appendChild(uploadZone);

    const uploadZoneText = document.createElement('p');
    uploadZoneText.classList.add('upload-zone__text');
    uploadZoneText.innerHTML = 'Можно загружать только изображения';
    uploadZone.appendChild(uploadZoneText);
}

export default form;