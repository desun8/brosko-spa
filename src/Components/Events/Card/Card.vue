<template lang="pug">
  router-link.card(:to="{ name: 'events', params: { slug: card.slug, data: card }}")
    .bg(:style="{backgroundImage: `url(../${card.img})`}")
    .text
      span.date {{formateDate(card.date)}}
      h4.title {{card.name}}
    .icon
</template>

<script>
import moment from "moment";

moment.locale("ru");

export default {
  props: {
    card: {
      required: true,
      type: Object
    }
  },
  methods: {
    formateDate(date) {
      return moment(date).format("D MMMM");
    }
  }
};
</script>

<style src="./Card.scss" lang="scss" scoped />