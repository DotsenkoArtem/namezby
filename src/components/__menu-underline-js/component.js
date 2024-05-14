// ОБРАБОТКА ПОДЧЕРКИВАНИЯ ПУНКТОВ МЕНЮ
const menuDashed = document.querySelector(".menu_underlined");
const menuItems = menuDashed.querySelectorAll(".js-menu-item > a");
let windowWidth = document.documentElement.clientWidth;


function setupMenuDashResponsive() {
  windowWidth = document.documentElement.clientWidth;
  if (menuItems) {
    for (let menuItem of menuItems) {
      let dash = document.createElement("div");
      dash.className = "menu-dash";
      menuItem.append(dash);
      
      menuDashHandler(menuItem, dash);
    }
  }
}

function menuDashHandler(item, dash) {
  // Определение середины пункта меню
  let menuItemMiddle =
    item.getBoundingClientRect().x + item.getBoundingClientRect().width / 2;

  item.addEventListener("mouseover", function (e) {
    dash.className = "menu-dash"; //Сброс всех лишних классов (появления и исчезания)
    menuItemMiddle >= e.clientX
      ? dash.classList.add("grow-right")
      : dash.classList.add("grow-left");
  });

  item.addEventListener("mouseout", function (e) {
    dash.className = "menu-dash";
    menuItemMiddle >= e.clientX
      ? dash.classList.add("shrink-left")
      : dash.classList.add("shrink-right");
  });
}

// Запуск установки только на мобильных
if (windowWidth > 991) {
  setupMenuDashResponsive();
}

// Обработка при изменении экрана
window.addEventListener('resize', function(){
  windowWidth = document.documentElement.clientWidth;

  let dashes = menuDashed.querySelectorAll(".menu-dash");
  if (dashes) {
    for (let dash of dashes) {
      dash.remove();
    }
  }

  if (windowWidth > 991) {
    setupMenuDashResponsive();
  }
})
