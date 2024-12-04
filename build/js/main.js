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

  //progress
  function refreshProgress() {
    var progressBars = document.querySelectorAll('.quest__item-info-progress');
    progressBars.forEach(function (item) {
      var progress = item.querySelector('.progress');
      var widthValue = item.getAttribute('data-progress');
      progress.style.width = "calc(".concat(widthValue, " - 6px)");
    });
  }

  //show popupchik
  var body = document.querySelector('body');
  var itemsSlider = document.querySelectorAll('.route__item');
  var popupWrap = document.querySelector('.popup');
  var btnTableShow = document.querySelector('.result__subtext');
  var tablePopup = document.querySelector('.prize-fund');
  var tablePopupBtnClose = document.querySelector('.prize-fund-close');
  function showPopup() {
    popupWrap.classList.remove('_hidden');
    body.style.overflow = 'hidden';
    var popup = document.querySelector(".quest");
    if (popup) {
      popup.style.display = 'block';
    }
  }
  function hiddenPopup() {
    popupWrap.classList.add('_hidden');
    body.style.overflow = 'auto';
    var popup = document.querySelector(".quest");
    if (popup) {
      popup.style.display = 'none';
    }
  }
  popupWrap.addEventListener('click', function (event) {
    var closeBtn = event.target.closest('.quest-close');
    if (closeBtn) {
      hiddenPopup();
    }
  });
  itemsSlider.forEach(function (item) {
    item.addEventListener('click', function () {
      showPopup();
    });
  });
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

  //show popup- details
  var questItems = document.querySelectorAll('.quest__item');
  questItems.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('_open');
    });
  });
})();
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJ1a0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJjb25jYXQiLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwiX2kiLCJfYXJyIiwibGFuZyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiX29iamVjdFNwcmVhZCIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsImluaXREcm9wIiwib3BlbkRyb3AiLCJkZXNrQ2xhc3MiLCJmb3JFYWNoIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwicXVlc3RTdGFydEJ0biIsImUiLCJyZWdpc3RlckluUXVlc3QiLCJyZWZyZXNoUXVlc3RzIiwiY3VycmVudFVzZXIiLCJzaGlmdCIsImlzU2Vjb25kV2VlayIsImkiLCJyZW5kZXJRdWVzdCIsImZvdXJ0aFF1ZXN0IiwiZGF0ZUVuZCIsInF1ZXN0IiwiY29udGFpbmVyIiwicXVlc3ROdW0iLCJxTnVtYmVyIiwicXVlc3RQb2ludHMiLCJmaW5kIiwicSIsInF1ZXN0VGl0bGVEaXYiLCJpbm5lckhUTUwiLCJ0cmFuc2xhdGVLZXkiLCJxdWVzdFN1YlRpdGxlRGl2IiwicXVlc3RUeXBlIiwiZ2V0UXVlc3RUeXBlIiwidGltZXJFbGVtZW50IiwicG9wdXBUaW1lciIsImNvdW50ZG93blRpbWVyIiwidXBkYXRlUG9wdXAiLCJzdGFyRGl2cyIsInF1ZXN0TGV2ZWwiLCJnZXRRdWVzdExldmVsIiwicG9pbnRzIiwic3RhciIsInNyY0Rlc2MiLCJzcmNNb2IiLCJzcmNEZWZhdWx0Iiwic3Jjc2V0Iiwic3JjIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInF1ZXN0TmFtZSIsImNzc0NsYXNzIiwidXNlclBvaW50c0ZvclF1ZXN0IiwibGV2ZWxEaXYiLCJsZXZlbEluZm8iLCJsZXZlbHMiLCJzdWJ0aXRsZSIsImluZm9UZXh0IiwibGV2ZWxTdGFydFBvaW50cyIsImxldmVsRW5kUG9pbnRzIiwibGV2ZWxQb2ludHMiLCJwcm9ncmVzc1BvaW50cyIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwcm9ncmVzc1ZhbHVlIiwibm9ybWFsaXplZCIsImZsb29yIiwicHJvZ3Jlc3NFbGVtZW50IiwidmFsdWUiLCJkYXRhc2V0IiwicHJvZ3Jlc3MiLCJzdGF0dXNEaXYiLCJyZWZyZXNoUHJvZ3Jlc3MiLCJ0YXJnZXREYXRlU3RyaW5nIiwicmVmcmVzaFRpbWVyIiwiaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwidGltZURpZmYiLCJjbGVhckludGVydmFsIiwiZm9ybWF0VGltZSIsInJlbG9hZCIsImtleSIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJyZXBsYWNlIiwidG9TdHJpbmciLCJ0YXJnZXREYXRlIiwibm93IiwiZ2V0VGltZSIsInF1ZXN0RGVmaW5pdGlvbiIsImxldmVsSW5kZXgiLCJmaW5kSW5kZXgiLCJsZXZlbCIsInN0YXJ0RGF0ZSIsImRhdGVTdGFydCIsImVuZERhdGUiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsImdfdXNlcl9pZCIsImNoZWNrVXNlckF1dGgiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJ1c2VyaWQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlbmRlclVzZXJzIiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJjdXJyZW50VXNlcklkIiwidGFibGUiLCJhbGxVc2VycyIsImNoZWNrQ3VycmVudFVzZXIiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwiYXBwZW5kIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsImVyciIsImYiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwicGFydGljaXBhdGVCdG4iLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwibWFpblBhZ2UiLCJzZXRUaW1lb3V0IiwicHJvZ3Jlc3NCYXJzIiwid2lkdGhWYWx1ZSIsImdldEF0dHJpYnV0ZSIsInN0eWxlIiwid2lkdGgiLCJpdGVtc1NsaWRlciIsInBvcHVwV3JhcCIsImJ0blRhYmxlU2hvdyIsInRhYmxlUG9wdXAiLCJ0YWJsZVBvcHVwQnRuQ2xvc2UiLCJzaG93UG9wdXAiLCJvdmVyZmxvdyIsInBvcHVwIiwiZGlzcGxheSIsImhpZGRlblBvcHVwIiwiZXZlbnQiLCJjbG9zZUJ0biIsInRhcmdldCIsImNsb3Nlc3QiLCJydWxlc0l0ZW1zIiwidG9nZ2xlIiwicXVlc3RJdGVtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFDVCxJQUFNQSxNQUFNLEdBQUcsZ0NBQWdDO0VBQy9DLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxlQUFlLENBQUNDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7RUFDN0QsSUFBTUMsZ0JBQWdCLEdBQUcsS0FBSztFQUU5QixJQUFNQyxpQkFBaUIsR0FBRyxRQUFRO0lBQzlCQyxjQUFjLEdBQUcsS0FBSztJQUN0QkMsaUJBQWlCLEdBQUcsUUFBUTtFQUVoQyxJQUNJQyxpQkFBaUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsMkJBQTJCLENBQUM7SUFDdkVDLGVBQWUsR0FBR0YsUUFBUSxDQUFDRyxjQUFjLENBQUMsV0FBVyxDQUFDO0lBQ3REQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxlQUFlLEdBQUdOLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3hERSxtQkFBbUIsR0FBR1AsUUFBUSxDQUFDRyxjQUFjLENBQUMsZUFBZSxDQUFDO0lBQzlESyxZQUFZLEdBQUdSLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RESSxTQUFTLEdBQUdULFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsY0FBYyxDQUFDO0lBQ3JE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LENBQUM7O0VBSUY7RUFDQSxJQUFNTSxVQUFVLEdBQUcxTyxRQUFRLENBQUNLLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztFQUM1RHFPLFVBQVUsQ0FBQzNLLE9BQU8sQ0FBQyxVQUFBSSxJQUFJLEVBQUk7SUFDdkJBLElBQUksQ0FBQ0YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDakNFLElBQUksQ0FBQ2xCLFNBQVMsQ0FBQzBMLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDOztFQUVGO0VBQ0EsSUFBTUMsVUFBVSxHQUFHNU8sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFDNUR1TyxVQUFVLENBQUM3SyxPQUFPLENBQUMsVUFBQUksSUFBSSxFQUFJO0lBQ3ZCQSxJQUFJLENBQUNGLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQ2pDRSxJQUFJLENBQUNsQixTQUFTLENBQUMwTCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztBQUVOLENBQUMsRUFBRSxDQUFDO0FDdmtCSiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX255X3VhJztcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHBhcnRpY2lwYXRlUGFyYW0gPSAncmVnJztcblxuICAgIGNvbnN0IEZVVFVSRV9RVUVTVF9UWVBFID0gJ2Z1dHVyZScsXG4gICAgICAgIE9MRF9RVUVTVF9UWVBFID0gJ29sZCcsXG4gICAgICAgIEFDVElWRV9RVUVTVF9UWVBFID0gJ2FjdGl2ZSc7XG5cbiAgICBjb25zdFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2JvZHktb3RoZXInKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC11c2VycycpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZWRpcmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIHF1ZXN0RGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpLFxuICAgICAgICBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0LXBsYXknKSxcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RCdG4nKSxcbiAgICAgICAgcXVlc3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdCcpLFxuICAgICAgICBxdWVzdExldmVsRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpLFxuICAgICAgICBwb3B1cFBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlyc3RQbGF5Jyk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vbmV3IERhdGUoXCIyMDIzLTEyLTE0VDIxOjAwOjAwLjAwMFpcIik7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBxdWVzdHM7XG4gICAgbGV0IHVzZXJJbmZvO1xuXG4gICAgY29uc3QgdWtMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuICAgIGxldCBsb2NhbGUgPSAndWsnO1xuXG4gICAgaWYgKHVrTGVuZykgbG9jYWxlID0gJ3VrJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG4gICAgLy8gbGV0IHVzZXJJZCA9IDEwMDM0MDAyMDtcblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L3RyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcblxuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1llYXIyMDI0JyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmIChlbGVtcyAmJiBlbGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAvLyAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgIC8vICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0ZSBpcyB3b3JraW5nXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQsIGJhc2VDc3NDbGFzcykge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNzc0NsYXNzICsgbGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDc3NDbGFzcyArIGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByZXF1ZXN0KCcvdXNlcnMnKSxcbiAgICAgICAgICAgIHJlcXVlc3QoJy9xdWVzdHMnKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RHJvcCgpIHtcbiAgICAgICAgY29uc3Qgb3BlbkRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9SdWxlc1wiKTtcbiAgICAgICAgbGV0IGRlc2tDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5Gb290ZXJfY29udGFpbmVyLS1CU1gnKTtcblxuICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKG9wZW4gPT4ge1xuICAgICAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wT3BlblwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxzLm9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoIWRlc2tDbGFzcykge1xuICAgICAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnYmxvY2tMaW5rJykpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgaW5pdERyb3AoKTtcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4geyByZWdpc3RlckluUXVlc3QoKTsgfSkpO1xuXG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocXVlc3RzKTtcbiAgICAgICAgICAgIC8vIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIC8vIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbylcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hRdWVzdHMocXVlc3RzLCBjdXJyZW50VXNlcikge1xuICAgICAgICBpZiAoIXF1ZXN0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hpZnQgPSBpc1NlY29uZFdlZWsocXVlc3RzKSA/IDQgOiAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0RGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVuZGVyUXVlc3QocXVlc3RzW2kgKyBzaGlmdF0sIHF1ZXN0RGl2c1tpXSwgY3VycmVudFVzZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTZWNvbmRXZWVrKHF1ZXN0cykge1xuICAgICAgICBjb25zdCBmb3VydGhRdWVzdCA9IHF1ZXN0c1szXTtcbiAgICAgICAgcmV0dXJuIGZvdXJ0aFF1ZXN0ICYmIGN1cnJlbnREYXRlID4gbmV3IERhdGUoZm91cnRoUXVlc3QuZGF0ZUVuZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUXVlc3QocXVlc3QsIGNvbnRhaW5lciwgY3VycmVudFVzZXIpIHtcbiAgICAgICAgaWYgKCFxdWVzdCB8fCAhY29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBxdWVzdE51bSA9IHF1ZXN0LnFOdW1iZXI7XG4gICAgICAgIC8vY29uc3QgcXVlc3RQb2ludHMgPSB7cG9pbnRzOiAzMDB9O1xuICAgICAgICBjb25zdCBxdWVzdFBvaW50cyA9IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLnF1ZXN0cyAmJiBjdXJyZW50VXNlci5xdWVzdHMuZmluZChxID0+IHEucXVlc3ROdW0gPT09IHF1ZXN0TnVtKTtcblxuICAgICAgICAvLyB1cGRhdGUgdHJhbnNsYXRpb25zXG4gICAgICAgIGNvbnN0IHF1ZXN0VGl0bGVEaXYgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJvdXRlX19pdGVtLXRpdGxlJyk7XG4gICAgICAgIHF1ZXN0VGl0bGVEaXYuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBuYW1lUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgcXVlc3RTdWJUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tc3VidGl0bGUnKTtcbiAgICAgICAgcXVlc3RTdWJUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHF1ZXN0LSR7cXVlc3ROdW19YCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHR5cGUgb2YgcXVlc3RcbiAgICAgICAgY29uc3QgcXVlc3RUeXBlID0gZ2V0UXVlc3RUeXBlKHF1ZXN0KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nvb24nKTtcblxuICAgICAgICBpZiAocXVlc3RUeXBlID09PSBPTERfUVVFU1RfVFlQRSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlc3RUeXBlID09PSBGVVRVUkVfUVVFU1RfVFlQRSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nvb24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcudGltZXJUeHQnKTtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwVGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpbWUtbnVtJyk7XG4gICAgICAgICAgICBjb3VudGRvd25UaW1lcihxdWVzdC5kYXRlRW5kLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApXG4gICAgICAgICAgICB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHN0YXJzXG4gICAgICAgIGlmIChxdWVzdFBvaW50cykge1xuICAgICAgICAgICAgY29uc3Qgc3RhckRpdnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnN0YXInKTtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXN0TGV2ZWwgPSBnZXRRdWVzdExldmVsKHF1ZXN0LCBxdWVzdFBvaW50cy5wb2ludHMgfHwgMCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0TGV2ZWw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXIgPSBzdGFyRGl2c1tpXTtcbiAgICAgICAgICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ19kb25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGVzIGltYWdlc1xuICAgICAgICBjb25zdCBzcmNEZXNjID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX2Rlc2MnKTtcbiAgICAgICAgY29uc3Qgc3JjTW9iID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX21vYicpO1xuICAgICAgICBjb25zdCBzcmNEZWZhdWx0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcmNfX2RlZmF1bHQnKTtcbiAgICAgICAgc3JjRGVzYy5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctZGVzYy5wbmdgO1xuICAgICAgICBzcmNNb2Iuc3Jjc2V0ID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLW1vYi5wbmdgO1xuICAgICAgICBzcmNEZWZhdWx0LnNyYyA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG5cbiAgICAgICAgLy8gdXBkYXRlIGJ1dHRvbnNcbiAgICAgICAgaWYgKHF1ZXN0VHlwZSA9PSBBQ1RJVkVfUVVFU1RfVFlQRSAmJiB1c2VySWQgJiYgIXF1ZXN0UG9pbnRzKSB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVtb3ZpbmcgcXVlc3QgaGlkZSAnICsgY3VycmVudFVzZXIpXG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9wdXAocXVlc3QsIHF1ZXN0UG9pbnRzKSB7XG4gICAgICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10aXRsZScpO1xuICAgICAgICB0aXRsZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHF1ZXN0LSR7cXVlc3ROdW19YCk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X19kZXMtdGV4dCcpO1xuICAgICAgICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYGRlc2NyUXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgcXVlc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0X190aXRsZScpO1xuICAgICAgICBxdWVzdE5hbWUuaW5uZXJIVE1MID0gdHJhbnNsYXRlS2V5KGBuYW1lUXVlc3QtJHtxdWVzdE51bX1gKTtcblxuICAgICAgICBjb25zdCBjc3NDbGFzcyA9IHF1ZXN0TnVtICUgMiA9PSAwID8gJ3Nwb3J0JyA6ICdjYXNpbm8nO1xuICAgICAgICBxdWVzdFBvcHVwLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICBxdWVzdFBvcHVwLmNsYXNzTGlzdC5hZGQoYHF1ZXN0LXBvcHVwJHtxdWVzdE51bX1gKTtcblxuICAgICAgICBjb25zdCB1c2VyUG9pbnRzRm9yUXVlc3QgPSBxdWVzdFBvaW50cyA/IHF1ZXN0UG9pbnRzLnBvaW50cyA6IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsRGl2ID0gcXVlc3RMZXZlbERpdnNbaV07XG4gICAgICAgICAgICBjb25zdCBsZXZlbEluZm8gPSBxdWVzdC5sZXZlbHNbaV07XG4gICAgICAgICAgICBpZiAobGV2ZWxEaXYgJiYgbGV2ZWxJbmZvKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGl0bGUgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0tc3VidGl0bGUnKTtcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHByaXplUXVlc3QtJHtxdWVzdE51bX1fJHtpICsgMX1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvVGV4dCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXRleHQnKTtcbiAgICAgICAgICAgICAgICBpbmZvVGV4dC5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYHN0ZXBRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJvZ3Jlc3MgYmFyXG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxTdGFydFBvaW50cyA9IGkgPT09IDAgPyAwIDogcXVlc3QubGV2ZWxzW2kgLSAxXS5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxFbmRQb2ludHMgPSBsZXZlbEluZm8ucG9pbnRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxldmVsUG9pbnRzID0gbGV2ZWxFbmRQb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NQb2ludHMgID0gTWF0aC5taW4oTWF0aC5tYXgodXNlclBvaW50c0ZvclF1ZXN0LCAwKSwgbGV2ZWxQb2ludHMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzVmFsdWUgPSBwcm9ncmVzc1BvaW50cyAvIGxldmVsUG9pbnRzICogMTAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBNYXRoLm1pbihNYXRoLm1heChNYXRoLmZsb29yKHByb2dyZXNzVmFsdWUpLCAwKSwgMTAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc0VsZW1lbnQgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2l0ZW0taW5mby1wcm9ncmVzcycpO1xuICAgICAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC52YWx1ZSA9IG5vcm1hbGl6ZWQ7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LmRhdGFzZXQucHJvZ3Jlc3MgPSBgJHtub3JtYWxpemVkfSVgO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0RpdiA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAgICAgICAgICAgICBzdGF0dXNEaXYuaW5uZXJIVE1MID0gYCR7cHJvZ3Jlc3NQb2ludHN9LyR7bGV2ZWxQb2ludHN9YDtcbiAgICAgICAgICAgICAgICBpZiAodXNlclBvaW50c0ZvclF1ZXN0IDwgbGV2ZWxTdGFydFBvaW50cyB8fCAhdXNlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXlCdG4gPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcudG9vay1wYXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoUHJvZ3Jlc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb3VudGRvd25UaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAgICAgcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgICAgICAgICAgaWYgKHRpbWVEaWZmIDwgMCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBwb3B1cFRpbWVyLmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ3RpbWVyJywgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRUaW1lKGtleSwgZGF5cywgaG91cnMsIG1pbnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZUtleShrZXkpLnJlcGxhY2UoXCJ7ZGF5fVwiLCBkYXlzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcIntob3VyfVwiLCBob3Vycy50b1N0cmluZygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7bWludXRlc31cIiwgbWludXRlcy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldERhdGUgPSBuZXcgRGF0ZSh0YXJnZXREYXRlU3RyaW5nKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdGltZURpZmYgPSB0YXJnZXREYXRlLmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKCk7XG5cbiAgICAgICAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IodGltZURpZmYgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoKHRpbWVEaWZmICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKTtcblxuXG4gICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCdmaW5pc2hlZFRpbWVyJywgZGF5cywgaG91cnMsIG1pbnV0ZXMpO1xuICAgICAgICBwb3B1cFRpbWVyLmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ3RpbWVyJywgZGF5cywgaG91cnMsIG1pbnV0ZXMpO1xuICAgICAgICByZXR1cm4gdGltZURpZmY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UXVlc3RMZXZlbChxdWVzdERlZmluaXRpb24sIHBvaW50cykge1xuICAgICAgICBpZiAoIXF1ZXN0RGVmaW5pdGlvbiB8fCAhcXVlc3REZWZpbml0aW9uLmxldmVscyB8fCBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsZXZlbEluZGV4ID0gcXVlc3REZWZpbml0aW9uLmxldmVscy5maW5kSW5kZXgobGV2ZWwgPT4gcG9pbnRzIDwgbGV2ZWwucG9pbnRzKTtcbiAgICAgICAgcmV0dXJuIGxldmVsSW5kZXggPT09IC0xID8gcXVlc3REZWZpbml0aW9uLmxldmVscy5sZW5ndGggOiBsZXZlbEluZGV4O1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0UXVlc3RUeXBlKHF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVTdGFydCk7XG4gICAgICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShxdWVzdC5kYXRlRW5kKTtcbiAgICAgICAgaWYgKGN1cnJlbnREYXRlIDwgc3RhcnREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gRlVUVVJFX1FVRVNUX1RZUEU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudERhdGUgPiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gT0xEX1FVRVNUX1RZUEU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gQUNUSVZFX1FVRVNUX1RZUEU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBhZ2UoKSB7XG4gICAgICAgIGlmICh1c2VySWQgJiYgdXJsUGFyYW1zLmhhcyhwYXJ0aWNpcGF0ZVBhcmFtKSkge1xuICAgICAgICAgICAgcGFydGljaXBhdGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoZmFzdFJlZykge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJJblF1ZXN0KCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvcXVlc3RyZWcnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBwb3B1cFBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVXNlcnMgPSAodXNlcnMpID0+IHtcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMCk7XG4gICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodG9wVXNlcnMsIHVzZXJJZCwgdG9wUmVzdWx0c1RhYmxlLCB1c2Vycyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcklkICYmIHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gdXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSBjdXJyZW50VXNlciAmJiB1c2Vycy5pbmRleE9mKGN1cnJlbnRVc2VyKTtcblxuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnM7XG5cbiAgICAgICAgICAgIGlmICghY3VycmVudFVzZXJJbmRleCB8fCBjdXJyZW50VXNlckluZGV4IDwgMTApIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoMTAsIDEzKTtcbiAgICAgICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heChjdXJyZW50VXNlckluZGV4IC0gMSwgMTApLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvdGhlclVzZXJzICYmIG90aGVyVXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKG90aGVyVXNlcnMsIHVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgdGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja0N1cnJlbnRVc2VyID0gY3VycmVudFVzZXJJZCAmJiBjdXJyZW50VXNlcklkID09PSB1c2VyLnVzZXJpZDtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlUmVzdWx0c19fcm93Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgnX3lvdXJQbGFjZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplUGxhY2VDc3MgPSBQUklaRVNfQ1NTW3BsYWNlIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKVxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCIgJHtjaGVja0N1cnJlbnRVc2VyfT4ke3BsYWNlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke2NoZWNrQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke01hdGguZmxvb3IodXNlci5wb2ludHMpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpIHtcbiAgICAgICAgaWYgKHBsYWNlIDw9IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfJHtwbGFjZX1gXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNi0xMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMS01MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtMTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMDEtMjAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8yMDEtMzAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDQwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8zMDEtNDAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV80MDEtNTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDYwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MDEtNjAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDY1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82MDEtNjUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDcwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82NTEtNzAwYFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSg0KTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93JyksIDEwMDApO1xuXG5cbiAgICAvL3Byb2dyZXNzXG4gICAgZnVuY3Rpb24gcmVmcmVzaFByb2dyZXNzKCkge1xuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RfX2l0ZW0taW5mby1wcm9ncmVzcycpXG4gICAgICAgIHByb2dyZXNzQmFycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MnKVxuICAgICAgICAgICAgbGV0IHdpZHRoVmFsdWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcycpXG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS53aWR0aCA9IGBjYWxjKCR7d2lkdGhWYWx1ZX0gLSA2cHgpYFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vc2hvdyBwb3B1cGNoaWtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGNvbnN0IGl0ZW1zU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyk7XG4gICAgY29uc3QgcG9wdXBXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XG4gICAgY29uc3QgYnRuVGFibGVTaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdF9fc3VidGV4dCcpO1xuICAgIGNvbnN0IHRhYmxlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpemUtZnVuZCcpO1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kLWNsb3NlJyk7XG5cblxuICAgIGZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnF1ZXN0YCk7XG4gICAgICAgIGlmIChwb3B1cCkge1xuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRkZW5Qb3B1cCgpIHtcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5hZGQoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5xdWVzdGApO1xuICAgICAgICBpZiAocG9wdXApIHtcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb3B1cFdyYXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnF1ZXN0LWNsb3NlJyk7XG4gICAgICAgIGlmIChjbG9zZUJ0bikge1xuICAgICAgICAgICAgaGlkZGVuUG9wdXAoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBpdGVtc1NsaWRlci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBzaG93UG9wdXAoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBidG5UYWJsZVNob3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIHRhYmxlUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSlcblxuICAgIHRhYmxlUG9wdXBCdG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5hZGQoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSlcblxuXG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy9zaG93IHBvcHVwLSBkZXRhaWxzXG4gICAgY29uc3QgcXVlc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpXG4gICAgcXVlc3RJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdfb3BlbicpXG4gICAgICAgIH0pXG4gICAgfSlcblxufSkoKTtcbiIsIiJdfQ==
