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
  var roLeng = document.querySelector('#roLeng');
  var enLeng = document.querySelector('#enLeng');

  // let locale = 'ro';

  var locale = localStorage.getItem('locale') || 'en';
  function setState(newLocale) {
    locale = newLocale;
    localStorage.setItem('locale', locale);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJyb0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0U3RhdGUiLCJuZXdMb2NhbGUiLCJzZXRJdGVtIiwidG9nZ2xlU3RhdGUiLCJyZWxvYWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uY2F0IiwiUFJJWkVTX0NTUyIsImkxOG5EYXRhIiwidXNlcklkIiwibG9hZFRyYW5zbGF0aW9ucyIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJ0cmFuc2xhdGUiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZWxlbXMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZWxlbSIsImtleSIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsInJlbW92ZSIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJvcGVuIiwiZGV0YWlscyIsIml0ZW0iLCJJbml0UGFnZSIsInF1ZXN0U3RhcnRCdG4iLCJlIiwicmVnaXN0ZXJJblF1ZXN0IiwicmVmcmVzaFF1ZXN0cyIsImN1cnJlbnRVc2VyIiwic2hpZnQiLCJpc1NlY29uZFdlZWsiLCJpIiwicmVuZGVyUXVlc3QiLCJmb3VydGhRdWVzdCIsImRhdGVFbmQiLCJxdWVzdCIsImNvbnRhaW5lciIsInF1ZXN0TnVtIiwicU51bWJlciIsInF1ZXN0UG9pbnRzIiwiZmluZCIsInEiLCJxdWVzdFRpdGxlRGl2IiwidHJhbnNsYXRlS2V5IiwicXVlc3RTdWJUaXRsZURpdiIsInF1ZXN0VHlwZSIsImdldFF1ZXN0VHlwZSIsInRpbWVyRWxlbWVudCIsInBvcHVwVGltZXIiLCJjb3VudGRvd25UaW1lciIsInVwZGF0ZVBvcHVwIiwic3RhckRpdnMiLCJxdWVzdExldmVsIiwiZ2V0UXVlc3RMZXZlbCIsInBvaW50cyIsInN0YXIiLCJzcmNEZXNjIiwic3JjTW9iIiwic3JjRGVmYXVsdCIsInNyY3NldCIsInNyYyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJxdWVzdE5hbWUiLCJjc3NDbGFzcyIsInVzZXJQb2ludHNGb3JRdWVzdCIsImxldmVsRGl2IiwibGV2ZWxJbmZvIiwibGV2ZWxzIiwic3VidGl0bGUiLCJpbmZvVGV4dCIsImxldmVsU3RhcnRQb2ludHMiLCJsZXZlbEVuZFBvaW50cyIsImxldmVsUG9pbnRzIiwicHJvZ3Jlc3NQb2ludHMiLCJNYXRoIiwibWluIiwibWF4IiwicHJvZ3Jlc3NWYWx1ZSIsIm5vcm1hbGl6ZWQiLCJmbG9vciIsInByb2dyZXNzRWxlbWVudCIsInZhbHVlIiwiZGF0YXNldCIsInByb2dyZXNzIiwic3RhdHVzRGl2IiwicmVmcmVzaFByb2dyZXNzIiwidGFyZ2V0RGF0ZVN0cmluZyIsInJlZnJlc2hUaW1lciIsImludGVydmFsSWQiLCJzZXRJbnRlcnZhbCIsInRpbWVEaWZmIiwiY2xlYXJJbnRlcnZhbCIsImZvcm1hdFRpbWUiLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwicmVwbGFjZSIsInRvU3RyaW5nIiwidGFyZ2V0RGF0ZSIsIm5vdyIsImdldFRpbWUiLCJxdWVzdERlZmluaXRpb24iLCJsZXZlbEluZGV4IiwiZmluZEluZGV4IiwibGV2ZWwiLCJzdGFydERhdGUiLCJkYXRlU3RhcnQiLCJlbmREYXRlIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsInNldHVwUGFnZSIsImMiLCJnX3VzZXJfaWQiLCJjaGVja1VzZXJBdXRoIiwiYXV0aEJ0biIsInByZXZlbnREZWZhdWx0IiwicGFydGljaXBhdGUiLCJoYXMiLCJmYXN0UmVnIiwicGFyYW1zIiwidXNlcmlkIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXJVc2VycyIsInRvcFVzZXJzIiwic2xpY2UiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiY3VycmVudFVzZXJJZCIsInRhYmxlIiwiYWxsVXNlcnMiLCJjaGVja0N1cnJlbnRVc2VyIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsImFwcGVuZCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJ1bmF1dGhNZXMiLCJlcnIiLCJmIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsInBhcnRpY2lwYXRlQnRuIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIm1haW5QYWdlIiwic2V0VGltZW91dCIsInJ1bGVzSXRlbXMiLCJ0b2dnbGUiLCJ3ZWVrIiwiZ2FtZVdyYXAiLCJ3ZWVrQnRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUNULElBQU1BLE1BQU0sR0FBRyxvQ0FBb0M7RUFDbkQsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3RCxJQUFNQyxnQkFBZ0IsR0FBRyxLQUFLO0VBRTlCLElBQU1DLGlCQUFpQixHQUFHLFFBQVE7SUFDOUJDLGNBQWMsR0FBRyxLQUFLO0lBQ3RCQyxpQkFBaUIsR0FBRyxRQUFRO0VBRWhDLElBQ0lDLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUN2RUMsZUFBZSxHQUFHRixRQUFRLENBQUNHLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDdERDLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR04sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDeERFLG1CQUFtQixHQUFHUCxRQUFRLENBQUNHLGNBQWMsQ0FBQyxlQUFlLENBQUM7SUFDOURLLFlBQVksR0FBR1IsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERJLFNBQVMsR0FBR1QsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7SUFDckRLLE9BQU8sR0FBR1YsUUFBUSxDQUFDQyxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQy9DVSxjQUFjLEdBQUdYLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3ZE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Q0FBQztFQUVaLElBQU1DLFFBQVEsR0FBR25PLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNqRG1PLE9BQU8sR0FBR3BPLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUVuRG1PLE9BQU8sQ0FBQ3RNLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQ25DLElBQUdvTSxJQUFJLElBQUksQ0FBQyxFQUFFO01BQ1ZDLFFBQVEsQ0FBQ3BNLFNBQVMsQ0FBQ2tDLE1BQU0sUUFBQWhDLE1BQUEsQ0FBUWlNLElBQUksQ0FBRSxDQUFDO01BQ3hDQSxJQUFJLEdBQUcsQ0FBQztNQUNSQyxRQUFRLENBQUNwTSxTQUFTLENBQUNDLEdBQUcsUUFBQUMsTUFBQSxDQUFRaU0sSUFBSSxDQUFFLENBQUM7TUFDckM7SUFDSjtJQUNBQyxRQUFRLENBQUNwTSxTQUFTLENBQUNrQyxNQUFNLFFBQUFoQyxNQUFBLENBQVFpTSxJQUFJLENBQUUsQ0FBQztJQUN4Q0EsSUFBSSxFQUFFO0lBQ05DLFFBQVEsQ0FBQ3BNLFNBQVMsQ0FBQ0MsR0FBRyxRQUFBQyxNQUFBLENBQVFpTSxJQUFJLENBQUUsQ0FBQztFQUN6QyxDQUFDLENBQUM7QUFHTixDQUFDLEVBQUUsQ0FBQztBQ3JpQkoiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV9zYW1fcm8nO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcGFydGljaXBhdGVQYXJhbSA9ICdyZWcnO1xuXG4gICAgY29uc3QgRlVUVVJFX1FVRVNUX1RZUEUgPSAnZnV0dXJlJyxcbiAgICAgICAgT0xEX1FVRVNUX1RZUEUgPSAnb2xkJyxcbiAgICAgICAgQUNUSVZFX1FVRVNUX1RZUEUgPSAnYWN0aXZlJztcblxuICAgIGNvbnN0XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fYm9keS1vdGhlcicpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcXVlc3REaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyksXG4gICAgICAgIHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QtcGxheScpLFxuICAgICAgICBxdWVzdFN0YXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdEJ0bicpLFxuICAgICAgICBxdWVzdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0JyksXG4gICAgICAgIHF1ZXN0TGV2ZWxEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJyksXG4gICAgICAgIHBvcHVwUGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maXJzdFBsYXknKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy9uZXcgRGF0ZShcIjIwMjMtMTItMTRUMjE6MDA6MDAuMDAwWlwiKTtcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IHF1ZXN0cztcbiAgICBsZXQgdXNlckluZm87XG5cbiAgICBjb25zdCByb0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9MZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgLy8gbGV0IGxvY2FsZSA9ICdybyc7XG5cbiAgICBsZXQgbG9jYWxlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvY2FsZScpIHx8ICdlbic7XG5cbiAgICBmdW5jdGlvbiBzZXRTdGF0ZShuZXdMb2NhbGUpIHtcbiAgICAgICAgbG9jYWxlID0gbmV3TG9jYWxlO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9jYWxlJywgbG9jYWxlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9nZ2xlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IG5ld0xvY2FsZSA9IGxvY2FsZSA9PT0gJ2VuJyA/ICdybycgOiAnZW4nO1xuICAgICAgICBzZXRTdGF0ZShuZXdMb2NhbGUpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVTdGF0ZSgpO1xuXG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdl9fcGFnZVwiKS5jbGFzc0xpc3QuYWRkKGAke2xvY2FsZX1gKVxuICAgIC8vIGlmIChyb0xlbmcpIGxvY2FsZSA9ICdybyc7XG4gICAgLy8gaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICAvLyBsZXQgdXNlcklkO1xuICAgIGxldCB1c2VySWQgPSAxMDAzNDAwMjA7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGUgaXMgd29ya2luZ1wiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzJyksXG4gICAgICAgICAgICAvLyByZXF1ZXN0KCcvcXVlc3RzJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHsgcmVnaXN0ZXJJblF1ZXN0KCk7IH0pKTtcblxuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF07XG4gICAgICAgICAgICBxdWVzdHMgPSAocmVzWzFdIHx8IFtdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHF1ZXN0cyk7XG4gICAgICAgICAgICAvLyByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICAvLyByZWZyZXNoUXVlc3RzKHF1ZXN0cywgdXNlckluZm8pXG4gICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoUXVlc3RzKHF1ZXN0cywgY3VycmVudFVzZXIpIHtcbiAgICAgICAgaWYgKCFxdWVzdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoaWZ0ID0gaXNTZWNvbmRXZWVrKHF1ZXN0cykgPyA0IDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlbmRlclF1ZXN0KHF1ZXN0c1tpICsgc2hpZnRdLCBxdWVzdERpdnNbaV0sIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU2Vjb25kV2VlayhxdWVzdHMpIHtcbiAgICAgICAgY29uc3QgZm91cnRoUXVlc3QgPSBxdWVzdHNbM107XG4gICAgICAgIHJldHVybiBmb3VydGhRdWVzdCAmJiBjdXJyZW50RGF0ZSA+IG5ldyBEYXRlKGZvdXJ0aFF1ZXN0LmRhdGVFbmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclF1ZXN0KHF1ZXN0LCBjb250YWluZXIsIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgIGlmICghcXVlc3QgfHwgIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICAvL2NvbnN0IHF1ZXN0UG9pbnRzID0ge3BvaW50czogMzAwfTtcbiAgICAgICAgY29uc3QgcXVlc3RQb2ludHMgPSBjdXJyZW50VXNlciAmJiBjdXJyZW50VXNlci5xdWVzdHMgJiYgY3VycmVudFVzZXIucXVlc3RzLmZpbmQocSA9PiBxLnF1ZXN0TnVtID09PSBxdWVzdE51bSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRyYW5zbGF0aW9uc1xuICAgICAgICBjb25zdCBxdWVzdFRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS10aXRsZScpO1xuICAgICAgICBxdWVzdFRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgbmFtZVF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgICAgIGNvbnN0IHF1ZXN0U3ViVGl0bGVEaXYgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJvdXRlX19pdGVtLXN1YnRpdGxlJyk7XG4gICAgICAgIHF1ZXN0U3ViVGl0bGVEaXYuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBxdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0eXBlIG9mIHF1ZXN0XG4gICAgICAgIGNvbnN0IHF1ZXN0VHlwZSA9IGdldFF1ZXN0VHlwZShxdWVzdCk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzb29uJyk7XG5cbiAgICAgICAgaWYgKHF1ZXN0VHlwZSA9PT0gT0xEX1FVRVNUX1RZUEUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZScpO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0VHlwZSA9PT0gRlVUVVJFX1FVRVNUX1RZUEUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzb29uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnRpbWVyVHh0Jyk7XG4gICAgICAgICAgICBjb25zdCBwb3B1cFRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X190aW1lLW51bScpO1xuICAgICAgICAgICAgY291bnRkb3duVGltZXIocXVlc3QuZGF0ZUVuZCwgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKVxuICAgICAgICAgICAgdXBkYXRlUG9wdXAocXVlc3QsIHF1ZXN0UG9pbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBzdGFyc1xuICAgICAgICBpZiAocXVlc3RQb2ludHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJEaXZzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyJyk7XG4gICAgICAgICAgICBjb25zdCBxdWVzdExldmVsID0gZ2V0UXVlc3RMZXZlbChxdWVzdCwgcXVlc3RQb2ludHMucG9pbnRzIHx8IDApO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFyID0gc3RhckRpdnNbaV07XG4gICAgICAgICAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdfZG9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlcyBpbWFnZXNcbiAgICAgICAgY29uc3Qgc3JjRGVzYyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19kZXNjJyk7XG4gICAgICAgIGNvbnN0IHNyY01vYiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19tb2InKTtcbiAgICAgICAgY29uc3Qgc3JjRGVmYXVsdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19kZWZhdWx0Jyk7XG4gICAgICAgIHNyY0Rlc2Muc3Jjc2V0ID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcbiAgICAgICAgc3JjTW9iLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1tb2IucG5nYDtcbiAgICAgICAgc3JjRGVmYXVsdC5zcmMgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctZGVzYy5wbmdgO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBidXR0b25zXG4gICAgICAgIGlmIChxdWVzdFR5cGUgPT0gQUNUSVZFX1FVRVNUX1RZUEUgJiYgdXNlcklkICYmICFxdWVzdFBvaW50cykge1xuICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICBwb3B1cFBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3JlbW92aW5nIHF1ZXN0IGhpZGUgJyArIGN1cnJlbnRVc2VyKVxuICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cykge1xuICAgICAgICBjb25zdCBxdWVzdE51bSA9IHF1ZXN0LnFOdW1iZXI7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X19kZXMtdGl0bGUnKTtcbiAgICAgICAgdGl0bGUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBxdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRleHQnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBkZXNjclF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgICAgIGNvbnN0IHF1ZXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGl0bGUnKTtcbiAgICAgICAgcXVlc3ROYW1lLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgbmFtZVF1ZXN0LSR7cXVlc3ROdW19YCk7XG5cbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBxdWVzdE51bSAlIDIgPT0gMCA/ICdzcG9ydCcgOiAnY2FzaW5vJztcbiAgICAgICAgcXVlc3RQb3B1cC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgcXVlc3RQb3B1cC5jbGFzc0xpc3QuYWRkKGBxdWVzdC1wb3B1cCR7cXVlc3ROdW19YCk7XG5cbiAgICAgICAgY29uc3QgdXNlclBvaW50c0ZvclF1ZXN0ID0gcXVlc3RQb2ludHMgPyBxdWVzdFBvaW50cy5wb2ludHMgOiAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0TGV2ZWxEaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsZXZlbERpdiA9IHF1ZXN0TGV2ZWxEaXZzW2ldO1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxJbmZvID0gcXVlc3QubGV2ZWxzW2ldO1xuICAgICAgICAgICAgaWYgKGxldmVsRGl2ICYmIGxldmVsSW5mbykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRpdGxlID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLXN1YnRpdGxlJyk7XG4gICAgICAgICAgICAgICAgc3VidGl0bGUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBwcml6ZVF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5mb1RleHQgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0taW5mby10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaW5mb1RleHQuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBzdGVwUXVlc3QtJHtxdWVzdE51bX1fJHtpICsgMX1gKTtcblxuICAgICAgICAgICAgICAgIC8vIHByb2dyZXNzIGJhclxuICAgICAgICAgICAgICAgIGNvbnN0IGxldmVsU3RhcnRQb2ludHMgPSBpID09PSAwID8gMCA6IHF1ZXN0LmxldmVsc1tpIC0gMV0ucG9pbnRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxldmVsRW5kUG9pbnRzID0gbGV2ZWxJbmZvLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFBvaW50cyA9IGxldmVsRW5kUG9pbnRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzUG9pbnRzICA9IE1hdGgubWluKE1hdGgubWF4KHVzZXJQb2ludHNGb3JRdWVzdCwgMCksIGxldmVsUG9pbnRzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NQb2ludHMgLyBsZXZlbFBvaW50cyAqIDEwMDtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihwcm9ncmVzc1ZhbHVlKSwgMCksIDEwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NFbGVtZW50ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQudmFsdWUgPSBub3JtYWxpemVkO1xuICAgICAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC5kYXRhc2V0LnByb2dyZXNzID0gYCR7bm9ybWFsaXplZH0lYDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNEaXYgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgICAgICAgICAgc3RhdHVzRGl2LmlubmVySFRNTCA9IGAke3Byb2dyZXNzUG9pbnRzfS8ke2xldmVsUG9pbnRzfWA7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJQb2ludHNGb3JRdWVzdCA8IGxldmVsU3RhcnRQb2ludHMgfHwgIXVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5QnRuID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnRvb2stcGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaFByb2dyZXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnRkb3duVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKSB7XG4gICAgICAgIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgICAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZURpZmYgPSByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCdmaW5pc2hlZFRpbWVyJywgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShrZXksIGRheXMsIGhvdXJzLCBtaW51dGVzKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGVLZXkoa2V5KS5yZXBsYWNlKFwie2RheX1cIiwgZGF5cy50b1N0cmluZygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7aG91cn1cIiwgaG91cnMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie21pbnV0ZXN9XCIsIG1pbnV0ZXMudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICBjb25zdCB0YXJnZXREYXRlID0gbmV3IERhdGUodGFyZ2V0RGF0ZVN0cmluZyk7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHRpbWVEaWZmID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKHRpbWVEaWZmIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLyAoMTAwMCAqIDYwICogNjApKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRpbWVEaWZmICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XG5cblxuICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAgICAgcmV0dXJuIHRpbWVEaWZmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFF1ZXN0TGV2ZWwocXVlc3REZWZpbml0aW9uLCBwb2ludHMpIHtcbiAgICAgICAgaWYgKCFxdWVzdERlZmluaXRpb24gfHwgIXF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMgfHwgcXVlc3REZWZpbml0aW9uLmxldmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGV2ZWxJbmRleCA9IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMuZmluZEluZGV4KGxldmVsID0+IHBvaW50cyA8IGxldmVsLnBvaW50cyk7XG4gICAgICAgIHJldHVybiBsZXZlbEluZGV4ID09PSAtMSA/IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoIDogbGV2ZWxJbmRleDtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldFF1ZXN0VHlwZShxdWVzdCkge1xuICAgICAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZShxdWVzdC5kYXRlU3RhcnQpO1xuICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZUVuZCk7XG4gICAgICAgIGlmIChjdXJyZW50RGF0ZSA8IHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIEZVVFVSRV9RVUVTVF9UWVBFO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnREYXRlID4gZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIE9MRF9RVUVTVF9UWVBFO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEFDVElWRV9RVUVTVF9UWVBFO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHZhciBpID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhd2luZG93LmdfdXNlcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBQYWdlKCkge1xuICAgICAgICBpZiAodXNlcklkICYmIHVybFBhcmFtcy5oYXMocGFydGljaXBhdGVQYXJhbSkpIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnRpY2lwYXRlKGZhc3RSZWcpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3VzZXInLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVySW5RdWVzdCgpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3F1ZXN0cmVnJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclVzZXJzID0gKHVzZXJzKSA9PiB7XG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRvcFVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHRvcFVzZXJzLCB1c2VySWQsIHRvcFJlc3VsdHNUYWJsZSwgdXNlcnMpO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJJZCAmJiB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IHVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgJiYgdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcik7XG5cbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzO1xuXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRVc2VySW5kZXggfHwgY3VycmVudFVzZXJJbmRleCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKDEwLCAxMyk7XG4gICAgICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoY3VycmVudFVzZXJJbmRleCAtIDEsIDEwKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3RoZXJVc2VycyAmJiBvdGhlclVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZShvdGhlclVzZXJzLCB1c2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIHRhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tDdXJyZW50VXNlciA9IGN1cnJlbnRVc2VySWQgJiYgY3VycmVudFVzZXJJZCA9PT0gdXNlci51c2VyaWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ195b3VyUGxhY2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChwcml6ZVBsYWNlQ3NzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSlcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiICR7Y2hlY2tDdXJyZW50VXNlcn0+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtjaGVja0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtNYXRoLmZsb29yKHVzZXIucG9pbnRzKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUxLTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTIwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDEpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjAxLTMwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA0MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzAxLTQwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNDAxLTUwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA2MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTAxLTYwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA2NTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNjAxLTY1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA3MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNjUxLTcwMGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKioqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoNCk7XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUXVlc3RzKHF1ZXN0cywgdXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdCk7XG5cbiAgICBsZXQgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2X19wYWdlJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBtYWluUGFnZS5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdycpLCAxMDAwKTtcblxuICAgIC8vc2hvdyBydWxlcy0gZGV0YWlsc1xuICAgIGNvbnN0IHJ1bGVzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucnVsZXNfX2l0ZW0nKVxuICAgIHJ1bGVzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnX29wZW4nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBmb3IgdGVzdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcblxuICAgIGxldCB3ZWVrID0gMVxuXG4gICAgY29uc3QgZ2FtZVdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVfX2hvdXNlXCIpLFxuICAgICAgICAgIHdlZWtCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWstYnRuXCIpO1xuXG4gICAgd2Vla0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGlmKHdlZWsgPj0gNCkge1xuICAgICAgICAgICAgZ2FtZVdyYXAuY2xhc3NMaXN0LnJlbW92ZShgd2VlayR7d2Vla31gKVxuICAgICAgICAgICAgd2VlayA9IDFcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgd2VlaysrXG4gICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5hZGQoYHdlZWske3dlZWt9YClcbiAgICB9KVxuXG5cbn0pKCk7XG4iLCIiXX0=
