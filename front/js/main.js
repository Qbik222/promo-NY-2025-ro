(function () {
    const apiURL = 'https://fav-prom.com/api_ny_ua';
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
        popupPlayBtn = document.querySelector('.firstPlay');

    const currentDate = new Date(); //new Date("2023-12-14T21:00:00.000Z");
    let users;
    let quests;
    let userInfo;

    const ukLeng = document.querySelector('#ukLeng');
    const enLeng = document.querySelector('#enLeng');

    let locale = 'uk';

    if (ukLeng) locale = 'uk';
    if (enLeng) locale = 'en';

    const PRIZES_CSS = ['place1', 'place2', 'place3'];

    let i18nData = {};
    let userId;
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
            request('/quests')
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
        questStartBtns.forEach(questStartBtn => questStartBtn.addEventListener('click', (e) => { registerInQuest(); }));

        getData().then(res => {
            users = res[0];
            quests = (res[1] || []);
            // console.log(quests);
            renderUsers(users);
            refreshQuests(quests, userInfo)
            translate();
        })
    }

    function refreshQuests(quests, currentUser) {
        if (!quests) {
            return;
        }

        const shift = isSecondWeek(quests) ? 4 : 0;
        for (let i = 0; i < questDivs.length; i++) {
            renderQuest(quests[i + shift], questDivs[i], currentUser);
        }
    }

    function isSecondWeek(quests) {
        const fourthQuest = quests[3];
        return fourthQuest && currentDate > new Date(fourthQuest.dateEnd);
    }

    function renderQuest(quest, container, currentUser) {
        if (!quest || !container) {
            return;
        }

        const questNum = quest.qNumber;
        //const questPoints = {points: 300};
        const questPoints = currentUser && currentUser.quests && currentUser.quests.find(q => q.questNum === questNum);

        // update translations
        const questTitleDiv = container.querySelector('.route__item-title');
        questTitleDiv.innerHTML = translateKey(`nameQuest-${questNum}`);
        const questSubTitleDiv = container.querySelector('.route__item-subtitle');
        questSubTitleDiv.innerHTML = translateKey(`quest-${questNum}`);

        // update type of quest
        const questType = getQuestType(quest);
        container.classList.remove('soon');

        if (questType === OLD_QUEST_TYPE) {
            container.classList.add('inactive');
        } else if (questType === FUTURE_QUEST_TYPE) {
            container.classList.add('soon');
        } else {
            const timerElement = container.querySelector('.timerTxt');
            const popupTimer = document.querySelector('.quest__time-num');
            countdownTimer(quest.dateEnd, timerElement, popupTimer);
            container.classList.add(`active`)
            updatePopup(quest, questPoints);
        }

        // update stars
        if (questPoints) {
            const starDivs = container.querySelectorAll('.star');
            const questLevel = getQuestLevel(quest, questPoints.points || 0);
            for (let i = 0; i < questLevel; i++) {
                const star = starDivs[i];
                star.classList.add('_done');
            }
        }

        // updates images
        const srcDesc = container.querySelector('.src__desc');
        const srcMob = container.querySelector('.src__mob');
        const srcDefault = container.querySelector('.src__default');
        srcDesc.srcset = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-desc.png`;
        srcMob.srcset = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-mob.png`;
        srcDefault.src = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-desc.png`;

        // update buttons
        if (questType == ACTIVE_QUEST_TYPE && userId && !questPoints) {
            playBtn.classList.add('hide');
            popupPlayBtn.classList.add('hide');
            // console.log('removing quest hide ' + currentUser)
            questStartBtns.forEach(questStartBtn => questStartBtn.classList.remove('hide'));
        }
    }

    function updatePopup(quest, questPoints) {
        const questNum = quest.qNumber;
        const title = document.querySelector('.quest__des-title');
        title.innerHTML = translateKey(`quest-${questNum}`);
        const description = document.querySelector('.quest__des-text');
        description.innerHTML = translateKey(`descrQuest-${questNum}`);
        const questName = document.querySelector('.quest__title');
        questName.innerHTML = translateKey(`nameQuest-${questNum}`);

        const cssClass = questNum % 2 == 0 ? 'sport' : 'casino';
        questPopup.classList.add(cssClass);
        questPopup.classList.add(`quest-popup${questNum}`);

        const userPointsForQuest = questPoints ? questPoints.points : 0;
        for (let i = 0; i < questLevelDivs.length; i++) {
            const levelDiv = questLevelDivs[i];
            const levelInfo = quest.levels[i];
            if (levelDiv && levelInfo) {
                const subtitle = levelDiv.querySelector('.quest__item-subtitle');
                subtitle.innerHTML = translateKey(`prizeQuest-${questNum}_${i + 1}`);
                const infoText = levelDiv.querySelector('.quest__item-info-text');
                infoText.innerHTML = translateKey(`stepQuest-${questNum}_${i + 1}`);

                // progress bar
                const levelStartPoints = i === 0 ? 0 : quest.levels[i - 1].points;
                const levelEndPoints = levelInfo.points;
                const levelPoints = levelEndPoints;
                const progressPoints  = Math.min(Math.max(userPointsForQuest, 0), levelPoints);
                const progressValue = progressPoints / levelPoints * 100;
                const normalized = Math.min(Math.max(Math.floor(progressValue), 0), 100);
                const progressElement = levelDiv.querySelector('.quest__item-info-progress');
                progressElement.value = normalized;
                progressElement.dataset.progress = `${normalized}%`;
                const statusDiv = levelDiv.querySelector('.status');
                statusDiv.innerHTML = `${progressPoints}/${levelPoints}`;
                if (userPointsForQuest < levelStartPoints || !userId) {
                    const playBtn = levelDiv.querySelector('.took-part');
                    playBtn.classList.add('hide');
                }
            }
        }
        refreshProgress();
    }

    function countdownTimer(targetDateString, timerElement, popupTimer) {
        refreshTimer(targetDateString, timerElement, popupTimer);
        const intervalId = setInterval(() => {
            const timeDiff = refreshTimer(targetDateString, timerElement, popupTimer);
            if (timeDiff < 0) {
                clearInterval(intervalId);
                timerElement.innerHTML = formatTime('finishedTimer', 0, 0, 0);
                popupTimer.innerHTML = formatTime('timer', 0, 0, 0);
                location.reload();
            }
        }, 10000);
    }

    function formatTime(key, days, hours, minutes) {
        return translateKey(key).replace("{day}", days.toString())
            .replace("{hour}", hours.toString())
            .replace("{minutes}", minutes.toString());
    }

    function refreshTimer(targetDateString, timerElement, popupTimer) {
        const targetDate = new Date(targetDateString);
        const now = new Date();
        const timeDiff = targetDate.getTime() - now.getTime();

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));


        timerElement.innerHTML = formatTime('finishedTimer', days, hours, minutes);
        popupTimer.innerHTML = formatTime('timer', days, hours, minutes);
        return timeDiff;
    }

    function getQuestLevel(questDefinition, points) {
        if (!questDefinition || !questDefinition.levels || questDefinition.levels.length === 0) {
            return 0;
        }

        const levelIndex = questDefinition.levels.findIndex(level => points < level.points);
        return levelIndex === -1 ? questDefinition.levels.length : levelIndex;
    }


    function getQuestType(quest) {
        const startDate = new Date(quest.dateStart);
        const endDate = new Date(quest.dateEnd);
        if (currentDate < startDate) {
            return FUTURE_QUEST_TYPE;
        } else if (currentDate > endDate) {
            return OLD_QUEST_TYPE;
        } else {
            return ACTIVE_QUEST_TYPE;
        }
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

    function registerInQuest() {
        if (!userId) {
            return;
        }

        const params = {userid: userId};

        request('/questreg', {
            method: 'POST',
            body: JSON.stringify(params)
        }).then(res => {
            playBtn.classList.remove('hide');
            popupPlayBtn.classList.remove('hide');
            questStartBtns.forEach(questStartBtn => questStartBtn.classList.add('hide'));
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
        if (place <= 5) {
            return `prize_${place}`
        } else if (place <= 10) {
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
                        refreshQuests(quests, userInfo);
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
    function refreshProgress() {
        const progressBars = document.querySelectorAll('.quest__item-info-progress')
        progressBars.forEach(item => {
            let progress = item.querySelector('.progress')
            let widthValue = item.getAttribute('data-progress')
            progress.style.width = `calc(${widthValue} - 6px)`
        })
    }

    //show popupchik
    const body = document.querySelector('body');
    const itemsSlider = document.querySelectorAll('.route__item');
    const popupWrap = document.querySelector('.popup');
    const btnTableShow = document.querySelector('.result__subtext');
    const tablePopup = document.querySelector('.prize-fund');
    const tablePopupBtnClose = document.querySelector('.prize-fund-close');


    function showPopup() {
        popupWrap.classList.remove('_hidden');
        body.style.overflow = 'hidden'
        const popup = document.querySelector(`.quest`);
        if (popup) {
            popup.style.display = 'block';
        }
    }

    function hiddenPopup() {
        popupWrap.classList.add('_hidden');
        body.style.overflow = 'auto'
        const popup = document.querySelector(`.quest`);
        if (popup) {
            popup.style.display = 'none';
        }
    }

    popupWrap.addEventListener('click', (event) => {
        const closeBtn = event.target.closest('.quest-close');
        if (closeBtn) {
            hiddenPopup();
        }
    });


    itemsSlider.forEach((item) => {
        item.addEventListener('click', () => {
            showPopup();
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
            item.classList.toggle('_open')
        })
    })

})();
