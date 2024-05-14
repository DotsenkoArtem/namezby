window.addEventListener("load", addBtnVawe);

function addBtnVawe() {
  document.body.addEventListener("click", function (e) {
    if (!e.target.classList.contains("btn-vawe")) return;

    let oldPulse = document.querySelector('.pulse')
    if (oldPulse){
      oldPulse.remove()
    }


    let pulseSide = 30;
    let pulse = document.createElement("div");

    pulse.className = "pulse";
    pulse.style.width = pulseSide + "px";
    pulse.style.height = pulseSide + "px";
    pulse.style.top =
      e.clientY - e.target.getBoundingClientRect().top - 15 + "px";
    pulse.style.left =
      e.clientX - e.target.getBoundingClientRect().left - 15 + "px";

    e.target.append(pulse);
    setTimeout(() => {
      pulse.remove();
    }, 300);
  });
}
