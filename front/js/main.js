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


//progress
const progressBars = document.querySelectorAll('.quest__item-info-progress')
progressBars.forEach(item => {
    let progress = item.querySelector('.progress')
    let widthValue = item.getAttribute('data-progress')
    progress.style.width = `calc(${widthValue} - 6px)`
})

//show popupchik
const itemsSlider = document.querySelectorAll('.route__item');
const popupWrap = document.querySelector('.popup');

function showPopup(index) {
    popupWrap.classList.remove('_hidden');
    body.style.overflow = 'hidden'
    const popup = document.querySelector(`.quest[data-index="${index}"]`);
    if (popup) {
        popup.style.display = 'block';
    }
}

function hiddenPopup(index) {
    popupWrap.classList.add('_hidden');
    body.style.overflow = 'auto'
    const popup = document.querySelector(`.quest[data-index="${index}"]`);
    if (popup) {
        popup.style.display = 'none';
    }
}

popupWrap.addEventListener('click', (event) => {
    const closeBtn = event.target.closest('.quest-close');
    if (closeBtn) {
        const index = parseInt(closeBtn.closest('.quest').getAttribute('data-index'));
        hiddenPopup(index);
    }
});


itemsSlider.forEach((item, index) => {
    item.addEventListener('click', () => {
        showPopup(index);
    });
});

//show rules- details
const rulesItems = document.querySelectorAll('.rules__item')
rulesItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('_open')
    })
})

//show popup- details
const questItems = document.querySelectorAll('.quest__item')
questItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('click')
        item.classList.toggle('_open')
    })
})