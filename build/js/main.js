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
  var userInfo;
  var selectedWeekTabId;
  var roLeng = document.querySelector('#roLeng');
  var enLeng = document.querySelector('#enLeng');
  var locale = "ro";
  document.querySelector(".fav__page").classList.add("".concat(locale));
  if (roLeng) locale = 'ro';
  if (enLeng) locale = 'en';
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var i18nData = {};
  var userId;
  // userId = 204806
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
    return Promise.all([request('/users')]);
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
    // getData().then(res => {
    //     users = res[0];
    //     quests = (res[1] || []);
    //     // renderUsers(users);
    //     translate();
    // })
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
  function formatTime(key, days, hours, minutes) {
    return translateKey(key).replace("{day}", days.toString()).replace("{hour}", hours.toString()).replace("{minutes}", minutes.toString());
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
    if (place <= 10) {
      return "prize_".concat(place);
    } else if (place >= 11 && place <= 15) {
      return "prize_11-15";
    } else if (place >= 16 && place <= 20) {
      return "prize_16-20";
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
})();
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJ0aWNpcGF0ZVBhcmFtIiwiRlVUVVJFX1FVRVNUX1RZUEUiLCJPTERfUVVFU1RfVFlQRSIsIkFDVElWRV9RVUVTVF9UWVBFIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3BSZXN1bHRzVGFibGUiLCJnZXRFbGVtZW50QnlJZCIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwicmVzdWx0c1RhYmxlV3JhcHBlciIsInJlZGlyZWN0QnRucyIsInF1ZXN0RGl2cyIsInBsYXlCdG4iLCJxdWVzdFN0YXJ0QnRucyIsInF1ZXN0UG9wdXAiLCJxdWVzdExldmVsRGl2cyIsInBvcHVwUGxheUJ0biIsIndlZWtzU2VsZWN0b3IiLCJ3ZWVrc0NvbnRhaW5lciIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInVzZXJJbmZvIiwic2VsZWN0ZWRXZWVrVGFiSWQiLCJyb0xlbmciLCJlbkxlbmciLCJsb2NhbGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb25jYXQiLCJQUklaRVNfQ1NTIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsIl9pIiwiX2FyciIsImxhbmciLCJyZW1vdmUiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJpbml0RHJvcCIsIm9wZW5Ecm9wIiwiZGVza0NsYXNzIiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXRhaWxzIiwiaXRlbSIsIkluaXRQYWdlIiwidyIsImkiLCJlIiwicyIsInJlZnJlc2hVc2VycyIsImNhbGN1bGF0ZVJlY2VudFByb21vV2Vla3MiLCJkYXRlIiwibm93IiwicmVmcmVzaFdlZWtUYWJzIiwid2Vla1NlbGVjdG9yIiwid2VlayIsImdldFVzZXJzIiwidXNlcnMiLCJyZW5kZXJVc2VycyIsInVybCIsInJlc29sdmVVc2Vyc1VybCIsIm1hcCIsInVzZXJPcklkIiwidXNlcmlkIiwiZm9ybWF0VGltZSIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJ0cmFuc2xhdGVLZXkiLCJyZXBsYWNlIiwidG9TdHJpbmciLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwic2V0dXBQYWdlIiwiYyIsInNldEludGVydmFsIiwiZ191c2VyX2lkIiwiY2hlY2tVc2VyQXV0aCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwicHJldmVudERlZmF1bHQiLCJwYXJ0aWNpcGF0ZSIsImhhcyIsImZhc3RSZWciLCJwYXJhbXMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRvcFVzZXJzIiwic2xpY2UiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlciIsImZpbmQiLCJ1c2VyIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiTWF0aCIsIm1heCIsImN1cnJlbnRVc2VySWQiLCJ0YWJsZSIsImFsbFVzZXJzIiwiY2hlY2tDdXJyZW50VXNlciIsImFkZGl0aW9uYWxVc2VyUm93IiwiY3JlYXRlRWxlbWVudCIsInBsYWNlIiwicHJpemVQbGFjZUNzcyIsInByaXplS2V5IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsIm1hc2tVc2VySWQiLCJmbG9vciIsInBvaW50cyIsImFwcGVuZCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJuIiwiZG9uZSIsInVuYXV0aE1lcyIsInZhbHVlIiwiZXJyIiwiZiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJwYXJ0aWNpcGF0ZUJ0biIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJtYWluUGFnZSIsInNldFRpbWVvdXQiLCJydWxlc0l0ZW1zIiwidG9nZ2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUNULElBQU1BLE1BQU0sR0FBRyxvQ0FBb0M7RUFDbkQsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGVBQWUsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3RCxJQUFNQyxnQkFBZ0IsR0FBRyxLQUFLO0VBRTlCLElBQU1DLGlCQUFpQixHQUFHLFFBQVE7SUFDOUJDLGNBQWMsR0FBRyxLQUFLO0lBQ3RCQyxpQkFBaUIsR0FBRyxRQUFRO0VBRWhDLElBQ0lDLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUN2RUMsZUFBZSxHQUFHRixRQUFRLENBQUNHLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDdERDLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR04sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDeERFLG1CQUFtQixHQUFHUCxRQUFRLENBQUNHLGNBQWMsQ0FBQyxlQUFlLENBQUM7SUFDOURLLFlBQVksR0FBR1IsUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERJLFNBQVMsR0FBR1QsUUFBUSxDQUFDSyxnQkFB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Q0FDdUJoSixVQUFVO1FBQUE0SixNQUFBO01BQUE7UUFBbEMsS0FBQUQsVUFBQSxDQUFBbkYsQ0FBQSxNQUFBb0YsTUFBQSxHQUFBRCxVQUFBLENBQUFULENBQUEsSUFBQUMsSUFBQSxHQUFvQztVQUFBLElBQXpCQyxVQUFTLEdBQUFRLE1BQUEsQ0FBQVAsS0FBQTtVQUNoQkQsVUFBUyxDQUFDaEksU0FBUyxDQUFDZ0MsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN0QztNQUFDLFNBQUFrRyxHQUFBO1FBQUFLLFVBQUEsQ0FBQXBGLENBQUEsQ0FBQStFLEdBQUE7TUFBQTtRQUFBSyxVQUFBLENBQUFKLENBQUE7TUFBQTtJQUNMO0VBQ0osQ0FBQztFQUVEN0gsZ0JBQWdCLENBQUMsQ0FBQyxDQUNiRSxJQUFJLENBQUNtRSxJQUFJLENBQUM7RUFFZixJQUFJOEQsUUFBUSxHQUFHakssUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0VBQ25EaUssVUFBVSxDQUFDO0lBQUEsT0FBTUQsUUFBUSxDQUFDekksU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0VBQUEsR0FBRSxJQUFJLENBQUM7O0VBRTFEO0VBQ0EsSUFBTTBJLFVBQVUsR0FBR25LLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsY0FBYyxDQUFDO0VBQzVEOEosVUFBVSxDQUFDdkgsT0FBTyxDQUFDLFVBQUEyQixJQUFJLEVBQUk7SUFDdkJBLElBQUksQ0FBQ0YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDakNFLElBQUksQ0FBQy9DLFNBQVMsQ0FBQzRJLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBSU4sQ0FBQyxFQUFFLENBQUM7QUNsWEoiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9ueV9zYW1fcm8nO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcGFydGljaXBhdGVQYXJhbSA9ICdyZWcnO1xuXG4gICAgY29uc3QgRlVUVVJFX1FVRVNUX1RZUEUgPSAnZnV0dXJlJyxcbiAgICAgICAgT0xEX1FVRVNUX1RZUEUgPSAnb2xkJyxcbiAgICAgICAgQUNUSVZFX1FVRVNUX1RZUEUgPSAnYWN0aXZlJztcblxuICAgIGNvbnN0XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19fYm9keS1vdGhlcicpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXVzZXJzJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlZGlyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcXVlc3REaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdXRlX19pdGVtJyksXG4gICAgICAgIHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucXVlc3QtcGxheScpLFxuICAgICAgICBxdWVzdFN0YXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdEJ0bicpLFxuICAgICAgICBxdWVzdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1ZXN0JyksXG4gICAgICAgIHF1ZXN0TGV2ZWxEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1ZXN0X19pdGVtJyksXG4gICAgICAgIHBvcHVwUGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maXJzdFBsYXknKSxcbiAgICAgICAgd2Vla3NTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZVJlc3VsdHNfX3RhYnMtaXRlbScpLFxuICAgICAgICB3ZWVrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX3RhYnMnKTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy9uZXcgRGF0ZShcIjIwMjMtMTItMTRUMjE6MDA6MDAuMDAwWlwiKTtcbiAgICBsZXQgdXNlckluZm87XG4gICAgbGV0IHNlbGVjdGVkV2Vla1RhYklkO1xuXG4gICAgY29uc3Qgcm9MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JvTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuICAgIGxldCBsb2NhbGUgPSBcInJvXCJcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2X19wYWdlXCIpLmNsYXNzTGlzdC5hZGQoYCR7bG9jYWxlfWApXG4gICAgaWYgKHJvTGVuZykgbG9jYWxlID0gJ3JvJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG4gICAgLy8gdXNlcklkID0gMjA0ODA2XG4gICAgLy8gbGV0IHVzZXJJZCA9IDEwMDM0MDAyMDtcblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L3RyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcblxuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1llYXIyMDI0JyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmIChlbGVtcyAmJiBlbGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQsIGJhc2VDc3NDbGFzcykge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNzc0NsYXNzICsgbGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDc3NDbGFzcyArIGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByZXF1ZXN0KCcvdXNlcnMnKSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdERyb3AoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Ecm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvUnVsZXNcIik7XG4gICAgICAgIGxldCBkZXNrQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRm9vdGVyX2NvbnRhaW5lci0tQlNYJyk7XG5cbiAgICAgICAgb3BlbkRyb3AuZm9yRWFjaChvcGVuID0+IHtcbiAgICAgICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcE9wZW5cIik7XG4gICAgICAgICAgICAgICAgZGV0YWlscy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFkZXNrQ2xhc3MpIHtcbiAgICAgICAgICAgIG9wZW5Ecm9wLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrTGluaycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXREcm9wKCk7XG4gICAgICAgIHdlZWtzU2VsZWN0b3IuZm9yRWFjaCgodywgaSkgPT4gdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IHNlbGVjdGVkV2Vla1RhYklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2Vla3NTZWxlY3Rvci5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2VsZWN0ZWRXZWVrVGFiSWQgPSBpO1xuICAgICAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVmcmVzaFVzZXJzKHNlbGVjdGVkV2Vla1RhYklkICsgMSk7XG4gICAgICAgIC8vIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIC8vICAgICB1c2VycyA9IHJlc1swXTtcbiAgICAgICAgLy8gICAgIHF1ZXN0cyA9IChyZXNbMV0gfHwgW10pO1xuICAgICAgICAvLyAgICAgLy8gcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAvLyAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgIC8vIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IERhdGUubm93KCk7XG4gICAgICAgIGlmIChkYXRlIDwgbmV3IERhdGUoXCIyMDI0LTEwLTA3VDIxOjAwOjAwWlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0ZSA8IG5ldyBEYXRlKFwiMjAyNC0xMC0yMVQyMTowMDowMFpcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGUgPCBuZXcgRGF0ZShcIjIwMjQtMTAtMjhUMjE6MDA6MDBaXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiByZWZyZXNoV2Vla1RhYnMoKSB7XG4gICAgICAgIHNlbGVjdGVkV2Vla1RhYklkID0gY2FsY3VsYXRlUmVjZW50UHJvbW9XZWVrcygpIC0gMTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFdlZWtUYWJJZCB8fCBzZWxlY3RlZFdlZWtUYWJJZCA9PT0gMCkgeyAvLyBwcm9tbyBub3Qgc3RhcnRlZCB5ZXRcbiAgICAgICAgICAgIHdlZWtzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrU2VsZWN0b3IgPSB3ZWVrc1NlbGVjdG9yW2ldO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkV2Vla1RhYklkIDwgaSkge1xuICAgICAgICAgICAgICAgIHdlZWtTZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3ZWVrc1NlbGVjdG9yLmZvckVhY2goKHcsIGkpID0+IHtcbiAgICAgICAgICAgIHcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc2VsZWN0ZWRXZWVrVGFiSWQpIHtcbiAgICAgICAgICAgICAgICB3LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoVXNlcnMod2Vlaykge1xuICAgICAgICBnZXRVc2Vycyh3ZWVrKS50aGVuKHVzZXJzID0+IHtcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVc2Vycyh3ZWVrKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlc29sdmVVc2Vyc1VybCh3ZWVrKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QodXJsKVxuICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4gdXNlcnMubWFwKHVzZXJPcklkID0+IHR5cGVvZiB1c2VyT3JJZCA9PT0gJ251bWJlcicgPyB7dXNlcmlkOiB1c2VyT3JJZH0gOiB1c2VyT3JJZCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVVc2Vyc1VybCh3ZWVrKSB7XG4gICAgICAgIHJldHVybiB3ZWVrID8gYC91c2Vycy8ke3dlZWt9YCA6ICcvdXNlcnMnO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShrZXksIGRheXMsIGhvdXJzLCBtaW51dGVzKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGVLZXkoa2V5KS5yZXBsYWNlKFwie2RheX1cIiwgZGF5cy50b1N0cmluZygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7aG91cn1cIiwgaG91cnMudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie21pbnV0ZXN9XCIsIG1pbnV0ZXMudG9TdHJpbmcoKSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBzZXR1cFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwUGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBhZ2UoKSB7XG4gICAgICAgIGlmICh1c2VySWQgJiYgdXJsUGFyYW1zLmhhcyhwYXJ0aWNpcGF0ZVBhcmFtKSkge1xuICAgICAgICAgICAgcGFydGljaXBhdGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoZmFzdFJlZykge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgIHJlZGlyZWN0QnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyVXNlcnMgPSAodXNlcnMpID0+IHtcbiAgICAgICAgcmVzdWx0c1RhYmxlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRvcFVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHRvcFVzZXJzLCB1c2VySWQsIHRvcFJlc3VsdHNUYWJsZSwgdXNlcnMpO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJJZCAmJiB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IHVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgJiYgdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcik7XG5cbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzO1xuXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRVc2VySW5kZXggfHwgY3VycmVudFVzZXJJbmRleCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKDEwLCAxMyk7XG4gICAgICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoY3VycmVudFVzZXJJbmRleCAtIDEsIDEwKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3RoZXJVc2VycyAmJiBvdGhlclVzZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZShvdGhlclVzZXJzLCB1c2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIHRhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB1c2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tDdXJyZW50VXNlciA9IGN1cnJlbnRVc2VySWQgJiYgY3VycmVudFVzZXJJZCA9PT0gdXNlci51c2VyaWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ195b3VyUGxhY2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChwcml6ZVBsYWNlQ3NzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSlcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19ib2R5LWNvbFwiICR7Y2hlY2tDdXJyZW50VXNlcn0+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtjaGVja0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtNYXRoLmZsb29yKHVzZXIucG9pbnRzKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX2JvZHktY29sXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA+PSAxMSAmJiBwbGFjZSA8PSAxNSl7XG4gICAgICAgICAgICByZXR1cm4gIGBwcml6ZV8xMS0xNWBcbiAgICAgICAgfWVsc2UgaWYgKHBsYWNlID49IDE2ICYmIHBsYWNlIDw9IDIwKXtcbiAgICAgICAgICAgIHJldHVybiAgYHByaXplXzE2LTIwYFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSg0KTtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0U3RhcnRCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgbGV0IG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdl9fcGFnZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbWFpblBhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cnKSwgMTAwMCk7XG5cbiAgICAvL3Nob3cgcnVsZXMtIGRldGFpbHNcbiAgICBjb25zdCBydWxlc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJ1bGVzX19pdGVtJylcbiAgICBydWxlc0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ19vcGVuJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cblxufSkoKTtcbiIsIiJdfQ==
