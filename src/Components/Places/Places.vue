<template lang="pug">
  #sectionPlaces.places(ref="section")
    .hero
      .logo
      .bg-pattern

    .duck-places.only-lg

    .card-list(v-if="isDesktop")
        Card(
          v-for="(item, index) in items"
          :key="item.id"
          :card="item"
        )

    VerticalSimplebar(v-else)
      .card-list
        Card(
          v-for="item in items"
          :key="item.id"
          :card="item"
        )
    
    router-link.btn-to-top.only-lg(
      to="/"
      v-scroll-to="{el: '#sectionHero', onStart, onDone}"
    )
      span.text наверх
      svg.icon(xmlns="http://www.w3.org/2000/svg" width="14" height="30" fill="none")
        path(d="M13.528 6.84L7.365.173a.569.569 0 00-.816 0L.472 6.84a.558.558 0 00-.087.608c.093.22.26.33.504.33h3.889v21.667a.54.54 0 00.156.4.542.542 0 00.4.155h3.333a.54.54 0 00.399-.156.541.541 0 00.156-.399V7.778h3.89c.23 0 .398-.11.502-.33a.558.558 0 00-.086-.608z")
</template>

<script>
import VerticalSimplebar from "../_common/VerticalSimplebar/VerticalSimplebar.vue";
import Card from "./Card/Card.vue";
// import data from "./data.json";

export default {
  components: {
    VerticalSimplebar,
    Card
  },
  computed: {
    items() {
      return this.$store.state.data.places;
    },
    isDesktop() {
      return _isScreenLg;
    }
  },
  mounted() {
    // всегда должно быть 3 элемента
    if (_isScreenLg) {
      const cards = _$$("#sectionPlaces .card");
      const duck = _$$("#sectionPlaces .duck-places");

      const tl = new this.$gsap.TimelineLite();
      const tween1 = this.$gsap.TweenLite.to(cards[0], 1, { y: -100 });
      const tween2 = this.$gsap.TweenLite.to(cards[1], 1, { y: 50 });
      const tween3 = this.$gsap.TweenLite.to(cards[2], 1, { y: 200 });
      tl.add(tween1, 0)
        .add(tween2, 0)
        .add(tween3, 0);

      const scenePlaces = new this.$scrollmagic.Scene({
        triggerElement: "#sectionPlaces",
        triggerHook: 0,
        duration: 1000
      }).setTween(tl);

      const duckTween = this.$gsap.TweenLite.to(duck, 1, {
        x: -200
      });

      const sceneDuck = new this.$scrollmagic.Scene({
        triggerElement: "#sectionPlaces",
        triggerHook: 0,
        duration: 700
      }).setTween(duckTween);

      this.$scrollmagic.controller.addScene(scenePlaces);
      this.$scrollmagic.controller.addScene(sceneDuck);
    }
  },
  methods: {
    // scrollTo
    onStart() {
      this.$store.dispatch("switchIsScrollTo", true);
    },
    onDone() {
      this.$store.dispatch("switchIsScrollTo", false);
    }
  }
};
</script>

<style src="./Places.scss" lang="scss" scoped></style>