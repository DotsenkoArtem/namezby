const forms = Array.from(document.forms);
const wrapper = document.getElementById("pageWrapper");

const duration = 400;
const delay = duration / 2;

let enableSound = true;
let sounds;
if (enableSound) {
  // Все звуки загружаем сразу, так как если произойдет отключение интернета, а звук не загружен и не закеширован, то он и проигран не будет
  sounds = {
    success: new Sound("audio/success.mp3"),
    limitExceeded: new Sound("audio/error-10.mp3"),
    errorHttp: new Sound("audio/error-10.mp3"),
    error: new Sound("audio/error-10.mp3"),
  };

  function Sound(src) {
    let audio = document.createElement("audio");
    audio.src = src;
    this.play = function () {
      audio.play();
    };
    this.pause = function () {
      audio.pause();
    };
  }
}

// P H O N E   I N P U T S   M A S K
const phoneMasks = document.querySelectorAll("[data-mask]");

phoneMasks.forEach((phoneMask) => {
  let im = new Inputmask("+7(999)-999-99-99");
  im.mask(phoneMask);
});

forms.forEach((form) => {
  setRequiredMark(form);
  const submitBtn = form.querySelector(".form-submit");
  const url = form.dataset.action;
  let requiredFields = form.querySelectorAll("[data-required]");

  let inputTypeFile = form.querySelector('input[type="file"]');

  const selectedFileInfo = document.createElement("div");
  selectedFileInfo.innerText = `No choosen files`;
  selectedFileInfo.className = "form-control-file-info";

  if (inputTypeFile) {
    inputTypeFile.after(selectedFileInfo);
    handleUploads(inputTypeFile, selectedFileInfo);
  }

  function handleUploads(inputTypeFile, selectedFileInfo) {
    inputTypeFile.addEventListener("change", function () {
      if (this.files.length == 1) {
        selectedFileInfo.innerText = `Choosen file: ${this.files[0].name}`;
      }
      if (this.files.length > 1) {
        selectedFileInfo.innerText = `Choosen files: ${this.files.length}`;
      }
    });
  }

  submitBtn.addEventListener("click", function () {
    if (formValidate(form, requiredFields)) {
      submitBtn.setAttribute("disabled", "");
      send(url, form, submitBtn, requiredFields, selectedFileInfo);

      document.addEventListener("click", removeAlertBackdrop);
      // Удаление .form-alert & .form-alert-backdrop
      function removeAlertBackdrop(e) {
        if (
          e.target === wrapper.querySelector(".form-alert__close") ||
          e.target === wrapper.querySelector(".form-alert-backdrop")
        ) {
          removeAlert(submitBtn);
          // Удалить слушатель событий после первого клика на .form-alert или .form-alert-backdrop
          document.removeEventListener("click", removeAlertBackdrop);
          // Генерация события удления .form-alert & .form-alert-backdrop для последующего использования при автоматическом их удалении по таймауту (то есть, если они не были удалены по клмку на них)
          e.target.dispatchEvent(
            new CustomEvent("alertRemoved", {
              bubbles: true,
            })
          );
        }
      }
    }
  });
});

// Functions
// Установка маркеров обязательных для заполнения полей
function setRequiredMark(form) {
  let required = form.querySelectorAll("[data-required]");
  required.forEach((item) => {
    let label = item.parentNode.querySelector(".form-label");
    label.classList.add("required");
  });
}

