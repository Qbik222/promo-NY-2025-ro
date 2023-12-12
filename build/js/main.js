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
  var currentDate = new Date("2023-12-18T21:00:00.000Z"); //new Date("2023-12-14T21:00:00.000Z");
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
  // let userId = 100467062;

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
      // console.log(quests);
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
        additionalUserRow.innerHTML = "\n                        <div class=\"tableResults__body-col\" ".concat(checkCurrentUser, ">").concat(place, "</div>\n                        <div class=\"tableResults__body-col\">").concat(checkCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n                        <div class=\"tableResults__body-col\">").concat(user.points, "</div>\n                        <div class=\"tableResults__body-col\">").concat(prizeKey ? translateKey(prizeKey) : ' - ', "</div>\n                    ");
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
      request("/favuser/".concat(userId, "?nocache=1")).then(function (res) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJ1a0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJjb25jYXQiLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwicXVlc3RTdGFydEJ0biIsImUiLCJyZWdpc3RlckluUXVlc3QiLCJyZW5kZXJVc2VycyIsInJlZnJlc2hRdWVzdHMiLCJjdXJyZW50VXNlciIsInNoaWZ0IiwiaXNTZWNvbmRXZWVrIiwiaSIsInJlbmRlclF1ZXN0IiwiZm91cnRoUXVlc3QiLCJkYXRlRW5kIiwicXVlc3QiLCJjb250YWluZXIiLCJxdWVzdE51bSIsInFOdW1iZXIiLCJxdWVzdFBvaW50cyIsImZpbmQiLCJxIiwicXVlc3RUaXRsZURpdiIsInRyYW5zbGF0ZUtleSIsInF1ZXN0U3ViVGl0bGVEaXYiLCJxdWVzdFR5cGUiLCJnZXRRdWVzdFR5cGUiLCJ0aW1lckVsZW1lbnQiLCJwb3B1cFRpbWVyIiwiY291bnRkb3duVGltZXIiLCJ1cGRhdGVQb3B1cCIsInN0YXJEaXZzIiwicXVlc3RMZXZlbCIsImdldFF1ZXN0TGV2ZWwiLCJwb2ludHMiLCJzdGFyIiwic3JjRGVzYyIsInNyY01vYiIsInNyY0RlZmF1bHQiLCJzcmNzZXQiLCJzcmMiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicXVlc3ROYW1lIiwiY3NzQ2xhc3MiLCJ1c2VyUG9pbnRzRm9yUXVlc3QiLCJsZXZlbERpdiIsImxldmVsSW5mbyIsImxldmVscyIsInN1YnRpdGxlIiwiaW5mb1RleHQiLCJsZXZlbFN0YXJ0UG9pbnRzIiwibGV2ZWxFbmRQb2ludHMiLCJsZXZlbFBvaW50cyIsInByb2dyZXNzUG9pbnRzIiwiTWF0aCIsIm1pbiIsIm1heCIsInByb2dyZXNzVmFsdWUiLCJub3JtYWxpemVkIiwiZmxvb3IiLCJwcm9ncmVzc0VsZW1lbnQiLCJ2YWx1ZSIsImRhdGFzZXQiLCJwcm9ncmVzcyIsInN0YXR1c0RpdiIsInJlZnJlc2hQcm9ncmVzcyIsInRhcmdldERhdGVTdHJpbmciLCJyZWZyZXNoVGltZXIiLCJpbnRlcnZhbElkIiwic2V0SW50ZXJ2YWwiLCJ0aW1lRGlmZiIsImNsZWFySW50ZXJ2YWwiLCJmb3JtYXRUaW1lIiwicmVsb2FkIiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsInJlcGxhY2UiLCJ0b1N0cmluZyIsInRhcmdldERhdGUiLCJub3ciLCJnZXRUaW1lIiwicXVlc3REZWZpbml0aW9uIiwibGV2ZWxJbmRleCIsImZpbmRJbmRleCIsImxldmVsIiwic3RhcnREYXRlIiwiZGF0ZVN0YXJ0IiwiZW5kRGF0ZSIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJzZXR1cFBhZ2UiLCJjIiwiZ191c2VyX2lkIiwiY2hlY2tVc2VyQXV0aCIsImF1dGhCdG4iLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwiaGFzIiwiZmFzdFJlZyIsInBhcmFtcyIsInVzZXJpZCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJjdXJyZW50VXNlcklkIiwidGFibGUiLCJhbGxVc2VycyIsImNoZWNrQ3VycmVudFVzZXIiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwiYXBwZW5kIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsImVyciIsImYiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwicGFydGljaXBhdGVCdG4iLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwibWFpblBhZ2UiLCJzZXRUaW1lb3V0IiwicHJvZ3Jlc3NCYXJzIiwid2lkdGhWYWx1ZSIsInN0eWxlIiwid2lkdGgiLCJpdGVtc1NsaWRlciIsInBvcHVwV3JhcCIsImJ0blRhYmxlU2hvdyIsInRhYmxlUG9wdXAiLCJ0YWJsZVBvcHVwQnRuQ2xvc2UiLCJzaG93UG9wdXAiLCJvdmVyZmxvdyIsInBvcHVwIiwiZGlzcGxheSIsImhpZGRlblBvcHVwIiwiZXZlbnQiLCJjbG9zZUJ0biIsInRhcmdldCIsImNsb3Nlc3QiLCJydWxlc0l0ZW1zIiwidG9nZ2xlIiwicXVlc3RJdGVtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFDVCxJQUFNQSxNQUFNLEdBQUcsZ0NBQWdDO0VBQy9DLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxlQUFlLENBQUNDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7RUFDN0QsSUFBTUMsZ0JBQWdCLEdBQUcsS0FBSztFQUU5QixJQUFNQyxpQkFBaUIsR0FBRyxRQUFRO0lBQzlCQyxjQUFjLEdBQUcsS0FBSztJQUN0QkMsaUJBQWlCLEdBQUcsUUFBUTtFQUVoQyxJQUNJQyxpQkFBaUIsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsMkJBQTJCLENBQUM7SUFDdkVDLGVBQWUsR0FBR0YsUUFBUSxDQUFDRyxjQUFjLENBQUMsV0FBVyxDQUFDO0lBQ3REQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxlQUFlLEdBQUdOLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3hERSxtQkFBbUIsR0FBR1AsUUFBUSxDQUFDRyxjQUFjLENBQUMsZUFBZSxDQUFDO0lBQzlESyxZQUFZLEdBQUdSLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RESSxTQUFTLEdBQUdULFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsY0FBYyxD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LEtBQUssQ0FBQ1UsT0FBTyxHQUFHLE9BQU87RUFDdEMsQ0FBQyxDQUFDO0VBRUZKLGtCQUFrQixDQUFDNUosZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDL0N5SixTQUFTLENBQUN4SyxTQUFTLENBQUNFLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDbEMySCxJQUFJLENBQUN3QyxLQUFLLENBQUNRLFFBQVEsR0FBRyxNQUFNO0lBQzVCSCxVQUFVLENBQUNMLEtBQUssQ0FBQ1UsT0FBTyxHQUFHLE1BQU07RUFDckMsQ0FBQyxDQUFDOztFQUlGO0VBQ0EsSUFBTU0sVUFBVSxHQUFHMU8sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFDNURxTyxVQUFVLENBQUNqTSxPQUFPLENBQUMsVUFBQTZCLElBQUksRUFBSTtJQUN2QkEsSUFBSSxDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNqQ0UsSUFBSSxDQUFDakIsU0FBUyxDQUFDc0wsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNsQyxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7O0VBRUY7RUFDQSxJQUFNQyxVQUFVLEdBQUc1TyxRQUFRLENBQUNLLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztFQUM1RHVPLFVBQVUsQ0FBQ25NLE9BQU8sQ0FBQyxVQUFBNkIsSUFBSSxFQUFJO0lBQ3ZCQSxJQUFJLENBQUNGLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQ2pDRSxJQUFJLENBQUNqQixTQUFTLENBQUNzTCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztBQUVOLENBQUMsRUFBRSxDQUFDO0FDdGtCSiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX255X3VhJztcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHBhcnRpY2lwYXRlUGFyYW0gPSAncmVnJztcblxuICAgIGNvbnN0IEZVVFVSRV9RVUVTVF9UWVBFID0gJ2Z1dHVyZScsXG4gICAgICAgIE9MRF9RVUVTVF9UWVBFID0gJ29sZCcsXG4gICAgICAgIEFDVElWRV9RVUVTVF9UWVBFID0gJ2FjdGl2ZSc7XG5cbiAgICBjb25zdFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2JvZHktb3RoZXInKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC11c2VycycpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZWRpcmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIHF1ZXN0RGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpLFxuICAgICAgICBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0LXBsYXknKSxcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RCdG4nKSxcbiAgICAgICAgcXVlc3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdCcpLFxuICAgICAgICBxdWVzdExldmVsRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpLFxuICAgICAgICBwb3B1cFBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlyc3RQbGF5Jyk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKFwiMjAyMy0xMi0xOFQyMTowMDowMC4wMDBaXCIpOyAvL25ldyBEYXRlKFwiMjAyMy0xMi0xNFQyMTowMDowMC4wMDBaXCIpO1xuICAgIGxldCB1c2VycztcbiAgICBsZXQgcXVlc3RzO1xuICAgIGxldCB1c2VySW5mbztcblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICBsZXQgbG9jYWxlID0gJ3VrJztcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBsZXQgdXNlcklkO1xuICAgIC8vIGxldCB1c2VySWQgPSAxMDA0NjcwNjI7XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdZZWFyMjAyNCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICAgICAgcmVxdWVzdCgnL3F1ZXN0cycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREcm9wKCkge1xuICAgICAgICBjb25zdCBvcGVuRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb1J1bGVzXCIpO1xuICAgICAgICBsZXQgZGVza0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkZvb3Rlcl9jb250YWluZXItLUJTWCcpO1xuXG4gICAgICAgIG9wZW5Ecm9wLmZvckVhY2gob3BlbiA9PiB7XG4gICAgICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BPcGVuXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghZGVza0NsYXNzKSB7XG4gICAgICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdibG9ja0xpbmsnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpbml0RHJvcCgpO1xuICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IHJlZ2lzdGVySW5RdWVzdCgpOyB9KSk7XG5cbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdO1xuICAgICAgICAgICAgcXVlc3RzID0gKHJlc1sxXSB8fCBbXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhxdWVzdHMpO1xuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIHVzZXJJbmZvKVxuICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFF1ZXN0cyhxdWVzdHMsIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgIGlmICghcXVlc3RzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlmdCA9IGlzU2Vjb25kV2VlayhxdWVzdHMpID8gNCA6IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3REaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZW5kZXJRdWVzdChxdWVzdHNbaSArIHNoaWZ0XSwgcXVlc3REaXZzW2ldLCBjdXJyZW50VXNlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NlY29uZFdlZWsocXVlc3RzKSB7XG4gICAgICAgIGNvbnN0IGZvdXJ0aFF1ZXN0ID0gcXVlc3RzWzNdO1xuICAgICAgICByZXR1cm4gZm91cnRoUXVlc3QgJiYgY3VycmVudERhdGUgPiBuZXcgRGF0ZShmb3VydGhRdWVzdC5kYXRlRW5kKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJRdWVzdChxdWVzdCwgY29udGFpbmVyLCBjdXJyZW50VXNlcikge1xuICAgICAgICBpZiAoIXF1ZXN0IHx8ICFjb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1ZXN0TnVtID0gcXVlc3QucU51bWJlcjtcbiAgICAgICAgLy9jb25zdCBxdWVzdFBvaW50cyA9IHtwb2ludHM6IDMwMH07XG4gICAgICAgIGNvbnN0IHF1ZXN0UG9pbnRzID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIucXVlc3RzICYmIGN1cnJlbnRVc2VyLnF1ZXN0cy5maW5kKHEgPT4gcS5xdWVzdE51bSA9PT0gcXVlc3ROdW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgcXVlc3RUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tdGl0bGUnKTtcbiAgICAgICAgcXVlc3RUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdFN1YlRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICBxdWVzdFN1YlRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcblxuICAgICAgICAvLyB1cGRhdGUgdHlwZSBvZiBxdWVzdFxuICAgICAgICBjb25zdCBxdWVzdFR5cGUgPSBnZXRRdWVzdFR5cGUocXVlc3QpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc29vbicpO1xuXG4gICAgICAgIGlmIChxdWVzdFR5cGUgPT09IE9MRF9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVzdFR5cGUgPT09IEZVVFVSRV9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc29vbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGltZXJFbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50aW1lclR4dCcpO1xuICAgICAgICAgICAgY29uc3QgcG9wdXBUaW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGltZS1udW0nKTtcbiAgICAgICAgICAgIGNvdW50ZG93blRpbWVyKHF1ZXN0LmRhdGVFbmQsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYClcbiAgICAgICAgICAgIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgc3RhcnNcbiAgICAgICAgaWYgKHF1ZXN0UG9pbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFyRGl2cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpO1xuICAgICAgICAgICAgY29uc3QgcXVlc3RMZXZlbCA9IGdldFF1ZXN0TGV2ZWwocXVlc3QsIHF1ZXN0UG9pbnRzLnBvaW50cyB8fCAwKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhciA9IHN0YXJEaXZzW2ldO1xuICAgICAgICAgICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZXMgaW1hZ2VzXG4gICAgICAgIGNvbnN0IHNyY0Rlc2MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVzYycpO1xuICAgICAgICBjb25zdCBzcmNNb2IgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fbW9iJyk7XG4gICAgICAgIGNvbnN0IHNyY0RlZmF1bHQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVmYXVsdCcpO1xuICAgICAgICBzcmNEZXNjLnNyY3NldCA9IGBodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL255LXVhL2ltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1kZXNjLnBuZ2A7XG4gICAgICAgIHNyY01vYi5zcmNzZXQgPSBgaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9ueS11YS9pbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctbW9iLnBuZ2A7XG4gICAgICAgIHNyY0RlZmF1bHQuc3JjID0gYGh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvbnktdWEvaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcblxuICAgICAgICAvLyB1cGRhdGUgYnV0dG9uc1xuICAgICAgICBpZiAocXVlc3RUeXBlID09IEFDVElWRV9RVUVTVF9UWVBFICYmIHVzZXJJZCAmJiAhcXVlc3RQb2ludHMpIHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW1vdmluZyBxdWVzdCBoaWRlICcgKyBjdXJyZW50VXNlcilcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpIHtcbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10ZXh0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgZGVzY3JRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpdGxlJyk7XG4gICAgICAgIHF1ZXN0TmFtZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gcXVlc3ROdW0gJSAyID09IDAgPyAnc3BvcnQnIDogJ2Nhc2lubyc7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChgcXVlc3QtcG9wdXAke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IHVzZXJQb2ludHNGb3JRdWVzdCA9IHF1ZXN0UG9pbnRzID8gcXVlc3RQb2ludHMucG9pbnRzIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxEaXYgPSBxdWVzdExldmVsRGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHF1ZXN0LmxldmVsc1tpXTtcbiAgICAgICAgICAgIGlmIChsZXZlbERpdiAmJiBsZXZlbEluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcHJpemVRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm9UZXh0ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGluZm9UZXh0LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgc3RlcFF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFN0YXJ0UG9pbnRzID0gaSA9PT0gMCA/IDAgOiBxdWVzdC5sZXZlbHNbaSAtIDFdLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbEVuZFBvaW50cyA9IGxldmVsSW5mby5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxQb2ludHMgPSBsZXZlbEVuZFBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1BvaW50cyAgPSBNYXRoLm1pbihNYXRoLm1heCh1c2VyUG9pbnRzRm9yUXVlc3QsIDApLCBsZXZlbFBvaW50cyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IHByb2dyZXNzUG9pbnRzIC8gbGV2ZWxQb2ludHMgKiAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IocHJvZ3Jlc3NWYWx1ZSksIDApLCAxMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzRWxlbWVudCA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1pbmZvLXByb2dyZXNzJyk7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbGVtZW50LnZhbHVlID0gbm9ybWFsaXplZDtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQuZGF0YXNldC5wcm9ncmVzcyA9IGAke25vcm1hbGl6ZWR9JWA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzRGl2ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICAgICAgICAgIHN0YXR1c0Rpdi5pbm5lckhUTUwgPSBgJHtwcm9ncmVzc1BvaW50c30vJHtsZXZlbFBvaW50c31gO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyUG9pbnRzRm9yUXVlc3QgPCBsZXZlbFN0YXJ0UG9pbnRzIHx8ICF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheUJ0biA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy50b29rLXBhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50ZG93blRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVEaWZmID0gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBpZiAodGltZURpZmYgPCAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFRpbWUoa2V5LCBkYXlzLCBob3VycywgbWludXRlcykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KGtleSkucmVwbGFjZShcIntkYXl9XCIsIGRheXMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie2hvdXJ9XCIsIGhvdXJzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcInttaW51dGVzfVwiLCBtaW51dGVzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKHRhcmdldERhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHRhcmdldERhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcih0aW1lRGlmZiAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xuXG5cbiAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHJldHVybiB0aW1lRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdExldmVsKHF1ZXN0RGVmaW5pdGlvbiwgcG9pbnRzKSB7XG4gICAgICAgIGlmICghcXVlc3REZWZpbml0aW9uIHx8ICFxdWVzdERlZmluaXRpb24ubGV2ZWxzIHx8IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxldmVsSW5kZXggPSBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmZpbmRJbmRleChsZXZlbCA9PiBwb2ludHMgPCBsZXZlbC5wb2ludHMpO1xuICAgICAgICByZXR1cm4gbGV2ZWxJbmRleCA9PT0gLTEgPyBxdWVzdERlZmluaXRpb24ubGV2ZWxzLmxlbmd0aCA6IGxldmVsSW5kZXg7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdFR5cGUocXVlc3QpIHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUocXVlc3QuZGF0ZVN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVFbmQpO1xuICAgICAgICBpZiAoY3VycmVudERhdGUgPCBzdGFydERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBGVVRVUkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPTERfUVVFU1RfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBQ1RJVkVfUVVFU1RfVFlQRTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGFnZSgpIHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiB1cmxQYXJhbXMuaGFzKHBhcnRpY2lwYXRlUGFyYW0pKSB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZShmYXN0UmVnKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckluUXVlc3QoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy9xdWVzdHJlZycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIHBvcHVwUGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBxdWVzdFN0YXJ0QnRucy5mb3JFYWNoKHF1ZXN0U3RhcnRCdG4gPT4gcXVlc3RTdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJVc2VycyA9ICh1c2VycykgPT4ge1xuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh0b3BVc2VycywgdXNlcklkLCB0b3BSZXN1bHRzVGFibGUsIHVzZXJzKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySWQgJiYgdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSB1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyICYmIHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpO1xuXG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycztcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VXNlckluZGV4IHx8IGN1cnJlbnRVc2VySW5kZXggPCAxMCkge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZSgxMCwgMTMpO1xuICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KGN1cnJlbnRVc2VySW5kZXggLSAxLCAxMCksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG90aGVyVXNlcnMgJiYgb3RoZXJVc2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUob3RoZXJVc2VycywgdXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICB0YWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQ3VycmVudFVzZXIgPSBjdXJyZW50VXNlcklkICYmIGN1cnJlbnRVc2VySWQgPT09IHVzZXIudXNlcmlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIiAke2NoZWNrQ3VycmVudFVzZXJ9PiR7cGxhY2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7Y2hlY2tDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7dXNlci5wb2ludHN9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0yMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIwMS0zMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzMwMS00MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzQwMS01MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUwMS02MDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNjUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYwMS02NTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzY1MS03MDBgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDQpO1xuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfT9ub2NhY2hlPTFgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93JyksIDEwMDApO1xuXG5cbiAgICAvL3Byb2dyZXNzXG4gICAgZnVuY3Rpb24gcmVmcmVzaFByb2dyZXNzKCkge1xuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RfX2l0ZW0taW5mby1wcm9ncmVzcycpXG4gICAgICAgIHByb2dyZXNzQmFycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MnKVxuICAgICAgICAgICAgbGV0IHdpZHRoVmFsdWUgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcycpXG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS53aWR0aCA9IGBjYWxjKCR7d2lkdGhWYWx1ZX0gLSA2cHgpYFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vc2hvdyBwb3B1cGNoaWtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGNvbnN0IGl0ZW1zU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyk7XG4gICAgY29uc3QgcG9wdXBXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XG4gICAgY29uc3QgYnRuVGFibGVTaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdF9fc3VidGV4dCcpO1xuICAgIGNvbnN0IHRhYmxlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpemUtZnVuZCcpO1xuICAgIGNvbnN0IHRhYmxlUG9wdXBCdG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcml6ZS1mdW5kLWNsb3NlJyk7XG5cblxuICAgIGZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnF1ZXN0YCk7XG4gICAgICAgIGlmIChwb3B1cCkge1xuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRkZW5Qb3B1cCgpIHtcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5hZGQoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5xdWVzdGApO1xuICAgICAgICBpZiAocG9wdXApIHtcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb3B1cFdyYXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnF1ZXN0LWNsb3NlJyk7XG4gICAgICAgIGlmIChjbG9zZUJ0bikge1xuICAgICAgICAgICAgaGlkZGVuUG9wdXAoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBpdGVtc1NsaWRlci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBzaG93UG9wdXAoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBidG5UYWJsZVNob3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIHRhYmxlUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSlcblxuICAgIHRhYmxlUG9wdXBCdG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcG9wdXBXcmFwLmNsYXNzTGlzdC5hZGQoJ19oaWRkZW4nKTtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSlcblxuXG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy9zaG93IHBvcHVwLSBkZXRhaWxzXG4gICAgY29uc3QgcXVlc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpXG4gICAgcXVlc3RJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdfb3BlbicpXG4gICAgICAgIH0pXG4gICAgfSlcblxufSkoKTtcbiIsIiJdfQ==
