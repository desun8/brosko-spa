<template lang="pug">
    swiper(
      ref="mySwiper"
      :options="swiperOption"
    )
      //- slides
      swiper-slide(v-for="item in items" :key="item.id")
        Slide(:item="item")

      //- Optional controls
      .swiper-pagination(slot="pagination")
      span.help-text.only-sm листайте
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

import Slide from "./Slide/Slide.vue";

export default {
  components: {
    swiper,
    swiperSlide,
    Slide
  },
  data() {
    return {
      swiperOption: {
        direction: _isScreenLg ? "vertical" : "horizontal",
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        mousewheel: {
          sensitivity: 1000
        }
      }
    };
  },
  computed: {
    items() {
      return this.$store.state.data.products;
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;
  max-height: 100vh;
  // overflow: hidden !important;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination {
  top: 110px;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10px;

  @media (--mobileSm) {
    top: 120px;
  }

  @media (--mobileX) {
    top: 155px;
  }

  @media (--laptopMin) {
    left: 62px;
    display: block;
    width: 10px;
    height: auto;
  }

  /deep/ .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    margin: 0 5px;

    background: #fff;
    opacity: 0.5;

    @media (--laptopMin) {
      margin: 10px 0;
    }

    &-active {
      opacity: 1;
    }
  }
}

.help-text {
  @include em(16, 20);

  position: absolute;
  top: 85px;
  width: 100%;
  color: #fff;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  opacity: 0.7;

  @media (--mobileSm) {
    top: 95px;
  }

  @media (--mobileX) {
    top: 130px;
  }
}
</style>
