(function () {
    const apiURL = 'https://fav-prom.com/api_ny_sam_ro';
    const urlParams = new URLSearchParams(window.location.search);
    const participateParam = 'reg';

    const FUTURE_QUEST_TYPE = 'future',
        OLD_QUEST_TYPE = 'old',
        ACTIVE_QUEST_TYPE = 'active';

    const
        resultsTableOther = document.querySelector('.tableResults__body-other'),
        topResultsTable = document.getElementById('top-users'),
        unauthMsgs = document.querySelectorAll('.unauth-msg'),
        participateBtns = document.querySelectorAll('.btn-join'),
        resultsTableWrapper = document.getElementById('results-table'),
        redirectBtns = document.querySelectorAll('.took-part'),
        questDivs = document.querySelectorAll('.route__item'),
        playBtn = document.querySelector('.quest-play'),
        questStartBtns = document.querySelectorAll('.questBtn'),
        questPopup = document.querySelector('.quest'),
        questLevelDivs = document.querySelectorAll('.quest__item'),
        popupPlayBtn = document.querySelector('.firstPlay'),
        weeksSelector = document.querySelectorAll('.tableResults__tabs-item'),
        weeksContainer = document.querySelector('.tableResults__tabs');

    const currentDate = new Date(); //new Date("2023-12-14T21:00:00.000Z");
    let userInfo;
    let selectedWeekTabId;

    const roLeng = document.querySelector('#roLeng');
    const enLeng = document.querySelector('#enLeng');

    let locale = "ro"

    document.querySelector(".fav__page").classList.add(`${locale}`)
    if (roLeng) locale = 'ro';
    if (enLeng) locale = 'en';

    const PRIZES_CSS = ['place1', 'place2', 'place3'];

    let i18nData = {};
    let userId;
    // userId = 204806
    // let userId = 100340020;

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
        const elems = document.querySelectorAll('[data-translate]')
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
            request('/users'),
        ]);
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
        weeksSelector.forEach((w, i) => w.addEventListener('click', e => {
            if (i === selectedWeekTabId) {
                return;
            }
            weeksSelector.forEach(s => s.classList.remove('active'));
            w.classList.add('active');
            selectedWeekTabId = i;
            refreshUsers(selectedWeekTabId + 1);
        }));
        refreshUsers(selectedWeekTabId + 1);
        // getData().then(res => {
        //     users = res[0];
        //     quests = (res[1] || []);
        //     // renderUsers(users);
        //     translate();
        // })
    }

    function calculateRecentPromoWeeks() {
        const date = Date.now();
        if (date < new Date("2024-10-07T21:00:00Z")) {
            return 1;
        } else if (date < new Date("2024-10-21T21:00:00Z")) {
            return 2;
        } else if (date < new Date("2024-10-28T21:00:00Z")) {
            return 3;
        } else {
            return 4;
        }
    }


    function refreshWeekTabs() {
        selectedWeekTabId = calculateRecentPromoWeeks() - 1;
        if (!selectedWeekTabId || selectedWeekTabId === 0) { // promo not started yet
            weeksContainer.classList.add('hide');
            return;
        }

        for (let i = 0; i < 4; i++) {
            const weekSelector = weeksSelector[i];
            if (selectedWeekTabId < i) {
                weekSelector.classList.add('hide');
            }
        }

        weeksSelector.forEach((w, i) => {
            w.classList.remove('active');
            if (i === selectedWeekTabId) {
                w.classList.add('active');
            }
        });
    }

    function refreshUsers(week) {
        getUsers(week).then(users => {
            renderUsers(users);
            translate();
        });
    }

    function getUsers(week) {
        const url = resolveUsersUrl(week);
        return request(url)
            .then(users => users.map(userOrId => typeof userOrId === 'number' ? {userid: userOrId} : userOrId));
    }

    function resolveUsersUrl(week) {
        return week ? `/users/${week}` : '/users';
    }


    function formatTime(key, days, hours, minutes) {
        return translateKey(key).replace("{day}", days.toString())
            .replace("{hour}", hours.toString())
            .replace("{minutes}", minutes.toString());
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
                        <div class="tableResults__body-col">${checkCurrentUser ? user.userid : maskUserId(user.userid)}</div>
                        <div class="tableResults__body-col">${Math.floor(user.points)}</div>
                        <div class="tableResults__body-col">${prizeKey ? translateKey(prizeKey) : ' - '}</div>
                    `;
                table.append(additionalUserRow);
            });
        }
    }

    function getPrizeTranslationKey(place) {
        if (place <= 10) {
            return `prize_${place}`
        } else if (place >= 11 && place <= 15){
            return  `prize_11-15`
        }else if (place >= 16 && place <= 20){
            return  `prize_16-20`
        }
    }

    function translateKey(key) {
        if (!key) {
            return;
        }
        return i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
    }

    function maskUserId(userId) {
        return "****" + userId.toString().slice(4);
    }

    let checkUserAuth = () => {
        if (userId) {
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.add('hide');
            }
            request(`/favuser/${userId}`)
                .then(res => {
                    if (res && res.userid) {
                        participateBtns.forEach(item => item.classList.add('hide'));
                        redirectBtns.forEach(item => item.classList.remove('hide'));
                        questStartBtns.forEach(item => item.classList.add('hide'));
                        userInfo = res;
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

    //show rules- details
    const rulesItems = document.querySelectorAll('.rules__item')
    rulesItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('_open')
        })
    })



})();
