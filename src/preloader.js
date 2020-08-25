import { TimelineLite, TweenLite, Power4 } from "gsap";

(() => {
  const textElms = document.querySelectorAll(".preloader-text");
  const printsPath = document.querySelectorAll(".preloader_bar path");

  const tlText = new TimelineLite({ paused: true, onComplete: restartText });

  textElms.forEach(elm => {
    const tweenIn = TweenLite.from(elm, 0.6, {
      y: 20,
      autoAlpha: 0,
      ease: Power4.easeInOut
    });
    const tweenOut = TweenLite.to(elm, 0.6, {
      y: -20,
      autoAlpha: 0,
      ease: Power4.easeInOut,
      delay: 2
    });

    tlText.add(tweenIn).add(tweenOut);
  });

  tlText.play();

  const tlSvg = new TimelineLite({
    paused: true,
    delay: 0.2,
    onComplete: restartSvg
  });

  printsPath.forEach(path => {
    const tween = TweenLite.to(path, 0.2, {
      fill: "#bd3e00",
      delay: 0.1,
      ease: Power4.easeInOut
    });

    tlSvg.add(tween);
  });

  tlSvg.play();

  function restartText() {
    tlText.restart();
  }
  function restartSvg() {
    setTimeout(() => {
      tlSvg.restart();
    }, 1000);
  }
})();
