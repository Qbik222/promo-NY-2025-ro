"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
  var userId = 666666;
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
    return Promise.all([request('/users?nocache=1'), request('/quests')]);
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
      console.log(quests);
      renderUsers(users);
      refreshQuests(quests, userInfo);
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
        var levelPoints = levelEndPoints - levelStartPoints;
        var progressPoints = Math.min(Math.max(userPointsForQuest - levelStartPoints, 0), levelPoints);
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
    if (!questDefinition) {
      return 0;
    }
    var level = questDefinition.levels.findIndex(function (level) {
      return points <= level.points;
    });
    return level === -1 ? questDefinition.levels.length - 1 : level;
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
        additionalUserRow.innerHTML = "\n                        <div class=\"tableResults__body-col\" ".concat(checkCurrentUser, ">").concat(place, "</div>\n                        <div class=\"tableResults__body-col\">").concat(user.userid, "</div>\n                        <div class=\"tableResults__body-col\">").concat(user.points, "</div>\n                        <div class=\"tableResults__body-col\">").concat(prizeKey ? translateKey(prizeKey) : ' - ', "</div>\n                    ");
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
      request("/favuser/".concat(userId, "?nocache=1")).then(function (res) {
        if (res && res.userid) {
          participateBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          redirectBtns.forEach(function (item) {
            return item.classList.remove('hide');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJ1a0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJjb25jYXQiLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwicXVlc3RTdGFydEJ0biIsImUiLCJyZWdpc3RlckluUXVlc3QiLCJjb25zb2xlIiwibG9nIiwicmVuZGVyVXNlcnMiLCJyZWZyZXNoUXVlc3RzIiwiY3VycmVudFVzZXIiLCJzaGlmdCIsImlzU2Vjb25kV2VlayIsImkiLCJyZW5kZXJRdWVzdCIsImZvdXJ0aFF1ZXN0IiwiZGF0ZUVuZCIsInF1ZXN0IiwiY29udGFpbmVyIiwicXVlc3ROdW0iLCJxTnVtYmVyIiwicXVlc3RQb2ludHMiLCJmaW5kIiwicSIsInF1ZXN0VGl0bGVEaXYiLCJ0cmFuc2xhdGVLZXkiLCJxdWVzdFN1YlRpdGxlRGl2IiwicXVlc3RUeXBlIiwiZ2V0UXVlc3RUeXBlIiwidGltZXJFbGVtZW50IiwicG9wdXBUaW1lciIsImNvdW50ZG93blRpbWVyIiwidXBkYXRlUG9wdXAiLCJzdGFyRGl2cyIsInF1ZXN0TGV2ZWwiLCJnZXRRdWVzdExldmVsIiwicG9pbnRzIiwic3RhciIsInNyY0Rlc2MiLCJzcmNNb2IiLCJzcmNEZWZhdWx0Iiwic3Jjc2V0Iiwic3JjIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInF1ZXN0TmFtZSIsImNzc0NsYXNzIiwidXNlclBvaW50c0ZvclF1ZXN0IiwibGV2ZWxEaXYiLCJsZXZlbEluZm8iLCJsZXZlbHMiLCJzdWJ0aXRsZSIsImluZm9UZXh0IiwibGV2ZWxTdGFydFBvaW50cyIsImxldmVsRW5kUG9pbnRzIiwibGV2ZWxQb2ludHMiLCJwcm9ncmVzc1BvaW50cyIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwcm9ncmVzc1ZhbHVlIiwibm9ybWFsaXplZCIsImZsb29yIiwicHJvZ3Jlc3NFbGVtZW50IiwidmFsdWUiLCJkYXRhc2V0IiwicHJvZ3Jlc3MiLCJzdGF0dXNEaXYiLCJyZWZyZXNoUHJvZ3Jlc3MiLCJ0YXJnZXREYXRlU3RyaW5nIiwicmVmcmVzaFRpbWVyIiwiaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwidGltZURpZmYiLCJjbGVhckludGVydmFsIiwiZm9ybWF0VGltZSIsInJlbG9hZCIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJyZXBsYWNlIiwidG9TdHJpbmciLCJ0YXJnZXREYXRlIiwibm93IiwiZ2V0VGltZSIsInF1ZXN0RGVmaW5pdGlvbiIsImxldmVsIiwiZmluZEluZGV4Iiwic3RhcnREYXRlIiwiZGF0ZVN0YXJ0IiwiZW5kRGF0ZSIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJzZXR1cFBhZ2UiLCJjIiwiZ191c2VyX2lkIiwiY2hlY2tVc2VyQXV0aCIsImF1dGhCdG4iLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwiaGFzIiwiZmFzdFJlZyIsInBhcmFtcyIsInVzZXJpZCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJjdXJyZW50VXNlcklkIiwidGFibGUiLCJhbGxVc2VycyIsImNoZWNrQ3VycmVudFVzZXIiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJhcHBlbmQiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwidW5hdXRoTWVzIiwiZXJyIiwiZiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJwYXJ0aWNpcGF0ZUJ0biIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJtYWluUGFnZSIsInNldFRpbWVvdXQiLCJwcm9ncmVzc0JhcnMiLCJ3aWR0aFZhbHVlIiwic3R5bGUiLCJ3aWR0aCIsIml0ZW1zU2xpZGVyIiwicG9wdXBXcmFwIiwiYnRuVGFibGVTaG93IiwidGFibGVQb3B1cCIsInRhYmxlUG9wdXBCdG5DbG9zZSIsInNob3dQb3B1cCIsIm92ZXJmbG93IiwicG9wdXAiLCJkaXNwbGF5IiwiaGlkZGVuUG9wdXAiLCJldmVudCIsImNsb3NlQnRuIiwidGFyZ2V0IiwiY2xvc2VzdCIsInJ1bGVzSXRlbXMiLCJ0b2dnbGUiLCJxdWVzdEl0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUNULElBQU1BLE1BQU0sR0FBRyxnQ0FBZ0M7RUFDL0MsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3RCxJQUFNQyxnQkFBZ0IsR0FBRyxLQUFLO0VBRTlCLElBQU1DLGlCQUFpQixHQUFHLFFBQVE7SUFDOUJDLGNBQWMsR0FBRyxLQUFLO0lBQ3RCQyxpQkFBaUIsR0FBRyxRQUFRO0VBRWhDLElBQ0lDLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUN2RUMsZUFBZSxHQUFHRixRQUFRLENBQUNHLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDdERDLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR04sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDeERFLG1CQUFtQixHQUFHUCxRQUFRLENBQUNHLGNBQWMsQ0FBQyxlQUFlLENBQUM7SUFDOURLLFlBQVksR0FBR1IsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERJLFNBQVMsR0FBR1QsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7SUFDckRL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QWdCLENBQUMsY0FBYyxDQUFDO0VBQzVEcU8sVUFBVSxDQUFDak0sT0FBTyxDQUFDLFVBQUE2QixJQUFJLEVBQUk7SUFDdkJBLElBQUksQ0FBQ0YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDakNFLElBQUksQ0FBQ2pCLFNBQVMsQ0FBQ3NMLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDOztFQUVGO0VBQ0EsSUFBTUMsVUFBVSxHQUFHNU8sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFDNUR1TyxVQUFVLENBQUNuTSxPQUFPLENBQUMsVUFBQTZCLElBQUksRUFBSTtJQUN2QkEsSUFBSSxDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNqQ0UsSUFBSSxDQUFDakIsU0FBUyxDQUFDc0wsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNsQyxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFFTixDQUFDLEVBQUUsQ0FBQztBQzlqQkoiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV91YSc7XG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBwYXJ0aWNpcGF0ZVBhcmFtID0gJ3JlZyc7XG5cbiAgICBjb25zdCBGVVRVUkVfUVVFU1RfVFlQRSA9ICdmdXR1cmUnLFxuICAgICAgICBPTERfUVVFU1RfVFlQRSA9ICdvbGQnLFxuICAgICAgICBBQ1RJVkVfUVVFU1RfVFlQRSA9ICdhY3RpdmUnO1xuXG4gICAgY29uc3RcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19ib2R5LW90aGVyJyksXG4gICAgICAgIHRvcFJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtdXNlcnMnKSxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tam9pbicpLFxuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBxdWVzdERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm91dGVfX2l0ZW0nKSxcbiAgICAgICAgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdC1wbGF5JyksXG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0QnRuJyksXG4gICAgICAgIHF1ZXN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QnKSxcbiAgICAgICAgcXVlc3RMZXZlbERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RfX2l0ZW0nKSxcbiAgICAgICAgcG9wdXBQbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpcnN0UGxheScpO1xuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpOyAvL25ldyBEYXRlKFwiMjAyMy0xMi0xNFQyMTowMDowMC4wMDBaXCIpO1xuICAgIGxldCB1c2VycztcbiAgICBsZXQgcXVlc3RzO1xuICAgIGxldCB1c2VySW5mbztcblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICBsZXQgbG9jYWxlID0gJ3VrJztcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICAvLyBsZXQgdXNlcklkO1xuICAgIGxldCB1c2VySWQgPSA2NjY2NjY7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICAgICAgcmVxdWVzdCgnL3F1ZXN0cycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREcm9wKCkge1xuICAgICAgICBjb25zdCBvcGVuRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb1J1bGVzXCIpO1xuICAgICAgICBsZXQgZGVza0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkZvb3Rlcl9jb250YWluZXItLUJTWCcpO1xuXG4gICAgICAgIG9wZW5Ecm9wLmZvckVhY2gob3BlbiA9PiB7XG4gICAgICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BPcGVuXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghZGVza0NsYXNzKSB7XG4gICAgICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdibG9ja0xpbmsnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpbml0RHJvcCgpO1xuICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IHJlZ2lzdGVySW5RdWVzdCgpOyB9KSk7XG5cbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdO1xuICAgICAgICAgICAgcXVlc3RzID0gKHJlc1sxXSB8fCBbXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhxdWVzdHMpO1xuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKVxuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgIGlmICghcXVlc3RzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlmdCA9IGlzU2Vjb25kV2VlayhxdWVzdHMpID8gNCA6IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3REaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZW5kZXJRdWVzdChxdWVzdHNbaSArIHNoaWZ0XSwgcXVlc3REaXZzW2ldLCBjdXJyZW50VXNlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NlY29uZFdlZWsocXVlc3RzKSB7XG4gICAgICAgIGNvbnN0IGZvdXJ0aFF1ZXN0ID0gcXVlc3RzWzNdO1xuICAgICAgICByZXR1cm4gZm91cnRoUXVlc3QgJiYgY3VycmVudERhdGUgPiBuZXcgRGF0ZShmb3VydGhRdWVzdC5kYXRlRW5kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJRdWVzdChxdWVzdCwgY29udGFpbmVyLCBjdXJyZW50VXNlcikge1xuICAgICAgICBpZiAoIXF1ZXN0IHx8ICFjb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAgICAgLy9jb25zdCBxdWVzdFBvaW50cyA9IHtwb2ludHM6IDMwMH07XG4gICAgICAgIGNvbnN0IHF1ZXN0UG9pbnRzID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIucXVlc3RzICYmIGN1cnJlbnRVc2VyLnF1ZXN0cy5maW5kKHEgPT4gcS5xdWVzdE51bSA9PT0gcXVlc3ROdW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgcXVlc3RUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tdGl0bGUnKTtcbiAgICAgICAgcXVlc3RUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdFN1YlRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICBxdWVzdFN1YlRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcblxuICAgICAgICAvLyB1cGRhdGUgdHlwZSBvZiBxdWVzdFxuICAgICAgICBjb25zdCBxdWVzdFR5cGUgPSBnZXRRdWVzdFR5cGUocXVlc3QpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc29vbicpO1xuXG4gICAgICAgIGlmIChxdWVzdFR5cGUgPT09IE9MRF9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVzdFR5cGUgPT09IEZVVFVSRV9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc29vbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGltZXJFbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50aW1lclR4dCcpO1xuICAgICAgICAgICAgY29uc3QgcG9wdXBUaW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGltZS1udW0nKTtcbiAgICAgICAgICAgIGNvdW50ZG93blRpbWVyKHF1ZXN0LmRhdGVFbmQsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYClcbiAgICAgICAgICAgIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgc3RhcnNcbiAgICAgICAgaWYgKHF1ZXN0UG9pbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFyRGl2cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpO1xuICAgICAgICAgICAgY29uc3QgcXVlc3RMZXZlbCA9IGdldFF1ZXN0TGV2ZWwocXVlc3QsIHF1ZXN0UG9pbnRzLnBvaW50cyB8fCAwKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhciA9IHN0YXJEaXZzW2ldO1xuICAgICAgICAgICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZXMgaW1hZ2VzXG4gICAgICAgIGNvbnN0IHNyY0Rlc2MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVzYycpO1xuICAgICAgICBjb25zdCBzcmNNb2IgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fbW9iJyk7XG4gICAgICAgIGNvbnN0IHNyY0RlZmF1bHQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVmYXVsdCcpO1xuICAgICAgICBzcmNEZXNjLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgICAgIHNyY01vYi5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctbW9iLnBuZ2A7XG4gICAgICAgIHNyY0RlZmF1bHQuc3JjID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcblxuICAgICAgICAvLyB1cGRhdGUgYnV0dG9uc1xuICAgICAgICBpZiAocXVlc3RUeXBlID09IEFDVElWRV9RVUVTVF9UWVBFICYmIHVzZXJJZCAmJiAhcXVlc3RQb2ludHMpIHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpIHtcbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10ZXh0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgZGVzY3JRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpdGxlJyk7XG4gICAgICAgIHF1ZXN0TmFtZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gcXVlc3ROdW0gJSAyID09IDAgPyAnc3BvcnQnIDogJ2Nhc2lubyc7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChgcXVlc3QtcG9wdXAke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IHVzZXJQb2ludHNGb3JRdWVzdCA9IHF1ZXN0UG9pbnRzID8gcXVlc3RQb2ludHMucG9pbnRzIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxEaXYgPSBxdWVzdExldmVsRGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHF1ZXN0LmxldmVsc1tpXTtcbiAgICAgICAgICAgIGlmIChsZXZlbERpdiAmJiBsZXZlbEluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcHJpemVRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm9UZXh0ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGluZm9UZXh0LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgc3RlcFF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFN0YXJ0UG9pbnRzID0gaSA9PT0gMCA/IDAgOiBxdWVzdC5sZXZlbHNbaSAtIDFdLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbEVuZFBvaW50cyA9IGxldmVsSW5mby5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxQb2ludHMgPSBsZXZlbEVuZFBvaW50cyAtIGxldmVsU3RhcnRQb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NQb2ludHMgID0gTWF0aC5taW4oTWF0aC5tYXgodXNlclBvaW50c0ZvclF1ZXN0IC0gbGV2ZWxTdGFydFBvaW50cywgMCksIGxldmVsUG9pbnRzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NQb2ludHMgLyBsZXZlbFBvaW50cyAqIDEwMDtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihwcm9ncmVzc1ZhbHVlKSwgMCksIDEwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NFbGVtZW50ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQudmFsdWUgPSBub3JtYWxpemVkO1xuICAgICAgICAgICAgICAgIHByb2dyZXNzRWxlbWVudC5kYXRhc2V0LnByb2dyZXNzID0gYCR7bm9ybWFsaXplZH0lYDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNEaXYgPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgICAgICAgICAgc3RhdHVzRGl2LmlubmVySFRNTCA9IGAke3Byb2dyZXNzUG9pbnRzfS8ke2xldmVsUG9pbnRzfWA7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJQb2ludHNGb3JRdWVzdCA8IGxldmVsU3RhcnRQb2ludHMgfHwgIXVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5QnRuID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnRvb2stcGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaFByb2dyZXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY291bnRkb3duVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKSB7XG4gICAgICAgIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpO1xuICAgICAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZURpZmYgPSByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCdmaW5pc2hlZFRpbWVyJywgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShrZXksIGRheXMsIGhvdXJzLCBtaW51dGVzKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGVLZXkoa2V5KS5yZXBsYWNlKFwie2RheX1cIiwgZGF5cy50b1N0cmluZygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7aG91cn1cIiwgaG91cnMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie21pbnV0ZXN9XCIsIG1pbnV0ZXMudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICBjb25zdCB0YXJnZXREYXRlID0gbmV3IERhdGUodGFyZ2V0RGF0ZVN0cmluZyk7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHRpbWVEaWZmID0gdGFyZ2V0RGF0ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKHRpbWVEaWZmIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLyAoMTAwMCAqIDYwICogNjApKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRpbWVEaWZmICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XG5cblxuICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAgICAgcG9wdXBUaW1lci5pbm5lckhUTUwgPSBmb3JtYXRUaW1lKCd0aW1lcicsIGRheXMsIGhvdXJzLCBtaW51dGVzKTtcbiAgICAgICAgcmV0dXJuIHRpbWVEaWZmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFF1ZXN0TGV2ZWwocXVlc3REZWZpbml0aW9uLCBwb2ludHMpIHtcbiAgICAgICAgaWYgKCFxdWVzdERlZmluaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxldmVsID0gcXVlc3REZWZpbml0aW9uLmxldmVscy5maW5kSW5kZXgobGV2ZWwgPT4gcG9pbnRzIDw9IGxldmVsLnBvaW50cyk7XG4gICAgICAgIHJldHVybiBsZXZlbCA9PT0gLTEgPyBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCAtIDEgOiBsZXZlbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdFR5cGUocXVlc3QpIHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZVN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVFbmQpO1xuICAgICAgICBpZiAoY3VycmVudERhdGUgPCBzdGFydERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBGVVRVUkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPTERfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBQ1RJVkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckluUXVlc3QoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy9xdWVzdHJlZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7dXNlci51c2VyaWR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7dXNlci5wb2ludHN9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0yMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIwMS0zMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzMwMS00MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQwMS01MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUwMS02MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYwMS02NTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzY1MS03MDBgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfT9ub2NhY2hlPTFgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgbGV0IG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdl9fcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cnKSwgMTAwMCk7XG5cblxuICAgIC8vcHJvZ3Jlc3NcbiAgICBmdW5jdGlvbiByZWZyZXNoUHJvZ3Jlc3MoKSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbS1pbmZvLXByb2dyZXNzJylcbiAgICAgICAgcHJvZ3Jlc3NCYXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcycpXG4gICAgICAgICAgICBsZXQgd2lkdGhWYWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXByb2dyZXNzJylcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLndpZHRoID0gYGNhbGMoJHt3aWR0aFZhbHVlfSAtIDZweClgXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy9zaG93IHBvcHVwY2hpa1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgY29uc3QgaXRlbXNTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm91dGVfX2l0ZW0nKTtcbiAgICBjb25zdCBwb3B1cFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbiAgICBjb25zdCBidG5UYWJsZVNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0X19zdWJ0ZXh0Jyk7XG4gICAgY29uc3QgdGFibGVQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kJyk7XG4gICAgY29uc3QgdGFibGVQb3B1cEJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaXplLWZ1bmQtY2xvc2UnKTtcblxuXG4gICAgZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xuICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX2hpZGRlbicpO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucXVlc3RgKTtcbiAgICAgICAgaWYgKHBvcHVwKSB7XG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGRlblBvcHVwKCkge1xuICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LmFkZCgnX2hpZGRlbicpO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnF1ZXN0YCk7XG4gICAgICAgIGlmIChwb3B1cCkge1xuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvcHVwV3JhcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucXVlc3QtY2xvc2UnKTtcbiAgICAgICAgaWYgKGNsb3NlQnRuKSB7XG4gICAgICAgICAgICBoaWRkZW5Qb3B1cCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIGl0ZW1zU2xpZGVyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHNob3dQb3B1cCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGJ0blRhYmxlU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xuICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgnX2hpZGRlbicpO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KVxuXG4gICAgdGFibGVQb3B1cEJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwb3B1cFdyYXAuY2xhc3NMaXN0LmFkZCgnX2hpZGRlbicpO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXG4gICAgICAgIHRhYmxlUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9KVxuXG5cblxuICAgIC8vc2hvdyBydWxlcy0gZGV0YWlsc1xuICAgIGNvbnN0IHJ1bGVzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucnVsZXNfX2l0ZW0nKVxuICAgIHJ1bGVzSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnX29wZW4nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICAvL3Nob3cgcG9wdXAtIGRldGFpbHNcbiAgICBjb25zdCBxdWVzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJylcbiAgICBxdWVzdEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG59KSgpO1xuXG4iLCIiXX0=
