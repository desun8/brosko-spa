<template lang="pug">
  div.vue-app(v-show="storeData" )
    router-link(to="/")
      .page-logo(ref="logo")
        Logo

    .info-nav.only-lg(
      v-if="contacts"
      :class="{'is-white': isProducts}"
    )
      a.phone(:href="`tel:${contacts.phone}`") {{contacts.phone}}
      a.insta(:href="contacts.instagram" target="_blank")
        svg(xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none")
          path(d="M4.354 22h13.292A4.36 4.36 0 0022 17.646V4.354A4.36 4.36 0 0017.646 0H4.354A4.36 4.36 0 000 4.354v13.292A4.36 4.36 0 004.354 22zM1.375 4.354a2.983 2.983 0 012.98-2.979h13.29a2.983 2.983 0 012.98 2.98v13.29a2.983 2.983 0 01-2.98 2.98H4.356a2.983 2.983 0 01-2.98-2.98V4.356z")
          path(d="M11 16.62c3.098 0 5.62-2.522 5.62-5.62 0-3.098-2.522-5.619-5.62-5.619a5.626 5.626 0 00-5.62 5.62c0 3.098 2.522 5.618 5.62 5.618zm0-9.864A4.249 4.249 0 0115.244 11 4.249 4.249 0 0111 15.244 4.249 4.249 0 016.756 11 4.249 4.249 0 0111 6.756z")
          path(d="M16.828 6.749c.904 0 1.585-.679 1.585-1.578 0-.938-.717-1.578-1.584-1.578-.904 0-1.585.679-1.585 1.578 0 .936.713 1.578 1.584 1.578zm.162-1.73c.29.257-.37.567-.37.153 0-.248.336-.183.37-.152z")
      a.vk(:href="urlVk" target="_blank")
        svg(xmlns="http://www.w3.org/2000/svg" width="23" height="13" fill="none")
          path(fill-rule="evenodd" d="M22.277.88c.157-.507 0-.88-.747-.88h-2.471c-.628 0-.918.322-1.075.677 0 0-1.256 2.969-3.036 4.897-.576.558-.838.736-1.152.736-.157 0-.392-.178-.392-.685V.88c0-.609-.174-.88-.698-.88H8.824c-.393 0-.629.283-.629.55 0 .578.89.71.982 2.335V6.41c0 .773-.144.913-.459.913-.837 0-2.874-2.981-4.083-6.393C4.398.268 4.161 0 3.53 0H1.059C.353 0 .212.322.212.677c0 .635.838 3.78 3.9 7.941C6.153 11.46 9.03 13 11.647 13c1.57 0 1.765-.342 1.765-.931V9.92c0-.684.149-.82.646-.82.366 0 .995.177 2.46 1.547C18.193 12.272 18.47 13 19.412 13h2.47c.706 0 1.06-.342.856-1.017-.223-.673-1.023-1.65-2.084-2.807-.576-.66-1.44-1.37-1.701-1.725-.367-.456-.262-.66 0-1.065 0 0 3.01-4.11 3.324-5.506z" clip-rule="evenodd")



    button.hamburger.hamburger--elastic(
      ref="hamburger"
      v-on="{ click: showFeedback ? handleToggleFeedback : handleToggleMenu }"
      :class="{'is-active': showMenu || showFeedback, 'top': showFeedback, 'is-white': isProducts, 'modal-active': isModalActive}"
      @mouseover="menuMouseOver"
      @mouseleave="menuMouseLeave"
      type="button"
    )
      .hamburger-box
        .hamburger-inner

    button#menuBtnFeedback.btn-feedback(
      @click="handleToggleFeedback('menu')"
      :class="{'is-active': showMenu}"
      type="button"
    )
      | Обратная связь

    Menu(
      :showMenu="showMenu"
      :handleToggleMenu="handleToggleMenu"
      :handleToggleFeedback="handleToggleFeedback"
    )

    Feedback(:showFeedback="showFeedback" :class="{'modal-active': isModalActive}")

    .fill-bg.only-lg(:class="{'is-active': showMenu || showFeedback, 'modal-active': isModalActive}")

    LightBox(ref="lightboxRef" :images="lightbox.images" :showThumbs="lightbox.showThumbs" :showLightBox="false")

    router-view(
      v-if="storeData"
      :handleToggleFeedback="handleToggleFeedback"
      :class="{'is-menu-show': showMenu || showFeedback}"
    )
