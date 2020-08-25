<template lang="pug">
  .menu-wrap(:class="{'show-menu': showMenu}")
    .scroll-wrap(
      data-scroll-lock-scrollable
      data-scroll-lock-fill-gap
    )
      .logo.only-lg

      nav.menu
        router-link.menu_item(
          v-for="menu in menuItems"
          :key="menu.anchor"
          v-scroll-to="{el: menu.anchor, onStart, onDone}"
          @click.native="handleToggleMenu"
          to="/"
        )
          | {{menu.name}}

    #morph-shape.morph-shape(
      ref="morphShape"
      data-morph-open="M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z"
    )
      svg(
        ref="morphShapeSvg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 800"
        preserveAspectRatio="none"
      )
        path(
          ref="morphShapeSvgPath"
          d="M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z"
        )

    //- TODO: добавить ТОЛЬКО для десктопа
    button.btn-feedback.only-lg(
      @click="handleToggleFeedback('menu')"
    )
      | Обратная связь
</template>

<script>
import { enablePageScroll } from "scroll-lock";
import morphAnimation from "../utils/morphAnimation";
import data from "./data.json";

export default {
  props: {
    showMenu: {
      required: true,
      type: Boolean
    },
    handleToggleMenu: {
      required: true,
      type: Function
    },
    handleToggleFeedback: {
      required: true,
      type: Function
    }
  },
  data() {
    return {
      menuItems: data.menu
    };
  },
  computed: {
    // анимация появления/скрытия меню
    toggleActive() {
      return morphAnimation(this.$refs.morphShape, this.$refs.morphShapeSvg, !this.showMenu);
    }
  },
  watch: {
    // если значение меняется, проигрываем анимацию
    showMenu(curr, prev) {
      if (curr !== prev) {
        this.toggleActive();
      }
    }
  },
  methods: {
    // scrollTo
    onStart() {
      this.$store.dispatch("switchIsScrollTo", true);
    },
    onDone() {
      this.$store.dispatch("switchIsScrollTo", false);
      enablePageScroll();
    }
  }
};
</script>

<style src="./Menu.scss" lang="scss" scoped></style>