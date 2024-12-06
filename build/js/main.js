"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var apiURL = 'https://fav-prom.com/api_ny_hr';
  var urlParams = new URLSearchParams(window.location.search);
  var participateParam = 'reg';
  var FUTURE_QUEST_TYPE = 'future',
    OLD_QUEST_TYPE = 'old',
    ACTIVE_QUEST_TYPE = 'active';
  var resultsTableOther = document.querySelector('.tableResults__body-other'),
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
  var currentDate = new Date(); //new Date("2023-12-14T21:00:00.000Z");
  var users;
  var quests;
  var userInfo;
  var selectedWeekTabId = 0;
  var hrLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var locale = 'hr';
  if (hrLeng) locale = 'hr';
  if (enLeng) locale = 'en';
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId;
  // let userId = 100340020;

  function loadTranslations() {
    return fetch("".concat(apiURL, "/translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
      i18nData = json;
      translate();
      var mutationObserver = new MutationObserver(function (mutations) {
        translate();
      });
      mutationObserver.observe(document.getElementById('newYear2024'), {
        childList: true,
        subtree: true
      });
    });
  }
  function translate() {
    var elems = document.querySelectorAll('[data-translate]');
    if (elems && elems.length) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
      });
      console.log("translate is working");
    }
    refreshLocalizedClass();
  }
  function refreshLocalizedClass(element, baseCssClass) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(baseCssClass + lang);
    }
    element.classList.add(baseCssClass + locale);
  }
  var request = function request(link, extraOptions) {
    return fetch(apiURL + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      return res.json();
    });
  };
  function getData() {
    return Promise.all([request('/users')
    // request('/quests')
    ]);
  }
  function initDrop() {
    var openDrop = document.querySelectorAll(".infoRules");
    var deskClass = document.querySelector('.Footer_container--BSX');
    openDrop.forEach(function (open) {
      open.addEventListener('click', function () {
        var details = document.getElementById("dropOpen");
        details.open = true;
      });
    });
    if (!deskClass) {
      openDrop.forEach(function (item) {
        return item.classList.add('blockLink');
      });
    }
  }
  var InitPage = function InitPage() {
    initDrop();
    questStartBtns.forEach(function (questStartBtn) {
      return questStartBtn.addEventListener('click', function (e) {
        registerInQuest();
      });
    });
    weeksSelector.forEach(function (w, i) {
      return w.addEventListener('click', function (e) {
        if (i === selectedWeekTabId) {
          return;
        }
        weeksSelector.forEach(function (s) {
          return s.classList.remove('active');
        });
        w.classList.add('active');
        selectedWeekTabId = i;
        refreshUsers(selectedWeekTabId + 1);
      });
    });
    refreshUsers(selectedWeekTabId + 1);
    getData().then(function (res) {
      users = res[0];
      quests = res[1] || [];
      // console.log(quests);
      // renderUsers(users);
      // refreshQuests(quests, userInfo)
      translate();
    });
  };
  function calculateRecentPromoWeeks() {
    var date = Date.now();
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
    if (!selectedWeekTabId || selectedWeekTabId === 0) {
      // promo not started yet
      weeksContainer.classList.add('hide');
      return;
    }
    for (var i = 0; i < 4; i++) {
      var weekSelector = weeksSelector[i];
      if (selectedWeekTabId < i) {
        weekSelector.classList.add('hide');
      }
    }
    weeksSelector.forEach(function (w, i) {
      w.classList.remove('active');
      if (i === selectedWeekTabId) {
        w.classList.add('active');
      }
    });
  }
  function refreshUsers(week) {
    getUsers(week).then(function (users) {
      renderUsers(users);
      translate();
    });
  }
  function getUsers(week) {
    var url = resolveUsersUrl(week);
    return request(url).then(function (users) {
      return users.map(function (userOrId) {
        return typeof userOrId === 'number' ? {
          userid: userOrId
        } : userOrId;
      });
    });
  }
  function resolveUsersUrl(week) {
    return week ? "/users/".concat(week) : '/users';
  }

  //
  // function refreshQuests(quests, currentUser) {
  //     if (!quests) {
  //         return;
  //     }
  //
  //     const shift = isSecondWeek(quests) ? 4 : 0;
  //     for (let i = 0; i < questDivs.length; i++) {
  //         renderQuest(quests[i + shift], questDivs[i], currentUser);
  //     }
  // }
  //
  // function isSecondWeek(quests) {
  //     const fourthQuest = quests[3];
  //     return fourthQuest && currentDate > new Date(fourthQuest.dateEnd);
  // }

  // function renderQuest(quest, container, currentUser) {
  //     if (!quest || !container) {
  //         return;
  //     }
  //
  //     const questNum = quest.qNumber;
  //     //const questPoints = {points: 300};
  //     const questPoints = currentUser && currentUser.quests && currentUser.quests.find(q => q.questNum === questNum);
  //
  //     // update translations
  //     const questTitleDiv = container.querySelector('.route__item-title');
  //     questTitleDiv.innerHTML = translateKey(`nameQuest-${questNum}`);
  //     const questSubTitleDiv = container.querySelector('.route__item-subtitle');
  //     questSubTitleDiv.innerHTML = translateKey(`quest-${questNum}`);
  //
  //     // update type of quest
  //     const questType = getQuestType(quest);
  //     container.classList.remove('soon');
  //
  //     if (questType === OLD_QUEST_TYPE) {
  //         container.classList.add('inactive');
  //     } else if (questType === FUTURE_QUEST_TYPE) {
  //         container.classList.add('soon');
  //     } else {
  //         const timerElement = container.querySelector('.timerTxt');
  //         const popupTimer = document.querySelector('.quest__time-num');
  //         countdownTimer(quest.dateEnd, timerElement, popupTimer);
  //         container.classList.add(`active`)
  //         updatePopup(quest, questPoints);
  //     }
  //
  //     // update stars
  //     if (questPoints) {
  //         const starDivs = container.querySelectorAll('.star');
  //         const questLevel = getQuestLevel(quest, questPoints.points || 0);
  //         for (let i = 0; i < questLevel; i++) {
  //             const star = starDivs[i];
  //             star.classList.add('_done');
  //         }
  //     }
  //
  //     // updates images
  //     const srcDesc = container.querySelector('.src__desc');
  //     const srcMob = container.querySelector('.src__mob');
  //     const srcDefault = container.querySelector('.src__default');
  //     srcDesc.srcset = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-desc.png`;
  //     srcMob.srcset = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-mob.png`;
  //     srcDefault.src = `https://fav-prom.com/html/ny-ua/img/route/quest${questNum}-img-desc.png`;
  //
  //     // update buttons
  //     if (questType == ACTIVE_QUEST_TYPE && userId && !questPoints) {
  //         playBtn.classList.add('hide');
  //         popupPlayBtn.classList.add('hide');
  //         // console.log('removing quest hide ' + currentUser)
  //         questStartBtns.forEach(questStartBtn => questStartBtn.classList.remove('hide'));
  //     }
  // }

  // function updatePopup(quest, questPoints) {
  //     const questNum = quest.qNumber;
  //     const title = document.querySelector('.quest__des-title');
  //     title.innerHTML = translateKey(`quest-${questNum}`);
  //     const description = document.querySelector('.quest__des-text');
  //     description.innerHTML = translateKey(`descrQuest-${questNum}`);
  //     const questName = document.querySelector('.quest__title');
  //     questName.innerHTML = translateKey(`nameQuest-${questNum}`);
  //
  //     const cssClass = questNum % 2 == 0 ? 'sport' : 'casino';
  //     questPopup.classList.add(cssClass);
  //     questPopup.classList.add(`quest-popup${questNum}`);
  //
  //     const userPointsForQuest = questPoints ? questPoints.points : 0;
  //     for (let i = 0; i < questLevelDivs.length; i++) {
  //         const levelDiv = questLevelDivs[i];
  //         const levelInfo = quest.levels[i];
  //         if (levelDiv && levelInfo) {
  //             const subtitle = levelDiv.querySelector('.quest__item-subtitle');
  //             subtitle.innerHTML = translateKey(`prizeQuest-${questNum}_${i + 1}`);
  //             const infoText = levelDiv.querySelector('.quest__item-info-text');
  //             infoText.innerHTML = translateKey(`stepQuest-${questNum}_${i + 1}`);
  //
  //             // progress bar
  //             const levelStartPoints = i === 0 ? 0 : quest.levels[i - 1].points;
  //             const levelEndPoints = levelInfo.points;
  //             const levelPoints = levelEndPoints;
  //             const progressPoints  = Math.min(Math.max(userPointsForQuest, 0), levelPoints);
  //             const progressValue = progressPoints / levelPoints * 100;
  //             const normalized = Math.min(Math.max(Math.floor(progressValue), 0), 100);
  //             const progressElement = levelDiv.querySelector('.quest__item-info-progress');
  //             progressElement.value = normalized;
  //             progressElement.dataset.progress = `${normalized}%`;
  //             const statusDiv = levelDiv.querySelector('.status');
  //             statusDiv.innerHTML = `${progressPoints}/${levelPoints}`;
  //             if (userPointsForQuest < levelStartPoints || !userId) {
  //                 const playBtn = levelDiv.querySelector('.took-part');
  //                 playBtn.classList.add('hide');
  //             }
  //         }
  //     }
  //     refreshProgress();
  // }
  //
  // function countdownTimer(targetDateString, timerElement, popupTimer) {
  //     refreshTimer(targetDateString, timerElement, popupTimer);
  //     const intervalId = setInterval(() => {
  //         const timeDiff = refreshTimer(targetDateString, timerElement, popupTimer);
  //         if (timeDiff < 0) {
  //             clearInterval(intervalId);
  //             timerElement.innerHTML = formatTime('finishedTimer', 0, 0, 0);
  //             popupTimer.innerHTML = formatTime('timer', 0, 0, 0);
  //             location.reload();
  //         }
  //     }, 10000);
  // }
  //
  // function formatTime(key, days, hours, minutes) {
  //     return translateKey(key).replace("{day}", days.toString())
  //         .replace("{hour}", hours.toString())
  //         .replace("{minutes}", minutes.toString());
  // }
  //
  // function refreshTimer(targetDateString, timerElement, popupTimer) {
  //     const targetDate = new Date(targetDateString);
  //     const now = new Date();
  //     const timeDiff = targetDate.getTime() - now.getTime();
  //
  //     const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //
  //
  //     timerElement.innerHTML = formatTime('finishedTimer', days, hours, minutes);
  //     popupTimer.innerHTML = formatTime('timer', days, hours, minutes);
  //     return timeDiff;
  // }
  //
  // function getQuestLevel(questDefinition, points) {
  //     if (!questDefinition || !questDefinition.levels || questDefinition.levels.length === 0) {
  //         return 0;
  //     }
  //
  //     const levelIndex = questDefinition.levels.findIndex(level => points < level.points);
  //     return levelIndex === -1 ? questDefinition.levels.length : levelIndex;
  // }

  // function getQuestType(quest) {
  //     const startDate = new Date(quest.dateStart);
  //     const endDate = new Date(quest.dateEnd);
  //     if (currentDate < startDate) {
  //         return FUTURE_QUEST_TYPE;
  //     } else if (currentDate > endDate) {
  //         return OLD_QUEST_TYPE;
  //     } else {
  //         return ACTIVE_QUEST_TYPE;
  //     }
  // }

  function init() {
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      setupPage();
    } else {
      setupPage();
      var c = 0;
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
    participateBtns.forEach(function (authBtn, i) {
      authBtn.addEventListener('click', function (e) {
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
    var params = {
      userid: userId
    };
    request('/user', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      participateBtns.forEach(function (item) {
        return item.classList.add('hide');
      });
      redirectBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
      InitPage();
    });
  }
  function registerInQuest() {
    if (!userId) {
      return;
    }
    var params = {
      userid: userId
    };
    request('/questreg', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      playBtn.classList.remove('hide');
      popupPlayBtn.classList.remove('hide');
      questStartBtns.forEach(function (questStartBtn) {
        return questStartBtn.classList.add('hide');
      });
    });
  }
  var renderUsers = function renderUsers(users) {
    resultsTableWrapper.classList.remove('hide');
    resultsTableOther.classList.remove('hide');
    if (users && users.length) {
      var topUsers = users.slice(0, 10);
      populateUsersTable(topUsers, userId, topResultsTable, users);
      var currentUser = userId && users.find(function (user) {
        return user.userid === userId;
      });
      var currentUserIndex = currentUser && users.indexOf(currentUser);
      var otherUsers;
      if (!currentUserIndex || currentUserIndex < 10) {
        otherUsers = users.slice(10, 13);
      } else {
        otherUsers = users.slice(Math.max(currentUserIndex - 1, 10), currentUserIndex + 2);
      }
      if (otherUsers && otherUsers.length) {
        populateUsersTable(otherUsers, userId, resultsTableOther, users);
      }
    }
  };
  function populateUsersTable(users, currentUserId, table, allUsers) {
    table.innerHTML = '';
    if (users && users.length) {
      users.forEach(function (user) {
        var checkCurrentUser = currentUserId && currentUserId === user.userid;
        var additionalUserRow = document.createElement('div');
        additionalUserRow.classList.add('tableResults__row');
        if (checkCurrentUser) {
          additionalUserRow.classList.add('_yourPlace');
        }
        var place = allUsers.indexOf(user) + 1;
        var prizePlaceCss = PRIZES_CSS[place - 1];
        if (prizePlaceCss) {
          additionalUserRow.classList.add(prizePlaceCss);
        }
        var prizeKey = getPrizeTranslationKey(place);
        additionalUserRow.innerHTML = "\n                        <div class=\"tableResults__body-col\" ".concat(checkCurrentUser, ">").concat(place, "</div>\n                        <div class=\"tableResults__body-col\">").concat(checkCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n                        <div class=\"tableResults__body-col\">").concat(Math.floor(user.points), "</div>\n                        <div class=\"tableResults__body-col\">").concat(prizeKey ? translateKey(prizeKey) : ' - ', "</div>\n                    ");
        table.append(additionalUserRow);
      });
    }
  }
  function getPrizeTranslationKey(place) {
    if (place <= 5) {
      return "prize_".concat(place);
    } else if (place <= 10) {
      return "prize_6-10";
    } else if (place <= 50) {
      return "prize_11-50";
    } else if (place <= 100) {
      return "prize_51-100";
    } else if (place <= 200) {
      return "prize_101-200";
    } else if (place <= 201) {
      return "prize_201-300";
    } else if (place <= 400) {
      return "prize_301-400";
    } else if (place <= 500) {
      return "prize_401-500";
    } else if (place <= 600) {
      return "prize_501-600";
    } else if (place <= 650) {
      return "prize_601-650";
    } else if (place <= 700) {
      return "prize_651-700";
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
  var checkUserAuth = function checkUserAuth() {
    if (userId) {
      var _iterator = _createForOfIteratorHelper(unauthMsgs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var unauthMes = _step.value;
          unauthMes.classList.add('hide');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      request("/favuser/".concat(userId)).then(function (res) {
        if (res && res.userid) {
          participateBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          redirectBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
          questStartBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          userInfo = res;
          refreshQuests(quests, userInfo);
        } else {
          participateBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
        }
      });
    } else {
      var _iterator2 = _createForOfIteratorHelper(participateBtns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var participateBtn = _step2.value;
          participateBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(unauthMsgs),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _unauthMes = _step3.value;
          _unauthMes.classList.remove('hide');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  };
  loadTranslations().then(init);
  var mainPage = document.querySelector('.fav__page');
  setTimeout(function () {
    return mainPage.classList.add('overflow');
  }, 1000);

  //show popupchik
  var body = document.querySelector('body');
  var popupWrap = document.querySelector('.popup');
  var btnTableShow = document.querySelector('.result__subtext');
  var tablePopup = document.querySelector('.prize-fund');
  var tablePopupBtnClose = document.querySelector('.prize-fund-close');
  btnTableShow.addEventListener('click', function () {
    popupWrap.classList.remove('_hidden');
    body.style.overflow = 'hidden';
    tablePopup.style.display = 'block';
  });
  tablePopupBtnClose.addEventListener('click', function () {
    popupWrap.classList.add('_hidden');
    body.style.overflow = 'auto';
    tablePopup.style.display = 'none';
  });

  //show rules- details
  var rulesItems = document.querySelectorAll('.rules__item');
  rulesItems.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('_open');
    });
  });

  // for test
  document.querySelector(".dark-btn").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
  var week = 1;
  var gameWrap = document.querySelector(".game__house"),
    weekBtn = document.querySelector(".week-btn");
  weekBtn.addEventListener("click", function () {
    if (week >= 4) {
      gameWrap.classList.remove("week".concat(week));
      week = 1;
      gameWrap.classList.add("week".concat(week));
      return;
    }
    gameWrap.classList.remove("week".concat(week));
    week++;
    gameWrap.classList.add("week".concat(week));
  });
})();
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsImhyTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImNvbmNhdCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwicXVlc3RTdGFydEJ0biIsImUiLCJyZWdpc3RlckluUXVlc3QiLCJ3IiwiaSIsInMiLCJyZWZyZXNoVXNlcnMiLCJjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzIiwiZGF0ZSIsIm5vdyIsInJlZnJlc2hXZWVrVGFicyIsIndlZWtTZWxlY3RvciIsIndlZWsiLCJnZXRVc2VycyIsInJlbmRlclVzZXJzIiwidXJsIiwicmVzb2x2ZVVzZXJzVXJsIiwibWFwIiwidXNlck9ySWQiLCJ1c2VyaWQiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsInNldEludGVydmFsIiwiZ191c2VyX2lkIiwiY2hlY2tVc2VyQXV0aCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRvcFVzZXJzIiwic2xpY2UiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlciIsImZpbmQiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiTWF0aCIsIm1heCIsImN1cnJlbnRVc2VySWQiLCJ0YWJsZSIsImFsbFVzZXJzIiwiY2hlY2tDdXJyZW50VXNlciIsImFkZGl0aW9uYWxVc2VyUm93IiwiY3JlYXRlRWxlbWVudCIsInBsYWNlIiwicHJpemVQbGFjZUNzcyIsInByaXplS2V5IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsIm1hc2tVc2VySWQiLCJmbG9vciIsInBvaW50cyIsInRyYW5zbGF0ZUtleSIsImFwcGVuZCIsInRvU3RyaW5nIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIm4iLCJkb25lIiwidW5hdXRoTWVzIiwidmFsdWUiLCJlcnIiLCJmIiwicmVmcmVzaFF1ZXN0cyIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJwYXJ0aWNpcGF0ZUJ0biIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJtYWluUGFnZSIsInNldFRpbWVvdXQiLCJwb3B1cFdyYXAiLCJidG5UYWJsZVNob3ciLCJ0YWJsZVBvcHVwIiwidGFibGVQb3B1cEJ0bkNsb3NlIiwic3R5bGUiLCJvdmVyZmxvdyIsImRpc3BsYXkiLCJydWxlc0l0ZW1zIiwidG9nZ2xlIiwiZ2FtZVdyYXAiLCJ3ZWVrQnRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUNULElBQU1BLE1BQU0sR0FBRyxnQ0FBZ0M7RUFDL0MsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3RCxJQUFNQyxnQkFBZ0IsR0FBRyxLQUFLO0VBRTlCLElBQU1DLGlCQUFpQixHQUFHLFFBQVE7SUFDOUJDLGNBQWMsR0FBRyxLQUFLO0lBQ3RCQyxpQkFBaUIsR0FBRyxRQUFRO0VBRWhDLElBQ0lDLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUN2RUMsZUFBZSxHQUFHRixRQUFRLENBQUNHLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDdERDLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR04sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENB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LEdBQUc7VUFBQ0MsTUFBTSxFQUFFRDtRQUFRLENBQUMsR0FBR0EsUUFBUTtNQUFBLEVBQUM7SUFBQSxFQUFDO0VBQzNHO0VBQ0EsU0FBU0YsZUFBZUEsQ0FBQ0osSUFBSSxFQUFFO0lBQzNCLE9BQU9BLElBQUksYUFBQTFELE1BQUEsQ0FBYTBELElBQUksSUFBSyxRQUFRO0VBQzdDOztFQUlBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VB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LENBQUNyRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztJQUNuQyxJQUFHZ0IsSUFBSSxJQUFJLENBQUMsRUFBRTtNQUNWb0YsUUFBUSxDQUFDbkgsU0FBUyxDQUFDQyxNQUFNLFFBQUE1QixNQUFBLENBQVEwRCxJQUFJLENBQUUsQ0FBQztNQUN4Q0EsSUFBSSxHQUFHLENBQUM7TUFDUm9GLFFBQVEsQ0FBQ25ILFNBQVMsQ0FBQ0UsR0FBRyxRQUFBN0IsTUFBQSxDQUFRMEQsSUFBSSxDQUFFLENBQUM7TUFDckM7SUFDSjtJQUNBb0YsUUFBUSxDQUFDbkgsU0FBUyxDQUFDQyxNQUFNLFFBQUE1QixNQUFBLENBQVEwRCxJQUFJLENBQUUsQ0FBQztJQUN4Q0EsSUFBSSxFQUFFO0lBQ05vRixRQUFRLENBQUNuSCxTQUFTLENBQUNFLEdBQUcsUUFBQTdCLE1BQUEsQ0FBUTBELElBQUksQ0FBRSxDQUFDO0VBQ3pDLENBQUMsQ0FBQztBQUdOLENBQUMsRUFBRSxDQUFDO0FDNW1CSiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX255X2hyJztcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHBhcnRpY2lwYXRlUGFyYW0gPSAncmVnJztcblxuICAgIGNvbnN0IEZVVFVSRV9RVUVTVF9UWVBFID0gJ2Z1dHVyZScsXG4gICAgICAgIE9MRF9RVUVTVF9UWVBFID0gJ29sZCcsXG4gICAgICAgIEFDVElWRV9RVUVTVF9UWVBFID0gJ2FjdGl2ZSc7XG5cbiAgICBjb25zdFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2JvZHktb3RoZXInKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC11c2VycycpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZWRpcmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIHF1ZXN0RGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpLFxuICAgICAgICBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0LXBsYXknKSxcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RCdG4nKSxcbiAgICAgICAgcXVlc3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdCcpLFxuICAgICAgICBxdWVzdExldmVsRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpLFxuICAgICAgICBwb3B1cFBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlyc3RQbGF5JyksXG4gICAgICAgIHdlZWtzU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVSZXN1bHRzX190YWJzLWl0ZW0nKSxcbiAgICAgICAgd2Vla3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX190YWJzJyk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vbmV3IERhdGUoXCIyMDIzLTEyLTE0VDIxOjAwOjAwLjAwMFpcIik7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBxdWVzdHM7XG4gICAgbGV0IHVzZXJJbmZvO1xuICAgIGxldCBzZWxlY3RlZFdlZWtUYWJJZCA9IDA7XG5cbiAgICBjb25zdCBockxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgbGV0IGxvY2FsZSA9ICdocic7XG5cbiAgICBpZiAoaHJMZW5nKSBsb2NhbGUgPSAnaHInO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IHVzZXJJZDtcbiAgICAvLyBsZXQgdXNlcklkID0gMTAwMzQwMDIwO1xuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3WWVhcjIwMjQnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRlIGlzIHdvcmtpbmdcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2VycycpLFxuICAgICAgICAgICAgLy8gcmVxdWVzdCgnL3F1ZXN0cycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREcm9wKCkge1xuICAgICAgICBjb25zdCBvcGVuRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb1J1bGVzXCIpO1xuICAgICAgICBsZXQgZGVza0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkZvb3Rlcl9jb250YWluZXItLUJTWCcpO1xuXG4gICAgICAgIG9wZW5Ecm9wLmZvckVhY2gob3BlbiA9PiB7XG4gICAgICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BPcGVuXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghZGVza0NsYXNzKSB7XG4gICAgICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdibG9ja0xpbmsnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpbml0RHJvcCgpO1xuICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IHJlZ2lzdGVySW5RdWVzdCgpOyB9KSk7XG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4gdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBpO1xuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocXVlc3RzKTtcbiAgICAgICAgICAgIC8vIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIC8vIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbylcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MoKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0wN1QyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMjFUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTI4VDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hXZWVrVGFicygpIHtcbiAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzKCkgLSAxO1xuICAgICAgICBpZiAoIXNlbGVjdGVkV2Vla1RhYklkIHx8IHNlbGVjdGVkV2Vla1RhYklkID09PSAwKSB7IC8vIHByb21vIG5vdCBzdGFydGVkIHlldFxuICAgICAgICAgICAgd2Vla3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHdlZWtTZWxlY3RvciA9IHdlZWtzU2VsZWN0b3JbaV07XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRXZWVrVGFiSWQgPCBpKSB7XG4gICAgICAgICAgICAgICAgd2Vla1NlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4ge1xuICAgICAgICAgICAgdy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChpID09PSBzZWxlY3RlZFdlZWtUYWJJZCkge1xuICAgICAgICAgICAgICAgIHcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGdldFVzZXJzKHdlZWspLnRoZW4odXNlcnMgPT4ge1xuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVzZXJzKHdlZWspIHtcbiAgICAgICAgY29uc3QgdXJsID0gcmVzb2x2ZVVzZXJzVXJsKHdlZWspO1xuICAgICAgICByZXR1cm4gcmVxdWVzdCh1cmwpXG4gICAgICAgICAgICAudGhlbih1c2VycyA9PiB1c2Vycy5tYXAodXNlck9ySWQgPT4gdHlwZW9mIHVzZXJPcklkID09PSAnbnVtYmVyJyA/IHt1c2VyaWQ6IHVzZXJPcklkfSA6IHVzZXJPcklkKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc29sdmVVc2Vyc1VybCh3ZWVrKSB7XG4gICAgICAgIHJldHVybiB3ZWVrID8gYC91c2Vycy8ke3dlZWt9YCA6ICcvdXNlcnMnO1xuICAgIH1cblxuXG5cbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIHJlZnJlc2hRdWVzdHMocXVlc3RzLCBjdXJyZW50VXNlcikge1xuICAgIC8vICAgICBpZiAoIXF1ZXN0cykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3Qgc2hpZnQgPSBpc1NlY29uZFdlZWsocXVlc3RzKSA/IDQgOiAwO1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0RGl2cy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgICAgICAgcmVuZGVyUXVlc3QocXVlc3RzW2kgKyBzaGlmdF0sIHF1ZXN0RGl2c1tpXSwgY3VycmVudFVzZXIpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gaXNTZWNvbmRXZWVrKHF1ZXN0cykge1xuICAgIC8vICAgICBjb25zdCBmb3VydGhRdWVzdCA9IHF1ZXN0c1szXTtcbiAgICAvLyAgICAgcmV0dXJuIGZvdXJ0aFF1ZXN0ICYmIGN1cnJlbnREYXRlID4gbmV3IERhdGUoZm91cnRoUXVlc3QuZGF0ZUVuZCk7XG4gICAgLy8gfVxuXG4gICAgLy8gZnVuY3Rpb24gcmVuZGVyUXVlc3QocXVlc3QsIGNvbnRhaW5lciwgY3VycmVudFVzZXIpIHtcbiAgICAvLyAgICAgaWYgKCFxdWVzdCB8fCAhY29udGFpbmVyKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBxdWVzdE51bSA9IHF1ZXN0LnFOdW1iZXI7XG4gICAgLy8gICAgIC8vY29uc3QgcXVlc3RQb2ludHMgPSB7cG9pbnRzOiAzMDB9O1xuICAgIC8vICAgICBjb25zdCBxdWVzdFBvaW50cyA9IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLnF1ZXN0cyAmJiBjdXJyZW50VXNlci5xdWVzdHMuZmluZChxID0+IHEucXVlc3ROdW0gPT09IHF1ZXN0TnVtKTtcbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgdHJhbnNsYXRpb25zXG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0VGl0bGVEaXYgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJvdXRlX19pdGVtLXRpdGxlJyk7XG4gICAgLy8gICAgIHF1ZXN0VGl0bGVEaXYuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBuYW1lUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvLyAgICAgY29uc3QgcXVlc3RTdWJUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tc3VidGl0bGUnKTtcbiAgICAvLyAgICAgcXVlc3RTdWJUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlIHR5cGUgb2YgcXVlc3RcbiAgICAvLyAgICAgY29uc3QgcXVlc3RUeXBlID0gZ2V0UXVlc3RUeXBlKHF1ZXN0KTtcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nvb24nKTtcbiAgICAvL1xuICAgIC8vICAgICBpZiAocXVlc3RUeXBlID09PSBPTERfUVVFU1RfVFlQRSkge1xuICAgIC8vICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgLy8gICAgIH0gZWxzZSBpZiAocXVlc3RUeXBlID09PSBGVVRVUkVfUVVFU1RfVFlQRSkge1xuICAgIC8vICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nvb24nKTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHRpbWVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudGltZXJUeHQnKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IHBvcHVwVGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpbWUtbnVtJyk7XG4gICAgLy8gICAgICAgICBjb3VudGRvd25UaW1lcihxdWVzdC5kYXRlRW5kLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgIC8vICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApXG4gICAgLy8gICAgICAgICB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlIHN0YXJzXG4gICAgLy8gICAgIGlmIChxdWVzdFBvaW50cykge1xuICAgIC8vICAgICAgICAgY29uc3Qgc3RhckRpdnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnN0YXInKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IHF1ZXN0TGV2ZWwgPSBnZXRRdWVzdExldmVsKHF1ZXN0LCBxdWVzdFBvaW50cy5wb2ludHMgfHwgMCk7XG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0TGV2ZWw7IGkrKykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHN0YXIgPSBzdGFyRGl2c1tpXTtcbiAgICAvLyAgICAgICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ19kb25lJyk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGVzIGltYWdlc1xuICAgIC8vICAgICBjb25zdCBzcmNEZXNjID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX2Rlc2MnKTtcbiAgICAvLyAgICAgY29uc3Qgc3JjTW9iID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX21vYicpO1xuICAgIC8vICAgICBjb25zdCBzcmNEZWZhdWx0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX2RlZmF1bHQnKTtcbiAgICAvLyAgICAgc3JjRGVzYy5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctZGVzYy5wbmdgO1xuICAgIC8vICAgICBzcmNNb2Iuc3Jjc2V0ID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLW1vYi5wbmdgO1xuICAgIC8vICAgICBzcmNEZWZhdWx0LnNyYyA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlIGJ1dHRvbnNcbiAgICAvLyAgICAgaWYgKHF1ZXN0VHlwZSA9PSBBQ1RJVkVfUVVFU1RfVFlQRSAmJiB1c2VySWQgJiYgIXF1ZXN0UG9pbnRzKSB7XG4gICAgLy8gICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAvLyAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygncmVtb3ZpbmcgcXVlc3QgaGlkZSAnICsgY3VycmVudFVzZXIpXG4gICAgLy8gICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gZnVuY3Rpb24gdXBkYXRlUG9wdXAocXVlc3QsIHF1ZXN0UG9pbnRzKSB7XG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAvLyAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10aXRsZScpO1xuICAgIC8vICAgICB0aXRsZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgLy8gICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X19kZXMtdGV4dCcpO1xuICAgIC8vICAgICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYGRlc2NyUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvLyAgICAgY29uc3QgcXVlc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X190aXRsZScpO1xuICAgIC8vICAgICBxdWVzdE5hbWUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBuYW1lUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBjc3NDbGFzcyA9IHF1ZXN0TnVtICUgMiA9PSAwID8gJ3Nwb3J0JyA6ICdjYXNpbm8nO1xuICAgIC8vICAgICBxdWVzdFBvcHVwLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgIC8vICAgICBxdWVzdFBvcHVwLmNsYXNzTGlzdC5hZGQoYHF1ZXN0LXBvcHVwJHtxdWVzdE51bX1gKTtcbiAgICAvL1xuICAgIC8vICAgICBjb25zdCB1c2VyUG9pbnRzRm9yUXVlc3QgPSBxdWVzdFBvaW50cyA/IHF1ZXN0UG9pbnRzLnBvaW50cyA6IDA7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGxldmVsRGl2ID0gcXVlc3RMZXZlbERpdnNbaV07XG4gICAgLy8gICAgICAgICBjb25zdCBsZXZlbEluZm8gPSBxdWVzdC5sZXZlbHNbaV07XG4gICAgLy8gICAgICAgICBpZiAobGV2ZWxEaXYgJiYgbGV2ZWxJbmZvKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc3VidGl0bGUgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0tc3VidGl0bGUnKTtcbiAgICAvLyAgICAgICAgICAgICBzdWJ0aXRsZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHByaXplUXVlc3QtJHtxdWVzdE51bX1fJHtpICsgMX1gKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBpbmZvVGV4dCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXRleHQnKTtcbiAgICAvLyAgICAgICAgICAgICBpbmZvVGV4dC5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHN0ZXBRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgLy8gcHJvZ3Jlc3MgYmFyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgbGV2ZWxTdGFydFBvaW50cyA9IGkgPT09IDAgPyAwIDogcXVlc3QubGV2ZWxzW2kgLSAxXS5wb2ludHM7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgbGV2ZWxFbmRQb2ludHMgPSBsZXZlbEluZm8ucG9pbnRzO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGxldmVsUG9pbnRzID0gbGV2ZWxFbmRQb2ludHM7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NQb2ludHMgID0gTWF0aC5taW4oTWF0aC5tYXgodXNlclBvaW50c0ZvclF1ZXN0LCAwKSwgbGV2ZWxQb2ludHMpO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzVmFsdWUgPSBwcm9ncmVzc1BvaW50cyAvIGxldmVsUG9pbnRzICogMTAwO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBNYXRoLm1pbihNYXRoLm1heChNYXRoLmZsb29yKHByb2dyZXNzVmFsdWUpLCAwKSwgMTAwKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc0VsZW1lbnQgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0taW5mby1wcm9ncmVzcycpO1xuICAgIC8vICAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC52YWx1ZSA9IG5vcm1hbGl6ZWQ7XG4gICAgLy8gICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LmRhdGFzZXQucHJvZ3Jlc3MgPSBgJHtub3JtYWxpemVkfSVgO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0RpdiA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAvLyAgICAgICAgICAgICBzdGF0dXNEaXYuaW5uZXJIVE1MID0gYCR7cHJvZ3Jlc3NQb2ludHN9LyR7bGV2ZWxQb2ludHN9YDtcbiAgICAvLyAgICAgICAgICAgICBpZiAodXNlclBvaW50c0ZvclF1ZXN0IDwgbGV2ZWxTdGFydFBvaW50cyB8fCAhdXNlcklkKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHBsYXlCdG4gPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcudG9vay1wYXJ0Jyk7XG4gICAgLy8gICAgICAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZWZyZXNoUHJvZ3Jlc3MoKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBjb3VudGRvd25UaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAvLyAgICAgcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgLy8gICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgIC8vICAgICAgICAgaWYgKHRpbWVEaWZmIDwgMCkge1xuICAgIC8vICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgLy8gICAgICAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCAwLCAwLCAwKTtcbiAgICAvLyAgICAgICAgICAgICBwb3B1cFRpbWVyLmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ3RpbWVyJywgMCwgMCwgMCk7XG4gICAgLy8gICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0sIDEwMDAwKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBmb3JtYXRUaW1lKGtleSwgZGF5cywgaG91cnMsIG1pbnV0ZXMpIHtcbiAgICAvLyAgICAgcmV0dXJuIHRyYW5zbGF0ZUtleShrZXkpLnJlcGxhY2UoXCJ7ZGF5fVwiLCBkYXlzLnRvU3RyaW5nKCkpXG4gICAgLy8gICAgICAgICAucmVwbGFjZShcIntob3VyfVwiLCBob3Vycy50b1N0cmluZygpKVxuICAgIC8vICAgICAgICAgLnJlcGxhY2UoXCJ7bWludXRlc31cIiwgbWludXRlcy50b1N0cmluZygpKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKSB7XG4gICAgLy8gICAgIGNvbnN0IHRhcmdldERhdGUgPSBuZXcgRGF0ZSh0YXJnZXREYXRlU3RyaW5nKTtcbiAgICAvLyAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAvLyAgICAgY29uc3QgdGltZURpZmYgPSB0YXJnZXREYXRlLmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKCk7XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IodGltZURpZmYgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIC8vICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoKHRpbWVEaWZmICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpO1xuICAgIC8vICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKTtcbiAgICAvL1xuICAgIC8vXG4gICAgLy8gICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCdmaW5pc2hlZFRpbWVyJywgZGF5cywgaG91cnMsIG1pbnV0ZXMpO1xuICAgIC8vICAgICBwb3B1cFRpbWVyLmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ3RpbWVyJywgZGF5cywgaG91cnMsIG1pbnV0ZXMpO1xuICAgIC8vICAgICByZXR1cm4gdGltZURpZmY7XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gZ2V0UXVlc3RMZXZlbChxdWVzdERlZmluaXRpb24sIHBvaW50cykge1xuICAgIC8vICAgICBpZiAoIXF1ZXN0RGVmaW5pdGlvbiB8fCAhcXVlc3REZWZpbml0aW9uLmxldmVscyB8fCBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIDA7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBsZXZlbEluZGV4ID0gcXVlc3REZWZpbml0aW9uLmxldmVscy5maW5kSW5kZXgobGV2ZWwgPT4gcG9pbnRzIDwgbGV2ZWwucG9pbnRzKTtcbiAgICAvLyAgICAgcmV0dXJuIGxldmVsSW5kZXggPT09IC0xID8gcXVlc3REZWZpbml0aW9uLmxldmVscy5sZW5ndGggOiBsZXZlbEluZGV4O1xuICAgIC8vIH1cblxuXG4gICAgLy8gZnVuY3Rpb24gZ2V0UXVlc3RUeXBlKHF1ZXN0KSB7XG4gICAgLy8gICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVTdGFydCk7XG4gICAgLy8gICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShxdWVzdC5kYXRlRW5kKTtcbiAgICAvLyAgICAgaWYgKGN1cnJlbnREYXRlIDwgc3RhcnREYXRlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gRlVUVVJFX1FVRVNUX1RZUEU7XG4gICAgLy8gICAgIH0gZWxzZSBpZiAoY3VycmVudERhdGUgPiBlbmREYXRlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gT0xEX1FVRVNUX1RZUEU7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gQUNUSVZFX1FVRVNUX1RZUEU7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBhZ2UoKSB7XG4gICAgICAgIGlmICh1c2VySWQgJiYgdXJsUGFyYW1zLmhhcyhwYXJ0aWNpcGF0ZVBhcmFtKSkge1xuICAgICAgICAgICAgcGFydGljaXBhdGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoZmFzdFJlZykge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJJblF1ZXN0KCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvcXVlc3RyZWcnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBwb3B1cFBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVXNlcnMgPSAodXNlcnMpID0+IHtcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMCk7XG4gICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodG9wVXNlcnMsIHVzZXJJZCwgdG9wUmVzdWx0c1RhYmxlLCB1c2Vycyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcklkICYmIHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gdXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSBjdXJyZW50VXNlciAmJiB1c2Vycy5pbmRleE9mKGN1cnJlbnRVc2VyKTtcblxuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnM7XG5cbiAgICAgICAgICAgIGlmICghY3VycmVudFVzZXJJbmRleCB8fCBjdXJyZW50VXNlckluZGV4IDwgMTApIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoMTAsIDEzKTtcbiAgICAgICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heChjdXJyZW50VXNlckluZGV4IC0gMSwgMTApLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvdGhlclVzZXJzICYmIG90aGVyVXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKG90aGVyVXNlcnMsIHVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgdGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja0N1cnJlbnRVc2VyID0gY3VycmVudFVzZXJJZCAmJiBjdXJyZW50VXNlcklkID09PSB1c2VyLnVzZXJpZDtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlUmVzdWx0c19fcm93Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgnX3lvdXJQbGFjZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplUGxhY2VDc3MgPSBQUklaRVNfQ1NTW3BsYWNlIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKVxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCIgJHtjaGVja0N1cnJlbnRVc2VyfT4ke3BsYWNlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke2NoZWNrQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke01hdGguZmxvb3IodXNlci5wb2ludHMpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpIHtcbiAgICAgICAgaWYgKHBsYWNlIDw9IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfJHtwbGFjZX1gXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNi0xMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMS01MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtMTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMDEtMjAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8yMDEtMzAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDQwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8zMDEtNDAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV80MDEtNTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDYwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MDEtNjAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDY1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82MDEtNjUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDcwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82NTEtNzAwYFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSg0KTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93JyksIDEwMDApO1xuXG5cbiAgICAvL3Nob3cgcG9wdXBjaGlrXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBjb25zdCBwb3B1cFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbiAgICBjb25zdCBidG5UYWJsZVNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0X19zdWJ0ZXh0Jyk7XG4gICAgY29uc3QgdGFibGVQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kJyk7XG4gICAgY29uc3QgdGFibGVQb3B1cEJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaXplLWZ1bmQtY2xvc2UnKTtcblxuXG4gICAgYnRuVGFibGVTaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pXG5cbiAgICB0YWJsZVBvcHVwQnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcbiAgICAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0pXG5cblxuICAgIC8vc2hvdyBydWxlcy0gZGV0YWlsc1xuICAgIGNvbnN0IHJ1bGVzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucnVsZXNfX2l0ZW0nKVxuICAgIHJ1bGVzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnX29wZW4nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBmb3IgdGVzdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gMVxuXG4gICAgY29uc3QgZ2FtZVdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVfX2hvdXNlXCIpLFxuICAgICAgICAgIHdlZWtCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWstYnRuXCIpO1xuXG4gICAgd2Vla0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGlmKHdlZWsgPj0gNCkge1xuICAgICAgICAgICAgZ2FtZVdyYXAuY2xhc3NMaXN0LnJlbW92ZShgd2VlayR7d2Vla31gKVxuICAgICAgICAgICAgd2VlayA9IDFcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgd2VlaysrXG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICB9KVxuXG5cbn0pKCk7XG4iLCIiXX0=
