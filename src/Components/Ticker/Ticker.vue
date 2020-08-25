<template lang="pug">
  #sectionTicker.ticker
    .ticker-animation
      .word-wrap
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
      .word-wrap
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
        .word Мы открылись
</template>

<script>
import { throttle } from "lodash";

export default {
  mounted() {
    if (_isScreenLg) {
      const tween = this.$gsap.TweenLite.fromTo(
        "#sectionTicker .ticker-animation",
        5,
        { x: -200 },
        { x: -1000, ease: "linear", onComplete: tweenRestart }
      );
      function tweenRestart() {
        tween.restart();
      }
    } else {
      const tween = this.$gsap.TweenLite.to(
        "#sectionTicker .ticker-animation",
        5,
        { x: -776, ease: "linear", onComplete: tweenRestart }
      );
      function tweenRestart() {
        tween.restart();
      }
    }
  }
};
</script>

<style src="./Ticker.scss" lang="scss" scoped></style>