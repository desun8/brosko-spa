<template lang="pug">
  router-link.card(
    :to="{name: 'places', params: { slug: card.slug, data: card }}"
    :style="{backgroundColor: card.color}"
  )
    .bg(:style="{backgroundImage: `url(../${card.img_2})`}")
    .img(:style="{backgroundImage: `url(../${card.img_1})`}")

    h4.title {{card.name}}
    span.desc {{card.full_name}}
</template>

<script>
export default {
  props: {
    card: {
      required: true,
      type: Object
    }
  }
};
</script>

<style src="./Card.scss" lang="scss" scoped></style>
