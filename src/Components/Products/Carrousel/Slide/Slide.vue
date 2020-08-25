<template lang="pug">
  .slide
    .circle(:class="item.color")
      .circle-inner.circle-inner--1
      .circle-inner.circle-inner--2
      .circle-inner.circle-inner--3
      .circle-inner.circle-inner--4

    .content
      .sticker(
        :class="isSale ? 'sticker-sale' : item.sticker" :style="isSale && {backgroundColor: item.discount_color}"
        )
        span.sticker-sale_text(v-if="isSale") {{`-${item.discount_num}%`}}

      .img(
        :style="{backgroundImage: `url(../${item.img})`}"
      )
      .title {{item.name}}
        .price(v-if="isPrice")
          .price_old(v-if="item.old_price")
            i.large {{priceLarge(item.old_price)}}
            i.small {{priceSmall(item.old_price)}}
          .price_new(v-if="item.new_price")
            i.large {{priceLarge(item.new_price)}}
            i.small {{priceSmall(item.new_price)}}
      .desc {{item.short_desc}}
      router-link.more.only-sm(
        :to="{name: 'promotions', params: { slug: item.slug, data: item }}"
        :class="item.color"
        ) Подробнее

    router-link.more.only-lg(
        :to="{name: 'promotions', params: { slug: item.slug, data: item }}"
        ) Подробнее

    
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  computed: {
    isSale() {
      return this.item.discount_num !== null;
    },
    isPrice() {
      return this.item.new_price !== null;
    }
  },
  methods: {
    priceLarge(price) {
      const match = price.match(/[0-9]+/);
      return match !== null ? match[0] : null;
    },
    priceSmall(price) {
      const match = price.match(/\.[0-9]+/);
      return match !== null ? `${match[0]}₽` : null;
    }
  }
};
</script>

<style src="./Slide.scss" lang="scss" scoped>
</style>