<template lang="pug">
  router-link.card(:to="{ name: 'buy', params: { slug: card.slug, data: card }}")
    .bg-img(:style="{backgroundImage: `url(../${card.img})`}")
    h4.title(:style="{backgroundColor: card.color}") {{card.name}}
    .icon-arrow
</template>

<script>
export default {
  props: {
    card: {
      required: true,
      type: Object
    }
  }
}
</script>

<style src="./Card.scss" lang="scss" scoped />
