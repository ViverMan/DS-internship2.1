function preLoader() {
    const preLoader = document.createElement('div');
    preLoader.classList.add('preloader');
    document.querySelector('body').appendChild(preLoader);

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    preLoader.appendChild(spinner);

    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    });
}