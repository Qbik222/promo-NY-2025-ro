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
    popupPlayBtn = document.querySelector('.firstPlay');
  var currentDate = new Date(); //new Date("2023-12-14T21:00:00.000Z");
  var users;
  var quests;
  var userInfo;
  var ukLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var locale = 'ro';
  if (ukLeng) locale = 'ro';
  if (enLeng) locale = 'en';
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
    getData().then(function (res) {
      users = res[0];
      quests = res[1] || [];
      // console.log(quests);
      // renderUsers(users);
      // refreshQuests(quests, userInfo)
      translate();
    });
  };
  function refreshQuests(quests, currentUser) {
    if (!quests) {
      return;
    }
    var shift = isSecondWeek(quests) ? 4 : 0;
    for (var i = 0; i < questDivs.length; i++) {
      renderQuest(quests[i + shift], questDivs[i], currentUser);
    }
  }
  function isSecondWeek(quests) {
    var fourthQuest = quests[3];
    return fourthQuest && currentDate > new Date(fourthQuest.dateEnd);
  }
  function renderQuest(quest, container, currentUser) {
    if (!quest || !container) {
      return;
    }
    var questNum = quest.qNumber;
    //const questPoints = {points: 300};
    var questPoints = currentUser && currentUser.quests && currentUser.quests.find(function (q) {
      return q.questNum === questNum;
    });

    // update translations
    var questTitleDiv = container.querySelector('.route__item-title');
    questTitleDiv.innerHTML = translateKey("nameQuest-".concat(questNum));
    var questSubTitleDiv = container.querySelector('.route__item-subtitle');
    questSubTitleDiv.innerHTML = translateKey("quest-".concat(questNum));

    // update type of quest
    var questType = getQuestType(quest);
    container.classList.remove('soon');
    if (questType === OLD_QUEST_TYPE) {
      container.classList.add('inactive');
    } else if (questType === FUTURE_QUEST_TYPE) {
      container.classList.add('soon');
    } else {
      var timerElement = container.querySelector('.timerTxt');
      var popupTimer = document.querySelector('.quest__time-num');
      countdownTimer(quest.dateEnd, timerElement, popupTimer);
      container.classList.add("active");
      updatePopup(quest, questPoints);
    }

    // update stars
    if (questPoints) {
      var starDivs = container.querySelectorAll('.star');
      var questLevel = getQuestLevel(quest, questPoints.points || 0);
      for (var i = 0; i < questLevel; i++) {
        var star = starDivs[i];
        star.classList.add('_done');
      }
    }

    // updates images
    var srcDesc = container.querySelector('.src__desc');
    var srcMob = container.querySelector('.src__mob');
    var srcDefault = container.querySelector('.src__default');
    srcDesc.srcset = "https://fav-prom.com/html/ny-ua/img/route/quest".concat(questNum, "-img-desc.png");
    srcMob.srcset = "https://fav-prom.com/html/ny-ua/img/route/quest".concat(questNum, "-img-mob.png");
    srcDefault.src = "https://fav-prom.com/html/ny-ua/img/route/quest".concat(questNum, "-img-desc.png");

    // update buttons
    if (questType == ACTIVE_QUEST_TYPE && userId && !questPoints) {
      playBtn.classList.add('hide');
      popupPlayBtn.classList.add('hide');
      // console.log('removing quest hide ' + currentUser)
      questStartBtns.forEach(function (questStartBtn) {
        return questStartBtn.classList.remove('hide');
      });
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJ1a0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJjb25jYXQiLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwiY29uc29sZSIsImxvZyIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsImVsZW1lbnQiLCJiYXNlQ3NzQ2xhc3MiLCJfaSIsIl9hcnIiLCJsYW5nIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicmVxdWVzdCIsImxpbmsiLCJleHRyYU9wdGlvbnMiLCJfb2JqZWN0U3ByZWFkIiwiaGVhZGVycyIsImdldERhdGEiLCJQcm9taXNlIiwiYWxsIiwiaW5pdERyb3AiLCJvcGVuRHJvcCIsImRlc2tDbGFzcyIsIm9wZW4iLCJhZGRFdmVudExpc3RlbmVyIiwiZGV0YWlscyIsIml0ZW0iLCJJbml0UGFnZSIsInF1ZXN0U3RhcnRCdG4iLCJlIiwicmVnaXN0ZXJJblF1ZXN0IiwicmVmcmVzaFF1ZXN0cyIsImN1cnJlbnRVc2VyIiwic2hpZnQiLCJpc1NlY29uZFdlZWsiLCJpIiwicmVuZGVyUXVlc3QiLCJmb3VydGhRdWVzdCIsImRhdGVFbmQiLCJxdWVzdCIsImNvbnRhaW5lciIsInF1ZXN0TnVtIiwicU51bWJlciIsInF1ZXN0UG9pbnRzIiwiZmluZCIsInEiLCJxdWVzdFRpdGxlRGl2IiwidHJhbnNsYXRlS2V5IiwicXVlc3RTdWJUaXRsZURpdiIsInF1ZXN0VHlwZSIsImdldFF1ZXN0VHlwZSIsInRpbWVyRWxlbWVudCIsInBvcHVwVGltZXIiLCJjb3VudGRvd25UaW1lciIsInVwZGF0ZVBvcHVwIiwic3RhckRpdnMiLCJxdWVzdExldmVsIiwiZ2V0UXVlc3RMZXZlbCIsInBvaW50cyIsInN0YXIiLCJzcmNEZXNjIiwic3JjTW9iIiwic3JjRGVmYXVsdCIsInNyY3NldCIsInNyYyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJxdWVzdE5hbWUiLCJjc3NDbGFzcyIsInVzZXJQb2ludHNGb3JRdWVzdCIsImxldmVsRGl2IiwibGV2ZWxJbmZvIiwibGV2ZWxzIiwic3VidGl0bGUiLCJpbmZvVGV4dCIsImxldmVsU3RhcnRQb2ludHMiLCJsZXZlbEVuZFBvaW50cyIsImxldmVsUG9pbnRzIiwicHJvZ3Jlc3NQb2ludHMiLCJNYXRoIiwibWluIiwibWF4IiwicHJvZ3Jlc3NWYWx1ZSIsIm5vcm1hbGl6ZWQiLCJmbG9vciIsInByb2dyZXNzRWxlbWVudCIsInZhbHVlIiwiZGF0YXNldCIsInByb2dyZXNzIiwic3RhdHVzRGl2IiwicmVmcmVzaFByb2dyZXNzIiwidGFyZ2V0RGF0ZVN0cmluZyIsInJlZnJlc2hUaW1lciIsImludGVydmFsSWQiLCJzZXRJbnRlcnZhbCIsInRpbWVEaWZmIiwiY2xlYXJJbnRlcnZhbCIsImZvcm1hdFRpbWUiLCJyZWxvYWQiLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwicmVwbGFjZSIsInRvU3RyaW5nIiwidGFyZ2V0RGF0ZSIsIm5vdyIsImdldFRpbWUiLCJxdWVzdERlZmluaXRpb24iLCJsZXZlbEluZGV4IiwiZmluZEluZGV4IiwibGV2ZWwiLCJzdGFydERhdGUiLCJkYXRlU3RhcnQiLCJlbmREYXRlIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsInNldHVwUGFnZSIsImMiLCJnX3VzZXJfaWQiLCJjaGVja1VzZXJBdXRoIiwiYXV0aEJ0biIsInByZXZlbnREZWZhdWx0IiwicGFydGljaXBhdGUiLCJoYXMiLCJmYXN0UmVnIiwicGFyYW1zIiwidXNlcmlkIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXJVc2VycyIsInRvcFVzZXJzIiwic2xpY2UiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsImFwcGVuZCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJ1bmF1dGhNZXMiLCJlcnIiLCJmIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsInBhcnRpY2lwYXRlQnRuIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIm1haW5QYWdlIiwic2V0VGltZW91dCIsInJ1bGVzSXRlbXMiLCJ0b2dnbGUiLCJ3ZWVrIiwiZ2FtZVdyYXAiLCJ3ZWVrQnRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUNULElBQU1BLE1BQU0sR0FBRyxvQ0FBb0M7RUFDbkQsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3RCxJQUFNQyxnQkFBZ0IsR0FBRyxLQUFLO0VBRTlCLElBQU1DLGlCQUFpQixHQUFHLFFBQVE7SUFDOUJDLGNBQWMsR0FBRyxLQUFLO0lBQ3RCQyxpQkFBaUIsR0FBRyxRQUFRO0VBRWhDLElBQ0lDLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUN2RUMsZUFBZSxHQUFHRixRQUFRLENBQUNHLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDdERDLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR04sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDeERFLG1CQUFtQixHQUFHUCxRQUFRLENBQUNHLGNBQWMsQ0FBQyxlQUFlLENBQUM7SUFDOURLLFlBQVksR0FBR1IsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERJLFNBQVMsR0FBR1QsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7SUFDckRLLE9BQU8sR0FBR1YsUUFBUSxDQUFDQyxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQy9DVSxjQUFjLEdBQUdYLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3ZETyxVQUFVLEdBQUdaLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUM3Q1ksY0FBYyxHQUFHYixRQUFRLENBQUNL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aWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV9zYW1fcm8nO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcGFydGljaXBhdGVQYXJhbSA9ICdyZWcnO1xuXG4gICAgY29uc3QgRlVUVVJFX1FVRVNUX1RZUEUgPSAnZnV0dXJlJyxcbiAgICAgICAgT0xEX1FVRVNUX1RZUEUgPSAnb2xkJyxcbiAgICAgICAgQUNUSVZFX1FVRVNUX1RZUEUgPSAnYWN0aXZlJztcblxuICAgIGNvbnN0XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fYm9keS1vdGhlcicpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcXVlc3REaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyksXG4gICAgICAgIHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QtcGxheScpLFxuICAgICAgICBxdWVzdFN0YXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdEJ0bicpLFxuICAgICAgICBxdWVzdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0JyksXG4gICAgICAgIHF1ZXN0TGV2ZWxEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJyksXG4gICAgICAgIHBvcHVwUGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maXJzdFBsYXknKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy9uZXcgRGF0ZShcIjIwMjMtMTItMTRUMjE6MDA6MDAuMDAwWlwiKTtcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IHF1ZXN0cztcbiAgICBsZXQgdXNlckluZm87XG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgbGV0IGxvY2FsZSA9ICdybyc7XG5cbiAgICBpZiAodWtMZW5nKSBsb2NhbGUgPSAncm8nO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgLy8gbGV0IHVzZXJJZDtcbiAgICBsZXQgdXNlcklkID0gMTAwMzQwMDIwO1xuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3WWVhcjIwMjQnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRlIGlzIHdvcmtpbmdcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2VycycpLFxuICAgICAgICAgICAgLy8gcmVxdWVzdCgnL3F1ZXN0cycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREcm9wKCkge1xuICAgICAgICBjb25zdCBvcGVuRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb1J1bGVzXCIpO1xuICAgICAgICBsZXQgZGVza0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkZvb3Rlcl9jb250YWluZXItLUJTWCcpO1xuXG4gICAgICAgIG9wZW5Ecm9wLmZvckVhY2gob3BlbiA9PiB7XG4gICAgICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BPcGVuXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghZGVza0NsYXNzKSB7XG4gICAgICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdibG9ja0xpbmsnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpbml0RHJvcCgpO1xuICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IHJlZ2lzdGVySW5RdWVzdCgpOyB9KSk7XG5cbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdO1xuICAgICAgICAgICAgcXVlc3RzID0gKHJlc1sxXSB8fCBbXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhxdWVzdHMpO1xuICAgICAgICAgICAgLy8gcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKVxuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgIGlmICghcXVlc3RzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlmdCA9IGlzU2Vjb25kV2VlayhxdWVzdHMpID8gNCA6IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3REaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZW5kZXJRdWVzdChxdWVzdHNbaSArIHNoaWZ0XSwgcXVlc3REaXZzW2ldLCBjdXJyZW50VXNlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NlY29uZFdlZWsocXVlc3RzKSB7XG4gICAgICAgIGNvbnN0IGZvdXJ0aFF1ZXN0ID0gcXVlc3RzWzNdO1xuICAgICAgICByZXR1cm4gZm91cnRoUXVlc3QgJiYgY3VycmVudERhdGUgPiBuZXcgRGF0ZShmb3VydGhRdWVzdC5kYXRlRW5kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJRdWVzdChxdWVzdCwgY29udGFpbmVyLCBjdXJyZW50VXNlcikge1xuICAgICAgICBpZiAoIXF1ZXN0IHx8ICFjb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAgICAgLy9jb25zdCBxdWVzdFBvaW50cyA9IHtwb2ludHM6IDMwMH07XG4gICAgICAgIGNvbnN0IHF1ZXN0UG9pbnRzID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIucXVlc3RzICYmIGN1cnJlbnRVc2VyLnF1ZXN0cy5maW5kKHEgPT4gcS5xdWVzdE51bSA9PT0gcXVlc3ROdW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgcXVlc3RUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tdGl0bGUnKTtcbiAgICAgICAgcXVlc3RUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdFN1YlRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICBxdWVzdFN1YlRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcblxuICAgICAgICAvLyB1cGRhdGUgdHlwZSBvZiBxdWVzdFxuICAgICAgICBjb25zdCBxdWVzdFR5cGUgPSBnZXRRdWVzdFR5cGUocXVlc3QpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc29vbicpO1xuXG4gICAgICAgIGlmIChxdWVzdFR5cGUgPT09IE9MRF9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVzdFR5cGUgPT09IEZVVFVSRV9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc29vbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGltZXJFbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50aW1lclR4dCcpO1xuICAgICAgICAgICAgY29uc3QgcG9wdXBUaW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGltZS1udW0nKTtcbiAgICAgICAgICAgIGNvdW50ZG93blRpbWVyKHF1ZXN0LmRhdGVFbmQsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYClcbiAgICAgICAgICAgIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgc3RhcnNcbiAgICAgICAgaWYgKHF1ZXN0UG9pbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFyRGl2cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpO1xuICAgICAgICAgICAgY29uc3QgcXVlc3RMZXZlbCA9IGdldFF1ZXN0TGV2ZWwocXVlc3QsIHF1ZXN0UG9pbnRzLnBvaW50cyB8fCAwKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhciA9IHN0YXJEaXZzW2ldO1xuICAgICAgICAgICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZXMgaW1hZ2VzXG4gICAgICAgIGNvbnN0IHNyY0Rlc2MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVzYycpO1xuICAgICAgICBjb25zdCBzcmNNb2IgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fbW9iJyk7XG4gICAgICAgIGNvbnN0IHNyY0RlZmF1bHQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVmYXVsdCcpO1xuICAgICAgICBzcmNEZXNjLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgICAgIHNyY01vYi5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctbW9iLnBuZ2A7XG4gICAgICAgIHNyY0RlZmF1bHQuc3JjID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcblxuICAgICAgICAvLyB1cGRhdGUgYnV0dG9uc1xuICAgICAgICBpZiAocXVlc3RUeXBlID09IEFDVElWRV9RVUVTVF9UWVBFICYmIHVzZXJJZCAmJiAhcXVlc3RQb2ludHMpIHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW1vdmluZyBxdWVzdCBoaWRlICcgKyBjdXJyZW50VXNlcilcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpIHtcbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10ZXh0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgZGVzY3JRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpdGxlJyk7XG4gICAgICAgIHF1ZXN0TmFtZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gcXVlc3ROdW0gJSAyID09IDAgPyAnc3BvcnQnIDogJ2Nhc2lubyc7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChgcXVlc3QtcG9wdXAke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IHVzZXJQb2ludHNGb3JRdWVzdCA9IHF1ZXN0UG9pbnRzID8gcXVlc3RQb2ludHMucG9pbnRzIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxEaXYgPSBxdWVzdExldmVsRGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHF1ZXN0LmxldmVsc1tpXTtcbiAgICAgICAgICAgIGlmIChsZXZlbERpdiAmJiBsZXZlbEluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcHJpemVRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm9UZXh0ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGluZm9UZXh0LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgc3RlcFF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFN0YXJ0UG9pbnRzID0gaSA9PT0gMCA/IDAgOiBxdWVzdC5sZXZlbHNbaSAtIDFdLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbEVuZFBvaW50cyA9IGxldmVsSW5mby5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxQb2ludHMgPSBsZXZlbEVuZFBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1BvaW50cyAgPSBNYXRoLm1pbihNYXRoLm1heCh1c2VyUG9pbnRzRm9yUXVlc3QsIDApLCBsZXZlbFBvaW50cyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzUG9pbnRzIC8gbGV2ZWxQb2ludHMgKiAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IocHJvZ3Jlc3NWYWx1ZSksIDApLCAxMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzRWxlbWVudCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXByb2dyZXNzJyk7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LnZhbHVlID0gbm9ybWFsaXplZDtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQuZGF0YXNldC5wcm9ncmVzcyA9IGAke25vcm1hbGl6ZWR9JWA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzRGl2ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICAgICAgICAgIHN0YXR1c0Rpdi5pbm5lckhUTUwgPSBgJHtwcm9ncmVzc1BvaW50c30vJHtsZXZlbFBvaW50c31gO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyUG9pbnRzRm9yUXVlc3QgPCBsZXZlbFN0YXJ0UG9pbnRzIHx8ICF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheUJ0biA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy50b29rLXBhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50ZG93blRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVEaWZmID0gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBpZiAodGltZURpZmYgPCAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFRpbWUoa2V5LCBkYXlzLCBob3VycywgbWludXRlcykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KGtleSkucmVwbGFjZShcIntkYXl9XCIsIGRheXMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie2hvdXJ9XCIsIGhvdXJzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcInttaW51dGVzfVwiLCBtaW51dGVzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKHRhcmdldERhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHRhcmdldERhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcih0aW1lRGlmZiAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xuXG5cbiAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHJldHVybiB0aW1lRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdExldmVsKHF1ZXN0RGVmaW5pdGlvbiwgcG9pbnRzKSB7XG4gICAgICAgIGlmICghcXVlc3REZWZpbml0aW9uIHx8ICFxdWVzdERlZmluaXRpb24ubGV2ZWxzIHx8IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxldmVsSW5kZXggPSBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmZpbmRJbmRleChsZXZlbCA9PiBwb2ludHMgPCBsZXZlbC5wb2ludHMpO1xuICAgICAgICByZXR1cm4gbGV2ZWxJbmRleCA9PT0gLTEgPyBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA6IGxldmVsSW5kZXg7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdFR5cGUocXVlc3QpIHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZVN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVFbmQpO1xuICAgICAgICBpZiAoY3VycmVudERhdGUgPCBzdGFydERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBGVVRVUkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPTERfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBQ1RJVkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckluUXVlc3QoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy9xdWVzdHJlZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7Y2hlY2tDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7TWF0aC5mbG9vcih1c2VyLnBvaW50cyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0yMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIwMS0zMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzMwMS00MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQwMS01MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUwMS02MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYwMS02NTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzY1MS03MDBgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDQpO1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgbGV0IG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdl9fcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cnKSwgMTAwMCk7XG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gZm9yIHRlc3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG5cbiAgICBsZXQgd2VlayA9IDFcblxuICAgIGNvbnN0IGdhbWVXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lX19ob3VzZVwiKSxcbiAgICAgICAgICB3ZWVrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrLWJ0blwiKTtcblxuICAgIHdlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih3ZWVrID49IDQpIHtcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHdlZWsgPSAxXG4gICAgICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QucmVtb3ZlKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgIHdlZWsrK1xuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgfSlcblxuXG59KSgpO1xuIiwiIl19
