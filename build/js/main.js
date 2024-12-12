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
  var apiURL = 'https://fav-prom.com/api_ny_sam_ro';
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
  var selectedWeekTabId;
  var roLeng = document.querySelector('#roLeng');
  var enLeng = document.querySelector('#enLeng');

  // let locale = 'ro';

  var locale = sessionStorage.getItem('locale') || 'en';
  function setState(newLocale) {
    locale = newLocale;
    sessionStorage.setItem('locale', locale);
  }
  function toggleState() {
    var newLocale = locale === 'en' ? 'ro' : 'en';
    setState(newLocale);
    window.location.reload();
  }
  document.querySelector('.en-btn').addEventListener('click', function () {
    toggleState();
  });
  document.querySelector(".fav__page").classList.add("".concat(locale));
  // if (roLeng) locale = 'ro';
  // if (enLeng) locale = 'en';

  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId;
  userId = 204806;
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
  //
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
  //
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

  function formatTime(key, days, hours, minutes) {
    return translateKey(key).replace("{day}", days.toString()).replace("{hour}", hours.toString()).replace("{minutes}", minutes.toString());
  }
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
  //
  //
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

  // function registerInQuest() {
  //     if (!userId) {
  //         return;
  //     }
  //
  //     const params = {userid: userId};
  //
  //     request('/questreg', {
  //         method: 'POST',
  //         body: JSON.stringify(params)
  //     }).then(res => {
  //         playBtn.classList.remove('hide');
  //         popupPlayBtn.classList.remove('hide');
  //         questStartBtns.forEach(questStartBtn => questStartBtn.classList.add('hide'));
  //     });
  // }

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
    if (place <= 10) {
      return "prize_".concat(place);
    } else if (place >= 11 && place <= 15) {
      return "prize_11-15";
    } else if (place >= 16 && place <= 20) {
      return "prize_16-20";
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsInJvTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInNldFN0YXRlIiwibmV3TG9jYWxlIiwic2V0SXRlbSIsInRvZ2dsZVN0YXRlIiwicmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsInJlbW92ZSIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJvcGVuIiwiZGV0YWlscyIsIml0ZW0iLCJJbml0UGFnZSIsInciLCJpIiwiZSIsInMiLCJyZWZyZXNoVXNlcnMiLCJjYWxjdWxhdGVSZWNlbnRQcm9tb1dlZWtzIiwiZGF0ZSIsIm5vdyIsInJlZnJlc2hXZWVrVGFicyIsIndlZWtTZWxlY3RvciIsIndlZWsiLCJnZXRVc2VycyIsInJlbmRlclVzZXJzIiwidXJsIiwicmVzb2x2ZVVzZXJzVXJsIiwibWFwIiwidXNlck9ySWQiLCJ1c2VyaWQiLCJmb3JtYXRUaW1lIiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsInRyYW5zbGF0ZUtleSIsInJlcGxhY2UiLCJ0b1N0cmluZyIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJzZXR1cFBhZ2UiLCJjIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjaGVja1VzZXJBdXRoIiwiY2xlYXJJbnRlcnZhbCIsImF1dGhCdG4iLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwiaGFzIiwiZmFzdFJlZyIsInBhcmFtcyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VyIiwiZmluZCIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsImZsb29yIiwicG9pbnRzIiwiYXBwZW5kIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIm4iLCJkb25lIiwidW5hdXRoTWVzIiwidmFsdWUiLCJlcnIiLCJmIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsInBhcnRpY2lwYXRlQnRuIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIm1haW5QYWdlIiwic2V0VGltZW91dCIsInJ1bGVzSXRlbXMiLCJ0b2dnbGUiLCJnYW1lV3JhcCIsIndlZWtCdG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLG9DQUFvQztFQUNuRCxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsZUFBZSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQzdELElBQU1DLGdCQUFnQixHQUFHLEtBQUs7RUFFOUIsSUFBTUMsaUJBQWlCLEdBQUcsUUFBUTtJQUM5QkMsY0FBYyxHQUFHLEtBQUs7SUFDdEJDLGlCQUFpQixHQUFHLFFBQVE7RUFFaEMsSUFDSUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBQ3ZFQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUN0REMsVUFBVSxHQUFHSixRQUFRLENBQUNLLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsZUFBZSxHQUFHTixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN4REUsbUJBQW1CLEdBQUdQLFFB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RUFBRSxZQUFLO0lBQ25DLElBQUcyRCxJQUFJLElBQUksQ0FBQyxFQUFFO01BQ1ZpRixRQUFRLENBQUMzSSxTQUFTLENBQUNnQyxNQUFNLFFBQUE5QixNQUFBLENBQVF3RCxJQUFJLENBQUUsQ0FBQztNQUN4Q0EsSUFBSSxHQUFHLENBQUM7TUFDUmlGLFFBQVEsQ0FBQzNJLFNBQVMsQ0FBQ0MsR0FBRyxRQUFBQyxNQUFBLENBQVF3RCxJQUFJLENBQUUsQ0FBQztNQUNyQztJQUNKO0lBQ0FpRixRQUFRLENBQUMzSSxTQUFTLENBQUNnQyxNQUFNLFFBQUE5QixNQUFBLENBQVF3RCxJQUFJLENBQUUsQ0FBQztJQUN4Q0EsSUFBSSxFQUFFO0lBQ05pRixRQUFRLENBQUMzSSxTQUFTLENBQUNDLEdBQUcsUUFBQUMsTUFBQSxDQUFRd0QsSUFBSSxDQUFFLENBQUM7RUFDekMsQ0FBQyxDQUFDO0FBR04sQ0FBQyxFQUFFLENBQUM7QUNwbEJKIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbnlfc2FtX3JvJztcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHBhcnRpY2lwYXRlUGFyYW0gPSAncmVnJztcblxuICAgIGNvbnN0IEZVVFVSRV9RVUVTVF9UWVBFID0gJ2Z1dHVyZScsXG4gICAgICAgIE9MRF9RVUVTVF9UWVBFID0gJ29sZCcsXG4gICAgICAgIEFDVElWRV9RVUVTVF9UWVBFID0gJ2FjdGl2ZSc7XG5cbiAgICBjb25zdFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2JvZHktb3RoZXInKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC11c2VycycpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZWRpcmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIHF1ZXN0RGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpLFxuICAgICAgICBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0LXBsYXknKSxcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RCdG4nKSxcbiAgICAgICAgcXVlc3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdCcpLFxuICAgICAgICBxdWVzdExldmVsRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpLFxuICAgICAgICBwb3B1cFBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlyc3RQbGF5JyksXG4gICAgICAgIHdlZWtzU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVSZXN1bHRzX190YWJzLWl0ZW0nKSxcbiAgICAgICAgd2Vla3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX190YWJzJyk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vbmV3IERhdGUoXCIyMDIzLTEyLTE0VDIxOjAwOjAwLjAwMFpcIik7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBxdWVzdHM7XG4gICAgbGV0IHVzZXJJbmZvO1xuICAgIGxldCBzZWxlY3RlZFdlZWtUYWJJZDtcblxuICAgIGNvbnN0IHJvTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICAvLyBsZXQgbG9jYWxlID0gJ3JvJztcblxuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdsb2NhbGUnKSB8fCAnZW4nO1xuXG4gICAgZnVuY3Rpb24gc2V0U3RhdGUobmV3TG9jYWxlKSB7XG4gICAgICAgIGxvY2FsZSA9IG5ld0xvY2FsZTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxlJywgbG9jYWxlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9nZ2xlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5ld0xvY2FsZSA9IGxvY2FsZSA9PT0gJ2VuJyA/ICdybycgOiAnZW4nO1xuICAgICAgICBzZXRTdGF0ZShuZXdMb2NhbGUpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVTdGF0ZSgpO1xuXG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdl9fcGFnZVwiKS5jbGFzc0xpc3QuYWRkKGAke2xvY2FsZX1gKVxuICAgIC8vIGlmIChyb0xlbmcpIGxvY2FsZSA9ICdybyc7XG4gICAgLy8gaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBsZXQgdXNlcklkO1xuICAgIHVzZXJJZCA9IDIwNDgwNlxuICAgIC8vIGxldCB1c2VySWQgPSAxMDAzNDAwMjA7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzJyksXG4gICAgICAgICAgICAvLyByZXF1ZXN0KCcvcXVlc3RzJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4gdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBpO1xuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocXVlc3RzKTtcbiAgICAgICAgICAgIC8vIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIC8vIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbylcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MoKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0wN1QyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMjFUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTI4VDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFdlZWtUYWJzKCkge1xuICAgICAgICBzZWxlY3RlZFdlZWtUYWJJZCA9IGNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MoKSAtIDE7XG4gICAgICAgIGlmICghc2VsZWN0ZWRXZWVrVGFiSWQgfHwgc2VsZWN0ZWRXZWVrVGFiSWQgPT09IDApIHsgLy8gcHJvbW8gbm90IHN0YXJ0ZWQgeWV0XG4gICAgICAgICAgICB3ZWVrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgd2Vla1NlbGVjdG9yID0gd2Vla3NTZWxlY3RvcltpXTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFdlZWtUYWJJZCA8IGkpIHtcbiAgICAgICAgICAgICAgICB3ZWVrU2VsZWN0b3IuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKCh3LCBpKSA9PiB7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgdy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFVzZXJzKHdlZWspIHtcbiAgICAgICAgZ2V0VXNlcnMod2VlaykudGhlbih1c2VycyA9PiB7XG4gICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXNlcnMod2Vlaykge1xuICAgICAgICBjb25zdCB1cmwgPSByZXNvbHZlVXNlcnNVcmwod2Vlayk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0KHVybClcbiAgICAgICAgICAgIC50aGVuKHVzZXJzID0+IHVzZXJzLm1hcCh1c2VyT3JJZCA9PiB0eXBlb2YgdXNlck9ySWQgPT09ICdudW1iZXInID8ge3VzZXJpZDogdXNlck9ySWR9IDogdXNlck9ySWQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlVXNlcnNVcmwod2Vlaykge1xuICAgICAgICByZXR1cm4gd2VlayA/IGAvdXNlcnMvJHt3ZWVrfWAgOiAnL3VzZXJzJztcbiAgICB9XG5cblxuICAgIC8vIGZ1bmN0aW9uIHJlZnJlc2hRdWVzdHMocXVlc3RzLCBjdXJyZW50VXNlcikge1xuICAgIC8vICAgICBpZiAoIXF1ZXN0cykge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3Qgc2hpZnQgPSBpc1NlY29uZFdlZWsocXVlc3RzKSA/IDQgOiAwO1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0RGl2cy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgICAgICAgcmVuZGVyUXVlc3QocXVlc3RzW2kgKyBzaGlmdF0sIHF1ZXN0RGl2c1tpXSwgY3VycmVudFVzZXIpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gaXNTZWNvbmRXZWVrKHF1ZXN0cykge1xuICAgIC8vICAgICBjb25zdCBmb3VydGhRdWVzdCA9IHF1ZXN0c1szXTtcbiAgICAvLyAgICAgcmV0dXJuIGZvdXJ0aFF1ZXN0ICYmIGN1cnJlbnREYXRlID4gbmV3IERhdGUoZm91cnRoUXVlc3QuZGF0ZUVuZCk7XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gcmVuZGVyUXVlc3QocXVlc3QsIGNvbnRhaW5lciwgY3VycmVudFVzZXIpIHtcbiAgICAvLyAgICAgaWYgKCFxdWVzdCB8fCAhY29udGFpbmVyKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBxdWVzdE51bSA9IHF1ZXN0LnFOdW1iZXI7XG4gICAgLy8gICAgIC8vY29uc3QgcXVlc3RQb2ludHMgPSB7cG9pbnRzOiAzMDB9O1xuICAgIC8vICAgICBjb25zdCBxdWVzdFBvaW50cyA9IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLnF1ZXN0cyAmJiBjdXJyZW50VXNlci5xdWVzdHMuZmluZChxID0+IHEucXVlc3ROdW0gPT09IHF1ZXN0TnVtKTtcbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgdHJhbnNsYXRpb25zXG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0VGl0bGVEaXYgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJvdXRlX19pdGVtLXRpdGxlJyk7XG4gICAgLy8gICAgIHF1ZXN0VGl0bGVEaXYuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBuYW1lUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvLyAgICAgY29uc3QgcXVlc3RTdWJUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tc3VidGl0bGUnKTtcbiAgICAvLyAgICAgcXVlc3RTdWJUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlIHR5cGUgb2YgcXVlc3RcbiAgICAvLyAgICAgY29uc3QgcXVlc3RUeXBlID0gZ2V0UXVlc3RUeXBlKHF1ZXN0KTtcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nvb24nKTtcbiAgICAvL1xuICAgIC8vICAgICBpZiAocXVlc3RUeXBlID09PSBPTERfUVVFU1RfVFlQRSkge1xuICAgIC8vICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgLy8gICAgIH0gZWxzZSBpZiAocXVlc3RUeXBlID09PSBGVVRVUkVfUVVFU1RfVFlQRSkge1xuICAgIC8vICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nvb24nKTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHRpbWVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudGltZXJUeHQnKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IHBvcHVwVGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpbWUtbnVtJyk7XG4gICAgLy8gICAgICAgICBjb3VudGRvd25UaW1lcihxdWVzdC5kYXRlRW5kLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgIC8vICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApXG4gICAgLy8gICAgICAgICB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlIHN0YXJzXG4gICAgLy8gICAgIGlmIChxdWVzdFBvaW50cykge1xuICAgIC8vICAgICAgICAgY29uc3Qgc3RhckRpdnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnN0YXInKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IHF1ZXN0TGV2ZWwgPSBnZXRRdWVzdExldmVsKHF1ZXN0LCBxdWVzdFBvaW50cy5wb2ludHMgfHwgMCk7XG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0TGV2ZWw7IGkrKykge1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHN0YXIgPSBzdGFyRGl2c1tpXTtcbiAgICAvLyAgICAgICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ19kb25lJyk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGVzIGltYWdlc1xuICAgIC8vICAgICBjb25zdCBzcmNEZXNjID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX2Rlc2MnKTtcbiAgICAvLyAgICAgY29uc3Qgc3JjTW9iID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX21vYicpO1xuICAgIC8vICAgICBjb25zdCBzcmNEZWZhdWx0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX2RlZmF1bHQnKTtcbiAgICAvLyAgICAgc3JjRGVzYy5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctZGVzYy5wbmdgO1xuICAgIC8vICAgICBzcmNNb2Iuc3Jjc2V0ID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLW1vYi5wbmdgO1xuICAgIC8vICAgICBzcmNEZWZhdWx0LnNyYyA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gdXBkYXRlIGJ1dHRvbnNcbiAgICAvLyAgICAgaWYgKHF1ZXN0VHlwZSA9PSBBQ1RJVkVfUVVFU1RfVFlQRSAmJiB1c2VySWQgJiYgIXF1ZXN0UG9pbnRzKSB7XG4gICAgLy8gICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAvLyAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygncmVtb3ZpbmcgcXVlc3QgaGlkZSAnICsgY3VycmVudFVzZXIpXG4gICAgLy8gICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gdXBkYXRlUG9wdXAocXVlc3QsIHF1ZXN0UG9pbnRzKSB7XG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAvLyAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10aXRsZScpO1xuICAgIC8vICAgICB0aXRsZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgLy8gICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X19kZXMtdGV4dCcpO1xuICAgIC8vICAgICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYGRlc2NyUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvLyAgICAgY29uc3QgcXVlc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X190aXRsZScpO1xuICAgIC8vICAgICBxdWVzdE5hbWUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBuYW1lUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBjc3NDbGFzcyA9IHF1ZXN0TnVtICUgMiA9PSAwID8gJ3Nwb3J0JyA6ICdjYXNpbm8nO1xuICAgIC8vICAgICBxdWVzdFBvcHVwLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgIC8vICAgICBxdWVzdFBvcHVwLmNsYXNzTGlzdC5hZGQoYHF1ZXN0LXBvcHVwJHtxdWVzdE51bX1gKTtcbiAgICAvL1xuICAgIC8vICAgICBjb25zdCB1c2VyUG9pbnRzRm9yUXVlc3QgPSBxdWVzdFBvaW50cyA/IHF1ZXN0UG9pbnRzLnBvaW50cyA6IDA7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGxldmVsRGl2ID0gcXVlc3RMZXZlbERpdnNbaV07XG4gICAgLy8gICAgICAgICBjb25zdCBsZXZlbEluZm8gPSBxdWVzdC5sZXZlbHNbaV07XG4gICAgLy8gICAgICAgICBpZiAobGV2ZWxEaXYgJiYgbGV2ZWxJbmZvKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc3VidGl0bGUgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0tc3VidGl0bGUnKTtcbiAgICAvLyAgICAgICAgICAgICBzdWJ0aXRsZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHByaXplUXVlc3QtJHtxdWVzdE51bX1fJHtpICsgMX1gKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBpbmZvVGV4dCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXRleHQnKTtcbiAgICAvLyAgICAgICAgICAgICBpbmZvVGV4dC5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHN0ZXBRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgLy8gcHJvZ3Jlc3MgYmFyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgbGV2ZWxTdGFydFBvaW50cyA9IGkgPT09IDAgPyAwIDogcXVlc3QubGV2ZWxzW2kgLSAxXS5wb2ludHM7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgbGV2ZWxFbmRQb2ludHMgPSBsZXZlbEluZm8ucG9pbnRzO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGxldmVsUG9pbnRzID0gbGV2ZWxFbmRQb2ludHM7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NQb2ludHMgID0gTWF0aC5taW4oTWF0aC5tYXgodXNlclBvaW50c0ZvclF1ZXN0LCAwKSwgbGV2ZWxQb2ludHMpO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzVmFsdWUgPSBwcm9ncmVzc1BvaW50cyAvIGxldmVsUG9pbnRzICogMTAwO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBNYXRoLm1pbihNYXRoLm1heChNYXRoLmZsb29yKHByb2dyZXNzVmFsdWUpLCAwKSwgMTAwKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc0VsZW1lbnQgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0taW5mby1wcm9ncmVzcycpO1xuICAgIC8vICAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC52YWx1ZSA9IG5vcm1hbGl6ZWQ7XG4gICAgLy8gICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LmRhdGFzZXQucHJvZ3Jlc3MgPSBgJHtub3JtYWxpemVkfSVgO1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0RpdiA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAvLyAgICAgICAgICAgICBzdGF0dXNEaXYuaW5uZXJIVE1MID0gYCR7cHJvZ3Jlc3NQb2ludHN9LyR7bGV2ZWxQb2ludHN9YDtcbiAgICAvLyAgICAgICAgICAgICBpZiAodXNlclBvaW50c0ZvclF1ZXN0IDwgbGV2ZWxTdGFydFBvaW50cyB8fCAhdXNlcklkKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHBsYXlCdG4gPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcudG9vay1wYXJ0Jyk7XG4gICAgLy8gICAgICAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZWZyZXNoUHJvZ3Jlc3MoKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBjb3VudGRvd25UaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAvLyAgICAgcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgLy8gICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgIC8vICAgICAgICAgaWYgKHRpbWVEaWZmIDwgMCkge1xuICAgIC8vICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgLy8gICAgICAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCAwLCAwLCAwKTtcbiAgICAvLyAgICAgICAgICAgICBwb3B1cFRpbWVyLmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ3RpbWVyJywgMCwgMCwgMCk7XG4gICAgLy8gICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0sIDEwMDAwKTtcbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRUaW1lKGtleSwgZGF5cywgaG91cnMsIG1pbnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZUtleShrZXkpLnJlcGxhY2UoXCJ7ZGF5fVwiLCBkYXlzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcIntob3VyfVwiLCBob3Vycy50b1N0cmluZygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7bWludXRlc31cIiwgbWludXRlcy50b1N0cmluZygpKTtcbiAgICB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKSB7XG4gICAgLy8gICAgIGNvbnN0IHRhcmdldERhdGUgPSBuZXcgRGF0ZSh0YXJnZXREYXRlU3RyaW5nKTtcbiAgICAvLyAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAvLyAgICAgY29uc3QgdGltZURpZmYgPSB0YXJnZXREYXRlLmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKCk7XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IodGltZURpZmYgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgIC8vICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoKHRpbWVEaWZmICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpO1xuICAgIC8vICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKTtcbiAgICAvL1xuICAgIC8vXG4gICAgLy8gICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCdmaW5pc2hlZFRpbWVyJywgZGF5cywgaG91cnMsIG1pbnV0ZXMpO1xuICAgIC8vICAgICBwb3B1cFRpbWVyLmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ3RpbWVyJywgZGF5cywgaG91cnMsIG1pbnV0ZXMpO1xuICAgIC8vICAgICByZXR1cm4gdGltZURpZmY7XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gZ2V0UXVlc3RMZXZlbChxdWVzdERlZmluaXRpb24sIHBvaW50cykge1xuICAgIC8vICAgICBpZiAoIXF1ZXN0RGVmaW5pdGlvbiB8fCAhcXVlc3REZWZpbml0aW9uLmxldmVscyB8fCBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIDA7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBsZXZlbEluZGV4ID0gcXVlc3REZWZpbml0aW9uLmxldmVscy5maW5kSW5kZXgobGV2ZWwgPT4gcG9pbnRzIDwgbGV2ZWwucG9pbnRzKTtcbiAgICAvLyAgICAgcmV0dXJuIGxldmVsSW5kZXggPT09IC0xID8gcXVlc3REZWZpbml0aW9uLmxldmVscy5sZW5ndGggOiBsZXZlbEluZGV4O1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gZ2V0UXVlc3RUeXBlKHF1ZXN0KSB7XG4gICAgLy8gICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVTdGFydCk7XG4gICAgLy8gICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShxdWVzdC5kYXRlRW5kKTtcbiAgICAvLyAgICAgaWYgKGN1cnJlbnREYXRlIDwgc3RhcnREYXRlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gRlVUVVJFX1FVRVNUX1RZUEU7XG4gICAgLy8gICAgIH0gZWxzZSBpZiAoY3VycmVudERhdGUgPiBlbmREYXRlKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gT0xEX1FVRVNUX1RZUEU7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gQUNUSVZFX1FVRVNUX1RZUEU7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBhZ2UoKSB7XG4gICAgICAgIGlmICh1c2VySWQgJiYgdXJsUGFyYW1zLmhhcyhwYXJ0aWNpcGF0ZVBhcmFtKSkge1xuICAgICAgICAgICAgcGFydGljaXBhdGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoZmFzdFJlZykge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZnVuY3Rpb24gcmVnaXN0ZXJJblF1ZXN0KCkge1xuICAgIC8vICAgICBpZiAoIXVzZXJJZCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcbiAgICAvL1xuICAgIC8vICAgICByZXF1ZXN0KCcvcXVlc3RyZWcnLCB7XG4gICAgLy8gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAvLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAvLyAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgIC8vICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgLy8gICAgICAgICBwb3B1cFBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIC8vICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgY29uc3QgcmVuZGVyVXNlcnMgPSAodXNlcnMpID0+IHtcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRvcFVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHRvcFVzZXJzLCB1c2VySWQsIHRvcFJlc3VsdHNUYWJsZSwgdXNlcnMpO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJJZCAmJiB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IHVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgJiYgdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcik7XG5cbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzO1xuXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRVc2VySW5kZXggfHwgY3VycmVudFVzZXJJbmRleCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKDEwLCAxMyk7XG4gICAgICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoY3VycmVudFVzZXJJbmRleCAtIDEsIDEwKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3RoZXJVc2VycyAmJiBvdGhlclVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZShvdGhlclVzZXJzLCB1c2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIHRhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tDdXJyZW50VXNlciA9IGN1cnJlbnRVc2VySWQgJiYgY3VycmVudFVzZXJJZCA9PT0gdXNlci51c2VyaWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ195b3VyUGxhY2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChwcml6ZVBsYWNlQ3NzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSlcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiICR7Y2hlY2tDdXJyZW50VXNlcn0+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtjaGVja0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtNYXRoLmZsb29yKHVzZXIucG9pbnRzKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA+PSAxMSAmJiBwbGFjZSA8PSAxNSl7XG4gICAgICAgICAgICByZXR1cm4gIGBwcml6ZV8xMS0xNWBcbiAgICAgICAgfWVsc2UgaWYgKHBsYWNlID49IDE2ICYmIHBsYWNlIDw9IDIwKXtcbiAgICAgICAgICAgIHJldHVybiAgYHByaXplXzE2LTIwYFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSg0KTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgbGV0IG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdl9fcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cnKSwgMTAwMCk7XG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gZm9yIHRlc3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG5cbiAgICBsZXQgd2VlayA9IDFcblxuICAgIGNvbnN0IGdhbWVXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lX19ob3VzZVwiKSxcbiAgICAgICAgICB3ZWVrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrLWJ0blwiKTtcblxuICAgIHdlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih3ZWVrID49IDQpIHtcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHdlZWsgPSAxXG4gICAgICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QucmVtb3ZlKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgIHdlZWsrK1xuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgfSlcblxuXG59KSgpO1xuIiwiIl19
