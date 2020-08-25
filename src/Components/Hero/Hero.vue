<template lang="pug">
  #sectionHero.hero
    .wrap
      .bg-pattern.only-lg
      .block-img
        .bg-img

      .block-text.only-lg
        .static мега
        .animation
          .animation_item
            span.text-wrapper
              span.letters
                span.letter с
                span.letter в
                span.letter е
                span.letter ж
                span.letter е
                span.letter с
                span.letter т
                span.letter ь
          .animation_item
            span.text-wrapper
              span.letters
                span.letter с
                span.letter к
                span.letter и
                span.letter д
                span.letter к
                span.letter и
          .animation_item
            span.text-wrapper
              span.letters
                span.letter в
                span.letter ы
                span.letter б
                span.letter о
                span.letter р

      span.text(ref="text") Работаем с 8:00 до 23:00

</template>

<script>
import anime from "animejs";

export default {
  mounted() {
    if (_isScreenLg) {
      // Анимация слов
      const wordsAnimation = () => {
        const items = _$$(".animation_item");
        let params = [];

        // генерируем параметры анимации
        items.forEach(item => {
          const letters = item.querySelectorAll(".letter");

          params = [
            ...params,
            {
              start: {
                targets: letters,
                translateY: ["1em", 0],
                translateZ: 0,
                // opacity: 1,
                duration: 750,
                delay: (el, i) => 50 * i
              },
              end: {
                targets: item,
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
              }
            }
          ];
        });

        anime
          .timeline({ loop: true })
          .add(params[0].start)
          .add(params[0].end)
          .add(params[1].start)
          .add(params[1].end)
          .add(params[2].start)
          .add(params[2].end);
      };

      wordsAnimation();

      // Анимация времени работы
      const timeAnimation = () => {
        const { text } = this.$refs;
        const tl = new this.$gsap.TimelineLite({ onComplete: tweenRestart });

        const tweenStart = this.$gsap.TweenLite.to(text, 0.5, { y: -10, ease: "linear" });
        const tweenEnd = this.$gsap.TweenLite.to(text, 0.8, {
          y: 0,
          ease: this.$gsap.Bounce.easeOut
        });

        tl.add(tweenStart).add(tweenEnd);

        function tweenRestart() {
          setTimeout(() => {
            tl.restart();
          }, 2000);
        }
      };

      timeAnimation();
    }
  }
};
</script>

<style src="./Hero.scss" lang="scss" scoped />