</template>

<script>
import { throttle } from "lodash";
import {
  disablePageScroll,
  enablePageScroll,
  addFillGapTarget,
  getPageScrollBarWidth
} from "scroll-lock";

import fixScrollLock from "./Components/utils/fixScrollLock";

import LightBox from "vue-image-lightbox";
import "vue-image-lightbox/dist/vue-image-lightbox.min.css";

import Menu from "./Components/Menu/Menu.vue";
import Feedback from "./Components/Feedback/Feedback.vue";
import Logo from "./Logo.vue";

export default {
  components: {
    LightBox,
    Menu,
    Feedback,
    Logo
  },
  data() {
    return {
      showMenu: false,
      showFeedback: false,
      isModal: false,
      urlVk: "https://vk.com/broskomarket"
    };
  },
  computed: {
    scrollLock() {
      return this.showMenu || this.showFeedback;
    },
    storeData() {
      return this.$store.state.data;
    },
    contacts() {
      return this.storeData?.contacts[0];
    },
    isProducts() {
      return this.$store.state.isProducts;
    },
    isModalActive() {
      return this.$store.state.modalActive;
    },
    lightbox() {
      return this.$store.state.lightbox;
    }
  },
  watch: {
    scrollLock(val) {
      if (val) {
        disablePageScroll();
      } else {
        enablePageScroll();
      }
    },
    showFeedback(val) {
      // Только для адаптива
      // Высчитываем высоту видимой области
      // Нужно для того, чтобы габургер переносился вверх корректно при откротой форме на ios
      if (val === true && !_isScreenLg) {
        let vh = window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
    },
    // Убираем прелодер
    storeData(val) {
      if (val !== null) {
        _$("#preloader")?.classList.add("is-hidden");
      }
    }
  },
  methods: {
    handleToggleMenu: throttle(function(e) {
      this.showMenu = !this.showMenu;

      !this.isProducts && fixScrollLock(this.showMenu);

      if (!this.showMenu) {
        if (_isScreenLg) {
          e.target.classList.add("hover");
        }
      }
    }, 800),
    handleToggleFeedback(tag = "menu") {
      if (this.showFeedback) {
        this.showFeedback = false;
        this.showMenu = false;
        !this.isProducts && fixScrollLock(this.showMenu);
      } else {
        // Меняем тег ФОС
        this.$store.state.formTag !== tag &&
          this.$store.dispatch("changeFormTag", tag);

        this.showFeedback = true;
      }
    },
    menuMouseOver(e) {
      if (_isScreenLg) {
        const ct = e.currentTarget;

        if (this.showMenu) {
          ct.classList.remove("hover-rotate-back");
        } else {
          if (!ct.classList.contains("is-active")) {
            ct.classList.add("hover");
          }
        }
      }
    },
    menuMouseLeave(e) {
      if (_isScreenLg) {
        const ct = e.currentTarget;

        if (this.showMenu) {
          ct.classList.add("hover-rotate-back");
        } else {
          ct.classList.remove("hover");
        }
      }
    }
  },
  mounted() {
    if (!_isScreenLg) {
      const { logo } = this.$refs;
      const tween = this.$gsap.TweenLite.to(logo, 0.8, {
        y: -160,
        ease: this.$gsap.Power4.easeInOut,
        paused: true
      });

      let isHide = false;
      let start = null;

      const touchStart = throttle(e => {
        start = e.changedTouches[0];
      }, 200);
      const touchEnd = throttle(e => {
        let end = e.changedTouches[0];

        if (isHide && end.screenY - start.screenY > 10) {
          console.log("scroll up");
          isHide = false;
          !tween.isActive() && tween.reverse();
        }
        if (!isHide && end.screenY - start.screenY < -10) {
          console.log("scroll down");
          isHide = true;
          !tween.isActive() && tween.play();
        }
      }, 200);

      document.addEventListener("touchstart", touchStart);
      document.addEventListener("touchend", touchEnd);
    }

    this.$store.dispatch("getLightboxRef", this.$refs.lightboxRef);
  }
};
</script>

<style src="./App.scss" lang="scss" scoped></style>
<style lang="scss">
.vue-app {
  position: relative;
  z-index: 10;
}

.vue-lb-container {
  z-index: 99999999;
}
</style>
