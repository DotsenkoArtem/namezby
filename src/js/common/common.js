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

// Collapses - used in faq
const faqCollapses = document.querySelectorAll(".js-faq-collapse");

if (faqCollapses) {
  for (let i = 0; i < faqCollapses.length; i++) {
    let faqCollapse = faqCollapses[i];

    let faqCollapseBtn = faqCollapse.firstElementChild;

    let collapseContent = faqCollapse.querySelector(".question__content");

    faqCollapseBtn.addEventListener("click", function () {
      if (!collapseContent.offsetHeight) {
        faqCollapse.classList.add("open");
        collapseContent.style.maxHeight = collapseContent.scrollHeight + "px";
      } else {
        faqCollapse.classList.remove("open");
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
  autoplay: {
    delay: 7500,
  },
  loop: true,
  speed: 500,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

if(document.querySelector('.clients-slider .swiper-wrapper > .swiper-slide')) {
  const clientsSlider = new Swiper(".clients-slider", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  autoplay: {
    delay: 7500,
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
}

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
  
  handleForm(form)
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
    let input = group.querySelector('input') || group.querySelector('textarea');
    let label = group.lastElementChild;
    input.addEventListener("blur", function () {
      this.value
        ? this.classList.add("has-value")
        : this.classList.remove("has-value");
    });
  });
}

function handleForm(form) {
  let modalBtn = form.querySelector('button.form-submit') || form.querySelector('input[type="submit"]');
  modalBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let requiredFields = Array.from(form.querySelectorAll("[required]"));
    // let requiredFormGroups = requiredFields.map(item => item.closest('.form-group'))



    

    function formValidate(form, requiredFields) {
      // const fieldsMessages = {}
      let invalidFields = [];
      // Required Fields
      requiredFields.forEach((requiredField) => {
        // Label for required fields
        let requiredFieldLabel = requiredField.parentNode.querySelector("label");
        requiredFieldLabel.dataset.requiredLabel = "";
    
        requiredField.oninput = () => {
          requiredField.dataset.required = "";
          requiredFieldLabel.dataset.requiredLabel = "";
        };
    
        // For input[type="text"] - проверка на пустоту
        if (requiredField.getAttribute("type") === "text") {
          if (requiredField.value.trim() === "") {
            // Empty string reset
            requiredField.value = "";
            setFiedsAndLabelsState("invalid");
            invalidFields.push(1);
          } else {
            setFiedsAndLabelsState("valid");
          }
        }
    
        // For input[type="text" data-mask] - проверка на комплекность маски поля
        if (
          requiredField.getAttribute("type") === "tel" &&
          requiredField.hasAttribute("data-mask")
        ) {
          if (requiredField.inputmask && !requiredField.inputmask.isComplete()) {
            setFiedsAndLabelsState("invalid");
            invalidFields.push(2);
          } else {
            setFiedsAndLabelsState("valid");
          }
        }
    
        // For input[type="email"] - проверка регулярным выражением
        if (requiredField.getAttribute("type") === "email") {
          let regExp = /[-.\w]+@([\w-]+\.)+[\w-]+/;
          if (!regExp.test(requiredField.value.trim())) {
            setFiedsAndLabelsState("invalid");
            invalidFields.push(3);
          } else {
            setFiedsAndLabelsState("valid");
          }
        }
    
        function setFiedsAndLabelsState(state) {
          requiredField.dataset.required = `${state}`;
          requiredFieldLabel.dataset.requiredLabel = `${state}`;
        }
      });
      return invalidFields.length ? false : true;
    }
    let result;

    if (formValidate(form, requiredFields)) {
      
      const req = new XMLHttpRequest();
      const formAction = form.action;
      req.open("POST", formAction, true);
    
      req.onload = function (){
        if(this.status >= 200 && this.status < 400) {
          result = 'success'
        } else {
          result = 'error'
        }
        setAlert(form, result)
      }

      req.onerror = function (){
        result = 'error'
        setAlert(form, result)
      }

      req.send(new FormData(form));




      

      
      // submitBtn.setAttribute("disabled", "");
      // send(url, form, submitBtn, requiredFields, selectedFileInfo);

      // document.addEventListener("click", removeAlertBackdrop);
      // Удаление .form-alert & .form-alert-backdrop


      // function removeAlertBackdrop(e) {
      //   if (
      //     e.target === wrapper.querySelector(".form-alert__close") ||
      //     e.target === wrapper.querySelector(".form-alert-backdrop")
      //   ) {
      //     removeAlert(submitBtn);
      //     // Удалить слушатель событий после первого клика на .form-alert или .form-alert-backdrop
      //     document.removeEventListener("click", removeAlertBackdrop);
      //     // Генерация события удления .form-alert & .form-alert-backdrop для последующего использования при автоматическом их удалении по таймауту (то есть, если они не были удалены по клмку на них)
      //     e.target.dispatchEvent(
      //       new CustomEvent("alertRemoved", {
      //         bubbles: true,
      //       })
      //     );
      //   }
      // }
    }




    

   
  })

  
  // setAlert(form);
}
// Окно оповешения
function setAlert(form, result) {
  let modalBtn = form.querySelector('button.form-submit') || form.querySelector('input[type="submit"]');

  
  let duration;
  let modalAlert = document.querySelector(`#formAlert`);
  let modalAlertTitle = modalAlert.querySelector('.modal-message__title ')
  let modalAlertSubtitle = modalAlert.querySelector('.modal-message__subtitle ')


  let modalAlertClose = modalAlert.querySelector(".modal__close");



  let modalAlertData = {
    title: {
      success: '<p>Спасибо!</p>',
      error: '<p>Ошибка!</p>',
    },
    subtitle: {
      success: '<p>Заявка принята <br>В ближайшее время мы с Вами свяжемся!</p>',
      error: '<p>Пожалуйста, попробуйте еще раз</p>',
    }
  }



  if(document.querySelector('.modal.shown')) {
    closeModal(document.querySelector('.modal.shown'))
    

    function closeModal(modal) {
      modal.classList.remove("shown");
      let modalBackdrop = modal.querySelector('.modal-backdrop')
      setTimeout(() => {
        modal.style = ``;
        modalBackdrop.remove();
      }, duration);
    }
  }

  let modalAlertBackdrop = document.createElement("div");
  modalAlertBackdrop.className = "modal-backdrop";

  openModal(form);
  modalAlertBackdrop.addEventListener("click", closeFormModal);
  modalAlertClose.addEventListener("click", closeFormModal);

  // Open-close functions
  function openModal(form) {
    // Если в дата-атрибуте значение указано равным 0, то продолжительность анимации 0.
    modalBtn.dataset.duration === "0"
      ? (duration = 0)
      : // В остальных случаях, если указано целочисленное значение, то берем его, если нет, то 350 по умолчанию.
        (duration = +modalBtn.dataset.duration || 350); // В
        modalAlert.style.transition = `${duration}ms ease-out`;




        modalAlert.classList.add(`modal-message_${result}`)
        modalAlertTitle.innerHTML = modalAlertData.title[result]
        modalAlertSubtitle.innerHTML = modalAlertData.subtitle[result]




        modalAlert.style.display = `flex`;
    // Таймаут для того, чтобы отрабатывала анимация
    setTimeout(() => {
      modalAlert.classList.add("shown");
    }, 0);
    modalAlert.append(modalAlertBackdrop);
  }

  function closeFormModal() {
    modalAlert.classList.remove("shown");
    form.reset()
    form.querySelectorAll('[data-required]').forEach((field) =>{
      field.dataset.required = ``
    })
    form.querySelectorAll('[data-required-label]').forEach((field) =>{
      field.dataset.requiredLabel = ``
    })
    form.querySelectorAll('input').forEach((field) =>{
      field.classList.remove('has-value')
    })
    form.querySelectorAll('textarea').forEach((field) =>{
      field.classList.remove('has-value')
    })
    
    setTimeout(() => {
      modalAlert.style = ``;
      modalAlert.classList.remove(`modal-message_${result}`)
      modalAlertBackdrop.remove();
    }, duration);
  }


  setTimeout(() => {
    closeFormModal()
  }, 5000)
}



window.addEventListener('load', function(){

  document.addEventListener('click', function(e) {
    if(e.target.closest('.js-services-item')) {
      let btns = e.target.closest('.js-services-item').querySelector('.js-services-item-btns')

        console.log('btns: ', btns);
        btns.style.pointerEvents = `unset`
    }
  })

  document.addEventListener('click', function(e) {
    if(!e.target.closest('.js-services-item')) {
      let btns = document.querySelectorAll('.js-services-item-btns')
      btns.forEach((btn) => {
        btn.style.pointerEvents = ``
      })
    }
  })

})



// PORTFOLIO
// G A L L E R Y
window.addEventListener("load", setFancyGAlleries);
function setFancyGAlleries() {
  const dataFancy = document.querySelectorAll('[data-fancybox]');

  let fancyGalerries = []
  let tmp = undefined;
  for(let i = 0; i < dataFancy.length; i++) {
    if(dataFancy[i].dataset.fancybox !== tmp) {
      fancyGalerries.push(dataFancy[i].dataset.fancybox)
    }
    tmp = dataFancy[i].dataset.fancybox;
  }

  fancyGalerries.forEach((attr)=> {
    Fancybox.bind(`[data-fancybox='${attr}']`, {
      Thumbs: {
        type: false,
      },
      transition: "classic",
    });
  })
}



// G A L L E R Y from admin
window.addEventListener("load", setFancyFromAdmin);
function setFancyFromAdmin() {
  Fancybox.bind(
    'a[href*=".jpg"]:not([data-fancybox],a[href*=".jpeg"]:not([data-fancybox],a[href*=".png"]:not([data-fancybox],a[href*=".gif"]:not([data-fancybox],a[href*=".webp"]:not([data-fancybox]',
    {
      groupAll: true,
      // Your custom options
    }
  );
}
// ======================================================
