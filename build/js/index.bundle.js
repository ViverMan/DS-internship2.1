/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/container.js

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

/* harmony default export */ var modules_container = (container);
;// CONCATENATED MODULE: ./src/js/modules/form.js
function form_form() {
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

/* harmony default export */ var modules_form = (form_form);
;// CONCATENATED MODULE: ./src/js/modules/button.js


function button_button() {

    const button = document.createElement('button');
    button.classList.add('button');
    button.setAttribute('id', 'button');
    button.setAttribute('type', 'submit');
    button.innerText = 'Отправить';

    document.querySelector('.label').appendChild(button);
}

/* harmony default export */ var modules_button = (button_button);
;// CONCATENATED MODULE: ./src/js/modules/image-preview2.js
function imagePreview2() {
    const imagePreview = document.createElement('div');
    let inputElement = document.querySelector('input');

    imagePreview.classList.add('image-preview');
    imagePreview.setAttribute('id', 'image-preview');
    document.querySelector('.app-wrapper').appendChild(imagePreview);
    let newFileList = [];

    // --- кнопка отправить --- //
    document.querySelector('.button').addEventListener('click', function (event) {
        if (newFileList.length <= 0) {
            event.preventDefault();

            function alarm() {
                document.querySelector('.arror').classList.toggle('display-none');
                document.querySelector('.fake-bg').classList.toggle('display-block');
                document.querySelector('.arror-text2').innerText = 'Дак ничего же нет, зачем нажимаешь "Отправить"?';
            }
            alarm();
            return;
        }
        // console.log(newFileList);

        const xhr = new XMLHttpRequest(); // создаем объект XMLHttpRequest
        const formData = new FormData(); // создаем объект FormData для передачи файла

        formData.append('file', newFileList); // добавляем файл в объект FormData

        xhr.open('POST', '/upload'); // указываем метод и URL сервера, куда будет отправлен файл
        xhr.send(formData);

        document.querySelectorAll('#image-preview .image-preview__item').forEach( // удаляю все ненужное
            button => button.remove()
        );

        document.querySelector('.field__file').innerHTML = 'Файл отправлен';
        document.querySelector('.button').innerHTML = 'Пусто';

        const fileSendTextWrapper = document.createElement('div');
        fileSendTextWrapper.classList.add('file-send-text-wrapper');
        imagePreview.appendChild(fileSendTextWrapper);

        const fileSendText = document.createElement('p');
        fileSendText.classList.add('file-send-text');
        fileSendText.innerHTML = 'Файл отправлен';
        fileSendTextWrapper.appendChild(fileSendText);

        newFileList = [];
        // console.log(newFileList);

        console.log('Форма отправлена');

        event.preventDefault();
    });


    //--- превью картинок ---//
    inputElement.addEventListener('change', onChange);


    function onChange(event) {
        let fileList = this.files;

        // --- проверка на текст "Файл отправлен"  --- //
        function e() {
            let el = document.querySelector('.file-send-text-wrapper');

            if (!el) {
                return;
            }
            el.remove();
        }
        e();


        // --- проверка на вес файлов --- //
        for (let i = 0; i < fileList.length; i++) {

            if (fileList[i].size > 5242880) {
                this.value = '';

                function alarm() {
                    document.querySelector('.arror').classList.toggle('display-none');
                    document.querySelector('.fake-bg').classList.toggle('display-block');
                    document.querySelector('.arror-text2').innerText = 'Размер файла превышен, выберите файл меньше 5МБ.';
                }
                alarm();
                // alert('Размер файла превышен, выберите файл меньше 5МБ.');
                return;
            }
        }
        // --- проверка на дубликаты --- //
        let maxFiles = 5;
        if (fileList.length > maxFiles) {
            let reset = document.querySelector('#input');
            reset.value = '';
            function alarm() {
                document.querySelector('.arror').classList.toggle('display-none');
                document.querySelector('.fake-bg').classList.toggle('display-block');
                document.querySelector('.arror-text2').innerText = 'Вы превысили лимит выбора файлов: можно выбрать не более ' + maxFiles + ' файлов.';
            }
            alarm();
            // alert(`Вы превысили лимит выбора файлов: можно выбрать не более ${maxFiles} файлов.`);
            return;
        }


        for (let i = 0; i < fileList.length; i++) {

            let file = fileList[i];

            let fileName = (fileList[i].name);
            let fileSize = (fileList[i].size);
            let fileType = (fileList[i].type);

            // console.log(fileList[i]);


            //--- div для картинок ---//
            let imgItem = document.createElement('div');
            imgItem.classList.add('image-preview__item');
            imgItem.setAttribute('id', 'image-preview__item');
            imgItem.setAttribute('draggable', 'true');
            imagePreview.appendChild(imgItem);

            //--- img для картинок ---//
            let img = document.createElement('img');
            img.classList.add('image-preview__img');
            img.setAttribute('draggable', 'false');
            img.file = file;
            imgItem.appendChild(img);

            //--- name для картинок ---//
            let name = document.createElement('p');
            name.classList.add('image-preview__name');
            name.innerHTML = 'имя файла: ' + fileName;
            imgItem.appendChild(name);

            //--- size для картинок ---//
            let size = document.createElement('p');
            size.classList.add('image-preview__size');
            size.innerHTML = 'размер файла: ' + fileSize + ' байт';
            imgItem.appendChild(size);

            //--- type для картинок ---//
            let type = document.createElement('p');
            type.classList.add('image-preview__type');
            type.innerHTML = 'расширение файла: ' + fileType;
            imgItem.appendChild(type);

            //--- btn delete для картинок ---//
            let btnDelete = document.createElement('button');
            btnDelete.classList.add('image-preview__btn-delete');
            btnDelete.innerHTML = 'Удалить';
            imgItem.appendChild(btnDelete);


            let reader = new FileReader();
            reader.onloadend = function (event) {

                // --- подсчет количества файлов --- //
                let countFiles = 1;
                if (newFileList.length >= 0) {
                    countFiles += newFileList.length;
                    document.querySelector('.field__file').innerHTML = 'Выбрано файлов: ' + countFiles;
                    document.querySelector('.button').innerHTML = 'Отправить ' + countFiles + ' файлов';
                }
                img.src = reader.result;

                const fileItem = {
                    name: file.name,
                    modified: file.lastModified,
                    size: file.size,
                    data: reader.result
                };

                newFileList.push(fileItem);



                // --- проверка на тип изображения --- //
                for (let i = 0; i < fileList.length; i++) {
                    let fType = fileList[i].type;
                    if (fType === 'image/jpeg' || fType === 'image/png' || fType === 'image/jpg') {
                        continue;
                    }
                    else {
                        function alarm() {
                            document.querySelector('.arror').classList.toggle('display-none');
                            document.querySelector('.fake-bg').classList.toggle('display-block');
                            document.querySelector('.arror-text2').innerText = 'Разрешено загружать только изображения в формате jpeg, png, jpg.';

                            document.querySelector('.field__file').innerHTML = 'Файл не выбран';
                            document.querySelector('.button').innerHTML = 'Отправить';

                            document.querySelectorAll('#image-preview .image-preview__item').forEach(
                                remove => remove.remove()
                            );
                        }
                        alarm();
                    }

                }

                // ---- проверка на одинаковые имена ---- //
                let fName = newFileList.map(item => item.name);
                let duplicates = [];

                for (let i = 0; i < fName.length; i++) {
                    for (let j = i + 1; j < fName.length; j++) {
                        if (fName[i] === fName[j] && !duplicates.includes(fName[i])) {
                            duplicates.push(fName[i]);
                        }
                    }

                    if (duplicates.length > 0) {
                        function alarm() {
                            document.querySelector('.arror').classList.toggle('display-none');
                            document.querySelector('.fake-bg').classList.toggle('display-block');
                            document.querySelector('.arror-text2').innerText = 'А-А-Ааааа! Нельзя загружать файлы, имеющие одинаковое имя.';
                        }
                        alarm();
                        document.querySelector('.field__file').innerHTML = 'Файл не выбран';
                        document.querySelector('.button').innerHTML = 'Отправить';

                        document.querySelectorAll('#image-preview .image-preview__item').forEach(
                            remove => remove.remove()
                        );

                        newFileList = [];
                        duplicates = [];
                        fileList = [];
                    }
                }
                // console.log(duplicates);

                // ---- проверка на количество файлов ---- //
                let maxFiles = 5;

                if (newFileList.length > maxFiles) {
                    let reset = document.querySelector('#input');
                    reset.value = '';

                    function alarm() {
                        document.querySelector('.arror').classList.toggle('display-none');
                        document.querySelector('.fake-bg').classList.toggle('display-block');
                        document.querySelector('.arror-text2').innerText = 'Вы превысили лимит выбора файлов: можно выбрать не более ' + maxFiles + ' файлов.';
                    }
                    alarm();
                    // alert(`Вы превысили лимит выбора файлов: можно выбрать не более ${maxFiles} файлов.`);

                    document.querySelectorAll('#image-preview .image-preview__item').forEach(
                        remove => remove.remove()
                    );
                    document.querySelector('.field__file').innerHTML = 'Файл не выбран';
                    document.querySelector('.button').innerHTML = 'Отправить';
                    newFileList = [];
                }
                // console.log(newFileList);


                // ---- удаление картинок ---- //
                btnDelete.addEventListener('click', function () {
                    newFileList.splice(newFileList.indexOf(fileItem), 1);

                    this.parentNode.remove();

                    let countFiles = '';

                    if (newFileList.length >= 0) {
                        countFiles = newFileList.length;
                        document.querySelector('.field__file').innerHTML = 'Выбрано файлов: ' + countFiles;
                        document.querySelector('.button').innerHTML = 'Отправить ' + countFiles + ' файлов';
                    }
                });
            }
            reader.readAsDataURL(file);
        }

        // inputElement.value = '';
        // const newInput = inputElement.cloneNode(true);
        // inputElement.replaceWith(newInput);
        // inputElement = newInput;
        inputElement.addEventListener('change', onChange);
    }
}

/* harmony default export */ var image_preview2 = (imagePreview2);
;// CONCATENATED MODULE: ./src/js/modules/arror.js
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

/* harmony default export */ var modules_arror = (arror);
;// CONCATENATED MODULE: ./src/js/modules/drag-n-drop.js
function dragNDrop() {
    // const uploadZone = document.createElement('div');
    // uploadZone.classList.add('upload-zone');
    // document.querySelector('.form').appendChild(uploadZone);

    // const uploadZoneText = document.createElement('p');
    // uploadZoneText.classList.add('upload-zone__text');
    // uploadZoneText.innerHTML = 'Можно загружать только изображения';
    // uploadZone.appendChild(uploadZoneText);

    // const statusText = document.querySelector('.upload-zone__text');

    // const inputElement = document.querySelector('.input');


    const imageList = document.querySelector('.image-preview');
    const imageItem = document.querySelector('.image-preview__item');
    // for (const item of imageItem) {
    //     item.draggable = true;
    // }

    imageList.addEventListener('dragstart', (event) => {
        event.target.classList.add('selected');
    });

    imageList.addEventListener('dragend', (event) => {
        event.target.classList.remove('selected');
    });

    imageList.addEventListener('dragover', (event) => {
        event.preventDefault();

        const activeElement = imageList.querySelector('.selected');
        const currentElement = event.target;
        const isMoveable = activeElement !== currentElement && currentElement.classList.contains('image-preview__item');

        if (!isMoveable) {
            return;
        }


        const nextElement = (currentElement === activeElement.nextElementSibling) ? currentElement.nextElementSibling : currentElement;

        imageList.insertBefore(activeElement, nextElement);
    });

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;
    }
}
/* harmony default export */ var drag_n_drop = (dragNDrop);
;// CONCATENATED MODULE: ./src/js/index.js




modules_container();


modules_form();


modules_button();


image_preview2();


modules_arror();


drag_n_drop();






/******/ })()
;