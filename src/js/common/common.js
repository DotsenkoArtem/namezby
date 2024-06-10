"use strict";
window.addEventListener("load", function () {
  handleHeader();

  // INPUT MASK
  const selector = document.querySelectorAll('[type="tel"]');
  const im = new Inputmask("+375 (99) 999-99-99");
  im.mask(selector);
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
  ".menu-mobile-collapse > .menu-item-has-children"
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
    let collapseContent = menuItemCollapse.querySelector(".menu .sub-menu");

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

// Collapses - used in footer
const footerCollapses = document.querySelectorAll(".js-footer-collapse");

if (footerCollapses) {
  for (let i = 0; i < footerCollapses.length; i++) {
    let footerCollapse = footerCollapses[i];

    let footerCollapseBtn = footerCollapse.firstElementChild;

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

    let collapseContent = footerCollapse.querySelector(".footer-menu");

    footerCollapseBtn.addEventListener("click", function () {
      if (!collapseContent.offsetHeight) {
        footerCollapse.classList.add("open");
        collapseContent.style.maxHeight = collapseContent.scrollHeight + "px";
      } else {
        footerCollapse.classList.remove("open");
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
    },
  },
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

// FORMS
const forms = Array.from(document.forms);
forms.forEach((form) => {
  setRequiredMark(form);
  fixLabel(form);
  setAlert(form);
});

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
  const groups = form.querySelectorAll(".form-group_float-label ");
  groups.forEach((group) => {
    let input = group.firstElementChild;
    let label = group.lastElementChild;
    input.addEventListener("blur", function () {
      this.value
        ? this.classList.add("has-value")
        : this.classList.remove("has-value");
    });
  });
}

// Окно оповешения
function setAlert(form) {
  let modalBtn = form.querySelector('button.form-submit');


  let duration;
  let modal = document.querySelector(`#formAlert`);
  let modalTitle = modal.querySelector('.modal-message__title ')
  let modalSubtitle = modal.querySelector('.modal-message__subtitle ')


  let modalClose = modal.querySelector(".modal__close");

  let result;
  // result = 'success'
  result = 'error'

  let modalData = {
    title: {
      success: '<p>Спасибо!</p>',
      error: '<p>Ошибка!</p>',
    },
    subtitle: {
      success: '<p>Заявка принята <br>В ближайшее время мы с Вами свяжемся!</p>',
      error: '<p>Пожалуйста, попробуйте еще раз</p>',
    }
  }

  let modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal-backdrop";

  modalBtn.addEventListener("click", openModal);
  modalBackdrop.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  // Open-close functions
  function openModal() {
    // Если в дата-атрибуте значение указано равным 0, то продолжительность анимации 0.
    modalBtn.dataset.duration === "0"
      ? (duration = 0)
      : // В остальных случаях, если указано целочисленное значение, то берем его, если нет, то 350 по умолчанию.
        (duration = +modalBtn.dataset.duration || 350); // В
    modal.style.transition = `${duration}ms ease-out`;




    modal.classList.add(`modal-message_${result}`)
    modalTitle.innerHTML = modalData.title[result]
    modalSubtitle.innerHTML = modalData.subtitle[result]




    modal.style.display = `flex`;
    // Таймаут для того, чтобы отрабатывала анимация
    setTimeout(() => {
      modal.classList.add("shown");
    }, 0);
    modal.append(modalBackdrop);
  }

  function closeModal() {
    modal.classList.remove("shown");
    
    setTimeout(() => {
      modal.style = ``;
      modal.classList.remove(`modal-message_${result}`)
      modalBackdrop.remove();
    }, duration);
  }



}
