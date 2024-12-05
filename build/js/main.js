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
  var apiURL = 'https://fav-prom.com/api_ny_ua';
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
  var locale = 'uk';
  if (ukLeng) locale = 'uk';
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
      // elems.forEach(elem => {
      //     const key = elem.getAttribute('data-translate');
      //     elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
      //     elem.removeAttribute('data-translate');
      // })
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
    return Promise.all([request('/users'), request('/quests')]);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJ1a0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJjb25jYXQiLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJmb3JFYWNoIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwicXVlc3RTdGFydEJ0biIsImUiLCJyZWdpc3RlckluUXVlc3QiLCJyZWZyZXNoUXVlc3RzIiwiY3VycmVudFVzZXIiLCJzaGlmdCIsImlzU2Vjb25kV2VlayIsImkiLCJyZW5kZXJRdWVzdCIsImZvdXJ0aFF1ZXN0IiwiZGF0ZUVuZCIsInF1ZXN0IiwiY29udGFpbmVyIiwicXVlc3ROdW0iLCJxTnVtYmVyIiwicXVlc3RQb2ludHMiLCJmaW5kIiwicSIsInF1ZXN0VGl0bGVEaXYiLCJpbm5lckhUTUwiLCJ0cmFuc2xhdGVLZXkiLCJxdWVzdFN1YlRpdGxlRGl2IiwicXVlc3RUeXBlIiwiZ2V0UXVlc3RUeXBlIiwidGltZXJFbGVtZW50IiwicG9wdXBUaW1lciIsImNvdW50ZG93blRpbWVyIiwidXBkYXRlUG9wdXAiLCJzdGFyRGl2cyIsInF1ZXN0TGV2ZWwiLCJnZXRRdWVzdExldmVsIiwicG9pbnRzIiwic3RhciIsInNyY0Rlc2MiLCJzcmNNb2IiLCJzcmNEZWZhdWx0Iiwic3Jjc2V0Iiwic3JjIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInF1ZXN0TmFtZSIsImNzc0NsYXNzIiwidXNlclBvaW50c0ZvclF1ZXN0IiwibGV2ZWxEaXYiLCJsZXZlbEluZm8iLCJsZXZlbHMiLCJzdWJ0aXRsZSIsImluZm9UZXh0IiwibGV2ZWxTdGFydFBvaW50cyIsImxldmVsRW5kUG9pbnRzIiwibGV2ZWxQb2ludHMiLCJwcm9ncmVzc1BvaW50cyIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwcm9ncmVzc1ZhbHVlIiwibm9ybWFsaXplZCIsImZsb29yIiwicHJvZ3Jlc3NFbGVtZW50IiwidmFsdWUiLCJkYXRhc2V0IiwicHJvZ3Jlc3MiLCJzdGF0dXNEaXYiLCJyZWZyZXNoUHJvZ3Jlc3MiLCJ0YXJnZXREYXRlU3RyaW5nIiwicmVmcmVzaFRpbWVyIiwiaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwidGltZURpZmYiLCJjbGVhckludGVydmFsIiwiZm9ybWF0VGltZSIsInJlbG9hZCIsImtleSIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJyZXBsYWNlIiwidG9TdHJpbmciLCJ0YXJnZXREYXRlIiwibm93IiwiZ2V0VGltZSIsInF1ZXN0RGVmaW5pdGlvbiIsImxldmVsSW5kZXgiLCJmaW5kSW5kZXgiLCJsZXZlbCIsInN0YXJ0RGF0ZSIsImRhdGVTdGFydCIsImVuZERhdGUiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJ1c2VyaWQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlbmRlclVzZXJzIiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJjdXJyZW50VXNlcklkIiwidGFibGUiLCJhbGxVc2VycyIsImNoZWNrQ3VycmVudFVzZXIiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwiYXBwZW5kIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsImVyciIsImYiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwicGFydGljaXBhdGVCdG4iLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwibWFpblBhZ2UiLCJzZXRUaW1lb3V0IiwicnVsZXNJdGVtcyIsInRvZ2dsZSIsIndlZWsiLCJnYW1lV3JhcCIsIndlZWtCdG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLGdDQUFnQztFQUMvQyxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsZUFBZSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQzdELElBQU1DLGdCQUFnQixHQUFHLEtBQUs7RUFFOUIsSUFBTUMsaUJBQWlCLEdBQUcsUUFBUTtJQUM5QkMsY0FBYyxHQUFHLEtBQUs7SUFDdEJDLGlCQUFpQixHQUFHLFFBQVE7RUFFaEMsSUFDSUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBQ3ZFQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUN0REMsVUFBVSxHQUFHSixRQUFRLENBQUNLLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsZUFBZSxHQUFHTixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN4REUsbUJBQW1CLEdBQUdQLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUM5REssWUFBWSxHQUFHUixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REksU0FBUyxHQUFHVCxRQUFRLENBQUNLLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztJQUNyREssT0FBTyxHQUFHVixRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDL0NVLGNBQWMsR0FBR1gsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDdkRPLFVBQVUsR0FBR1osUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQzdDWSxjQUFjLEdBQUdiLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsY0FBYyxDQUFDO0lBQzFEUyxZQUFZLEdBQUdk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LFFBQVEsQ0FBQ2dMLElBQUksQ0FBQy9ILFNBQVMsQ0FBQ3VLLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDMUMsQ0FBQyxDQUFDO0VBRUYsSUFBSUMsSUFBSSxHQUFHLENBQUM7RUFFWixJQUFNQyxRQUFRLEdBQUcxTixRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDakQwTixPQUFPLEdBQUczTixRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUM7RUFFbkQwTixPQUFPLENBQUMxSixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztJQUNuQyxJQUFHd0osSUFBSSxJQUFJLENBQUMsRUFBRTtNQUNWQyxRQUFRLENBQUN6SyxTQUFTLENBQUNDLE1BQU0sUUFBQXRCLE1BQUEsQ0FBUTZMLElBQUksQ0FBRSxDQUFDO01BQ3hDQSxJQUFJLEdBQUcsQ0FBQztNQUNSQyxRQUFRLENBQUN6SyxTQUFTLENBQUNFLEdBQUcsUUFBQXZCLE1BQUEsQ0FBUTZMLElBQUksQ0FBRSxDQUFDO01BQ3JDO0lBQ0o7SUFDQUMsUUFBUSxDQUFDekssU0FBUyxDQUFDQyxNQUFNLFFBQUF0QixNQUFBLENBQVE2TCxJQUFJLENBQUUsQ0FBQztJQUN4Q0EsSUFBSSxFQUFFO0lBQ05DLFFBQVEsQ0FBQ3pLLFNBQVMsQ0FBQ0UsR0FBRyxRQUFBdkIsTUFBQSxDQUFRNkwsSUFBSSxDQUFFLENBQUM7RUFDekMsQ0FBQyxDQUFDO0FBR04sQ0FBQyxFQUFFLENBQUM7QUNwaEJKIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbnlfdWEnO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcGFydGljaXBhdGVQYXJhbSA9ICdyZWcnO1xuXG4gICAgY29uc3QgRlVUVVJFX1FVRVNUX1RZUEUgPSAnZnV0dXJlJyxcbiAgICAgICAgT0xEX1FVRVNUX1RZUEUgPSAnb2xkJyxcbiAgICAgICAgQUNUSVZFX1FVRVNUX1RZUEUgPSAnYWN0aXZlJztcblxuICAgIGNvbnN0XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fYm9keS1vdGhlcicpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcXVlc3REaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyksXG4gICAgICAgIHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QtcGxheScpLFxuICAgICAgICBxdWVzdFN0YXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdEJ0bicpLFxuICAgICAgICBxdWVzdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0JyksXG4gICAgICAgIHF1ZXN0TGV2ZWxEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJyksXG4gICAgICAgIHBvcHVwUGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maXJzdFBsYXknKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy9uZXcgRGF0ZShcIjIwMjMtMTItMTRUMjE6MDA6MDAuMDAwWlwiKTtcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IHF1ZXN0cztcbiAgICBsZXQgdXNlckluZm87XG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG4gICAgbGV0IGxvY2FsZSA9ICd1ayc7XG5cbiAgICBpZiAodWtMZW5nKSBsb2NhbGUgPSAndWsnO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgLy8gbGV0IHVzZXJJZDtcbiAgICBsZXQgdXNlcklkID0gMTAwMzQwMDIwO1xuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3WWVhcjIwMjQnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIC8vICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgLy8gICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRlIGlzIHdvcmtpbmdcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2VycycpLFxuICAgICAgICAgICAgcmVxdWVzdCgnL3F1ZXN0cycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREcm9wKCkge1xuICAgICAgICBjb25zdCBvcGVuRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb1J1bGVzXCIpO1xuICAgICAgICBsZXQgZGVza0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkZvb3Rlcl9jb250YWluZXItLUJTWCcpO1xuXG4gICAgICAgIG9wZW5Ecm9wLmZvckVhY2gob3BlbiA9PiB7XG4gICAgICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BPcGVuXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghZGVza0NsYXNzKSB7XG4gICAgICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdibG9ja0xpbmsnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpbml0RHJvcCgpO1xuICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IHJlZ2lzdGVySW5RdWVzdCgpOyB9KSk7XG5cbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdO1xuICAgICAgICAgICAgcXVlc3RzID0gKHJlc1sxXSB8fCBbXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhxdWVzdHMpO1xuICAgICAgICAgICAgLy8gcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKVxuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgIGlmICghcXVlc3RzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlmdCA9IGlzU2Vjb25kV2VlayhxdWVzdHMpID8gNCA6IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3REaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZW5kZXJRdWVzdChxdWVzdHNbaSArIHNoaWZ0XSwgcXVlc3REaXZzW2ldLCBjdXJyZW50VXNlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NlY29uZFdlZWsocXVlc3RzKSB7XG4gICAgICAgIGNvbnN0IGZvdXJ0aFF1ZXN0ID0gcXVlc3RzWzNdO1xuICAgICAgICByZXR1cm4gZm91cnRoUXVlc3QgJiYgY3VycmVudERhdGUgPiBuZXcgRGF0ZShmb3VydGhRdWVzdC5kYXRlRW5kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJRdWVzdChxdWVzdCwgY29udGFpbmVyLCBjdXJyZW50VXNlcikge1xuICAgICAgICBpZiAoIXF1ZXN0IHx8ICFjb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAgICAgLy9jb25zdCBxdWVzdFBvaW50cyA9IHtwb2ludHM6IDMwMH07XG4gICAgICAgIGNvbnN0IHF1ZXN0UG9pbnRzID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIucXVlc3RzICYmIGN1cnJlbnRVc2VyLnF1ZXN0cy5maW5kKHEgPT4gcS5xdWVzdE51bSA9PT0gcXVlc3ROdW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgcXVlc3RUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tdGl0bGUnKTtcbiAgICAgICAgcXVlc3RUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdFN1YlRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICBxdWVzdFN1YlRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcblxuICAgICAgICAvLyB1cGRhdGUgdHlwZSBvZiBxdWVzdFxuICAgICAgICBjb25zdCBxdWVzdFR5cGUgPSBnZXRRdWVzdFR5cGUocXVlc3QpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc29vbicpO1xuXG4gICAgICAgIGlmIChxdWVzdFR5cGUgPT09IE9MRF9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVzdFR5cGUgPT09IEZVVFVSRV9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc29vbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGltZXJFbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50aW1lclR4dCcpO1xuICAgICAgICAgICAgY29uc3QgcG9wdXBUaW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGltZS1udW0nKTtcbiAgICAgICAgICAgIGNvdW50ZG93blRpbWVyKHF1ZXN0LmRhdGVFbmQsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYClcbiAgICAgICAgICAgIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgc3RhcnNcbiAgICAgICAgaWYgKHF1ZXN0UG9pbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFyRGl2cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpO1xuICAgICAgICAgICAgY29uc3QgcXVlc3RMZXZlbCA9IGdldFF1ZXN0TGV2ZWwocXVlc3QsIHF1ZXN0UG9pbnRzLnBvaW50cyB8fCAwKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhciA9IHN0YXJEaXZzW2ldO1xuICAgICAgICAgICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZXMgaW1hZ2VzXG4gICAgICAgIGNvbnN0IHNyY0Rlc2MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVzYycpO1xuICAgICAgICBjb25zdCBzcmNNb2IgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fbW9iJyk7XG4gICAgICAgIGNvbnN0IHNyY0RlZmF1bHQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVmYXVsdCcpO1xuICAgICAgICBzcmNEZXNjLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgICAgIHNyY01vYi5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctbW9iLnBuZ2A7XG4gICAgICAgIHNyY0RlZmF1bHQuc3JjID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcblxuICAgICAgICAvLyB1cGRhdGUgYnV0dG9uc1xuICAgICAgICBpZiAocXVlc3RUeXBlID09IEFDVElWRV9RVUVTVF9UWVBFICYmIHVzZXJJZCAmJiAhcXVlc3RQb2ludHMpIHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW1vdmluZyBxdWVzdCBoaWRlICcgKyBjdXJyZW50VXNlcilcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpIHtcbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10ZXh0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgZGVzY3JRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpdGxlJyk7XG4gICAgICAgIHF1ZXN0TmFtZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gcXVlc3ROdW0gJSAyID09IDAgPyAnc3BvcnQnIDogJ2Nhc2lubyc7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChgcXVlc3QtcG9wdXAke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IHVzZXJQb2ludHNGb3JRdWVzdCA9IHF1ZXN0UG9pbnRzID8gcXVlc3RQb2ludHMucG9pbnRzIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxEaXYgPSBxdWVzdExldmVsRGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHF1ZXN0LmxldmVsc1tpXTtcbiAgICAgICAgICAgIGlmIChsZXZlbERpdiAmJiBsZXZlbEluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcHJpemVRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm9UZXh0ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGluZm9UZXh0LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgc3RlcFF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFN0YXJ0UG9pbnRzID0gaSA9PT0gMCA/IDAgOiBxdWVzdC5sZXZlbHNbaSAtIDFdLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbEVuZFBvaW50cyA9IGxldmVsSW5mby5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxQb2ludHMgPSBsZXZlbEVuZFBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1BvaW50cyAgPSBNYXRoLm1pbihNYXRoLm1heCh1c2VyUG9pbnRzRm9yUXVlc3QsIDApLCBsZXZlbFBvaW50cyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzUG9pbnRzIC8gbGV2ZWxQb2ludHMgKiAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IocHJvZ3Jlc3NWYWx1ZSksIDApLCAxMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzRWxlbWVudCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXByb2dyZXNzJyk7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LnZhbHVlID0gbm9ybWFsaXplZDtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQuZGF0YXNldC5wcm9ncmVzcyA9IGAke25vcm1hbGl6ZWR9JWA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzRGl2ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICAgICAgICAgIHN0YXR1c0Rpdi5pbm5lckhUTUwgPSBgJHtwcm9ncmVzc1BvaW50c30vJHtsZXZlbFBvaW50c31gO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyUG9pbnRzRm9yUXVlc3QgPCBsZXZlbFN0YXJ0UG9pbnRzIHx8ICF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheUJ0biA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy50b29rLXBhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50ZG93blRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVEaWZmID0gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBpZiAodGltZURpZmYgPCAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFRpbWUoa2V5LCBkYXlzLCBob3VycywgbWludXRlcykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KGtleSkucmVwbGFjZShcIntkYXl9XCIsIGRheXMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie2hvdXJ9XCIsIGhvdXJzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcInttaW51dGVzfVwiLCBtaW51dGVzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKHRhcmdldERhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHRhcmdldERhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcih0aW1lRGlmZiAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xuXG5cbiAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHJldHVybiB0aW1lRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdExldmVsKHF1ZXN0RGVmaW5pdGlvbiwgcG9pbnRzKSB7XG4gICAgICAgIGlmICghcXVlc3REZWZpbml0aW9uIHx8ICFxdWVzdERlZmluaXRpb24ubGV2ZWxzIHx8IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxldmVsSW5kZXggPSBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmZpbmRJbmRleChsZXZlbCA9PiBwb2ludHMgPCBsZXZlbC5wb2ludHMpO1xuICAgICAgICByZXR1cm4gbGV2ZWxJbmRleCA9PT0gLTEgPyBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA6IGxldmVsSW5kZXg7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdFR5cGUocXVlc3QpIHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZVN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVFbmQpO1xuICAgICAgICBpZiAoY3VycmVudERhdGUgPCBzdGFydERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBGVVRVUkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPTERfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBQ1RJVkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckluUXVlc3QoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy9xdWVzdHJlZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7Y2hlY2tDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7TWF0aC5mbG9vcih1c2VyLnBvaW50cyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0yMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIwMS0zMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzMwMS00MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQwMS01MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUwMS02MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYwMS02NTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzY1MS03MDBgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDQpO1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgbGV0IG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdl9fcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cnKSwgMTAwMCk7XG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gZm9yIHRlc3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG5cbiAgICBsZXQgd2VlayA9IDFcblxuICAgIGNvbnN0IGdhbWVXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lX19ob3VzZVwiKSxcbiAgICAgICAgICB3ZWVrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrLWJ0blwiKTtcblxuICAgIHdlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih3ZWVrID49IDQpIHtcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHdlZWsgPSAxXG4gICAgICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QucmVtb3ZlKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgIHdlZWsrK1xuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgfSlcblxuXG59KSgpO1xuIiwiIl19
