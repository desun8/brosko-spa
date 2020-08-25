<template lang="pug">
  #sectionJob.job
    .hero
      .logo
      .bg-pattern
      .duck-waka.only-lg(ref="duckWaka")
        .duck-waka_wrap
          .duck
          .text
            .text_word Вака
            .text_word Вака

    .card-list
      .wrap
        Card(
          v-for="item in filterItems"
          :key="item.id"
          :card="item"
        )

        router-link.btn-more(:to="{ name: 'job-inner', params: { url: 'job', data: items }}") Все вакансии
</template>

<script>
import Card from "./Card/Card.vue";
// import data from "./data.json";

export default {
  components: {
    Card
  },
  computed: {
    items() {
      return this.$store.state.data.job;
    },
    filterItems() {
      const maxItems = _isScreenLg ? 8 : 4;
      return this.items.filter((elm, index) => index < maxItems);
    }
  },
  mounted() {
    if (_isScreenLg) {
      const { duckWaka } = this.$refs;
      const words = Array.from(duckWaka.querySelectorAll(".text_word"));

      const tl = new this.$gsap.TimelineLite();

      const duckTween = this.$gsap.TweenLite.from(".duck-waka_wrap", 1, {
        y: 440,
        rotation: -180,
        delay: 1
      });

      tl.add(duckTween);

      words.forEach(elm => {
        const tween = this.$gsap.TweenLite.from(elm, 0.5, {
          x: -20,
          autoAlpha: 0
        });

        tl.add(tween);
      });

      const sceneDuck = new this.$scrollmagic.Scene({
        triggerElement: "#sectionJob",
        triggerHook: 0
      }).setTween(tl);

      this.$scrollmagic.controller.addScene(sceneDuck);
    }
  }
};
</script>

<style src="./Job.scss" lang="scss" scoped></style>