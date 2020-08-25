<template lang="pug">
    #sectionContacts.contacts
      .hero
        .logo
        .bg-pattern

      .duck-move.only-sm
        .path
        .duck

      .content
        .wrap
          .info
            a.info_item(:href="`tel:${item.phone}`")
              .icon.icon--phone
                svg
                  use(xlink:href="./img/sprite.symbol.svg#icon-phone")

              .name номер
              span {{item.phone}}
            a.info_item(:href="`mailto:${mail}`")
              .icon.icon--mail
                svg
                  use(xlink:href="./img/sprite.symbol.svg#icon-mail")
              .name почта
              span {{mail}}
            a.info_item(:href="item.instagram" target="_blank")
              .icon.icon--insta
                svg
                  use(xlink:href="./img/sprite.symbol.svg#icon-insta")
              .name инстаграм
              span {{instaName}}

          #map.map

          .feedback
            h2.title.only-lg Хотите связаться с нами?
              //- | <br/><span class="sec-title">Кто посетит Броско Молл!</span>
            router-link.show-feedback(
              to="feedback"
            )
              span.only-sm Связаться с нами
              span.only-lg Написать
</template>

<script>
import mapIcon from "./img/map-marker.svg";

export default {
  props: {
    handleToggleFeedback: {
      required: true,
      type: Function
    }
  },
  data() {
    return {
      phone: "8 000 000-00-00",
      mail: "info@broskomarket.com",
      insta: { url: "https://vuejs.org/", name: "@brosko" }
    };
  },
  computed: {
    item() {
      // console.warn(this.$store.state.data.contacts);
      return this.$store.state.data.contacts[0];
    },
    instaName() {
      const match = this.item.instagram.match(/www.instagram.com\/([\s\S]+)\//);

      if (match !== null) return `@${match[1]}`;

      return this.item.instagram;
    }
  },
  mounted() {
    // yandex map
    const init = () => {
      const myMap = new ymaps.Map("map", {
        center: [this.item.geo_lat, this.item.geo_lon],
        zoom: 15
        // controls: []
      });

      const coords = [this.item.geo_lat, this.item.geo_lon];
      const icon = {
        iconLayout: "default#image",
        // iconImageHref: "/images/map-marker.png",
        iconImageHref: mapIcon,
        iconImageSize: [52, 38],
        iconImageOffset: [-16, -12]
      };

      const myPlacemark = new ymaps.Placemark(coords, {}, icon);
      myMap.geoObjects.add(myPlacemark);
    };

    typeof ymaps !== "undefined" && ymaps.ready(init);

    // Анимация в контактах (срабатывает только 1 раз)
    if (!_isScreenLg) {
      const tl = new this.$gsap.TimelineLite({ paused: true, delay: 0.2 });

      const tweenMove = this.$gsap.TweenLite.to(
        "#sectionContacts .duck-move",
        1.8,
        {
          x: "110%",
          y: 300
        }
      );

      const tweenRotate = this.$gsap.TweenMax.to(
        "#sectionContacts .duck",
        1.8,
        {
          rotation: 225,
          force3D: true
        }
      );

      const tweenMoveUp = this.$gsap.TweenLite.from(
        "#sectionContacts .content",
        1.2,
        { y: 100 }
      );

      tl.add(tweenMove, 0)
        .add(tweenRotate, 0)
        .add(tweenMoveUp, "-=0.5");

      // const scene = new this.$scrollmagic.Scene({
      //   triggerElement: "#sectionContacts",
      //   offset: 100,
      //   triggerHook: 0.2
      // }).setTween(tl);

      // this.$scrollmagic.controller.addScene(scene);

      const observer = new IntersectionObserver(
        entries => {
          // Если идет переход по навигации, то блок не фиксируется
          if (entries[0].isIntersecting === true) {
            tl.play();
          }
        },
        { threshold: [0.4] }
      );

      observer.observe(_$("#sectionContacts"));
    }
  }
};
</script>

<style src="./Contacts.scss" lang="scss" scoped>
</style>
