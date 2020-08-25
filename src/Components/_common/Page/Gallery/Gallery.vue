<template lang="pug">
    swiper(
      ref="gallery"
      :options="swiperOption"
    )
      //- slides
      swiper-slide(v-for="(item, index) in items" :key="index")
        img(:src="item" alt="Image")
        //- .img(:style="{backgroundImage: `url('${item})`}")
    
      //- Optional controls
      //- .swiper-pagination(slot="pagination")
</template>

<script>
// import { enablePageScroll } from "scroll-lock";
// import "swiper/dist/css/swiper.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";

// import Slide from "./Slide/Slide.vue";
import gImg1 from "../-test-gallery-1.png";

export default {
  components: {
    swiper,
    swiperSlide,
    // Slide
  },
  props: {
    items: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        direction: "horizontal",
        // effect: "fade",
        // fadeEffect: {
        //   crossFade: true
        // },
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true
        // },
        
      }
    };
  },
  // methods: {
  //   allowScroll() {
  //     enablePageScroll();
  //   }
  // }
};
</script>

<style lang="scss" scoped>
// .swiper-container {
//   height: 100%;
//   max-height: 100vh;
// }

// .swiper-slide {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .swiper-pagination {
//   left: 20px;
//   width: 10px;

//   @media (--mobileSm) {
//     left: 30px;
//   }
// }

.img {
  width: 100%;
  height: 200px;

  background-image: url('../-test-gallery-1.png') !important;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>

<style lang="scss">
// .swiper-pagination-bullet {
//   width: 10px;
//   height: 10px;
//   margin: 10px 0;

//   background: #fff;
//   opacity: 0.5;

//   &-active {
//     opacity: 1;
//   }
// }
</style>