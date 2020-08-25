<template lang="pug">
  div.page.modal.welcome(
    @click="onClick"
  )
    button.btn-back.js-modal-back(@click="onClick")
    .wrap-scroll(data-scroll-lock-scrollable)
      .wrap
        img.welcome_img(v-if="data.img" :src="data.img")
        Content.welcome_text(:htmlStr="data.text" :gallery="[]")
</template>

<script>
import {
  disablePageScroll,
  enablePageScroll
} from "scroll-lock";

import Content from "../_common/Page/Content/Content.vue";
import fixScrollLock from "../utils/fixScrollLock";

export default {
  components: {
    Content
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {},
  mounted() {
    if (_isScreenLg) {
      disablePageScroll();
      fixScrollLock(true, true, this.isProducts);
      this.$store.dispatch("switchModalActive", true);
    } else {
      document.body.style.overflow = "hidden";
    }
  },
  destroyed() {
    if (_isScreenLg) {
      enablePageScroll();
      fixScrollLock(false, true, this.isProducts);
      this.$store.dispatch("switchModalActive", false);
    } else {
      document.body.style.overflow = null;
    }
  },
  methods: {
    onClick(e) {
      const { currentTarget, target } = e;

      if (
        target === currentTarget ||
        target.classList.contains("wrap-scroll") ||
        target.classList.contains("btn-back")
      ) {
        this.$store.dispatch("disableShowWelcome");
        this.$store.dispatch("switchModalActive", false);
      }
    }
  }
};
</script>

<style src="../_common/Page/Page.scss" lang="scss" scoped>
</style>
<style src="./WelcomeModal.scss" lang="scss" scoped>
</style>
