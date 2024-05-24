"use strict";
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
  const header = document.querySelector("header");
  toggleHeaderClassList();

  window.addEventListener("scroll", toggleHeaderClassList);
  window.addEventListener("resize", toggleHeaderClassList);

  function toggleHeaderClassList() {
    scrollY > 300
      ? header.classList.add("bg-painted")
      : header.classList.remove("bg-painted");
  }
}

// Header-menu
const menuToggle = document.querySelector(".js-menu-trigger");
const menu = document.querySelector(".js-header-menu");
const menuOverl = document.querySelector(".js-overl");

document.addEventListener("DOMContentLoaded", () => {
  navBarHandle(menuToggle, menu);
});

// Открытие-закрытие мобильного навбара
function navBarHandle(menuToggle, menu) {
  const items = menu.querySelectorAll(".js-menu-item");

  let isDelay;

  function menuItemsAddDelay(menu) {
    let delay = 0.2;
    for (let item of items) {
      delay += 0.05;
      item.style.transitionDelay = `${delay}s`;
    }
    isDelay = true;
  }

  function menuItemsRemoveDelay(menu) {
    for (let item of items) {
      item.style.transitionDelay = ``;
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
const menuItemCollapses = document.querySelectorAll(
  ".menu-mobile-collapse .menu-item-has-children.lv1"
);

if (menuItemCollapses) {
  for (let i = 0; i < menuItemCollapses.length; i++) {
    let menuItemCollapse = menuItemCollapses[i];

    let menuItemCollapseLink = menuItemCollapse.firstElementChild;
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
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }

    // OLD
    // menuItemCollapseLink.addEventListener('click', (e) => {
    //   e.preventDefault();
    // })
    let collapseContent = menuItemCollapse.querySelector(".sub-menu.lv2");

    menuItemCollapseLink.addEventListener("click", function () {
      if (!collapseContent.offsetHeight) {
        menuItemCollapse.classList.add("open");
        collapseContent.style.maxHeight = collapseContent.scrollHeight + "px";
      } else {
        menuItemCollapse.classList.remove("open");
        collapseContent.style.maxHeight = "";
      }
    });
  }
}

// Swiper
const swiper = new Swiper(".entry-slider", {
  // autoplay: {
  //   delay: 5000,
  // },
  loop: true,
  speed: 500,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const clientsSlider = new Swiper(".clients-slider", {
  slidesPerView: 2,
  slidesPerGroup: 2,
    autoplay: {
    delay: 5000,
  },
  loop: true,
  speed: 500,
  grid: {
    rows: 2,
  },
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px
      576: {
        slidesPerView: 4,
        spaceBetween: 40,
        grid: {
          rows: 1,
        },
      }
    }
});
// ======================================================

// T A B S
const tabsBoxes = document.querySelectorAll(".tabs-wrap");

for (let i = 0; i < tabsBoxes.length; i++) {
  const tabs = tabsBoxes[i].querySelectorAll(".tabs__btn");
  const tabsContent = tabsBoxes[i].querySelector(".tabs-content");
  const tabsContentItems = tabsContent.querySelectorAll(".tabs-content__item");

  for (let i = 0; i < tabs.length; i++) {
    let tab = tabs[i];

    tab.addEventListener("click", function () {
      for (let j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("active");
      }

      let tabContentId = "#" + this.dataset.target;
      this.classList.add("active");

      for (let k = 0; k < tabsContentItems.length; k++) {
        tabsContentItems[k].classList.remove("active");
      }

      tabsContent.querySelector(tabContentId).classList.add("active");
    });
  }
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



window.addEventListener("load", setPreloader)

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function setPreloader() {
  const PRELOADERTRANSITION = 500;
  preloader.style.transition = `opacity ${PRELOADERTRANSITION}ms`;
  preloader.classList.add("fade-out");

  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -


// FORMS
const forms = Array.from(document.forms);
forms.forEach((form) => {
  setRequiredMark(form);
  fixLabel(form)
})

// Functions
// Установка маркеров обязательных для заполнения полей
function setRequiredMark(form) {
  let required = form.querySelectorAll("[required]");
  required.forEach((item) => {
    let label = item.parentNode.querySelector(".form-label");
    label.classList.add("required");
  });
}

function fixLabel(form) {
  const groups = form.querySelectorAll('.form-group_float-label ')
  groups.forEach((group) => {
    let input = group.firstElementChild
    let label = group.lastElementChild
    input.addEventListener('focus', function() {
      label.classList.add('form-label_fixed')
    })
    input.addEventListener('blur', function() {
      if(!this.value) label.classList.remove('form-label_fixed')
    })
  })
}


window.addEventListener("load", setPreloader)

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function setPreloader() {
  const PRELOADERTRANSITION = 500;
  preloader.style.transition = `opacity ${PRELOADERTRANSITION}ms`;
  preloader.classList.add("fade-out");

  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -