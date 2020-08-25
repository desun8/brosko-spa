<template lang="pug">
  router-link.card(
    :to="{ name: 'job', params: { slug: card.slug, data: card }}"
    :style="{backgroundColor: card.color}"
  )
    .bg(:style="{backgroundImage: `url(../${card.img})`}")
    span.icon
      object(
        :data="`../${card.icon}`"
        :style="{opacity: 0}"
        onload="this.before((this.contentDocument.body || this.contentDocument).children[0]);this.remove()"
      )
    h4.title {{card.name}}
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
};
</script>

<style src="./Card.scss" lang="scss" scoped />