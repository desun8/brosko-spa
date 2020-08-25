import {
  TimelineLite,
  TweenLite,
  TweenMax,
  Power0,
  Power1,
  Power4,
  Circ,
  Sine,
  Bounce
} from "gsap";
import ScrollTo from "gsap/ScrollToPlugin";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";

export const gsap = {
  install(Vue, options) {
    Vue.prototype.$gsap = {
      TweenLite,
      TweenMax,
      TimelineLite,
      Power0,
      Power1,
      Power4,
      Sine,
      SteppedEase,
      Bounce,
      ScrollTo
      // SplitText
    };
  }
};

export const scrollMagic = {
  install(Vue, options) {
    Vue.prototype.$scrollmagic = {
      controller: new ScrollMagic.Controller(),
      Scene: ScrollMagic.Scene
    };
  }
};
