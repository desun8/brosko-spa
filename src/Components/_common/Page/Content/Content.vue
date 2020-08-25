<template lang="pug">
  div
    .content(v-html="formateHtml(htmlStr, this.gallery)" @click="onOpenLightbox")
</template>

<script>
import Swiper from "swiper";
import replace from "./replace";

export default {
  props: {
    htmlStr: {
      required: true,
      type: String
    },
    gallery: {
      required: true,
      type: [Array, Object] // typeof null === Object :)
    }
  },
  mounted() {
    // Если есть инстаграм (вставка на страницу)
    // То вставляем его скрипт в HEAD страницы
    this.includeInstagramScript(this.htmlStr);

    const swiperElms = _$$(".page .swiper-container");
    const swiperOptions = {
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    };

    if (swiperElms.length > 0) {
      swiperElms.forEach(elm => {
        // инициализируем карусель
        new Swiper(elm, swiperOptions);
      });
    }
  },
  methods: {
    onOpenLightbox(e) {
      const { target } = e;
      // console.log("target:");
      // console.log(target);

      // console.log("target parent");
      // console.log(target.parentElement);

      // Находим и добавляем изображения для лайтбокса
      if (target.classList.contains("img")) {
        const sliderWrap = target.parentElement.parentElement;
        const imgElms = Array.from(sliderWrap.querySelectorAll(".img"));

        const getImages = () =>
          imgElms.map(elm => {
            const { imgSrc } = elm.dataset;

            return {
              thumb: imgSrc,
              src: imgSrc
            };
          });

        this.$store.dispatch("getLightboxImages", getImages());

        // Находим индекс изображения по которому кликнули и отображаем лайтбокс
        const { images, ref } = this.$store.state.lightbox;
        images.some((elm, index) => {
          if (elm.src === target.dataset.imgSrc) {
            ref.select = index;
            setTimeout(() => {
              ref.showImage(index);
            }, 200);

            return true;
          }
          return false;
        });

        // console.log("images src:");
        // console.log(this.lightbox.images);
      }
    },
    includeInstagramScript(html) {
      // Если скрипт уже вставлялся
      // То выполняем функцию
      if (_$("#instagram-embed") && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
        return null;
      }

      const match = html.match(/\/\/www.instagram.com\/embed\.js/);

      if (match === null) return null;

      const scriptTag = document.createElement("script");
      scriptTag.src = match[0];
      scriptTag.id = "instagram-embed";
      document.getElementsByTagName("body")[0].appendChild(scriptTag);
    },
    formateHtml(html, gallery) {
      if (gallery === null) return html;
      // если класса галереи нет, то возвращаем исходную html строку
      if (html.search("tgallery") === -1) return html;

      return replace(html, gallery);
    }
  }
};
</script>

<style src="./Content.scss" lang="scss" scoped>
</style>
