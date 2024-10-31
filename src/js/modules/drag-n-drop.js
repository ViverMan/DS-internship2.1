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
export default dragNDrop;