function formValidate(form, requiredFields) {
  // const fieldsMessages = {}
  let invalidFields = [];
  // Required Fields
  // let requiredFields = form.querySelectorAll("[data-required]");
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

// Удаление состояний инпутов ".valid"
function deleteInputValidState(requiredFields) {
  requiredFields.forEach((requiredField) => {
    let requiredFieldLabel = requiredField.parentNode.querySelector("label");
    requiredField.dataset.required = "";
    requiredFieldLabel.dataset.requiredLabel = "";
  });
}

function setBackdrop() {
  let formAlertBackdrop = document.createElement("div");
  formAlertBackdrop.className = "form-alert-backdrop";

  wrapper.append(formAlertBackdrop);

  setTimeout(() => {
    formAlertBackdrop.classList.add("active");
    formAlertBackdrop.style.transition = `opacity ${duration}ms`;
  }, 0);
}

function removeBackdrop(submitBtn) {
  const formAlertBackdrop = wrapper.querySelector(".form-alert-backdrop");
  if (formAlertBackdrop) {
    formAlertBackdrop.style = ``;
    formAlertBackdrop.style.transition = `opacity ${duration}ms`;
    formAlertBackdrop.style.opacity = `0`;
    setTimeout(() => {
      formAlertBackdrop.remove();
      submitBtn.removeAttribute("disabled");
    }, duration);
  }
}

// Установка лоадера
function setupLoader() {
  const loader = document.createElement("div");
  loader.className = "form__loader";
  wrapper.appendChild(loader);
}
// Удаление лоадера
function removeLoader() {
  const loader = wrapper.querySelector(".form__loader");
  loader.remove();
}

function setupAlert(sendStatus, req, enableSound) {
  const alertMessage = {
    success: {
      title: "Заявка отправлена",
      content: "Наш менеджер свяжется с Вами в течение 15 минут",
    },
    limitExceeded: {
      title: "Заявка не отправлена",
      content: `Превышен максимальный размер прикрепляемых файлов (10мб).`,
    },
    errorHttp: {
      title: "Заявка не отправлена",
      content: `Ошибка сервера: ${req.status}`,
    },
    error: {
      title: "Заявка не отправлена",
      content: `Ошибка: ${req.status}. Возможная причина: отсутствие соединения с интернетом`,
    },
  };

  let formAlert = document.createElement("div");
  formAlert.className = "form-alert";
  let formAlertContent = document.createElement("div");
  formAlertContent.className = "form-alert__content";

  let formAlertTitle = document.createElement("div");
  formAlertTitle.className = "form-alert__title";

  let formAlertClose = document.createElement("div");
  formAlertClose.className = "form-alert__close";

  formAlertContent.append(formAlertTitle);
  formAlert.append(formAlertContent, formAlertClose);
  wrapper.append(formAlert);

  // Setup alert status
  formAlertTitle.innerHTML = alertMessage[sendStatus].title;
  formAlertContent.innerHTML += alertMessage[sendStatus].content;
  formAlert.classList.add(`form-alert_${sendStatus}`);

  formAlert.classList.add("active");
  formAlert.style.animationDuration = `${duration}ms`;

  // Sound
  if (enableSound) {
    // Воспроизведение звука в зависимости от статуса
    let playSound = sounds[sendStatus];
    playSound.play();
    setTimeout(() => {
      playSound = null;
    }, duration * 2);
  }
}

// Закрытие окна оповещения
function removeAlert(submitBtn) {
  const formAlert = wrapper.querySelector(".form-alert");

  if (formAlert) {
    formAlert.style = ``;
    formAlert.style.animation = `slideOutRightBottom ${duration}ms ease-in forwards`;
    setTimeout(() => {
      formAlert.remove();
      removeBackdrop(submitBtn);
    }, duration);
  }
}

function send(url, form, submitBtn, requiredFields, selectedFileInfo = null) {
  let sendStatus;

  setBackdrop();
  setupLoader(form);

  const req = new XMLHttpRequest();
  req.open("POST", url, true);

  req.onload = function () {
    // let limitExceeded = `<div class="thanks__title"><span class="text_accent-prim">Ошибка.</span></div><div class="thanks__subtitle">Превышен максимальный размер прикрепляемых файлов (10мб).</div>`;

    if (req.status >= 200 && req.status < 400) {
      let json = JSON.parse(this.response);

      // ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result == "success") {
        sendStatus = "success";
      } else if (json.result == "limitExceeded") {
        sendStatus = "limitExceeded";
        // Превышен максимальный размер прикрепляемых файлов (10мб)
      } else {
        sendStatus = "errorHttp";
        // Ошибка. Сообщение не отправлено
      }
      // Н-р, если не удалось связаться с файлом обработчиком (404)
    } else {
      sendStatus = "errorHttp";
    }
    // Удаление лоадера
    removeLoader(form);
    // Установка алерта
    setupAlert(sendStatus, req, enableSound);

    // Автоудаление алерта при условии, если они не были удалены по клику
    let isAlert = true;
    document.addEventListener("alertRemoved", setAlertRemoveFlag);
    function setAlertRemoveFlag() {
      isAlert = false;
      document.removeEventListener("alertRemoved", setAlertRemoveFlag);
      // Затрем поля формы
      form.reset();
      deleteInputValidState(requiredFields);
      // Для input[type="file"]
      if (selectedFileInfo) {
        selectedFileInfo.innerText = `No choosen files`;
      }
    }
    setTimeout(function () {
      if (isAlert) {
        removeAlert(submitBtn);
        // Затрем поля формы
        form.reset();
        deleteInputValidState(requiredFields);
        // Для input[type="file"]
        if (selectedFileInfo) {
          selectedFileInfo.innerText = `No choosen files`;
        }
      }
    }, 5000);
  };

  // Если не удалось отправить запрос. Стоит блок на хостинге, отсутствие интернета
  req.onerror = function () {
    sendStatus = "error";
    removeLoader(form);
    setupAlert(sendStatus, req, enableSound);

    // Автоудаление алерта при условии, если они не были удалены по клику
    let isAlert = true;
    document.addEventListener("alertRemoved", setAlertRemoveFlag);
    function setAlertRemoveFlag() {
      isAlert = false;
      document.removeEventListener("alertRemoved", setAlertRemoveFlag);
    }
    setTimeout(function () {
      if (isAlert) {
        removeAlert(submitBtn);
      }
    }, 5000);
  };

  req.send(new FormData(form));
}
