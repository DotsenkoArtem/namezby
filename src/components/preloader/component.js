

window.addEventListener("load", setPreloader)

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function setPreloader() {
  const PRELOADERTRANSITION = 1500;
  preloader.style.transition = `opacity ${PRELOADERTRANSITION}ms`;
  preloader.classList.add("fade-out");

  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -