<template lang="pug">
  div.inner-page
    simplebar.simplebar(
      v-if="isDesktop"
      data-simplebar-auto-hide="false"
      data-scroll-lock-scrollable
    )
      .wrap
        Card(v-for="item in items" :key="item.id" :card="item")

        router-link.btn-back(to="/") Назад

    .wrap(v-else data-scroll-lock-scrollable)
      Card(v-for="item in items" :key="item.id" :card="item")
      router-link.btn-back(to="/") Назад
</template>

<script>
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

import Card from "../Card/Card.vue";

export default {
  components: {
    simplebar,
    Card
  },
  computed: {
    items() {
      return this.$store.state.data.buy;
    },
    isDesktop() {
      return _isScreenLg;
    }
  },
  mounted() {
    disablePageScroll();
    if (_isScreenLg) {
      this.$parent.$refs.homePage.classList.add("is-blur");
    }
  },
  destroyed() {
    enablePageScroll();
    if (_isScreenLg) {
      this.$parent.$refs.homePage.classList.remove("is-blur");
    }
  }
};
</script>

<style src="./Inner.scss" lang="scss" scoped></style>