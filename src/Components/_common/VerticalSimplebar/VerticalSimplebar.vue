<template lang="pug">
  .vertical-simplebar
    .scroll-title листайте вправо
    simplebar(data-simplebar-auto-hide="false")
      slot

</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  // props: {
  //   content
  // },
  components: {
    simplebar
  }
};
</script>

<style lang="scss">
.simplebar-track.simplebar-horizontal {
  @include bgImg("./img/scroll-bg.png", left center, contain);

  bottom: auto;

  top: -46px;
  left: 48%;

  width: 52%;
  height: 12px;

  overflow: visible;

  @media (--mobileSm) {
    left: 45%;
    width: 55%;
  }

  .simplebar-scrollbar {
    @include bgImg("./img/scroll-icon.svg", center, contain);

    top: -4px;
    width: 34px;
    height: 22px;

    &::before {
      content: none;
    }
  }
}

.vertical-simplebar {
  .scroll-title {
    @include em(16, 20);

    margin-bottom: 30px;
    padding-left: 10px;

    color: #b8b8b8;
    font-weight: 500;
    text-transform: uppercase;

    @media (--mobileSm) {
      @include em(18, 22);
    }
  }
}
</style>