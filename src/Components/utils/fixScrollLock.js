import { getScrollState, getPageScrollBarWidth } from "scroll-lock";

// Фиксируем габургер и лого, чтобы не прыгали при активации скролл-лока

// onlyModal нужен только если активный блок с акциями
// Так как там это фикс уже применен
export default (active, isModal = false, onlyModal = false) => {
  if (_isScreenLg) {
    const isActive = active !== undefined ? active : getScrollState();

    const hamburger = _$(".hamburger");
    const logo = _$(".page-logo");

    const RIGHT = 38;
    const barWidth = getPageScrollBarWidth();
    const svg = logo.querySelector("svg");

    if (isActive) {
      if (!onlyModal) {
        hamburger.style.right = `${barWidth + RIGHT}px`;
        svg.style.transform = `translateX(-${barWidth / 2}px) scale(0.95)`;
      }

      if (isModal) {
        const btnBackInner = _$(".js-modal-back");
        btnBackInner.style.right = `${barWidth + RIGHT}px`;
      }
    } else {
      if (!onlyModal) {
        hamburger.style.right = null;
        svg.style.transform = null;
      }

      if (isModal) {
        const btnBackInner = _$(".js-modal-back");
        if (!onlyModal) btnBackInner.style.right = null;
      }
    }
  }
};
