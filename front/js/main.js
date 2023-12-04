(function () {
    const apiURL = 'https://fav-prom.com/api_ny_ua';
    const urlParams = new URLSearchParams(window.location.search);
    const participateParam = 'reg';

    const
        resultsTableOther = document.querySelector('.tableResults__body-other'),
        topResultsTable = document.getElementById('top-users'),
        unauthMsgs = document.querySelectorAll('.unauth-msg'),
        participateBtns = document.querySelectorAll('.btn-join'),
        resultsTableWrapper = document.getElementById('results-table'),
        redirectBtns = document.querySelectorAll('.took-part');

    let users;

    const ukLeng = document.querySelector('#ukLeng');
    const enLeng = document.querySelector('#enLeng');

    let locale = 'uk';

    if (ukLeng) locale = 'uk';
    if (enLeng) locale = 'en';

    const PRIZES_CSS = ['place1', 'place2', 'place3'];

    let i18nData = {};
    let userId;
    userId = 567567;

    function loadTranslations() {
        return fetch(`${apiURL}/translates/${locale}`).then(res => res.json())
            .then(json => {
                i18nData = json;
                translate();

                var mutationObserver = new MutationObserver(function (mutations) {
                    translate();
                });
                mutationObserver.observe(document.getElementById('newYear2024'), {
                    childList: true,
                    subtree: true,
                });

            });
    }

    function translate() {
        const elems = document.querySelectorAll('[data-translates]')
        if (elems && elems.length) {
            elems.forEach(elem => {
                const key = elem.getAttribute('data-translate');
                elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
                elem.removeAttribute('data-translate');
            })
        }
        refreshLocalizedClass();
    }

    function refreshLocalizedClass(element, baseCssClass) {
        if (!element) {
            return;
        }
        for (const lang of ['uk', 'en']) {
            element.classList.remove(baseCssClass + lang);
        }
        element.classList.add(baseCssClass + locale);
    }

    const request = function (link, extraOptions) {
        return fetch(apiURL + link, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...(extraOptions || {})
        }).then(res => res.json())
    }

    function getData() {
        return Promise.all([
            request('/users?nocache=1'),
        ])
    }

    function initDrop() {
        const openDrop = document.querySelectorAll(".infoRules");
        let deskClass = document.querySelector('.Footer_container--BSX');

        openDrop.forEach(open => {
            open.addEventListener('click', () => {
                const details = document.getElementById("dropOpen");
                details.open = true;
            })
        })

        if (!deskClass) {
            openDrop.forEach(item => item.classList.add('blockLink'));
        }
    }


    const InitPage = () => {
        initDrop();
        getData().then(res => {
            users = res[0].sort((a, b) => b.points - a.points);
            renderUsers(users);
            translate();
        })
    }

    function init() {
        if (window.store) {
            var state = window.store.getState();
            userId = state.auth.isAuthorized && state.auth.id || '';
            setupPage();
        } else {
            setupPage();
            let c = 0;
            var i = setInterval(function () {
                if (c < 50) {
                    if (!!window.g_user_id) {
                        userId = window.g_user_id;
                        setupPage();
                        checkUserAuth();
                        clearInterval(i);
                    }
                } else {
                    clearInterval(i);
                }
            }, 200);
        }

        checkUserAuth();

        participateBtns.forEach((authBtn, i) => {
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                participate();
            });
        });
    }

    function setupPage() {
        if (userId && urlParams.has(participateParam)) {
            participate(true);
        } else {
            InitPage();
        }
    }

    function participate(fastReg) {
        if (!userId) {
            return;
        }

        const params = {userid: userId};
        if (fastReg) {
            params['fast'] = true;
        }

        request('/user', {
            method: 'POST',
            body: JSON.stringify(params)
        }).then(res => {
            participateBtns.forEach(item => item.classList.add('hide'));
            redirectBtns.forEach(item => item.classList.remove('hide'));
            InitPage();
        });
    }

    const renderUsers = (users) => {
        resultsTableWrapper.classList.remove('hide');
        resultsTableOther.classList.remove('hide');

        if (users && users.length) {
            let topUsers = users.slice(0, 10);
            populateUsersTable(topUsers, userId, topResultsTable, users);

            const currentUser = userId && users.find(user => user.userid === userId);
            const currentUserIndex = currentUser && users.indexOf(currentUser);

            let otherUsers;

            if (!currentUserIndex || currentUserIndex < 10) {
                otherUsers = users.slice(10, 13);
            }  else {
                otherUsers = users.slice(Math.max(currentUserIndex - 1, 10), currentUserIndex + 2);
            }

            if (otherUsers && otherUsers.length) {
                populateUsersTable(otherUsers, userId, resultsTableOther, users);
            }
        }

    }

    function populateUsersTable(users, currentUserId, table, allUsers) {
        table.innerHTML = '';
        if (users && users.length) {
            users.forEach((user) => {
                const checkCurrentUser = currentUserId && currentUserId === user.userid;
                const additionalUserRow = document.createElement('div');
                additionalUserRow.classList.add('tableResults__row');
                if (checkCurrentUser) {
                    additionalUserRow.classList.add('_yourPlace');
                }
                const place = allUsers.indexOf(user) + 1;
                const prizePlaceCss = PRIZES_CSS[place - 1];
                if (prizePlaceCss) {
                    additionalUserRow.classList.add(prizePlaceCss);
                }
                const prizeKey = getPrizeTranslationKey(place)
                additionalUserRow.innerHTML = `
                        <div class="tableResults__body-col" ${checkCurrentUser}>${place}</div>
                        <div class="tableResults__body-col">${user.userid}</div>
                        <div class="tableResults__body-col">${user.points}</div>
                        <div class="tableResults__body-col">${prizeKey ? translateKey(prizeKey) : ' - '}</div>
                    `;
                table.append(additionalUserRow);
            });
        }
    }

    function getPrizeTranslationKey(place) {
        if (place <= 20) {
            return `prize_test`
        } else if (place <= 30) {
            return `prize_6-10`
        } else if (place <= 50) {
            return `prize_11-50`
        } else if (place <= 100) {
            return `prize_51-100`
        } else if (place <= 200) {
            return `prize_101-200`
        } else if (place <= 201) {
            return `prize_201-300`
        } else if (place <= 400) {
            return `prize_301-400`
        } else if (place <= 500) {
            return `prize_401-500`
        } else if (place <= 600) {
            return `prize_501-600`
        } else if (place <= 650) {
            return `prize_601-650`
        } else if (place <= 700) {
            return `prize_651-700`
        }
    }

    function translateKey(key) {
        if (!key) {
            return;
        }
        return i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
    }

    let checkUserAuth = () => {
        if (userId) {
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.add('hide');
            }
            request(`/favuser/${userId}?nocache=1`)
                .then(res => {
                    if (res._id) {
                        participateBtns.forEach(item => item.classList.add('hide'));
                        redirectBtns.forEach(item => item.classList.remove('hide'));
                    } else {
                        participateBtns.forEach(item => item.classList.remove('hide'));
                    }
                })
        } else {
            for (let participateBtn of participateBtns) {
                participateBtn.classList.add('hide');
            }
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.remove('hide');
            }
        }
    }

    loadTranslations()
        .then(init);

    let mainPage = document.querySelector('.fav__page');
    setTimeout(() => mainPage.classList.add('overflow'), 1000);

    //progress
    const progressBars = document.querySelectorAll('.quest__item-info-progress')
    progressBars.forEach(item => {
        let progress = item.querySelector('.progress')
        let widthValue = item.getAttribute('data-progress')
        progress.style.width = `calc(${widthValue} - 6px)`
    })

    //show popupchik
    const body = document.querySelector('body');
    const itemsSlider = document.querySelectorAll('.route__item');
    const popupWrap = document.querySelector('.popup');
    const btnTableShow = document.querySelector('.result__subtext');
    const tablePopup = document.querySelector('.prize-fund');
    const tablePopupBtnClose = document.querySelector('.prize-fund-close');


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

    btnTableShow.addEventListener('click', () =>{
        popupWrap.classList.remove('_hidden');
        body.style.overflow = 'hidden'
        tablePopup.style.display = 'block';
    })

    tablePopupBtnClose.addEventListener('click', () => {
        popupWrap.classList.add('_hidden');
        body.style.overflow = 'auto'
        tablePopup.style.display = 'none';
    })



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

})();
