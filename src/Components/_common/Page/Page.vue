<template lang="pug">
  div(
    v-if="item"
    @click="onClick"
    :class="routeName"
    class="page"
  )
    .wrap-scroll(data-scroll-lock-scrollable)
      router-link.btn-back.js-modal-back.only-lg(to="/")
      .wrap
        .header-title(:style="{backgroundColor: item.color}")
          .img(:style="{backgroundImage: `url(../${item.img || item.img_2})`}")
          .img-food(v-if="routeName === 'places'" :style="{backgroundImage: `url(../${item.img_1})`}")
          span.date(v-if="item.date") {{formateDate(item.date)}}
          h1.name(:style="{backgroundColor: item.color}") {{item.name}}
          span.full-name.only-lg(v-if="item.full_name") {{item.full_name}}

        a.link-360(
          v-if="item.link"
          :href="item.link"
          :style="{backgroundColor: item.color}"
          target="_blank"
        ) Обзор 360

        //- если страница вакансии
        div(v-if="routeName === 'job'")
          .job-list.job-list--duties
            h2.title Обязанности:
            div.list(v-html="item.duties")
          .job-list.job-list--requirements
            h2.title Требования:
            div.list(v-html="item.requirements")

          button.show-feedback(
            @click="showFeedback"
            type="button"
          ) Откликнуться
          //- Десктоп
          router-link.route-link.route-link--job.only-lg(
            to="/job"
          )
            | все вакансии
            svg(xmlns="http://www.w3.org/2000/svg" width="19" height="33" fill="none")
              path(d="M.095 16.5c0-.591.225-1.183.676-1.634L14.961.677a2.311 2.311 0 113.268 3.268L5.673 16.5l12.555 12.555a2.31 2.31 0 11-3.268 3.268L.77 18.133A2.304 2.304 0 01.096 16.5z")

        //- если любая другая
        Content(v-else :htmlStr="item.desc" :gallery="item.gallery")


        //- Только если это внутренняя "Что купить"
        router-link.route-link.route-link--buy(v-if="routeName === 'buy'" to="/buy")
          | {{isDesktop ? "показать все" : "все места"}}
          svg(xmlns="http://www.w3.org/2000/svg" width="19" height="33" fill="none")
            path(d="M.095 16.5c0-.591.225-1.183.676-1.634L14.961.677a2.311 2.311 0 113.268 3.268L5.673 16.5l12.555 12.555a2.31 2.31 0 11-3.268 3.268L.77 18.133A2.304 2.304 0 01.096 16.5z")
        
        //- Только если это внутренняя "Вакансии"
        router-link.route-link.route-link--job.only-sm(v-if="routeName === 'job'" to="/job")
          | к списку
          svg(xmlns="http://www.w3.org/2000/svg" width="19" height="33" fill="none")
            path(d="M.095 16.5c0-.591.225-1.183.676-1.634L14.961.677a2.311 2.311 0 113.268 3.268L5.673 16.5l12.555 12.555a2.31 2.31 0 11-3.268 3.268L.77 18.133A2.304 2.304 0 01.096 16.5z")

        router-link.route-link.only-sm(to="/")
          | на главную
          svg(xmlns="http://www.w3.org/2000/svg" width="19" height="33" fill="none")
            path(d="M.095 16.5c0-.591.225-1.183.676-1.634L14.961.677a2.311 2.311 0 113.268 3.268L5.673 16.5l12.555 12.555a2.31 2.31 0 11-3.268 3.268L.77 18.133A2.304 2.304 0 01.096 16.5z")
</template>

<script>
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import moment from "moment";

import Content from "./Content/Content.vue";
import fixScrollLock from "../../utils/fixScrollLock";

export default {
  components: {
    Content
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    handleToggleFeedback: {
      required: true,
      type: Function
    }
  },
  computed: {
    routeName() {
      return this.$route.name;
    },

    item() {
      if (this.data) return this.data;

      // получаем данные апи по названию свойства
      // навзвание свойства в стейте === названию роута
      const state = this.$store.state.data[this.routeName];

      if (state) {
        const { slug } = this.$route.params;
        let result = null;
        state.some(e => {
          if (e.slug === slug) {
            result = e;
            return true;
          }

          return false;
        });

        if (result) return result;
      }

      // если в стейте нет такого свойства или урл не совпадают
      // то возращаем null
      return null;
    },

    isProducts() {
      return this.$store.state.isProducts;
    },

    isDesktop() {
      return _isScreenLg;
    }
  },
  watch: {
    item(val) {
      // если не удалось найти данные подходящие под путь
      // отображаем страницу 404
      val === null && this.$router.push("/404");
    }
  },
  mounted() {
    if (_isScreenLg) {
      disablePageScroll();
      fixScrollLock(true, true, this.isProducts);
      this.$store.dispatch("switchModalActive", true);
    }

    // Устанавливаем в стор название вакансии
    console.log(this.routeName);
    this.routeName === "job" &&
      this.$store.dispatch("getVacancy", this.item.name);
  },
  destroyed() {
    if (_isScreenLg) {
      enablePageScroll();
      fixScrollLock(false, true, this.isProducts);
      this.$store.dispatch("switchModalActive", false);
    }
  },
  methods: {
    onClick(e) {
      if (_isScreenLg) {
        const { currentTarget, target } = e;

        if (
          target === currentTarget ||
          target.classList.contains("wrap-scroll")
        ) {
          this.$router.push("/");
        }
      }
    },
    showFeedback() {
      this.handleToggleFeedback("vacancy");
      
    },
    formateDate(date) {
      return moment(date).format("D MMMM");
    }
  }
};
</script>

<style src="./Page.scss" lang="scss" scoped>
</style>
