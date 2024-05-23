"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
window.addEventListener("load", function () {
  handleHeader();

  // setTimer(3, 24, 57);

  // INPUT MASK
  // const selector = document.querySelectorAll('[name="userPhone"]');
  // const im = new Inputmask("+7 (\\999) 999-99-99");
  // im.mask(selector);
  // - - - - - - - - - - - - - - - - - - -
});

// Header
function handleHeader() {
  var header = document.querySelector("header");
  toggleHeaderClassList();
  window.addEventListener("scroll", toggleHeaderClassList);
  window.addEventListener("resize", toggleHeaderClassList);
  function toggleHeaderClassList() {
    scrollY > 300 ? header.classList.add("bg-painted") : header.classList.remove("bg-painted");
  }
}

// Header-menu
var menuToggle = document.querySelector(".js-menu-trigger");
var menu = document.querySelector(".js-header-menu");
var menuOverl = document.querySelector(".js-overl");
document.addEventListener("DOMContentLoaded", function () {
  navBarHandle(menuToggle, menu);
});

// Открытие-закрытие мобильного навбара
function navBarHandle(menuToggle, menu) {
  var items = menu.querySelectorAll(".js-menu-item");
  var isDelay;
  function menuItemsAddDelay(menu) {
    var delay = 0.2;
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        delay += 0.05;
        item.style.transitionDelay = "".concat(delay, "s");
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    isDelay = true;
  }
  function menuItemsRemoveDelay(menu) {
    var _iterator2 = _createForOfIteratorHelper(items),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var item = _step2.value;
        item.style.transitionDelay = "";
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    isDelay = false;
  }
  menuToggle.addEventListener("click", function () {
    isDelay ? menuItemsRemoveDelay(menu) : menuItemsAddDelay(menu);
    menuToggle.classList.toggle("open");
    menu.classList.toggle("open");
    menuOverl.classList.toggle("open");
    document.body.classList.toggle("scroll-hidden");
  });

  // items.forEach((item) => item.addEventListener("click", menuClose));
  menuOverl.addEventListener("click", menuClose);
  function menuClose() {
    menuItemsRemoveDelay(menu);
    menuToggle.classList.remove("open");
    menu.classList.remove("open");
    menuOverl.classList.remove("open");
    document.body.classList.remove("scroll-hidden");
  }
}

// Collapses - used in mobile menu
var menuItemCollapses = document.querySelectorAll(".menu-mobile-collapse .menu-item-has-children.lv1");
if (menuItemCollapses) {
  var _loop = function _loop() {
    var menuItemCollapse = menuItemCollapses[i];
    var menuItemCollapseLink = menuItemCollapse.firstElementChild;
    menuItemCollapseLink.addEventListener("click", setLinkBehaviour);
    function setLinkBehaviour(event) {
      // Если да, то отменяем действие ссылки по-умолчанию
      if (isTouchDevice() && !event.defaultPrevented) {
        event.preventDefault();
      }
      //В противном случае восстанавливаем -- НЕ УВЕРЕН, ЧТО ХОРОШО ПОДДЕРЖИВАЕТСЯ, НО ВРОДЕ НОРМ
      if (!isTouchDevice() && event.defaultPrevented) {
        event.defaultPrevented = false;
      }
    }

    // Определение поддержки сенсорного ввода
    function isTouchDevice() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    // OLD
    // menuItemCollapseLink.addEventListener('click', (e) => {
    //   e.preventDefault();
    // })
    var collapseContent = menuItemCollapse.querySelector(".sub-menu.lv2");
    menuItemCollapseLink.addEventListener("click", function () {
      if (!collapseContent.offsetHeight) {
        menuItemCollapse.classList.add("open");
        collapseContent.style.maxHeight = collapseContent.scrollHeight + "px";
      } else {
        menuItemCollapse.classList.remove("open");
        collapseContent.style.maxHeight = "";
      }
    });
  };
  for (var i = 0; i < menuItemCollapses.length; i++) {
    _loop();
  }
}

// Swiper
var swiper = new Swiper(".entry-slider", {
  // autoplay: {
  //   delay: 5000,
  // },
  loop: true,
  speed: 500,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});
