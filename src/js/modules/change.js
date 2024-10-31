
function change() {

    let inputElement = document.querySelector('input').addEventListener('change', onChange)
    function onChange(event) {

        console.log(this.files.length);

        let maxFiles = 5;

        if (this.files.length > maxFiles) {
            let reset = document.querySelector('input');
            reset.value = '';
            alert(`Вы превысили лимит выбора файлов: можно выбрать не более ${maxFiles} файлов.`);
            // event.preventDefault();
            return;
        }
    };
    inputElement.addEventListener('change', onChange);
    //---- обработчики события для инпута ----//
}

export default change;
