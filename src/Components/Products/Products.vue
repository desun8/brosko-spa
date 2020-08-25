<template lang="pug">
  #sectionProducts.products(ref="section" @wheel="onWheel")
    button.btn-skip(
      v-if="showBtnSkip"
      @click="handleSkipCarousel"
      type="button"
    ) Пропустить
      svg(xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none")
        g(clip-path="url(#clip0)")
          path(d="M9 14.13c.323 0 .645-.123.891-.369l7.74-7.74a1.26 1.26 0 10-1.783-1.782L9 11.087 2.152 4.24A1.26 1.26 0 00.369 6.022l7.74 7.74c.246.245.568.368.89.368z")
        defs
          clipPath(id="clip0")
            path(d="M0 0h18v18H0z" transform="matrix(-1 0 0 1 18 0)")

    Carrousel(ref="swiper")
</template>

<script>
import { throttle } from "lodash";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
// import VueScrollTo from "vue-scrollto";

import Carrousel from "./Carrousel/Carrousel.vue";
import data from "./data.json";
import fixScrollLock from "../utils/fixScrollLock";

export default {
  components: {
    Carrousel
  },
  data() {
    return {
      showBtnSkip: false,
      prevSlide: 0
    };
  },
  mounted() {
    const { section } = this.$refs;
    const posTop = section.offsetTop;

    if (_isScreenLg) {
      // если блок (часть) становится видимым на экране
      // то происходит скролл к его началу (верхняя позиция)
      const observer = new IntersectionObserver(
        entries => {
          // Если идет переход по навигации, то блок не фиксируется
          if (this.$store.state.isScrollTo === false) {
            if (entries[0].isIntersecting === true) {
              this.showBtnSkip = true;

              this.$gsap.TweenLite.to(window, 1, {
                scrollTo: { y: "#sectionProducts", autoKill: false },
                onStart: () => {
                  disablePageScroll();
                  fixScrollLock(true);
                  this.$store.dispatch("switchIsProducts", true);
                }
              });
            } else {
              this.showBtnSkip = false;
            }
          }
        },
        { threshold: [0.05] }
      );

      observer.observe(section);
    }
  },
  methods: {
    scrollTo(posY) {
      this.$gsap.TweenLite.to(window, 1, {
        scrollTo: { y: posY, autoKill: false },
        onStart: () => {
          this.$store.dispatch("switchScrollDone", false);
          console.log("fire scroll to");
        },
        onComplete: () => {
          setTimeout(() => {
            enablePageScroll();
            fixScrollLock(false);
            this.$store.dispatch("switchIsProducts", false);
            this.$store.dispatch("switchScrollDone", true);
          }, 500);
        }
      });
    },
    onWheel: throttle(function(e) {
      if (!_isScreenLg) return false;
      // Скролл к следующему/предыдущему блоку, если слайд крайний
      const { swiper } = this.$refs?.swiper?.$refs?.mySwiper;

      console.log(swiper);

      const { activeIndex, previousIndex, slides } = swiper;
      const firstIndex = 0;
      const lastIndex = slides.length - 1;
      const { pageYOffset } = window;
      const { scrollDone } = this.$store.state;

      // Чтобы не было случайной прокрутки крайнего слайда и перехода к блоку (при очень быстром скролле)
      if (
        previousIndex !== -1 &&
        (previousIndex !== firstIndex && previousIndex !== lastIndex) &&
        (activeIndex === firstIndex || activeIndex === lastIndex)
      ) {
        swiper.previousIndex = -1;
        return false;
      }

      // вверх
      if (activeIndex === firstIndex && scrollDone && e.deltaY < -10) {
        const { scrollHeight } = _$("#sectionProducts");
        this.scrollTo(pageYOffset - scrollHeight);
      }
      // вниз
      if (activeIndex === lastIndex && scrollDone && e.deltaY > 10) {
        this.scrollTo("#sectionPlaces");
      }
    }, 1000),
    handleSkipCarousel() {
      // скролл к следующему блоку (вниз)
      this.scrollTo("#sectionPlaces");
    }
  }
};
</script>

<style src="./Products.scss" lang="scss" scoped>
</style>