var clientsSlider = new Swiper(".clients-slider", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  autoplay: {
    delay: 5000
  },
  loop: true,
  speed: 500,
  grid: {
    rows: 2
  },
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 640px
    576: {
      slidesPerView: 4,
      spaceBetween: 40,
      grid: {
        rows: 1
      }
    }
  }
});
// ======================================================

// T A B S
var tabsBoxes = document.querySelectorAll(".tabs-wrap");
var _loop2 = function _loop2() {
  var tabs = tabsBoxes[_i].querySelectorAll(".tabs__btn");
  var tabsContent = tabsBoxes[_i].querySelector(".tabs-content");
  var tabsContentItems = tabsContent.querySelectorAll(".tabs-content__item");
  for (var _i2 = 0; _i2 < tabs.length; _i2++) {
    var tab = tabs[_i2];
    tab.addEventListener("click", function () {
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("active");
      }
      var tabContentId = "#" + this.dataset.target;
      this.classList.add("active");
      for (var k = 0; k < tabsContentItems.length; k++) {
        tabsContentItems[k].classList.remove("active");
      }
      tabsContent.querySelector(tabContentId).classList.add("active");
    });
  }
};
for (var _i = 0; _i < tabsBoxes.length; _i++) {
  _loop2();
}

// ======================================================

// TIMER
/* function setTimer(startHours, startMinutes, startSeconds) {
  // Высчитали время таймера
  let timerStartValue =
    (startHours * 3600 + startMinutes * 60 + startSeconds) * 1000;

  let timerTmpStartValue = parseInt(
    window.localStorage.getItem("timerTmpStartValueCoin2")
  );

  // Очистка хранилища при изменении диапазона таймера
  if (timerTmpStartValue && timerTmpStartValue !== timerStartValue) {
    localStorage.clear();
  }

  window.localStorage.setItem("timerTmpStartValueCoin2", timerStartValue);

  // Таймстамп-окончание таймера
  let timerStopStamp = new Date().getTime() + timerStartValue;

  let finishTimer = parseInt(localStorage.getItem("timerEndCoin2"));
  if (finishTimer) {
    timerStopStamp = finishTimer;
  }

  const hours = document.querySelectorAll(".timer .js-timer-hour");
  const minutes = document.querySelectorAll(".timer .js-timer-min");
  const seconds = document.querySelectorAll(".timer .js-timer-sec");
  const timerLamp = document.querySelectorAll(".js-timer-lamp");


  let timerId = setTimeout(function updateTimer() {
    // timerLamp.classList.toggle("turned-off");
    timerLamp.forEach((elem) => {
      elem.classList.toggle("turned-off");
    });
    // Текущий timestamp
    let currentTime = new Date().getTime();

    // Возобновление счетчика
    if (timerStopStamp <= currentTime) {
      // timerStopStamp += timerStartValue;
      timerStopStamp = currentTime + timerStartValue;
    }

    // Текущий таймстамп-остаток таймера
    let timerCurrentValue = timerStopStamp - currentTime;

    // Получение значений таймера
    let timerCurrentHours = new Date(timerCurrentValue).getUTCHours();
    let timerCurrentMinutes = new Date(timerCurrentValue).getUTCMinutes();
    let timerCurrentSeconds = new Date(timerCurrentValue).getUTCSeconds();

    // Вставка значений с добавлением нуля
    hours.forEach((elem) => {
      elem.innerHTML = `${setZero(timerCurrentHours)}`;
    });
    minutes.forEach((elem) => {
      elem.innerHTML = `${setZero(timerCurrentMinutes)}`;
    });
    seconds.forEach((elem) => {
      elem.innerHTML = `${setZero(timerCurrentSeconds)}`;
    });

    // Запись в LocalStorage
    window.localStorage.setItem("timerEndCoin2", timerStopStamp);

    timerId = setTimeout(updateTimer, 1000);
  }, 0);


  function setZero(val) {
    return val < 10 ? `0${val}` : `${val}`;
  }
} */
// ---------------------------------------

window.addEventListener("load", setPreloader);

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function setPreloader() {
  var PRELOADERTRANSITION = 500;
  preloader.style.transition = "opacity ".concat(PRELOADERTRANSITION, "ms");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -