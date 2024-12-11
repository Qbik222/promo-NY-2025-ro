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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJzZWxlY3RlZFdlZWtUYWJJZCIsInJvTGVuZyIsImVuTGVuZyIsImxvY2FsZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInNldFN0YXRlIiwibmV3TG9jYWxlIiwic2V0SXRlbSIsInRvZ2dsZVN0YXRlIiwicmVsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsIlBSSVpFU19DU1MiLCJpMThuRGF0YSIsInVzZXJJZCIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJyZW1vdmUiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImRldGFpbHMiLCJpdGVtIiwiSW5pdFBhZ2UiLCJxdWVzdFN0YXJ0QnRuIiwiZSIsInJlZ2lzdGVySW5RdWVzdCIsInciLCJpIiwicyIsInJlZnJlc2hVc2VycyIsImNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MiLCJkYXRlIiwibm93IiwicmVmcmVzaFdlZWtUYWJzIiwid2Vla1NlbGVjdG9yIiwid2VlayIsImdldFVzZXJzIiwicmVuZGVyVXNlcnMiLCJ1cmwiLCJyZXNvbHZlVXNlcnNVcmwiLCJtYXAiLCJ1c2VyT3JJZCIsInVzZXJpZCIsInVwZGF0ZVBvcHVwIiwicXVlc3QiLCJxdWVzdFBvaW50cyIsInF1ZXN0TnVtIiwicU51bWJlciIsInRpdGxlIiwidHJhbnNsYXRlS2V5IiwiZGVzY3JpcHRpb24iLCJxdWVzdE5hbWUiLCJjc3NDbGFzcyIsInVzZXJQb2ludHNGb3JRdWVzdCIsInBvaW50cyIsImxldmVsRGl2IiwibGV2ZWxJbmZvIiwibGV2ZWxzIiwic3VidGl0bGUiLCJpbmZvVGV4dCIsImxldmVsU3RhcnRQb2ludHMiLCJsZXZlbEVuZFBvaW50cyIsImxldmVsUG9pbnRzIiwicHJvZ3Jlc3NQb2ludHMiLCJNYXRoIiwibWluIiwibWF4IiwicHJvZ3Jlc3NWYWx1ZSIsIm5vcm1hbGl6ZWQiLCJmbG9vciIsInByb2dyZXNzRWxlbWVudCIsInZhbHVlIiwiZGF0YXNldCIsInByb2dyZXNzIiwic3RhdHVzRGl2IiwicmVmcmVzaFByb2dyZXNzIiwiY291bnRkb3duVGltZXIiLCJ0YXJnZXREYXRlU3RyaW5nIiwidGltZXJFbGVtZW50IiwicG9wdXBUaW1lciIsInJlZnJlc2hUaW1lciIsImludGVydmFsSWQiLCJzZXRJbnRlcnZhbCIsInRpbWVEaWZmIiwiY2xlYXJJbnRlcnZhbCIsImZvcm1hdFRpbWUiLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwicmVwbGFjZSIsInRvU3RyaW5nIiwidGFyZ2V0RGF0ZSIsImdldFRpbWUiLCJnZXRRdWVzdExldmVsIiwicXVlc3REZWZpbml0aW9uIiwibGV2ZWxJbmRleCIsImZpbmRJbmRleCIsImxldmVsIiwiZ2V0UXVlc3RUeXBlIiwic3RhcnREYXRlIiwiZGF0ZVN0YXJ0IiwiZW5kRGF0ZSIsImRhdGVFbmQiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRvcFVzZXJzIiwic2xpY2UiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlciIsImZpbmQiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsImFwcGVuZCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsImVyciIsImYiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwicGFydGljaXBhdGVCdG4iLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwibWFpblBhZ2UiLCJzZXRUaW1lb3V0IiwicnVsZXNJdGVtcyIsInRvZ2dsZSIsImdhbWVXcmFwIiwid2Vla0J0biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFDVCxJQUFNQSxNQUFNLEdBQUcsb0NBQW9DO0VBQ25ELElBQU1DLFNBQVMsR0FBRyxJQUFJQyxlQUFlLENBQUNDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7RUFDN0QsSUFBTUMsZ0JBQWdCLEdBQUcsS0FBSztFQUU5QixJQUFNQyxpQkFBaUIsR0FBRyxRQUFRO0lBQzlCQyxjQUFjLEdBQUcsS0FBSztJQUN0QkMsaUJBQWlCLEdBQUcsUUFBUTtFQUVoQyxJQUNJQyxpQkFBaUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsMkJBQTJCLENBQUM7SUFDdkVDLGVBQWUsR0FBR0YsUUFBUSxDQUFDRyxjQUFjLENBQUMsV0FBVyxDQUFDO0lBQ3REQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxlQUFlLEdBQUdOLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3hERSxtQkFBbUIsR0FBR1AsUUFBUSxDQUFDRyxjQUFjLENBQUMsZUFBZSxDQUFDO0lBQzlESyxZQUFZLEdBQUdSLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RESSxTQUFTLEdBQUdULFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsY0FBYyxDQUFDO0lBQ3JESyxPQUFPLEdBQUdWLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUMvQ1UsY0FBYyxHQUFHWCxRQUFRLENBQUNLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN2RE8sVUFBVSxHQUFHWixR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LENBQUNrQyxNQUFNLFFBQUFoQyxNQUFBLENBQVE0RCxJQUFJLENBQUUsQ0FBQztNQUN4Q0EsSUFBSSxHQUFHLENBQUM7TUFDUitILFFBQVEsQ0FBQzdMLFNBQVMsQ0FBQ0MsR0FBRyxRQUFBQyxNQUFBLENBQVE0RCxJQUFJLENBQUUsQ0FBQztNQUNyQztJQUNKO0lBQ0ErSCxRQUFRLENBQUM3TCxTQUFTLENBQUNrQyxNQUFNLFFBQUFoQyxNQUFBLENBQVE0RCxJQUFJLENBQUUsQ0FBQztJQUN4Q0EsSUFBSSxFQUFFO0lBQ04rSCxRQUFRLENBQUM3TCxTQUFTLENBQUNDLEdBQUcsUUFBQUMsTUFBQSxDQUFRNEQsSUFBSSxDQUFFLENBQUM7RUFDekMsQ0FBQyxDQUFDO0FBR04sQ0FBQyxFQUFFLENBQUM7QUN0bUJKIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbnlfc2FtX3JvJztcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHBhcnRpY2lwYXRlUGFyYW0gPSAncmVnJztcblxuICAgIGNvbnN0IEZVVFVSRV9RVUVTVF9UWVBFID0gJ2Z1dHVyZScsXG4gICAgICAgIE9MRF9RVUVTVF9UWVBFID0gJ29sZCcsXG4gICAgICAgIEFDVElWRV9RVUVTVF9UWVBFID0gJ2FjdGl2ZSc7XG5cbiAgICBjb25zdFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2JvZHktb3RoZXInKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC11c2VycycpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZWRpcmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIHF1ZXN0RGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpLFxuICAgICAgICBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0LXBsYXknKSxcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RCdG4nKSxcbiAgICAgICAgcXVlc3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdCcpLFxuICAgICAgICBxdWVzdExldmVsRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpLFxuICAgICAgICBwb3B1cFBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlyc3RQbGF5JyksXG4gICAgICAgIHdlZWtzU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVSZXN1bHRzX190YWJzLWl0ZW0nKSxcbiAgICAgICAgd2Vla3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX190YWJzJyk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vbmV3IERhdGUoXCIyMDIzLTEyLTE0VDIxOjAwOjAwLjAwMFpcIik7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBxdWVzdHM7XG4gICAgbGV0IHVzZXJJbmZvO1xuICAgIGxldCBzZWxlY3RlZFdlZWtUYWJJZDtcblxuICAgIGNvbnN0IHJvTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICAvLyBsZXQgbG9jYWxlID0gJ3JvJztcblxuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdsb2NhbGUnKSB8fCAnZW4nO1xuXG4gICAgZnVuY3Rpb24gc2V0U3RhdGUobmV3TG9jYWxlKSB7XG4gICAgICAgIGxvY2FsZSA9IG5ld0xvY2FsZTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxlJywgbG9jYWxlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9nZ2xlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5ld0xvY2FsZSA9IGxvY2FsZSA9PT0gJ2VuJyA/ICdybycgOiAnZW4nO1xuICAgICAgICBzZXRTdGF0ZShuZXdMb2NhbGUpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVTdGF0ZSgpO1xuXG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdl9fcGFnZVwiKS5jbGFzc0xpc3QuYWRkKGAke2xvY2FsZX1gKVxuICAgIC8vIGlmIChyb0xlbmcpIGxvY2FsZSA9ICdybyc7XG4gICAgLy8gaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICAvLyBsZXQgdXNlcklkO1xuICAgIGxldCB1c2VySWQgPSAxMDAzNDAwMjA7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGUgaXMgd29ya2luZ1wiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzJyksXG4gICAgICAgICAgICAvLyByZXF1ZXN0KCcvcXVlc3RzJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHsgcmVnaXN0ZXJJblF1ZXN0KCk7IH0pKTtcbiAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKCh3LCBpKSA9PiB3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc2VsZWN0ZWRXZWVrVGFiSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2gocyA9PiBzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgICAgIHcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBzZWxlY3RlZFdlZWtUYWJJZCA9IGk7XG4gICAgICAgICAgICByZWZyZXNoVXNlcnMoc2VsZWN0ZWRXZWVrVGFiSWQgKyAxKTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZWZyZXNoVXNlcnMoc2VsZWN0ZWRXZWVrVGFiSWQgKyAxKTtcbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdO1xuICAgICAgICAgICAgcXVlc3RzID0gKHJlc1sxXSB8fCBbXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhxdWVzdHMpO1xuICAgICAgICAgICAgLy8gcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKVxuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgICAgIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTA3VDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0yMVQyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMjhUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiByZWZyZXNoV2Vla1RhYnMoKSB7XG4gICAgICAgIHNlbGVjdGVkV2Vla1RhYklkID0gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpIC0gMTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFdlZWtUYWJJZCB8fCBzZWxlY3RlZFdlZWtUYWJJZCA9PT0gMCkgeyAvLyBwcm9tbyBub3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgICAgIHdlZWtzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrU2VsZWN0b3IgPSB3ZWVrc1NlbGVjdG9yW2ldO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkV2Vla1RhYklkIDwgaSkge1xuICAgICAgICAgICAgICAgIHdlZWtTZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2goKHcsIGkpID0+IHtcbiAgICAgICAgICAgIHcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc2VsZWN0ZWRXZWVrVGFiSWQpIHtcbiAgICAgICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoVXNlcnMod2Vlaykge1xuICAgICAgICBnZXRVc2Vycyh3ZWVrKS50aGVuKHVzZXJzID0+IHtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlc29sdmVVc2Vyc1VybCh3ZWVrKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QodXJsKVxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMubWFwKHVzZXJPcklkID0+IHR5cGVvZiB1c2VyT3JJZCA9PT0gJ251bWJlcicgPyB7dXNlcmlkOiB1c2VyT3JJZH0gOiB1c2VyT3JJZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVVc2Vyc1VybCh3ZWVrKSB7XG4gICAgICAgIHJldHVybiB3ZWVrID8gYC91c2Vycy8ke3dlZWt9YCA6ICcvdXNlcnMnO1xuICAgIH1cblxuXG4gICAgLy8gZnVuY3Rpb24gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIGN1cnJlbnRVc2VyKSB7XG4gICAgLy8gICAgIGlmICghcXVlc3RzKSB7XG4gICAgLy8gICAgICAgICByZXR1cm47XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBzaGlmdCA9IGlzU2Vjb25kV2VlayhxdWVzdHMpID8gNCA6IDA7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3REaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgICAgICByZW5kZXJRdWVzdChxdWVzdHNbaSArIHNoaWZ0XSwgcXVlc3REaXZzW2ldLCBjdXJyZW50VXNlcik7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBpc1NlY29uZFdlZWsocXVlc3RzKSB7XG4gICAgLy8gICAgIGNvbnN0IGZvdXJ0aFF1ZXN0ID0gcXVlc3RzWzNdO1xuICAgIC8vICAgICByZXR1cm4gZm91cnRoUXVlc3QgJiYgY3VycmVudERhdGUgPiBuZXcgRGF0ZShmb3VydGhRdWVzdC5kYXRlRW5kKTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiByZW5kZXJRdWVzdChxdWVzdCwgY29udGFpbmVyLCBjdXJyZW50VXNlcikge1xuICAgIC8vICAgICBpZiAoIXF1ZXN0IHx8ICFjb250YWluZXIpIHtcbiAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAvLyAgICAgLy9jb25zdCBxdWVzdFBvaW50cyA9IHtwb2ludHM6IDMwMH07XG4gICAgLy8gICAgIGNvbnN0IHF1ZXN0UG9pbnRzID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIucXVlc3RzICYmIGN1cnJlbnRVc2VyLnF1ZXN0cy5maW5kKHEgPT4gcS5xdWVzdE51bSA9PT0gcXVlc3ROdW0pO1xuICAgIC8vXG4gICAgLy8gICAgIC8vIHVwZGF0ZSB0cmFuc2xhdGlvbnNcbiAgICAvLyAgICAgY29uc3QgcXVlc3RUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tdGl0bGUnKTtcbiAgICAvLyAgICAgcXVlc3RUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgIC8vICAgICBjb25zdCBxdWVzdFN1YlRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS1zdWJ0aXRsZScpO1xuICAgIC8vICAgICBxdWVzdFN1YlRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgdHlwZSBvZiBxdWVzdFxuICAgIC8vICAgICBjb25zdCBxdWVzdFR5cGUgPSBnZXRRdWVzdFR5cGUocXVlc3QpO1xuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc29vbicpO1xuICAgIC8vXG4gICAgLy8gICAgIGlmIChxdWVzdFR5cGUgPT09IE9MRF9RVUVTVF9UWVBFKSB7XG4gICAgLy8gICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAvLyAgICAgfSBlbHNlIGlmIChxdWVzdFR5cGUgPT09IEZVVFVSRV9RVUVTVF9UWVBFKSB7XG4gICAgLy8gICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc29vbicpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgY29uc3QgdGltZXJFbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50aW1lclR4dCcpO1xuICAgIC8vICAgICAgICAgY29uc3QgcG9wdXBUaW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGltZS1udW0nKTtcbiAgICAvLyAgICAgICAgIGNvdW50ZG93blRpbWVyKHF1ZXN0LmRhdGVFbmQsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgLy8gICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYClcbiAgICAvLyAgICAgICAgIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cyk7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgc3RhcnNcbiAgICAvLyAgICAgaWYgKHF1ZXN0UG9pbnRzKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBzdGFyRGl2cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpO1xuICAgIC8vICAgICAgICAgY29uc3QgcXVlc3RMZXZlbCA9IGdldFF1ZXN0TGV2ZWwocXVlc3QsIHF1ZXN0UG9pbnRzLnBvaW50cyB8fCAwKTtcbiAgICAvLyAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbDsgaSsrKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc3RhciA9IHN0YXJEaXZzW2ldO1xuICAgIC8vICAgICAgICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIC8vIHVwZGF0ZXMgaW1hZ2VzXG4gICAgLy8gICAgIGNvbnN0IHNyY0Rlc2MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVzYycpO1xuICAgIC8vICAgICBjb25zdCBzcmNNb2IgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fbW9iJyk7XG4gICAgLy8gICAgIGNvbnN0IHNyY0RlZmF1bHQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVmYXVsdCcpO1xuICAgIC8vICAgICBzcmNEZXNjLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgLy8gICAgIHNyY01vYi5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctbW9iLnBuZ2A7XG4gICAgLy8gICAgIHNyY0RlZmF1bHQuc3JjID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcbiAgICAvL1xuICAgIC8vICAgICAvLyB1cGRhdGUgYnV0dG9uc1xuICAgIC8vICAgICBpZiAocXVlc3RUeXBlID09IEFDVElWRV9RVUVTVF9UWVBFICYmIHVzZXJJZCAmJiAhcXVlc3RQb2ludHMpIHtcbiAgICAvLyAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIC8vICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW1vdmluZyBxdWVzdCBoaWRlICcgKyBjdXJyZW50VXNlcilcbiAgICAvLyAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpIHtcbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10ZXh0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgZGVzY3JRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpdGxlJyk7XG4gICAgICAgIHF1ZXN0TmFtZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gcXVlc3ROdW0gJSAyID09IDAgPyAnc3BvcnQnIDogJ2Nhc2lubyc7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChgcXVlc3QtcG9wdXAke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IHVzZXJQb2ludHNGb3JRdWVzdCA9IHF1ZXN0UG9pbnRzID8gcXVlc3RQb2ludHMucG9pbnRzIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxEaXYgPSBxdWVzdExldmVsRGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHF1ZXN0LmxldmVsc1tpXTtcbiAgICAgICAgICAgIGlmIChsZXZlbERpdiAmJiBsZXZlbEluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcHJpemVRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm9UZXh0ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGluZm9UZXh0LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgc3RlcFF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFN0YXJ0UG9pbnRzID0gaSA9PT0gMCA/IDAgOiBxdWVzdC5sZXZlbHNbaSAtIDFdLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbEVuZFBvaW50cyA9IGxldmVsSW5mby5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxQb2ludHMgPSBsZXZlbEVuZFBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1BvaW50cyAgPSBNYXRoLm1pbihNYXRoLm1heCh1c2VyUG9pbnRzRm9yUXVlc3QsIDApLCBsZXZlbFBvaW50cyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzUG9pbnRzIC8gbGV2ZWxQb2ludHMgKiAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IocHJvZ3Jlc3NWYWx1ZSksIDApLCAxMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzRWxlbWVudCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXByb2dyZXNzJyk7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LnZhbHVlID0gbm9ybWFsaXplZDtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQuZGF0YXNldC5wcm9ncmVzcyA9IGAke25vcm1hbGl6ZWR9JWA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzRGl2ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICAgICAgICAgIHN0YXR1c0Rpdi5pbm5lckhUTUwgPSBgJHtwcm9ncmVzc1BvaW50c30vJHtsZXZlbFBvaW50c31gO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyUG9pbnRzRm9yUXVlc3QgPCBsZXZlbFN0YXJ0UG9pbnRzIHx8ICF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheUJ0biA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy50b29rLXBhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50ZG93blRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVEaWZmID0gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBpZiAodGltZURpZmYgPCAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFRpbWUoa2V5LCBkYXlzLCBob3VycywgbWludXRlcykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KGtleSkucmVwbGFjZShcIntkYXl9XCIsIGRheXMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie2hvdXJ9XCIsIGhvdXJzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcInttaW51dGVzfVwiLCBtaW51dGVzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKHRhcmdldERhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHRhcmdldERhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcih0aW1lRGlmZiAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xuXG5cbiAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHJldHVybiB0aW1lRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdExldmVsKHF1ZXN0RGVmaW5pdGlvbiwgcG9pbnRzKSB7XG4gICAgICAgIGlmICghcXVlc3REZWZpbml0aW9uIHx8ICFxdWVzdERlZmluaXRpb24ubGV2ZWxzIHx8IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxldmVsSW5kZXggPSBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmZpbmRJbmRleChsZXZlbCA9PiBwb2ludHMgPCBsZXZlbC5wb2ludHMpO1xuICAgICAgICByZXR1cm4gbGV2ZWxJbmRleCA9PT0gLTEgPyBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA6IGxldmVsSW5kZXg7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdFR5cGUocXVlc3QpIHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZVN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVFbmQpO1xuICAgICAgICBpZiAoY3VycmVudERhdGUgPCBzdGFydERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBGVVRVUkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPTERfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBQ1RJVkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckluUXVlc3QoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy9xdWVzdHJlZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7Y2hlY2tDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7TWF0aC5mbG9vcih1c2VyLnBvaW50cyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0yMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIwMS0zMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzMwMS00MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQwMS01MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUwMS02MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYwMS02NTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzY1MS03MDBgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDQpO1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdCk7XG5cbiAgICBsZXQgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2X19wYWdlJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBtYWluUGFnZS5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdycpLCAxMDAwKTtcblxuICAgIC8vc2hvdyBydWxlcy0gZGV0YWlsc1xuICAgIGNvbnN0IHJ1bGVzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucnVsZXNfX2l0ZW0nKVxuICAgIHJ1bGVzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnX29wZW4nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBmb3IgdGVzdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gMVxuXG4gICAgY29uc3QgZ2FtZVdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVfX2hvdXNlXCIpLFxuICAgICAgICAgIHdlZWtCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWstYnRuXCIpO1xuXG4gICAgd2Vla0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGlmKHdlZWsgPj0gNCkge1xuICAgICAgICAgICAgZ2FtZVdyYXAuY2xhc3NMaXN0LnJlbW92ZShgd2VlayR7d2Vla31gKVxuICAgICAgICAgICAgd2VlayA9IDFcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgd2VlaysrXG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICB9KVxuXG5cbn0pKCk7XG4iLCIiXX0=
