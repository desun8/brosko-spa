<template lang="pug">
  #sectionBuy.buy(ref="section")
    //- .parallax-buy(ref="parallax")
    //-   .duck
    //-   .prints(ref="prints")
    //-     Prints

    a.link-insta.only-sm(:href="urlInsta" target="_blank")
      svg
        use(xlink:href="../Contacts/img/sprite.symbol.svg#icon-insta")

    .hero(ref="hero")
      .logo(ref="logoTitle")
      .bg-pattern(ref="bgPattern")

      .parallax-buy(ref="parallax")
        .duck
        .prints(ref="prints")
          Prints

    .card-list
      .wrap(v-if="isDesktop")
        Card(
          v-for="item in filterItems"
          :key="item.id"
          :card="item"
        )

        router-link.card-show-all(:to="{ name: 'buy-inner', params: { url: 'buy', data: items }}")
          .bg
          .text показать все

      VerticalSimplebar(v-else)
        .wrap
          Card(
            v-for="item in filterItems"
            :key="item.id"
            :card="item"
          )

          router-link.card-show-all(:to="{ name: 'buy-inner', params: { url: 'buy', data: items }}")
            .bg
            .text показать все
</template>

<script>
// import { throttle } from "lodash";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import VerticalSimplebar from "../_common/VerticalSimplebar/VerticalSimplebar.vue";
import Card from "./Card/Card.vue";
import Prints from "./PrintsSvg.vue";

export default {
  components: {
    VerticalSimplebar,
    Card,
    Prints
  },
  computed: {
    coords() {
      return this.$refs.section.getBoundingClientRect();
    },
    isScrollDone() {
      return this.$store.state.scrollDone;
    },
    items() {
      // Нужно только 5 элементов
      return this.$store.state.data.buy;
    },
    filterItems() {
      return this.items.filter((elm, index) => index < 5);
    },
    urlInsta() {
      // console.warn(this.$store.state.data.contacts);
      return this.$store.state.data?.contacts[0]?.instagram;
    },
    isDesktop() {
      return _isScreenLg;
    }
  },
  mounted() {
    const { parallax } = this.$refs;
    const svgPrints = this.$refs.prints;
    const printsPath = Array.from(svgPrints.querySelectorAll("g path"))
      .reverse()
      .slice(0, 35);

    console.log(printsPath);

    // const printsPathDesktop = printsPath.slice(0, 40);

    // Анимации при скролле
    if (_isScreenLg) {
      const tl = new this.$gsap.TimelineLite();
      const tw = this.$gsap.TweenLite.to(".parallax-buy .duck", 1, {
        x:600, y: 500,
        // x: "90%",
        // y: _isScreenFhd ? "65%" : "58%",
        ease: "liear"
      });

      tl.add(tw, 0);
      // Добавляем анимации лапок

      // if (_isScreenFhd) {
      //   printsPath.forEach((path, index) => {
      //     const tween = this.$gsap.TweenLite.to(path, 0.05, {
      //       fill: "#bd3e00",
      //       delay: (index + 1) / 100,
      //       ease: "linear"
      //     });

      //     tl.add(tween, "-=0.89");
      //   });
      // } else if (_isScreen1440) {
      //   printsPath.forEach((path, index) => {
      //     const tween = this.$gsap.TweenLite.to(path, 0.05, {
      //       fill: "#bd3e00",
      //       delay: (index + 1) / 65,
      //       ease: "linear"
      //     });

      //     tl.add(tween, "-=0.89");
      //   });
      // } else {
        printsPath.forEach((path, index) => {
          const tween = this.$gsap.TweenLite.to(path, 0.05, {
            fill: "#bd3e00",
            delay: (index + 1) / 55,
            ease: "linear"
          });

          tl.add(tween, "-=0.89");
        });
      // }

      const sceneDuck = new this.$scrollmagic.Scene({
        triggerElement: "#sectionBuy",
        triggerHook: 0.4,
        duration: "200%"
      }).setTween(tl);

      // const scenePrints = new this.$scrollmagic.Scene({
      //   triggerElement: "#sectionBuy",
      //   triggerHook: 0.2,
      //   duration: "100%"
      // }).setTween(tl);

      this.$scrollmagic.controller.addScene(sceneDuck);
      // this.$scrollmagic.controller.addScene(scenePrints);
    } else {
      const tl = new this.$gsap.TimelineLite();
      // Утка
      const tween1 = this.$gsap.TweenLite.to(".parallax-buy .duck", 1, {
        x: -100,
        y: _isScreen414 ? 220 : _isScreen375 ? 202 : 185,
        // ease: this.$gsap.Sine.easeOut
        delay: 0.1,
        ease: "linear"
      });

      // Добавляем в таймлайн
      tl.add(tween1, 0); // .add(tween2, 0);

      // Добавляем анимации лапок
      let iteration = 0;
      const PATH_LENGTH = 22;
      printsPath.forEach((path, index) => {
        // в одном свг - 16 path
        if (index > PATH_LENGTH) return null;

        const tween = this.$gsap.TweenLite.to(path, 0.05, {
          fill: "#bd3e00",
          delay: (iteration + 1) / 32,
          ease: "linear"
        });

        tl.add(tween, "-=0.8");
        iteration += 1;
      });

      const sceneDuck = new this.$scrollmagic.Scene({
        triggerElement: ".parallax-buy",
        triggerHook: 0.8,
        duration: 800
      }).setTween(tl);

      this.$scrollmagic.controller.addScene(sceneDuck);
    }
  }
};
</script>

<style src="./Buy.scss" lang="scss" scoped></style>
