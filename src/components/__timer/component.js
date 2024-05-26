// TIMER
window.addEventListener("load", function () {


  setTimer(3, 24, 57);

  // - - - - - - - - - - - - - - - - - - -
});
function setTimer(startHours, startMinutes, startSeconds) {
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
}
// ---------------------------------------