<template lang="pug">
  #sectionEvents.events
    .parallax-events(ref="parallax")
      .parallax-events_wrap
        .duck
        .child.child--1
        .child.child--2
        .child.child--3.child--small

    .hero
      .logo
      .bg-pattern

    .card-list
      .wrap
        Card(
          v-for="item in items"
          :key="item.id"
          :card="item"
        )
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
      return this.$store.state.data.events;
    }
  },
  mounted() {
    if (_isScreenLg) {
      let smallDuckPlay = false;
      const sceneDucks = new this.$scrollmagic.Scene({
        triggerElement: "#sectionEvents .hero",
        // offset: 200,
        triggerHook: 0.2,
        duration: "50%"
      }).on("progress", event => {
        const { progress, scrollDirection } = event;

        const roundProgress = Math.round(progress * 10);
        const step = roundProgress === 0 ? 0 : roundProgress < 7 ? 15 : 100;

        const startPosX = _isScreenFhd ? "-15%" : "-25%";

        const duration = step !== 100 ? 1 : 1.5;

        this.$gsap.TweenLite.to(".parallax-events_wrap", duration, {
          x: step === 0 ? startPosX : `${step}%`,
          y: step === 0 ? `${step}%` : `${step + 15}%`,
          ease: "linear"
        });

        if (!smallDuckPlay && scrollDirection === "FORWARD" && step === 15) {
          this.$gsap.TweenLite.fromTo(
            ".parallax-events_wrap .child--small",
            duration,
            { x: -100, y: -50 },
            { x: 0, y: 0 }
          );

          smallDuckPlay = true;
        }

        if (step === 0) {
          smallDuckPlay = false;
        }
      });

      const scenePatternPlaces = new this.$scrollmagic.Scene({
        triggerElement: "#sectionEvents",
        triggerHook: 0.5
      }).setTween("#sectionPlaces .hero .bg-pattern", 0.8, {
        y: -150,
        ease: this.$gsap.Power4.easeOut
      });

      this.$scrollmagic.controller.addScene(sceneDucks);
      this.$scrollmagic.controller.addScene(scenePatternPlaces);
    } else {
      const { parallax } = this.$refs;
      const tl = new this.$gsap.TimelineLite();
      const tween = this.$gsap.TweenLite.to(parallax, 2, {
        x: "110%",
        y: "100%",
        // delay: 0.1,
        ease: "linear",
        force3D: true
      });

      tl.add(tween);

      const scene = new this.$scrollmagic.Scene({
        triggerElement: "#sectionEvents",
        triggerHook: 0.8,
        duration: 1000
      }).setTween(tl);

      this.$scrollmagic.controller.addScene(scene);
    }
  }
};
</script>

<style src="./Events.scss" lang="scss" scoped></style>
