<template lang="pug">
  div.inner-page(@click="onClick")
    simplebar.simplebar(
      v-if="isDesktop"
      data-simplebar-auto-hide="false"
      data-scroll-lock-scrollable
    )
      h2.modal-title {{routeName === 'buy-inner' ? "все продукты" : "все вакансии"}}
      .wrap
        Card-buy(v-if="routeName === 'buy-inner'" v-for="item in items" :key="item.id" :card="item")
        Card-job(v-if="routeName === 'job-inner'" v-for="item in items" :key="item.id" :card="item" :class="routeName")

        //- router-link.btn-back(to="/") Назад

    .wrap(v-else data-scroll-lock-scrollable)
      Card-buy(v-if="routeName === 'buy-inner'" v-for="item in items" :key="item.id" :card="item")
      Card-job(v-if="routeName === 'job-inner'" v-for="item in items" :key="item.id" :card="item" :class="routeName")

    router-link.btn-back.js-modal-back(to="/") Назад
</template>

<script>
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

import CardBuy from "../../Buy/Card/Card.vue";
import CardJob from "../../Job/Card/Card.vue";
import fixScrollLock from "../../utils/fixScrollLock";

export default {
  components: {
    simplebar,
    CardBuy,
    CardJob
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    items() {
      switch (this.routeName) {
        case "buy-inner":
          return this.$store.state.data.buy;
        case "job-inner":
          return this.$store.state.data.job;
        default:
          console.error("Неверный $route.name");
          return null;
      }
    },
    isDesktop() {
      return _isScreenLg;
    }
  },
  mounted() {
    disablePageScroll();
    fixScrollLock(true, true);
    if (_isScreenLg) {
      this.$parent.$refs.homePage.classList.add("is-blur");
    }
  },
  destroyed() {
    enablePageScroll();
    fixScrollLock(false, true);
    if (_isScreenLg) {
      this.$parent.$refs.homePage.classList.remove("is-blur");
    }
  },
  methods: {
    onClick(e) {
      if (_isScreenLg) {
        const { currentTarget, target } = e;
        if (
          target === currentTarget ||
          target.classList.contains("simplebar-content")
        ) {
          this.$router.push("/");
        }
      }
    }
  }
};
</script>

<style src="./PageInner.scss" lang="scss" scoped></style>
