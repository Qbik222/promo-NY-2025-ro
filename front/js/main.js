const body = document.querySelector('body')
const textBtn = document.querySelector('.test-btn')

textBtn.addEventListener('click', () => {
    if (body.classList.contains('light')){
        body.classList.remove('light');
        body.classList.add('dark');
        textBtn.innerHTML = 'light'
        return
    }
    if (body.classList.contains('dark')){
        body.classList.remove('dark');
        body.classList.add('light');
        textBtn.innerHTML = 'dark'
    }
})


//code
function pauseRandomly(element) {
    setTimeout(function () {
        element.classList.add('pause');
        setTimeout(function () {
            element.classList.remove('pause');
        }, Math.random() * 8000);
    }, Math.random() * 5000);
}

const prizes = document.querySelectorAll('.prize__item-img img');

prizes.forEach(pauseRandomly);

