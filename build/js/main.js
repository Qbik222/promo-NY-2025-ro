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
  var selectedWeekTabId = 0;
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
  // let userId;
  var userId = 100340020;
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

  function updatePopup(quest, questPoints) {
    var questNum = quest.qNumber;
    var title = document.querySelector('.quest__des-title');
    title.innerHTML = translateKey("quest-".concat(questNum));
    var description = document.querySelector('.quest__des-text');
    description.innerHTML = translateKey("descrQuest-".concat(questNum));
    var questName = document.querySelector('.quest__title');
    questName.innerHTML = translateKey("nameQuest-".concat(questNum));
    var cssClass = questNum % 2 == 0 ? 'sport' : 'casino';
    questPopup.classList.add(cssClass);
    questPopup.classList.add("quest-popup".concat(questNum));
    var userPointsForQuest = questPoints ? questPoints.points : 0;
    for (var i = 0; i < questLevelDivs.length; i++) {
      var levelDiv = questLevelDivs[i];
      var levelInfo = quest.levels[i];
      if (levelDiv && levelInfo) {
        var subtitle = levelDiv.querySelector('.quest__item-subtitle');
        subtitle.innerHTML = translateKey("prizeQuest-".concat(questNum, "_").concat(i + 1));
        var infoText = levelDiv.querySelector('.quest__item-info-text');
        infoText.innerHTML = translateKey("stepQuest-".concat(questNum, "_").concat(i + 1));

        // progress bar
        var levelStartPoints = i === 0 ? 0 : quest.levels[i - 1].points;
        var levelEndPoints = levelInfo.points;
        var levelPoints = levelEndPoints;
        var progressPoints = Math.min(Math.max(userPointsForQuest, 0), levelPoints);
        var progressValue = progressPoints / levelPoints * 100;
        var normalized = Math.min(Math.max(Math.floor(progressValue), 0), 100);
        var progressElement = levelDiv.querySelector('.quest__item-info-progress');
        progressElement.value = normalized;
        progressElement.dataset.progress = "".concat(normalized, "%");
        var statusDiv = levelDiv.querySelector('.status');
        statusDiv.innerHTML = "".concat(progressPoints, "/").concat(levelPoints);
        if (userPointsForQuest < levelStartPoints || !userId) {
          var _playBtn = levelDiv.querySelector('.took-part');
          _playBtn.classList.add('hide');
        }
      }
    }
    refreshProgress();
  }
  function countdownTimer(targetDateString, timerElement, popupTimer) {
    refreshTimer(targetDateString, timerElement, popupTimer);
    var intervalId = setInterval(function () {
      var timeDiff = refreshTimer(targetDateString, timerElement, popupTimer);
      if (timeDiff < 0) {
        clearInterval(intervalId);
        timerElement.innerHTML = formatTime('finishedTimer', 0, 0, 0);
        popupTimer.innerHTML = formatTime('timer', 0, 0, 0);
        location.reload();
      }
    }, 10000);
  }
  function formatTime(key, days, hours, minutes) {
    return translateKey(key).replace("{day}", days.toString()).replace("{hour}", hours.toString()).replace("{minutes}", minutes.toString());
  }
  function refreshTimer(targetDateString, timerElement, popupTimer) {
    var targetDate = new Date(targetDateString);
    var now = new Date();
    var timeDiff = targetDate.getTime() - now.getTime();
    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(timeDiff % (1000 * 60 * 60) / (1000 * 60));
    timerElement.innerHTML = formatTime('finishedTimer', days, hours, minutes);
    popupTimer.innerHTML = formatTime('timer', days, hours, minutes);
    return timeDiff;
  }
  function getQuestLevel(questDefinition, points) {
    if (!questDefinition || !questDefinition.levels || questDefinition.levels.length === 0) {
      return 0;
    }
    var levelIndex = questDefinition.levels.findIndex(function (level) {
      return points < level.points;
    });
    return levelIndex === -1 ? questDefinition.levels.length : levelIndex;
  }
  function getQuestType(quest) {
    var startDate = new Date(quest.dateStart);
    var endDate = new Date(quest.dateEnd);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsInJvTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInNldFN0YXRlIiwibmV3TG9jYWxlIiwic2V0SXRlbSIsInRvZ2dsZVN0YXRlIiwicmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJyZW1vdmUiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImRldGFpbHMiLCJpdGVtIiwiSW5pdFBhZ2UiLCJxdWVzdFN0YXJ0QnRuIiwiZSIsInJlZ2lzdGVySW5RdWVzdCIsInciLCJpIiwicyIsInJlZnJlc2hVc2VycyIsImNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MiLCJkYXRlIiwibm93IiwicmVmcmVzaFdlZWtUYWJzIiwid2Vla1NlbGVjdG9yIiwid2VlayIsImdldFVzZXJzIiwicmVuZGVyVXNlcnMiLCJ1cmwiLCJyZXNvbHZlVXNlcnNVcmwiLCJtYXAiLCJ1c2VyT3JJZCIsInVzZXJpZCIsInVwZGF0ZVBvcHVwIiwicXVlc3QiLCJxdWVzdFBvaW50cyIsInF1ZXN0TnVtIiwicU51bWJlciIsInRpdGxlIiwidHJhbnNsYXRlS2V5IiwiZGVzY3JpcHRpb24iLCJxdWVzdE5hbWUiLCJjc3NDbGFzcyIsInVzZXJQb2ludHNGb3JRdWVzdCIsInBvaW50cyIsImxldmVsRGl2IiwibGV2ZWxJbmZvIiwibGV2ZWxzIiwic3VidGl0bGUiLCJpbmZvVGV4dCIsImxldmVsU3RhcnRQb2ludHMiLCJsZXZlbEVuZFBvaW50cyIsImxldmVsUG9pbnRzIiwicHJvZ3Jlc3NQb2ludHMiLCJNYXRoIiwibWluIiwibWF4IiwicHJvZ3Jlc3NWYWx1ZSIsIm5vcm1hbGl6ZWQiLCJmbG9vciIsInByb2dyZXNzRWxlbWVudCIsInZhbHVlIiwiZGF0YXNldCIsInByb2dyZXNzIiwic3RhdHVzRGl2IiwicmVmcmVzaFByb2dyZXNzIiwiY291bnRkb3duVGltZXIiLCJ0YXJnZXREYXRlU3RyaW5nIiwidGltZXJFbGVtZW50IiwicG9wdXBUaW1lciIsInJlZnJlc2hUaW1lciIsImludGVydmFsSWQiLCJzZXRJbnRlcnZhbCIsInRpbWVEaWZmIiwiY2xlYXJJbnRlcnZhbCIsImZvcm1hdFRpbWUiLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwicmVwbGFjZSIsInRvU3RyaW5nIiwidGFyZ2V0RGF0ZSIsImdldFRpbWUiLCJnZXRRdWVzdExldmVsIiwicXVlc3REZWZpbml0aW9uIiwibGV2ZWxJbmRleCIsImZpbmRJbmRleCIsImxldmVsIiwiZ2V0UXVlc3RUeXBlIiwic3RhcnREYXRlIiwiZGF0ZVN0YXJ0IiwiZW5kRGF0ZSIsImRhdGVFbmQiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRvcFVzZXJzIiwic2xpY2UiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlciIsImZpbmQiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsImFwcGVuZCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsImVyciIsImYiLCJyZWZyZXNoUXVlc3RzIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsInBhcnRpY2lwYXRlQnRuIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIm1haW5QYWdlIiwic2V0VGltZW91dCIsInJ1bGVzSXRlbXMiLCJ0b2dnbGUiLCJnYW1lV3JhcCIsIndlZWtCdG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLG9DQUFvQztFQUNuRCxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsZUFBZSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQzdELElBQU1DLGdCQUFnQixHQUFHLEtBQUs7RUFFOUIsSUFBTUMsaUJBQWlCLEdBQUcsUUFBUTtJQUM5QkMsY0FBYyxHQUFHLEtBQUs7SUFDdEJDLGlCQUFpQixHQUFHLFFBQVE7RUFFaEMsSUFDSUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBQ3ZFQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUN0REMsVUFBVSxHQUFHSixRQUFRLENBQUNLLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsZUFBZSxHQUFHTixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN4REUsbUJBQW1CLEdBQUdQLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUM5REssWUFBWSxHQUFHUixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REksU0FBUyxHQUFHVCxRQUFRLENBQUNLLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztJQUNyREssT0FBTyxHQUFHVixRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDL0NVLGNBQWMsR0FBR1gsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFD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QUFFLFlBQUs7SUFDbkMsSUFBRytELElBQUksSUFBSSxDQUFDLEVBQUU7TUFDVmdJLFFBQVEsQ0FBQzlMLFNBQVMsQ0FBQ2tDLE1BQU0sUUFBQWhDLE1BQUEsQ0FBUTRELElBQUksQ0FBRSxDQUFDO01BQ3hDQSxJQUFJLEdBQUcsQ0FBQztNQUNSZ0ksUUFBUSxDQUFDOUwsU0FBUyxDQUFDQyxHQUFHLFFBQUFDLE1BQUEsQ0FBUTRELElBQUksQ0FBRSxDQUFDO01BQ3JDO0lBQ0o7SUFDQWdJLFFBQVEsQ0FBQzlMLFNBQVMsQ0FBQ2tDLE1BQU0sUUFBQWhDLE1BQUEsQ0FBUTRELElBQUksQ0FBRSxDQUFDO0lBQ3hDQSxJQUFJLEVBQUU7SUFDTmdJLFFBQVEsQ0FBQzlMLFNBQVMsQ0FBQ0MsR0FBRyxRQUFBQyxNQUFBLENBQVE0RCxJQUFJLENBQUUsQ0FBQztFQUN6QyxDQUFDLENBQUM7QUFHTixDQUFDLEVBQUUsQ0FBQztBQ3ZtQkoiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV9zYW1fcm8nO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcGFydGljaXBhdGVQYXJhbSA9ICdyZWcnO1xuXG4gICAgY29uc3QgRlVUVVJFX1FVRVNUX1RZUEUgPSAnZnV0dXJlJyxcbiAgICAgICAgT0xEX1FVRVNUX1RZUEUgPSAnb2xkJyxcbiAgICAgICAgQUNUSVZFX1FVRVNUX1RZUEUgPSAnYWN0aXZlJztcblxuICAgIGNvbnN0XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fYm9keS1vdGhlcicpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcXVlc3REaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyksXG4gICAgICAgIHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QtcGxheScpLFxuICAgICAgICBxdWVzdFN0YXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdEJ0bicpLFxuICAgICAgICBxdWVzdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0JyksXG4gICAgICAgIHF1ZXN0TGV2ZWxEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJyksXG4gICAgICAgIHBvcHVwUGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maXJzdFBsYXknKSxcbiAgICAgICAgd2Vla3NTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZVJlc3VsdHNfX3RhYnMtaXRlbScpLFxuICAgICAgICB3ZWVrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX3RhYnMnKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy9uZXcgRGF0ZShcIjIwMjMtMTItMTRUMjE6MDA6MDAuMDAwWlwiKTtcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IHF1ZXN0cztcbiAgICBsZXQgdXNlckluZm87XG4gICAgbGV0IHNlbGVjdGVkV2Vla1RhYklkID0gMDtcblxuICAgIGNvbnN0IHJvTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICAvLyBsZXQgbG9jYWxlID0gJ3JvJztcblxuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdsb2NhbGUnKSB8fCAnZW4nO1xuXG4gICAgZnVuY3Rpb24gc2V0U3RhdGUobmV3TG9jYWxlKSB7XG4gICAgICAgIGxvY2FsZSA9IG5ld0xvY2FsZTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxlJywgbG9jYWxlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9nZ2xlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5ld0xvY2FsZSA9IGxvY2FsZSA9PT0gJ2VuJyA/ICdybycgOiAnZW4nO1xuICAgICAgICBzZXRTdGF0ZShuZXdMb2NhbGUpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVTdGF0ZSgpO1xuXG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdl9fcGFnZVwiKS5jbGFzc0xpc3QuYWRkKGAke2xvY2FsZX1gKVxuICAgIC8vIGlmIChyb0xlbmcpIGxvY2FsZSA9ICdybyc7XG4gICAgLy8gaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICAvLyBsZXQgdXNlcklkO1xuICAgIGxldCB1c2VySWQgPSAxMDAzNDAwMjA7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGUgaXMgd29ya2luZ1wiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzJyksXG4gICAgICAgICAgICAvLyByZXF1ZXN0KCcvcXVlc3RzJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHsgcmVnaXN0ZXJJblF1ZXN0KCk7IH0pKTtcbiAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKCh3LCBpKSA9PiB3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc2VsZWN0ZWRXZWVrVGFiSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2gocyA9PiBzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgICAgIHcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBzZWxlY3RlZFdlZWtUYWJJZCA9IGk7XG4gICAgICAgICAgICByZWZyZXNoVXNlcnMoc2VsZWN0ZWRXZWVrVGFiSWQgKyAxKTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZWZyZXNoVXNlcnMoc2VsZWN0ZWRXZWVrVGFiSWQgKyAxKTtcbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdO1xuICAgICAgICAgICAgcXVlc3RzID0gKHJlc1sxXSB8fCBbXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhxdWVzdHMpO1xuICAgICAgICAgICAgLy8gcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKVxuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgICAgIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTA3VDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0yMVQyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMjhUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiByZWZyZXNoV2Vla1RhYnMoKSB7XG4gICAgICAgIHNlbGVjdGVkV2Vla1RhYklkID0gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpIC0gMTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFdlZWtUYWJJZCB8fCBzZWxlY3RlZFdlZWtUYWJJZCA9PT0gMCkgeyAvLyBwcm9tbyBub3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgICAgIHdlZWtzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrU2VsZWN0b3IgPSB3ZWVrc1NlbGVjdG9yW2ldO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkV2Vla1RhYklkIDwgaSkge1xuICAgICAgICAgICAgICAgIHdlZWtTZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2goKHcsIGkpID0+IHtcbiAgICAgICAgICAgIHcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc2VsZWN0ZWRXZWVrVGFiSWQpIHtcbiAgICAgICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoVXNlcnMod2Vlaykge1xuICAgICAgICBnZXRVc2Vycyh3ZWVrKS50aGVuKHVzZXJzID0+IHtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlc29sdmVVc2Vyc1VybCh3ZWVrKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QodXJsKVxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMubWFwKHVzZXJPcklkID0+IHR5cGVvZiB1c2VyT3JJZCA9PT0gJ251bWJlcicgPyB7dXNlcmlkOiB1c2VyT3JJZH0gOiB1c2VyT3JJZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVVc2Vyc1VybCh3ZWVrKSB7XG4gICAgICAgIHJldHVybiB3ZWVrID8gYC91c2Vycy8ke3dlZWt9YCA6ICcvdXNlcnMnO1xuICAgIH1cblxuXG4gICAgLy8gZnVuY3Rpb24gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIGN1cnJlbnRVc2VyKSB7XG4gICAgLy8gICAgIGlmICghcXVlc3RzKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBzaGlmdCA9IGlzU2Vjb25kV2VlayhxdWVzdHMpID8gNCA6IDA7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3REaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgICAgICByZW5kZXJRdWVzdChxdWVzdHNbaSArIHNoaWZ0XSwgcXVlc3REaXZzW2ldLCBjdXJyZW50VXNlcik7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBpc1NlY29uZFdlZWsocXVlc3RzKSB7XG4gICAgLy8gICAgIGNvbnN0IGZvdXJ0aFF1ZXN0ID0gcXVlc3RzWzNdO1xuICAgIC8vICAgICByZXR1cm4gZm91cnRoUXVlc3QgJiYgY3VycmVudERhdGUgPiBuZXcgRGF0ZShmb3VydGhRdWVzdC5kYXRlRW5kKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiByZW5kZXJRdWVzdChxdWVzdCwgY29udGFpbmVyLCBjdXJyZW50VXNlcikge1xuICAgIC8vICAgICBpZiAoIXF1ZXN0IHx8ICFjb250YWluZXIpIHtcbiAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAvLyAgICAgLy9jb25zdCBxdWVzdFBvaW50cyA9IHtwb2ludHM6IDMwMH07XG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0UG9pbnRzID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIucXVlc3RzICYmIGN1cnJlbnRVc2VyLnF1ZXN0cy5maW5kKHEgPT4gcS5xdWVzdE51bSA9PT0gcXVlc3ROdW0pO1xuICAgIC8vXG4gICAgLy8gICAgIC8vIHVwZGF0ZSB0cmFuc2xhdGlvbnNcbiAgICAvLyAgICAgY29uc3QgcXVlc3RUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tdGl0bGUnKTtcbiAgICAvLyAgICAgcXVlc3RUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgIC8vICAgICBjb25zdCBxdWVzdFN1YlRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS1zdWJ0aXRsZScpO1xuICAgIC8vICAgICBxdWVzdFN1YlRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgdHlwZSBvZiBxdWVzdFxuICAgIC8vICAgICBjb25zdCBxdWVzdFR5cGUgPSBnZXRRdWVzdFR5cGUocXVlc3QpO1xuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc29vbicpO1xuICAgIC8vXG4gICAgLy8gICAgIGlmIChxdWVzdFR5cGUgPT09IE9MRF9RVUVTVF9UWVBFKSB7XG4gICAgLy8gICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAvLyAgICAgfSBlbHNlIGlmIChxdWVzdFR5cGUgPT09IEZVVFVSRV9RVUVTVF9UWVBFKSB7XG4gICAgLy8gICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc29vbicpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgY29uc3QgdGltZXJFbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50aW1lclR4dCcpO1xuICAgIC8vICAgICAgICAgY29uc3QgcG9wdXBUaW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGltZS1udW0nKTtcbiAgICAvLyAgICAgICAgIGNvdW50ZG93blRpbWVyKHF1ZXN0LmRhdGVFbmQsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgLy8gICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYClcbiAgICAvLyAgICAgICAgIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cyk7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgc3RhcnNcbiAgICAvLyAgICAgaWYgKHF1ZXN0UG9pbnRzKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBzdGFyRGl2cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpO1xuICAgIC8vICAgICAgICAgY29uc3QgcXVlc3RMZXZlbCA9IGdldFF1ZXN0TGV2ZWwocXVlc3QsIHF1ZXN0UG9pbnRzLnBvaW50cyB8fCAwKTtcbiAgICAvLyAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbDsgaSsrKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc3RhciA9IHN0YXJEaXZzW2ldO1xuICAgIC8vICAgICAgICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIC8vIHVwZGF0ZXMgaW1hZ2VzXG4gICAgLy8gICAgIGNvbnN0IHNyY0Rlc2MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVzYycpO1xuICAgIC8vICAgICBjb25zdCBzcmNNb2IgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fbW9iJyk7XG4gICAgLy8gICAgIGNvbnN0IHNyY0RlZmF1bHQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVmYXVsdCcpO1xuICAgIC8vICAgICBzcmNEZXNjLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgLy8gICAgIHNyY01vYi5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctbW9iLnBuZ2A7XG4gICAgLy8gICAgIHNyY0RlZmF1bHQuc3JjID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgYnV0dG9uc1xuICAgIC8vICAgICBpZiAocXVlc3RUeXBlID09IEFDVElWRV9RVUVTVF9UWVBFICYmIHVzZXJJZCAmJiAhcXVlc3RQb2ludHMpIHtcbiAgICAvLyAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIC8vICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW1vdmluZyBxdWVzdCBoaWRlICcgKyBjdXJyZW50VXNlcilcbiAgICAvLyAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpIHtcbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10ZXh0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgZGVzY3JRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpdGxlJyk7XG4gICAgICAgIHF1ZXN0TmFtZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gcXVlc3ROdW0gJSAyID09IDAgPyAnc3BvcnQnIDogJ2Nhc2lubyc7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChgcXVlc3QtcG9wdXAke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IHVzZXJQb2ludHNGb3JRdWVzdCA9IHF1ZXN0UG9pbnRzID8gcXVlc3RQb2ludHMucG9pbnRzIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxEaXYgPSBxdWVzdExldmVsRGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHF1ZXN0LmxldmVsc1tpXTtcbiAgICAgICAgICAgIGlmIChsZXZlbERpdiAmJiBsZXZlbEluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcHJpemVRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm9UZXh0ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGluZm9UZXh0LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgc3RlcFF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFN0YXJ0UG9pbnRzID0gaSA9PT0gMCA/IDAgOiBxdWVzdC5sZXZlbHNbaSAtIDFdLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbEVuZFBvaW50cyA9IGxldmVsSW5mby5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxQb2ludHMgPSBsZXZlbEVuZFBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1BvaW50cyAgPSBNYXRoLm1pbihNYXRoLm1heCh1c2VyUG9pbnRzRm9yUXVlc3QsIDApLCBsZXZlbFBvaW50cyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzUG9pbnRzIC8gbGV2ZWxQb2ludHMgKiAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IocHJvZ3Jlc3NWYWx1ZSksIDApLCAxMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzRWxlbWVudCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXByb2dyZXNzJyk7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LnZhbHVlID0gbm9ybWFsaXplZDtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQuZGF0YXNldC5wcm9ncmVzcyA9IGAke25vcm1hbGl6ZWR9JWA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzRGl2ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICAgICAgICAgIHN0YXR1c0Rpdi5pbm5lckhUTUwgPSBgJHtwcm9ncmVzc1BvaW50c30vJHtsZXZlbFBvaW50c31gO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyUG9pbnRzRm9yUXVlc3QgPCBsZXZlbFN0YXJ0UG9pbnRzIHx8ICF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheUJ0biA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy50b29rLXBhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50ZG93blRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVEaWZmID0gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBpZiAodGltZURpZmYgPCAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFRpbWUoa2V5LCBkYXlzLCBob3VycywgbWludXRlcykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KGtleSkucmVwbGFjZShcIntkYXl9XCIsIGRheXMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie2hvdXJ9XCIsIGhvdXJzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcInttaW51dGVzfVwiLCBtaW51dGVzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKHRhcmdldERhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHRhcmdldERhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcih0aW1lRGlmZiAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xuXG5cbiAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHJldHVybiB0aW1lRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdExldmVsKHF1ZXN0RGVmaW5pdGlvbiwgcG9pbnRzKSB7XG4gICAgICAgIGlmICghcXVlc3REZWZpbml0aW9uIHx8ICFxdWVzdERlZmluaXRpb24ubGV2ZWxzIHx8IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxldmVsSW5kZXggPSBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmZpbmRJbmRleChsZXZlbCA9PiBwb2ludHMgPCBsZXZlbC5wb2ludHMpO1xuICAgICAgICByZXR1cm4gbGV2ZWxJbmRleCA9PT0gLTEgPyBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA6IGxldmVsSW5kZXg7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdFR5cGUocXVlc3QpIHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZVN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVFbmQpO1xuICAgICAgICBpZiAoY3VycmVudERhdGUgPCBzdGFydERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBGVVRVUkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPTERfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBQ1RJVkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckluUXVlc3QoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy9xdWVzdHJlZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7Y2hlY2tDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7TWF0aC5mbG9vcih1c2VyLnBvaW50cyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0yMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIwMS0zMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzMwMS00MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQwMS01MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUwMS02MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYwMS02NTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzY1MS03MDBgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDQpO1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgbGV0IG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdl9fcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cnKSwgMTAwMCk7XG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gZm9yIHRlc3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG5cbiAgICBsZXQgd2VlayA9IDFcblxuICAgIGNvbnN0IGdhbWVXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lX19ob3VzZVwiKSxcbiAgICAgICAgICB3ZWVrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrLWJ0blwiKTtcblxuICAgIHdlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih3ZWVrID49IDQpIHtcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHdlZWsgPSAxXG4gICAgICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QucmVtb3ZlKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgIHdlZWsrK1xuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgfSlcblxuXG59KSgpO1xuIiwiIl19
