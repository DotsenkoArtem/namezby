"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
window.addEventListener("load", function () {
  handleHeader();

  // INPUT MASK
  var selector = document.querySelectorAll('[type="tel"]');
  var im = new Inputmask("+375 (99) 999-99-99");
  im.mask(selector);
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

// Collapses - used in footer
var footerCollapses = document.querySelectorAll(".js-footer-collapse");
if (footerCollapses) {
  var _loop2 = function _loop2() {
    var footerCollapse = footerCollapses[_i];
    var footerCollapseBtn = footerCollapse.firstElementChild;

    /*     footerCollapseBtn.addEventListener("click", setLinkBehaviour);
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
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    } */

    var collapseContent = footerCollapse.querySelector(".footer-menu");
    footerCollapseBtn.addEventListener("click", function () {
      if (!collapseContent.offsetHeight) {
        footerCollapse.classList.add("open");
        collapseContent.style.maxHeight = collapseContent.scrollHeight + "px";
      } else {
        footerCollapse.classList.remove("open");
        collapseContent.style.maxHeight = "";
      }
    });
  };
  for (var _i = 0; _i < footerCollapses.length; _i++) {
    _loop2();
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
var _loop3 = function _loop3() {
  var tabs = tabsBoxes[_i2].querySelectorAll(".tabs__btn");
  var tabsContent = tabsBoxes[_i2].querySelector(".tabs-content");
  var tabsContentItems = tabsContent.querySelectorAll(".tabs-content__item");
  for (var _i3 = 0; _i3 < tabs.length; _i3++) {
    var tab = tabs[_i3];
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
for (var _i2 = 0; _i2 < tabsBoxes.length; _i2++) {
  _loop3();
}

// ======================================================

// FORMS
var forms = Array.from(document.forms);
forms.forEach(function (form) {
  setRequiredMark(form);
  fixLabel(form);
});

// Functions
// Установка маркеров обязательных для заполнения полей
function setRequiredMark(form) {
  var required = form.querySelectorAll("[required]");
  required.forEach(function (item) {
    var label = item.parentNode.querySelector(".form-label");
    label.classList.add("required");
  });
}
function fixLabel(form) {
  var groups = form.querySelectorAll(".form-group_float-label ");
  groups.forEach(function (group) {
    var input = group.firstElementChild;
    var label = group.lastElementChild;
    input.addEventListener("blur", function () {
      this.value ? this.classList.add("has-value") : this.classList.remove("has-value");
    });
  });
}
window.addEventListener("load", setPreloader);

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function setPreloader() {
  var PRELOADERTRANSITION = 1500;
  preloader.style.transition = "opacity ".concat(PRELOADERTRANSITION, "ms");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -

function handleModals() {
  var modalBtns = document.querySelectorAll(".js-modal-trigger");
  modalBtns.forEach(function (modalBtn) {
    // Продолжительность анимации
    var duration;
    var modal = document.querySelector("#".concat(modalBtn.dataset.target));
    var modalClose = modal.querySelector(".modal__close");
    var modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBtn.addEventListener("click", openModal);
    modalBackdrop.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal);

    // Open-close functions
    function openModal() {
      // Если в дата-атрибуте значение указано равным 0, то продолжительность анимации 0.
      modalBtn.dataset.duration === "0" ? duration = 0 :
      // В остальных случаях, если указано целочисленное значение, то берем его, если нет, то 350 по умолчанию.
      duration = +modalBtn.dataset.duration || 350; // В
      modal.style.transition = "".concat(duration, "ms ease-out");
      modal.style.display = "flex";
      // Таймаут для того, чтобы отрабатывала анимация
      setTimeout(function () {
        modal.classList.add("shown");
      }, 0);
      modal.append(modalBackdrop);
    }
    function closeModal() {
      modal.classList.remove("shown");
      setTimeout(function () {
        modal.style = "";
        modalBackdrop.remove();
      }, duration);
    }
  });
}
handleModals();