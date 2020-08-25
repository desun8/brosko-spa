<template lang="pug">
  div
    WelcomeModal(
      v-if="showWelcome"
      :data="welcomeMessage"
    )

    //- ТОЛЬКО ДЛЯ ДЕСКТОПА
    //- Для блура основных блоков, когда вызван роут внутренней страницы раздела (там где отображается список всех доступных элементов)
    main(ref="homePage")
      Hero
      Buy
      Products
      Places
      Events
      Job
      Ticker
      Contacts(:handleToggleFeedback="handleToggleFeedback")
      Footer

      //- mode="out-in"
    transition(
      v-bind:css="false"
      mode="in-out"
      v-on:enter="animationEnter"
      v-on:leave="animationLeave"
    )
      router-view.modal(:handleToggleFeedback="handleToggleFeedback")
</template>>

<script>
import Hero from "./Components/Hero/Hero.vue";
import Buy from "./Components/Buy/Buy.vue";
import Products from "./Components/Products/Products.vue";
import Places from "./Components/Places/Places.vue";
import Events from "./Components/Events/Events.vue";
import Job from "./Components/Job/Job.vue";
import Contacts from "./Components/Contacts/Contacts.vue";
import Footer from "./Components/Footer/Footer.vue";

import Ticker from "./Components/Ticker/Ticker.vue";

import WelcomeModal from "./Components/WelcomeModal/WelcomeModal.vue";

export default {
  components: {
    Hero,
    Buy,
    Products,
    Places,
    Events,
    Job,
    Contacts,
    Footer,
    Ticker,
    WelcomeModal
  },
  props: {
    handleToggleFeedback: {
      required: true,
      type: Function
    }
  },
  data() {
    return {
      isInner: false
    };
  },
  computed: {
    welcomeMessage() {
      console.warn(this.$store.state.data.contacts);
      
      if (this.$store.state.data.contacts[0]?.welcome_text) {
        const {
          welcome_text,
          welcome_img
        } = this.$store.state.data.contacts[0];
        return { text: welcome_text, img: welcome_img };
      }

      this.$store.dispatch("disableShowWelcome");
      return false;
    },
    showWelcome() {
      return (
        this.welcomeMessage &&
        this.welcomeMessage.text &&
        this.$route.name === "home" &&
        this.$store.state.showWelcome
      );
    }
  },
  watch: {
    $route(to, from) {
      const nameFrom = from.name;
      if (nameFrom === "home") {
        return null;
      }

      const nameTo = to.name;
      this.isInner = nameTo.match(/inner/) !== null;
    }
  },
  methods: {
    animationEnter(el, done) {
      // Если true, то анимация идет слева направо, если нет - то наоборот
      const { isInner } = this;

      this.$gsap.TweenLite.from(el, 0.8, {
        x: !_isScreenLg && (isInner ? "-100%" : "100%"),
        autoAlpha: 0,
        zIndex: isInner && -9999,
        ease: this.$gsap.Power4.easeIn,
        onComplete: done
      });
    },

    animationLeave(el, done) {
      const { isInner } = this;

      const tl = new this.$gsap.TimelineLite({ paused: true });

      const tw = this.$gsap.TweenLite.from(el, 1, {
        zIndex: isInner && 9999
      });
      const tw2 = this.$gsap.TweenLite.to(el, 0.8, {
        x: !_isScreenLg && "100%",
        autoAlpha: isInner ? 1 : 0,
        ease: this.$gsap.Power4.easeOut,
        onComplete: done
      });

      tl.add(tw, 0).add(tw2, 0);
      tl.play();
    }
  }
};
</script>

<style lang="scss">
main {
  // filter: blur(0);
  transition: filter 0.8s ease-in-out;
  overflow: hidden;

  @media (--laptopMin) {
    overflow: visible;
  }

  &.is-blur {
    filter: blur(10px);
  }
}
</style>
