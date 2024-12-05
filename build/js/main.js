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

  // //show popupchik
  // const body = document.querySelector('body');
  // const popupWrap = document.querySelector('.popup');
  // const btnTableShow = document.querySelector('.result__subtext');
  // const tablePopup = document.querySelector('.prize-fund');
  // const tablePopupBtnClose = document.querySelector('.prize-fund-close');

  //
  // btnTableShow.addEventListener('click', () =>{
  //     popupWrap.classList.remove('_hidden');
  //     body.style.overflow = 'hidden'
  //     tablePopup.style.display = 'block';
  // })
  //
  // tablePopupBtnClose.addEventListener('click', () => {
  //     popupWrap.classList.add('_hidden');
  //     body.style.overflow = 'auto'
  //     tablePopup.style.display = 'none';
  // })

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJ1a0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJjb25jYXQiLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJmb3JFYWNoIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwicXVlc3RTdGFydEJ0biIsImUiLCJyZWdpc3RlckluUXVlc3QiLCJyZWZyZXNoUXVlc3RzIiwiY3VycmVudFVzZXIiLCJzaGlmdCIsImlzU2Vjb25kV2VlayIsImkiLCJyZW5kZXJRdWVzdCIsImZvdXJ0aFF1ZXN0IiwiZGF0ZUVuZCIsInF1ZXN0IiwiY29udGFpbmVyIiwicXVlc3ROdW0iLCJxTnVtYmVyIiwicXVlc3RQb2ludHMiLCJmaW5kIiwicSIsInF1ZXN0VGl0bGVEaXYiLCJpbm5lckhUTUwiLCJ0cmFuc2xhdGVLZXkiLCJxdWVzdFN1YlRpdGxlRGl2IiwicXVlc3RUeXBlIiwiZ2V0UXVlc3RUeXBlIiwidGltZXJFbGVtZW50IiwicG9wdXBUaW1lciIsImNvdW50ZG93blRpbWVyIiwidXBkYXRlUG9wdXAiLCJzdGFyRGl2cyIsInF1ZXN0TGV2ZWwiLCJnZXRRdWVzdExldmVsIiwicG9pbnRzIiwic3RhciIsInNyY0Rlc2MiLCJzcmNNb2IiLCJzcmNEZWZhdWx0Iiwic3Jjc2V0Iiwic3JjIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInF1ZXN0TmFtZSIsImNzc0NsYXNzIiwidXNlclBvaW50c0ZvclF1ZXN0IiwibGV2ZWxEaXYiLCJsZXZlbEluZm8iLCJsZXZlbHMiLCJzdWJ0aXRsZSIsImluZm9UZXh0IiwibGV2ZWxTdGFydFBvaW50cyIsImxldmVsRW5kUG9pbnRzIiwibGV2ZWxQb2ludHMiLCJwcm9ncmVzc1BvaW50cyIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwcm9ncmVzc1ZhbHVlIiwibm9ybWFsaXplZCIsImZsb29yIiwicHJvZ3Jlc3NFbGVtZW50IiwidmFsdWUiLCJkYXRhc2V0IiwicHJvZ3Jlc3MiLCJzdGF0dXNEaXYiLCJyZWZyZXNoUHJvZ3Jlc3MiLCJ0YXJnZXREYXRlU3RyaW5nIiwicmVmcmVzaFRpbWVyIiwiaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwidGltZURpZmYiLCJjbGVhckludGVydmFsIiwiZm9ybWF0VGltZSIsInJlbG9hZCIsImtleSIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJyZXBsYWNlIiwidG9TdHJpbmciLCJ0YXJnZXREYXRlIiwibm93IiwiZ2V0VGltZSIsInF1ZXN0RGVmaW5pdGlvbiIsImxldmVsSW5kZXgiLCJmaW5kSW5kZXgiLCJsZXZlbCIsInN0YXJ0RGF0ZSIsImRhdGVTdGFydCIsImVuZERhdGUiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJ1c2VyaWQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlbmRlclVzZXJzIiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJjdXJyZW50VXNlcklkIiwidGFibGUiLCJhbGxVc2VycyIsImNoZWNrQ3VycmVudFVzZXIiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwiYXBwZW5kIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsImVyciIsImYiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwicGFydGljaXBhdGVCdG4iLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwibWFpblBhZ2UiLCJzZXRUaW1lb3V0IiwicnVsZXNJdGVtcyIsInRvZ2dsZSIsIndlZWsiLCJnYW1lV3JhcCIsIndlZWtCdG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLGdDQUFnQztFQUMvQyxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsZUFBZSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQzdELElBQU1DLGdCQUFnQixHQUFHLEtBQUs7RUFFOUIsSUFBTUMsaUJBQWlCLEdBQUcsUUFBUTtJQUM5QkMsY0FBYyxHQUFHLEtBQUs7SUFDdEJDLGlCQUFpQixHQUFHLFFBQVE7RUFFaEMsSUFDSUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBQ3ZFQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUN0REMsVUFBVSxHQUFHSixRQUFRLENBQUNLLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsZUFBZSxHQUFHTixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN4REUsbUJBQW1CLEdBQUdQLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUM5REssWUFBWSxHQUFHUixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REksU0FBUyxHQUFHVCxRQUFRLENBQUNLLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztJQUNyREssT0FBTyxHQUFHVixRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDL0NVLGNBQWMsR0FBR1gsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDdkRPLFVBQVUsR0FBR1osUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQzdDWSxjQUFjLEdBQUdiLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsY0FBYyxDQUFDO0lBQzFEUyxZQUFZLEdBQUdk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QyxDQUFDOztFQUVGO0VBQ0F4TixRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQ2dFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQy9EakUsUUFBUSxDQUFDZ0wsSUFBSSxDQUFDL0gsU0FBUyxDQUFDdUssTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUMxQyxDQUFDLENBQUM7RUFFRixJQUFJQyxJQUFJLEdBQUcsQ0FBQztFQUVaLElBQU1DLFFBQVEsR0FBRzFOLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNqRDBOLE9BQU8sR0FBRzNOLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUVuRDBOLE9BQU8sQ0FBQzFKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQ25DLElBQUd3SixJQUFJLElBQUksQ0FBQyxFQUFFO01BQ1ZDLFFBQVEsQ0FBQ3pLLFNBQVMsQ0FBQ0MsTUFBTSxRQUFBdEIsTUFBQSxDQUFRNkwsSUFBSSxDQUFFLENBQUM7TUFDeENBLElBQUksR0FBRyxDQUFDO01BQ1JDLFFBQVEsQ0FBQ3pLLFNBQVMsQ0FBQ0UsR0FBRyxRQUFBdkIsTUFBQSxDQUFRNkwsSUFBSSxDQUFFLENBQUM7TUFDckM7SUFDSjtJQUNBQyxRQUFRLENBQUN6SyxTQUFTLENBQUNDLE1BQU0sUUFBQXRCLE1BQUEsQ0FBUTZMLElBQUksQ0FBRSxDQUFDO0lBQ3hDQSxJQUFJLEVBQUU7SUFDTkMsUUFBUSxDQUFDekssU0FBUyxDQUFDRSxHQUFHLFFBQUF2QixNQUFBLENBQVE2TCxJQUFJLENBQUUsQ0FBQztFQUN6QyxDQUFDLENBQUM7QUFHTixDQUFDLEVBQUUsQ0FBQztBQzFpQkoiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV91YSc7XG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBwYXJ0aWNpcGF0ZVBhcmFtID0gJ3JlZyc7XG5cbiAgICBjb25zdCBGVVRVUkVfUVVFU1RfVFlQRSA9ICdmdXR1cmUnLFxuICAgICAgICBPTERfUVVFU1RfVFlQRSA9ICdvbGQnLFxuICAgICAgICBBQ1RJVkVfUVVFU1RfVFlQRSA9ICdhY3RpdmUnO1xuXG4gICAgY29uc3RcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19ib2R5LW90aGVyJyksXG4gICAgICAgIHRvcFJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtdXNlcnMnKSxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tam9pbicpLFxuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBxdWVzdERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm91dGVfX2l0ZW0nKSxcbiAgICAgICAgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdC1wbGF5JyksXG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0QnRuJyksXG4gICAgICAgIHF1ZXN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QnKSxcbiAgICAgICAgcXVlc3RMZXZlbERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RfX2l0ZW0nKSxcbiAgICAgICAgcG9wdXBQbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpcnN0UGxheScpO1xuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpOyAvL25ldyBEYXRlKFwiMjAyMy0xMi0xNFQyMTowMDowMC4wMDBaXCIpO1xuICAgIGxldCB1c2VycztcbiAgICBsZXQgcXVlc3RzO1xuICAgIGxldCB1c2VySW5mbztcblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICBsZXQgbG9jYWxlID0gJ3VrJztcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICAvLyBsZXQgdXNlcklkO1xuICAgIGxldCB1c2VySWQgPSAxMDAzNDAwMjA7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgLy8gICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgLy8gICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAvLyAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGUgaXMgd29ya2luZ1wiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzJyksXG4gICAgICAgICAgICByZXF1ZXN0KCcvcXVlc3RzJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHsgcmVnaXN0ZXJJblF1ZXN0KCk7IH0pKTtcblxuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF07XG4gICAgICAgICAgICBxdWVzdHMgPSAocmVzWzFdIHx8IFtdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHF1ZXN0cyk7XG4gICAgICAgICAgICAvLyByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICAvLyByZWZyZXNoUXVlc3RzKHF1ZXN0cywgdXNlckluZm8pXG4gICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoUXVlc3RzKHF1ZXN0cywgY3VycmVudFVzZXIpIHtcbiAgICAgICAgaWYgKCFxdWVzdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoaWZ0ID0gaXNTZWNvbmRXZWVrKHF1ZXN0cykgPyA0IDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlbmRlclF1ZXN0KHF1ZXN0c1tpICsgc2hpZnRdLCBxdWVzdERpdnNbaV0sIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU2Vjb25kV2VlayhxdWVzdHMpIHtcbiAgICAgICAgY29uc3QgZm91cnRoUXVlc3QgPSBxdWVzdHNbM107XG4gICAgICAgIHJldHVybiBmb3VydGhRdWVzdCAmJiBjdXJyZW50RGF0ZSA+IG5ldyBEYXRlKGZvdXJ0aFF1ZXN0LmRhdGVFbmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclF1ZXN0KHF1ZXN0LCBjb250YWluZXIsIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgIGlmICghcXVlc3QgfHwgIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICAvL2NvbnN0IHF1ZXN0UG9pbnRzID0ge3BvaW50czogMzAwfTtcbiAgICAgICAgY29uc3QgcXVlc3RQb2ludHMgPSBjdXJyZW50VXNlciAmJiBjdXJyZW50VXNlci5xdWVzdHMgJiYgY3VycmVudFVzZXIucXVlc3RzLmZpbmQocSA9PiBxLnF1ZXN0TnVtID09PSBxdWVzdE51bSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRyYW5zbGF0aW9uc1xuICAgICAgICBjb25zdCBxdWVzdFRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS10aXRsZScpO1xuICAgICAgICBxdWVzdFRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgbmFtZVF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgICAgIGNvbnN0IHF1ZXN0U3ViVGl0bGVEaXYgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJvdXRlX19pdGVtLXN1YnRpdGxlJyk7XG4gICAgICAgIHF1ZXN0U3ViVGl0bGVEaXYuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBxdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0eXBlIG9mIHF1ZXN0XG4gICAgICAgIGNvbnN0IHF1ZXN0VHlwZSA9IGdldFF1ZXN0VHlwZShxdWVzdCk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzb29uJyk7XG5cbiAgICAgICAgaWYgKHF1ZXN0VHlwZSA9PT0gT0xEX1FVRVNUX1RZUEUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZScpO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0VHlwZSA9PT0gRlVUVVJFX1FVRVNUX1RZUEUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzb29uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnRpbWVyVHh0Jyk7XG4gICAgICAgICAgICBjb25zdCBwb3B1cFRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X190aW1lLW51bScpO1xuICAgICAgICAgICAgY291bnRkb3duVGltZXIocXVlc3QuZGF0ZUVuZCwgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKVxuICAgICAgICAgICAgdXBkYXRlUG9wdXAocXVlc3QsIHF1ZXN0UG9pbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBzdGFyc1xuICAgICAgICBpZiAocXVlc3RQb2ludHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJEaXZzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyJyk7XG4gICAgICAgICAgICBjb25zdCBxdWVzdExldmVsID0gZ2V0UXVlc3RMZXZlbChxdWVzdCwgcXVlc3RQb2ludHMucG9pbnRzIHx8IDApO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFyID0gc3RhckRpdnNbaV07XG4gICAgICAgICAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdfZG9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlcyBpbWFnZXNcbiAgICAgICAgY29uc3Qgc3JjRGVzYyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19kZXNjJyk7XG4gICAgICAgIGNvbnN0IHNyY01vYiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19tb2InKTtcbiAgICAgICAgY29uc3Qgc3JjRGVmYXVsdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3JjX19kZWZhdWx0Jyk7XG4gICAgICAgIHNyY0Rlc2Muc3Jjc2V0ID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcbiAgICAgICAgc3JjTW9iLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1tb2IucG5nYDtcbiAgICAgICAgc3JjRGVmYXVsdC5zcmMgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctZGVzYy5wbmdgO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBidXR0b25zXG4gICAgICAgIGlmIChxdWVzdFR5cGUgPT0gQUNUSVZFX1FVRVNUX1RZUEUgJiYgdXNlcklkICYmICFxdWVzdFBvaW50cykge1xuICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICBwb3B1cFBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3JlbW92aW5nIHF1ZXN0IGhpZGUgJyArIGN1cnJlbnRVc2VyKVxuICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cykge1xuICAgICAgICBjb25zdCBxdWVzdE51bSA9IHF1ZXN0LnFOdW1iZXI7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X19kZXMtdGl0bGUnKTtcbiAgICAgICAgdGl0bGUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBxdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRleHQnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBkZXNjclF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgICAgIGNvbnN0IHF1ZXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGl0bGUnKTtcbiAgICAgICAgcXVlc3ROYW1lLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgbmFtZVF1ZXN0LSR7cXVlc3ROdW19YCk7XG5cbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBxdWVzdE51bSAlIDIgPT0gMCA/ICdzcG9ydCcgOiAnY2FzaW5vJztcbiAgICAgICAgcXVlc3RQb3B1cC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgcXVlc3RQb3B1cC5jbGFzc0xpc3QuYWRkKGBxdWVzdC1wb3B1cCR7cXVlc3ROdW19YCk7XG5cbiAgICAgICAgY29uc3QgdXNlclBvaW50c0ZvclF1ZXN0ID0gcXVlc3RQb2ludHMgPyBxdWVzdFBvaW50cy5wb2ludHMgOiAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0TGV2ZWxEaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsZXZlbERpdiA9IHF1ZXN0TGV2ZWxEaXZzW2ldO1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxJbmZvID0gcXVlc3QubGV2ZWxzW2ldO1xuICAgICAgICAgICAgaWYgKGxldmVsRGl2ICYmIGxldmVsSW5mbykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRpdGxlID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLXN1YnRpdGxlJyk7XG4gICAgICAgICAgICAgICAgc3VidGl0bGUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBwcml6ZVF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5mb1RleHQgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0taW5mby10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgaW5mb1RleHQuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBzdGVwUXVlc3QtJHtxdWVzdE51bX1fJHtpICsgMX1gKTtcblxuICAgICAgICAgICAgICAgIC8vIHByb2dyZXNzIGJhclxuICAgICAgICAgICAgICAgIGNvbnN0IGxldmVsU3RhcnRQb2ludHMgPSBpID09PSAwID8gMCA6IHF1ZXN0LmxldmVsc1tpIC0gMV0ucG9pbnRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxldmVsRW5kUG9pbnRzID0gbGV2ZWxJbmZvLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFBvaW50cyA9IGxldmVsRW5kUG9pbnRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzUG9pbnRzICA9IE1hdGgubWluKE1hdGgubWF4KHVzZXJQb2ludHNGb3JRdWVzdCwgMCksIGxldmVsUG9pbnRzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NQb2ludHMgLyBsZXZlbFBvaW50cyAqIDEwMDtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihwcm9ncmVzc1ZhbHVlKSwgMCksIDEwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NFbGVtZW50ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQudmFsdWUgPSBub3JtYWxpemVkO1xuICAgICAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC5kYXRhc2V0LnByb2dyZXNzID0gYCR7bm9ybWFsaXplZH0lYDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNEaXYgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgICAgICAgICAgc3RhdHVzRGl2LmlubmVySFRNTCA9IGAke3Byb2dyZXNzUG9pbnRzfS8ke2xldmVsUG9pbnRzfWA7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJQb2ludHNGb3JRdWVzdCA8IGxldmVsU3RhcnRQb2ludHMgfHwgIXVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5QnRuID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnRvb2stcGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaFByb2dyZXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnRkb3duVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKSB7XG4gICAgICAgIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgICAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZURpZmYgPSByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCdmaW5pc2hlZFRpbWVyJywgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShrZXksIGRheXMsIGhvdXJzLCBtaW51dGVzKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGVLZXkoa2V5KS5yZXBsYWNlKFwie2RheX1cIiwgZGF5cy50b1N0cmluZygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7aG91cn1cIiwgaG91cnMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie21pbnV0ZXN9XCIsIG1pbnV0ZXMudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICBjb25zdCB0YXJnZXREYXRlID0gbmV3IERhdGUodGFyZ2V0RGF0ZVN0cmluZyk7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHRpbWVEaWZmID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKHRpbWVEaWZmIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLyAoMTAwMCAqIDYwICogNjApKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRpbWVEaWZmICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XG5cblxuICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAgICAgcmV0dXJuIHRpbWVEaWZmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFF1ZXN0TGV2ZWwocXVlc3REZWZpbml0aW9uLCBwb2ludHMpIHtcbiAgICAgICAgaWYgKCFxdWVzdERlZmluaXRpb24gfHwgIXF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMgfHwgcXVlc3REZWZpbml0aW9uLmxldmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGV2ZWxJbmRleCA9IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMuZmluZEluZGV4KGxldmVsID0+IHBvaW50cyA8IGxldmVsLnBvaW50cyk7XG4gICAgICAgIHJldHVybiBsZXZlbEluZGV4ID09PSAtMSA/IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoIDogbGV2ZWxJbmRleDtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldFF1ZXN0VHlwZShxdWVzdCkge1xuICAgICAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZShxdWVzdC5kYXRlU3RhcnQpO1xuICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZUVuZCk7XG4gICAgICAgIGlmIChjdXJyZW50RGF0ZSA8IHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIEZVVFVSRV9RVUVTVF9UWVBFO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnREYXRlID4gZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIE9MRF9RVUVTVF9UWVBFO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEFDVElWRV9RVUVTVF9UWVBFO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHZhciBpID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhd2luZG93LmdfdXNlcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBQYWdlKCkge1xuICAgICAgICBpZiAodXNlcklkICYmIHVybFBhcmFtcy5oYXMocGFydGljaXBhdGVQYXJhbSkpIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnRpY2lwYXRlKGZhc3RSZWcpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3VzZXInLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVySW5RdWVzdCgpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3F1ZXN0cmVnJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclVzZXJzID0gKHVzZXJzKSA9PiB7XG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRvcFVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHRvcFVzZXJzLCB1c2VySWQsIHRvcFJlc3VsdHNUYWJsZSwgdXNlcnMpO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJJZCAmJiB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IHVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgJiYgdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcik7XG5cbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzO1xuXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRVc2VySW5kZXggfHwgY3VycmVudFVzZXJJbmRleCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKDEwLCAxMyk7XG4gICAgICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoY3VycmVudFVzZXJJbmRleCAtIDEsIDEwKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3RoZXJVc2VycyAmJiBvdGhlclVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZShvdGhlclVzZXJzLCB1c2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIHRhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tDdXJyZW50VXNlciA9IGN1cnJlbnRVc2VySWQgJiYgY3VycmVudFVzZXJJZCA9PT0gdXNlci51c2VyaWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ195b3VyUGxhY2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChwcml6ZVBsYWNlQ3NzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSlcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiICR7Y2hlY2tDdXJyZW50VXNlcn0+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtjaGVja0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtNYXRoLmZsb29yKHVzZXIucG9pbnRzKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUxLTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTIwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDEpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjAxLTMwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA0MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzAxLTQwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNDAxLTUwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA2MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTAxLTYwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA2NTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNjAxLTY1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA3MDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNjUxLTcwMGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKioqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoNCk7XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8gPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUXVlc3RzKHF1ZXN0cywgdXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdCk7XG5cbiAgICBsZXQgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2X19wYWdlJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBtYWluUGFnZS5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdycpLCAxMDAwKTtcblxuXG4gICAgLy8gLy9zaG93IHBvcHVwY2hpa1xuICAgIC8vIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgLy8gY29uc3QgcG9wdXBXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XG4gICAgLy8gY29uc3QgYnRuVGFibGVTaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdF9fc3VidGV4dCcpO1xuICAgIC8vIGNvbnN0IHRhYmxlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpemUtZnVuZCcpO1xuICAgIC8vIGNvbnN0IHRhYmxlUG9wdXBCdG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kLWNsb3NlJyk7XG5cbiAgICAvL1xuICAgIC8vIGJ0blRhYmxlU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xuICAgIC8vICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX2hpZGRlbicpO1xuICAgIC8vICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAvLyAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gdGFibGVQb3B1cEJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIC8vICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LmFkZCgnX2hpZGRlbicpO1xuICAgIC8vICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXG4gICAgLy8gICAgIHRhYmxlUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAvLyB9KVxuXG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gZm9yIHRlc3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhcmstYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG5cbiAgICBsZXQgd2VlayA9IDFcblxuICAgIGNvbnN0IGdhbWVXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lX19ob3VzZVwiKSxcbiAgICAgICAgICB3ZWVrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWVrLWJ0blwiKTtcblxuICAgIHdlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih3ZWVrID49IDQpIHtcbiAgICAgICAgICAgIGdhbWVXcmFwLmNsYXNzTGlzdC5yZW1vdmUoYHdlZWske3dlZWt9YClcbiAgICAgICAgICAgIHdlZWsgPSAxXG4gICAgICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QucmVtb3ZlKGB3ZWVrJHt3ZWVrfWApXG4gICAgICAgIHdlZWsrK1xuICAgICAgICBnYW1lV3JhcC5jbGFzc0xpc3QuYWRkKGB3ZWVrJHt3ZWVrfWApXG4gICAgfSlcblxuXG59KSgpO1xuIiwiIl19
