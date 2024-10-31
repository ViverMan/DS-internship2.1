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

export default imagePreview2;