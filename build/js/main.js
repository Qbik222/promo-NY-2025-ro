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
  var locale = 'en';
  if (ukLeng) locale = 'uk';
  if (enLeng) locale = 'en';
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId = 777777;
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
    srcDesc.srcset = "img/route/quest".concat(questNum, "-img-desc.png");
    srcMob.srcset = "img/route/quest".concat(questNum, "-img-mob.png");
    srcDefault.src = "img/route/quest".concat(questNum, "-img-desc.png");

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
        var statusDiv = levelDiv.querySelector('.status');
        statusDiv.innerHTML = "".concat(progressPoints, "/").concat(levelPoints);
        if (userPointsForQuest < levelStartPoints || !userId) {
          var _playBtn = levelDiv.querySelector('.took-part');
          _playBtn.classList.add('hide');
        }
      }
    }
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
  var progressBars = document.querySelectorAll('.quest__item-info-progress');
  progressBars.forEach(function (item) {
    var progress = item.querySelector('.progress');
    var widthValue = item.getAttribute('data-progress');
    progress.style.width = "calc(".concat(widthValue, " - 6px)");
  });

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

  //show rules-details
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJzIiwicXVlc3RzIiwidXNlckluZm8iLCJ1a0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJjb25jYXQiLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwicXVlc3RTdGFydEJ0biIsImUiLCJyZWdpc3RlckluUXVlc3QiLCJjb25zb2xlIiwibG9nIiwicmVuZGVyVXNlcnMiLCJyZWZyZXNoUXVlc3RzIiwiY3VycmVudFVzZXIiLCJzaGlmdCIsImlzU2Vjb25kV2VlayIsImkiLCJyZW5kZXJRdWVzdCIsImZvdXJ0aFF1ZXN0IiwiZGF0ZUVuZCIsInF1ZXN0IiwiY29udGFpbmVyIiwicXVlc3ROdW0iLCJxTnVtYmVyIiwicXVlc3RQb2ludHMiLCJmaW5kIiwicSIsInF1ZXN0VGl0bGVEaXYiLCJ0cmFuc2xhdGVLZXkiLCJxdWVzdFN1YlRpdGxlRGl2IiwicXVlc3RUeXBlIiwiZ2V0UXVlc3RUeXBlIiwidGltZXJFbGVtZW50IiwicG9wdXBUaW1lciIsImNvdW50ZG93blRpbWVyIiwidXBkYXRlUG9wdXAiLCJzdGFyRGl2cyIsInF1ZXN0TGV2ZWwiLCJnZXRRdWVzdExldmVsIiwicG9pbnRzIiwic3RhciIsInNyY0Rlc2MiLCJzcmNNb2IiLCJzcmNEZWZhdWx0Iiwic3Jjc2V0Iiwic3JjIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInF1ZXN0TmFtZSIsImNzc0NsYXNzIiwidXNlclBvaW50c0ZvclF1ZXN0IiwibGV2ZWxEaXYiLCJsZXZlbEluZm8iLCJsZXZlbHMiLCJzdWJ0aXRsZSIsImluZm9UZXh0IiwibGV2ZWxTdGFydFBvaW50cyIsImxldmVsRW5kUG9pbnRzIiwibGV2ZWxQb2ludHMiLCJwcm9ncmVzc1BvaW50cyIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwcm9ncmVzc1ZhbHVlIiwibm9ybWFsaXplZCIsImZsb29yIiwicHJvZ3Jlc3NFbGVtZW50IiwidmFsdWUiLCJzdGF0dXNEaXYiLCJ0YXJnZXREYXRlU3RyaW5nIiwicmVmcmVzaFRpbWVyIiwiaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwidGltZURpZmYiLCJjbGVhckludGVydmFsIiwiZm9ybWF0VGltZSIsInJlbG9hZCIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJyZXBsYWNlIiwidG9TdHJpbmciLCJ0YXJnZXREYXRlIiwibm93IiwiZ2V0VGltZSIsInF1ZXN0RGVmaW5pdGlvbiIsImxldmVsIiwiZmluZEluZGV4Iiwic3RhcnREYXRlIiwiZGF0ZVN0YXJ0IiwiZW5kRGF0ZSIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJzZXR1cFBhZ2UiLCJjIiwiZ191c2VyX2lkIiwiY2hlY2tVc2VyQXV0aCIsImF1dGhCdG4iLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwiaGFzIiwiZmFzdFJlZyIsInBhcmFtcyIsInVzZXJpZCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidG9wVXNlcnMiLCJzbGljZSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsInVzZXIiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJjdXJyZW50VXNlcklkIiwidGFibGUiLCJhbGxVc2VycyIsImNoZWNrQ3VycmVudFVzZXIiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJhcHBlbmQiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwidW5hdXRoTWVzIiwiZXJyIiwiZiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJwYXJ0aWNpcGF0ZUJ0biIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJtYWluUGFnZSIsInNldFRpbWVvdXQiLCJwcm9ncmVzc0JhcnMiLCJwcm9ncmVzcyIsIndpZHRoVmFsdWUiLCJzdHlsZSIsIndpZHRoIiwiaXRlbXNTbGlkZXIiLCJwb3B1cFdyYXAiLCJidG5UYWJsZVNob3ciLCJ0YWJsZVBvcHVwIiwidGFibGVQb3B1cEJ0bkNsb3NlIiwic2hvd1BvcHVwIiwib3ZlcmZsb3ciLCJwb3B1cCIsImRpc3BsYXkiLCJoaWRkZW5Qb3B1cCIsImV2ZW50IiwiY2xvc2VCdG4iLCJ0YXJnZXQiLCJjbG9zZXN0IiwicnVsZXNJdGVtcyIsInRvZ2dsZSIsInF1ZXN0SXRlbXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLGdDQUFnQztFQUMvQyxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsZUFBZSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQzdELElBQU1DLGdCQUFnQixHQUFHLEtBQUs7RUFFOUIsSUFBTUMsaUJBQWlCLEdBQUcsUUFBUTtJQUM5QkMsY0FBYyxHQUFHLEtBQUs7SUFDdEJDLGlCQUFpQixHQUFHLFFBQVE7RUFFaEMsSUFDSUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0lBQ3ZFQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUN0REMsVUFBVSxHQUFHSixRQUFRLENBQUNLLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsZUFBZSxHQUFHTixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztJQUN4REUsbUJBQW1CLEdBQUdQLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUM5REssWUFBWSxHQUFHUixRQUFRLENBQUNLLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REksU0FBUyxHQUFHVCxRQUFRLENBQUNLLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztJQUNyREssT0FBTyxHQUFHVixRQUFRLENBQUNDLGFBQWEs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QUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDOztFQUVGO0VBQ0EsSUFBTUMsVUFBVSxHQUFHMU8sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFDNURxTyxVQUFVLENBQUNqTSxPQUFPLENBQUMsVUFBQTZCLElBQUksRUFBSTtJQUN2QkEsSUFBSSxDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNqQ0UsSUFBSSxDQUFDakIsU0FBUyxDQUFDb0wsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNsQyxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFFTixDQUFDLEVBQUUsQ0FBQztBQ3hqQkoiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV91YSc7XG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBwYXJ0aWNpcGF0ZVBhcmFtID0gJ3JlZyc7XG5cbiAgICBjb25zdCBGVVRVUkVfUVVFU1RfVFlQRSA9ICdmdXR1cmUnLFxuICAgICAgICBPTERfUVVFU1RfVFlQRSA9ICdvbGQnLFxuICAgICAgICBBQ1RJVkVfUVVFU1RfVFlQRSA9ICdhY3RpdmUnO1xuXG4gICAgY29uc3RcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19ib2R5LW90aGVyJyksXG4gICAgICAgIHRvcFJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtdXNlcnMnKSxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tam9pbicpLFxuICAgICAgICByZXN1bHRzVGFibGVXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVkaXJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBxdWVzdERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm91dGVfX2l0ZW0nKSxcbiAgICAgICAgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdC1wbGF5JyksXG4gICAgICAgIHF1ZXN0U3RhcnRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0QnRuJyksXG4gICAgICAgIHF1ZXN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QnKSxcbiAgICAgICAgcXVlc3RMZXZlbERpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucXVlc3RfX2l0ZW0nKSxcbiAgICAgICAgcG9wdXBQbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpcnN0UGxheScpO1xuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpOyAvL25ldyBEYXRlKFwiMjAyMy0xMi0xNFQyMTowMDowMC4wMDBaXCIpO1xuICAgIGxldCB1c2VycztcbiAgICBsZXQgcXVlc3RzO1xuICAgIGxldCB1c2VySW5mbztcblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cbiAgICBsZXQgbG9jYWxlID0gJ2VuJztcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBsZXQgdXNlcklkID0gNzc3Nzc3O1xuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3WWVhcjIwMjQnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2Vycz9ub2NhY2hlPTEnKSxcbiAgICAgICAgICAgIHJlcXVlc3QoJy9xdWVzdHMnKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RHJvcCgpIHtcbiAgICAgICAgY29uc3Qgb3BlbkRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9SdWxlc1wiKTtcbiAgICAgICAgbGV0IGRlc2tDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5Gb290ZXJfY29udGFpbmVyLS1CU1gnKTtcblxuICAgICAgICBvcGVuRHJvcC5mb3JFYWNoKG9wZW4gPT4ge1xuICAgICAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wT3BlblwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxzLm9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoIWRlc2tDbGFzcykge1xuICAgICAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnYmxvY2tMaW5rJykpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgaW5pdERyb3AoKTtcbiAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4geyByZWdpc3RlckluUXVlc3QoKTsgfSkpO1xuXG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocXVlc3RzKTtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbylcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hRdWVzdHMocXVlc3RzLCBjdXJyZW50VXNlcikge1xuICAgICAgICBpZiAoIXF1ZXN0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hpZnQgPSBpc1NlY29uZFdlZWsocXVlc3RzKSA/IDQgOiAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0RGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVuZGVyUXVlc3QocXVlc3RzW2kgKyBzaGlmdF0sIHF1ZXN0RGl2c1tpXSwgY3VycmVudFVzZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTZWNvbmRXZWVrKHF1ZXN0cykge1xuICAgICAgICBjb25zdCBmb3VydGhRdWVzdCA9IHF1ZXN0c1szXTtcbiAgICAgICAgcmV0dXJuIGZvdXJ0aFF1ZXN0ICYmIGN1cnJlbnREYXRlID4gbmV3IERhdGUoZm91cnRoUXVlc3QuZGF0ZUVuZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUXVlc3QocXVlc3QsIGNvbnRhaW5lciwgY3VycmVudFVzZXIpIHtcbiAgICAgICAgaWYgKCFxdWVzdCB8fCAhY29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBxdWVzdE51bSA9IHF1ZXN0LnFOdW1iZXI7XG4gICAgICAgIGNvbnN0IHF1ZXN0UG9pbnRzID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIucXVlc3RzICYmIGN1cnJlbnRVc2VyLnF1ZXN0cy5maW5kKHEgPT4gcS5xdWVzdE51bSA9PT0gcXVlc3ROdW0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgcXVlc3RUaXRsZURpdiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm91dGVfX2l0ZW0tdGl0bGUnKTtcbiAgICAgICAgcXVlc3RUaXRsZURpdi5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdFN1YlRpdGxlRGl2ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yb3V0ZV9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICBxdWVzdFN1YlRpdGxlRGl2LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcblxuICAgICAgICAvLyB1cGRhdGUgdHlwZSBvZiBxdWVzdFxuICAgICAgICBjb25zdCBxdWVzdFR5cGUgPSBnZXRRdWVzdFR5cGUocXVlc3QpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc29vbicpO1xuXG4gICAgICAgIGlmIChxdWVzdFR5cGUgPT09IE9MRF9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVzdFR5cGUgPT09IEZVVFVSRV9RVUVTVF9UWVBFKSB7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc29vbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGltZXJFbGVtZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy50aW1lclR4dCcpO1xuICAgICAgICAgICAgY29uc3QgcG9wdXBUaW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fdGltZS1udW0nKTtcbiAgICAgICAgICAgIGNvdW50ZG93blRpbWVyKHF1ZXN0LmRhdGVFbmQsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYClcbiAgICAgICAgICAgIHVwZGF0ZVBvcHVwKHF1ZXN0LCBxdWVzdFBvaW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgc3RhcnNcbiAgICAgICAgaWYgKHF1ZXN0UG9pbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFyRGl2cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcicpO1xuICAgICAgICAgICAgY29uc3QgcXVlc3RMZXZlbCA9IGdldFF1ZXN0TGV2ZWwocXVlc3QsIHF1ZXN0UG9pbnRzLnBvaW50cyB8fCAwKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3RMZXZlbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhciA9IHN0YXJEaXZzW2ldO1xuICAgICAgICAgICAgICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnX2RvbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZXMgaW1hZ2VzXG4gICAgICAgIGNvbnN0IHNyY0Rlc2MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVzYycpO1xuICAgICAgICBjb25zdCBzcmNNb2IgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fbW9iJyk7XG4gICAgICAgIGNvbnN0IHNyY0RlZmF1bHQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNyY19fZGVmYXVsdCcpO1xuICAgICAgICBzcmNEZXNjLnNyY3NldCA9IGBpbWcvcm91dGUvcXVlc3Qke3F1ZXN0TnVtfS1pbWctZGVzYy5wbmdgO1xuICAgICAgICBzcmNNb2Iuc3Jjc2V0ID0gYGltZy9yb3V0ZS9xdWVzdCR7cXVlc3ROdW19LWltZy1tb2IucG5nYDtcbiAgICAgICAgc3JjRGVmYXVsdC5zcmMgPSBgaW1nL3JvdXRlL3F1ZXN0JHtxdWVzdE51bX0taW1nLWRlc2MucG5nYDtcblxuICAgICAgICAvLyB1cGRhdGUgYnV0dG9uc1xuICAgICAgICBpZiAocXVlc3RUeXBlID09IEFDVElWRV9RVUVTVF9UWVBFICYmIHVzZXJJZCAmJiAhcXVlc3RQb2ludHMpIHtcbiAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgcG9wdXBQbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2gocXVlc3RTdGFydEJ0biA9PiBxdWVzdFN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChxdWVzdCwgcXVlc3RQb2ludHMpIHtcbiAgICAgICAgY29uc3QgcXVlc3ROdW0gPSBxdWVzdC5xTnVtYmVyO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9fZGVzLXRpdGxlJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcXVlc3QtJHtxdWVzdE51bX1gKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX2Rlcy10ZXh0Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgZGVzY3JRdWVzdC0ke3F1ZXN0TnVtfWApO1xuICAgICAgICBjb25zdCBxdWVzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3RfX3RpdGxlJyk7XG4gICAgICAgIHF1ZXN0TmFtZS5pbm5lckhUTUwgPSB0cmFuc2xhdGVLZXkoYG5hbWVRdWVzdC0ke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gcXVlc3ROdW0gJSAyID09IDAgPyAnc3BvcnQnIDogJ2Nhc2lubyc7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHF1ZXN0UG9wdXAuY2xhc3NMaXN0LmFkZChgcXVlc3QtcG9wdXAke3F1ZXN0TnVtfWApO1xuXG4gICAgICAgIGNvbnN0IHVzZXJQb2ludHNGb3JRdWVzdCA9IHF1ZXN0UG9pbnRzID8gcXVlc3RQb2ludHMucG9pbnRzIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdExldmVsRGl2cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGV2ZWxEaXYgPSBxdWVzdExldmVsRGl2c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHF1ZXN0LmxldmVsc1tpXTtcbiAgICAgICAgICAgIGlmIChsZXZlbERpdiAmJiBsZXZlbEluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5xdWVzdF9faXRlbS1zdWJ0aXRsZScpO1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgcHJpemVRdWVzdC0ke3F1ZXN0TnVtfV8ke2kgKyAxfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm9UZXh0ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tdGV4dCcpO1xuICAgICAgICAgICAgICAgIGluZm9UZXh0LmlubmVySFRNTCA9IHRyYW5zbGF0ZUtleShgc3RlcFF1ZXN0LSR7cXVlc3ROdW19XyR7aSArIDF9YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbFN0YXJ0UG9pbnRzID0gaSA9PT0gMCA/IDAgOiBxdWVzdC5sZXZlbHNbaSAtIDFdLnBvaW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBsZXZlbEVuZFBvaW50cyA9IGxldmVsSW5mby5wb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxQb2ludHMgPSBsZXZlbEVuZFBvaW50cyAtIGxldmVsU3RhcnRQb2ludHM7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NQb2ludHMgID0gTWF0aC5taW4oTWF0aC5tYXgodXNlclBvaW50c0ZvclF1ZXN0IC0gbGV2ZWxTdGFydFBvaW50cywgMCksIGxldmVsUG9pbnRzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3NQb2ludHMgLyBsZXZlbFBvaW50cyAqIDEwMDtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihwcm9ncmVzc1ZhbHVlKSwgMCksIDEwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NFbGVtZW50ID0gbGV2ZWxEaXYucXVlcnlTZWxlY3RvcignLnF1ZXN0X19pdGVtLWluZm8tcHJvZ3Jlc3MnKTtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsZW1lbnQudmFsdWUgPSBub3JtYWxpemVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0RpdiA9IGxldmVsRGl2LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAgICAgICAgICAgICBzdGF0dXNEaXYuaW5uZXJIVE1MID0gYCR7cHJvZ3Jlc3NQb2ludHN9LyR7bGV2ZWxQb2ludHN9YDtcbiAgICAgICAgICAgICAgICBpZiAodXNlclBvaW50c0ZvclF1ZXN0IDwgbGV2ZWxTdGFydFBvaW50cyB8fCAhdXNlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXlCdG4gPSBsZXZlbERpdi5xdWVyeVNlbGVjdG9yKCcudG9vay1wYXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvdW50ZG93blRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcikge1xuICAgICAgICByZWZyZXNoVGltZXIodGFyZ2V0RGF0ZVN0cmluZywgdGltZXJFbGVtZW50LCBwb3B1cFRpbWVyKTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVEaWZmID0gcmVmcmVzaFRpbWVyKHRhcmdldERhdGVTdHJpbmcsIHRpbWVyRWxlbWVudCwgcG9wdXBUaW1lcik7XG4gICAgICAgICAgICBpZiAodGltZURpZmYgPCAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgnZmluaXNoZWRUaW1lcicsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFRpbWUoa2V5LCBkYXlzLCBob3VycywgbWludXRlcykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlS2V5KGtleSkucmVwbGFjZShcIntkYXl9XCIsIGRheXMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie2hvdXJ9XCIsIGhvdXJzLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcInttaW51dGVzfVwiLCBtaW51dGVzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hUaW1lcih0YXJnZXREYXRlU3RyaW5nLCB0aW1lckVsZW1lbnQsIHBvcHVwVGltZXIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGF0ZSA9IG5ldyBEYXRlKHRhcmdldERhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0aW1lRGlmZiA9IHRhcmdldERhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcblxuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcih0aW1lRGlmZiAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcigodGltZURpZmYgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lRGlmZiAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpO1xuXG5cbiAgICAgICAgdGltZXJFbGVtZW50LmlubmVySFRNTCA9IGZvcm1hdFRpbWUoJ2ZpbmlzaGVkVGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHBvcHVwVGltZXIuaW5uZXJIVE1MID0gZm9ybWF0VGltZSgndGltZXInLCBkYXlzLCBob3VycywgbWludXRlcyk7XG4gICAgICAgIHJldHVybiB0aW1lRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRRdWVzdExldmVsKHF1ZXN0RGVmaW5pdGlvbiwgcG9pbnRzKSB7XG4gICAgICAgIGlmICghcXVlc3REZWZpbml0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZXZlbCA9IHF1ZXN0RGVmaW5pdGlvbi5sZXZlbHMuZmluZEluZGV4KGxldmVsID0+IHBvaW50cyA8PSBsZXZlbC5wb2ludHMpO1xuICAgICAgICByZXR1cm4gbGV2ZWwgPT09IC0xID8gcXVlc3REZWZpbml0aW9uLmxldmVscy5sZW5ndGggLSAxIDogbGV2ZWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UXVlc3RUeXBlKHF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHF1ZXN0LmRhdGVTdGFydCk7XG4gICAgICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShxdWVzdC5kYXRlRW5kKTtcbiAgICAgICAgaWYgKGN1cnJlbnREYXRlIDwgc3RhcnREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gRlVUVVJFX1FVRVNUX1RZUEU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudERhdGUgPiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gT0xEX1FVRVNUX1RZUEU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gQUNUSVZFX1FVRVNUX1RZUEU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBhZ2UoKSB7XG4gICAgICAgIGlmICh1c2VySWQgJiYgdXJsUGFyYW1zLmhhcyhwYXJ0aWNpcGF0ZVBhcmFtKSkge1xuICAgICAgICAgICAgcGFydGljaXBhdGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoZmFzdFJlZykge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJJblF1ZXN0KCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvcXVlc3RyZWcnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBwb3B1cFBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgcXVlc3RTdGFydEJ0bnMuZm9yRWFjaChxdWVzdFN0YXJ0QnRuID0+IHF1ZXN0U3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVXNlcnMgPSAodXNlcnMpID0+IHtcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMCk7XG4gICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodG9wVXNlcnMsIHVzZXJJZCwgdG9wUmVzdWx0c1RhYmxlLCB1c2Vycyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcklkICYmIHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gdXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSBjdXJyZW50VXNlciAmJiB1c2Vycy5pbmRleE9mKGN1cnJlbnRVc2VyKTtcblxuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnM7XG5cbiAgICAgICAgICAgIGlmICghY3VycmVudFVzZXJJbmRleCB8fCBjdXJyZW50VXNlckluZGV4IDwgMTApIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoMTAsIDEzKTtcbiAgICAgICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgICAgIG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heChjdXJyZW50VXNlckluZGV4IC0gMSwgMTApLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvdGhlclVzZXJzICYmIG90aGVyVXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKG90aGVyVXNlcnMsIHVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgdGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja0N1cnJlbnRVc2VyID0gY3VycmVudFVzZXJJZCAmJiBjdXJyZW50VXNlcklkID09PSB1c2VyLnVzZXJpZDtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlUmVzdWx0c19fcm93Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgnX3lvdXJQbGFjZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplUGxhY2VDc3MgPSBQUklaRVNfQ1NTW3BsYWNlIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKVxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCIgJHtjaGVja0N1cnJlbnRVc2VyfT4ke3BsYWNlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke3VzZXIudXNlcmlkfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke3VzZXIucG9pbnRzfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fYm9keS1jb2xcIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpIHtcbiAgICAgICAgaWYgKHBsYWNlIDw9IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfJHtwbGFjZX1gXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNi0xMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMS01MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtMTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMDEtMjAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8yMDEtMzAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDQwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8zMDEtNDAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV80MDEtNTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDYwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MDEtNjAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDY1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82MDEtNjUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDcwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82NTEtNzAwYFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH0/bm9jYWNoZT0xYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hRdWVzdHMocXVlc3RzLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGxldCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93JyksIDEwMDApO1xuXG5cbiAgICAvL3Byb2dyZXNzXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtLWluZm8tcHJvZ3Jlc3MnKVxuICAgIHByb2dyZXNzQmFycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcycpXG4gICAgICAgIGxldCB3aWR0aFZhbHVlID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnKVxuICAgICAgICBwcm9ncmVzcy5zdHlsZS53aWR0aCA9IGBjYWxjKCR7d2lkdGhWYWx1ZX0gLSA2cHgpYFxuICAgIH0pXG5cbiAgICAvL3Nob3cgcG9wdXBjaGlrXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBjb25zdCBpdGVtc1NsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3V0ZV9faXRlbScpO1xuICAgIGNvbnN0IHBvcHVwV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpO1xuICAgIGNvbnN0IGJ0blRhYmxlU2hvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRfX3N1YnRleHQnKTtcbiAgICBjb25zdCB0YWJsZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaXplLWZ1bmQnKTtcbiAgICBjb25zdCB0YWJsZVBvcHVwQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpemUtZnVuZC1jbG9zZScpO1xuXG5cbiAgICBmdW5jdGlvbiBzaG93UG9wdXAoKSB7XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5xdWVzdGApO1xuICAgICAgICBpZiAocG9wdXApIHtcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZGVuUG9wdXAoKSB7XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcbiAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucXVlc3RgKTtcbiAgICAgICAgaWYgKHBvcHVwKSB7XG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9wdXBXcmFwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5xdWVzdC1jbG9zZScpO1xuICAgICAgICBpZiAoY2xvc2VCdG4pIHtcbiAgICAgICAgICAgIGhpZGRlblBvcHVwKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgaXRlbXNTbGlkZXIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgc2hvd1BvcHVwKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYnRuVGFibGVTaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QucmVtb3ZlKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB0YWJsZVBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pXG5cbiAgICB0YWJsZVBvcHVwQnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBvcHVwV3JhcC5jbGFzc0xpc3QuYWRkKCdfaGlkZGVuJyk7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcbiAgICAgICAgdGFibGVQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0pXG5cblxuXG4gICAgLy9zaG93IHJ1bGVzLWRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy9zaG93IHBvcHVwLSBkZXRhaWxzXG4gICAgY29uc3QgcXVlc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdF9faXRlbScpXG4gICAgcXVlc3RJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdfb3BlbicpXG4gICAgICAgIH0pXG4gICAgfSlcblxufSkoKTtcblxuIiwiIl19
