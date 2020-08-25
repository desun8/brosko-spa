<template lang="pug">
  #sectionFooter.footer(ref="footer")
    .logo

    .figure
      .road
      .pineapple
      .watermelon
      .grape
      .meat
      .fish.only-sm
      .cucumber.only-sm

    .bg-shadow

    .bg-pattern.only-lg
    .bg-pattern.bg-pattern--right.only-lg

    router-link.to-top.only-sm(
      to="/"
      v-scroll-to="{el: '#sectionHero', onStart, onDone}"
    )

    router-link.btn-to-top.only-lg(
      to="/"
      v-scroll-to="{el: '#sectionHero', onStart, onDone}"
    )
      span.text наверх
      svg.icon(xmlns="http://www.w3.org/2000/svg" width="14" height="30" fill="none")
        path(d="M13.528 6.84L7.365.173a.569.569 0 00-.816 0L.472 6.84a.558.558 0 00-.087.608c.093.22.26.33.504.33h3.889v21.667a.54.54 0 00.156.4.542.542 0 00.4.155h3.333a.54.54 0 00.399-.156.541.541 0 00.156-.399V7.778h3.89c.23 0 .398-.11.502-.33a.558.558 0 00-.086-.608z")


    .info
      .copyright.only-lg © 2019 All rights reserved.
      .wa
        a(href="https://web-alt.ru/" target="_blank")
          svg(xmlns="http://www.w3.org/2000/svg" width="180" height="90" fill="none")
            path(fill="#fff" fill-rule="evenodd" d="M23.864 56.92h5.086l2.875-2.924L34.7 56.92h5.067l-7.952-8.084-7.951 8.084zM9 39.5l8.568 16.82 5.187-5.018-6.2-9.823L9 39.5zm45.734-.002l-8.568 16.819-5.187-5.018 6.2-9.823 7.555-1.978zM31.818 33L23.27 44.725l2.281 3.844 6.267-6.178 6.267 6.178 2.282-3.844L31.818 33z" clip-rule="evenodd")
            path(fill="#fff" d="M68.178 48.88l-.862 1.541c-.213.377-.422.574-.63.59-.224.017-.448-.18-.671-.593l-3.027-5.515h1.354l2.344 4.375.842-1.575-1.53-2.8h1.346l2.35 4.379 2.378-4.379h1.342l-3.094 5.515c-.212.38-.421.577-.627.594-.224.016-.447-.181-.67-.593l-.845-1.54zM79.583 48.388h-3.437v-1.045h3.437v1.045zm-3.88 1.479h4.147v1.045h-5.192v-6.009h5.192v1.045h-4.147v3.919zM86.2 49.867c.384 0 .69-.072.92-.217.2-.129.3-.287.3-.477 0-.189-.103-.348-.31-.476-.222-.15-.526-.226-.91-.226h-2.818v-1.044h2.817c.385 0 .689-.078.912-.234.206-.14.31-.31.31-.51s-.101-.37-.302-.51c-.228-.15-.535-.225-.92-.225h-3.427v3.919h3.427zm1.597-1.922c.423.329.635.738.635 1.228 0 .468-.2.866-.602 1.195-.44.362-1.04.544-1.798.544h-4.305v-6.009h4.305c.758 0 1.357.187 1.798.56.401.335.602.743.602 1.228 0 .496-.212.914-.635 1.254zM99.01 49.242h-2.852l.637-1.044h1.592l-1.046-1.73-2.713 4.454h-1.346l3.261-5.432c.106-.173.242-.315.41-.426.144-.1.273-.153.384-.159.123-.011.26.03.41.126.173.111.318.264.434.46l3.195 5.431h-1.348l-1.017-1.68zM102.275 50.912v-6.009h1.045v4.964h4.139v1.045h-5.184zM111.965 45.948v4.964h-1.046v-4.964h-2.374v-1.045h5.786v1.045h-2.366zM120.639 48.388h-3.436v-1.045h3.436v1.045zm-3.879 1.479h4.147v1.045h-5.192v-6.009h5.192v1.045h-4.147v3.919zM129.77 50.912h-1.546l-1.68-1.689h-2.257V48.18h2.809c.49 0 .863-.12 1.12-.36a1 1 0 00.31-.802c-.039-.713-.515-1.07-1.43-1.07h-3.428v4.965h-1.045v-6.009h4.314c.909 0 1.597.22 2.065.66.396.369.603.854.619 1.455.016.474-.109.892-.376 1.255-.297.401-.726.677-1.29.827l1.815 1.812zM136.383 50.61l-3.855-3.871v4.173h-1.045V45.43c0-.162.041-.29.126-.385a.412.412 0 01.326-.142c.195 0 .393.104.593.31l3.855 3.86v-4.17h1.045v5.49c0 .385-.132.577-.393.577-.196 0-.413-.12-.652-.36zM144.699 49.242h-2.852l.637-1.044h1.591l-1.046-1.73-2.712 4.454h-1.346l3.261-5.432a1.36 1.36 0 01.409-.426c.146-.1.273-.153.385-.159.123-.011.259.03.41.126.173.111.318.264.434.46l3.194 5.431h-1.347l-1.018-1.68zM150.951 45.948v4.964h-1.045v-4.964h-2.375v-1.045h5.786v1.045h-2.366zM155.911 44.903h-1.045v6.009h1.045v-6.009zM162.165 50.418c-.24.38-.449.577-.627.594-.2.016-.427-.181-.677-.594l-3.352-5.515h1.35l2.681 4.461 2.705-4.46h1.348l-3.428 5.514zM171.706 48.388h-3.436v-1.045h3.436v1.045zm-3.879 1.479h4.148v1.045h-5.193v-6.009h5.193v1.045h-4.148v3.919z")

</template>

<script>
export default {
  mounted() {
    const { footer } = this.$refs;

    const tl = new this.$gsap.TimelineLite({ paused: true });

    if (_isScreenLg) {
      // TODO: только для большого экрана (1920). Надо добавить для лептопов
      const tween2 = this.$gsap.TweenLite.from(
        [".pineapple", ".watermelon", ".grape", ".meat"],
        1,
        { y: 1200, delay: 0.1 }
      );

      const tween3 = this.$gsap.TweenLite.from(".road", 1, {
        y: 700,
        delay: 0.5
      });

      const tween4 = this.$gsap.TweenLite.from(".bg-shadow", 1, {
        autoAlpha: 0,
        delay: 0.5,
        ease: this.$gsap.Power0.easeInOut
      });

      tl.add(tween2, 0)
        .add(tween3, 0)
        .add(tween4, 0);

      const scene = new this.$scrollmagic.Scene({
        triggerElement: footer,
        triggerHook: 0.1
      }).on("start", e => {
        if (e.scrollDirection === "FORWARD") {
          tl.play();
        } else {
          tl.reverse();
        }
      });

      const a = this.$gsap.TweenLite.to("#sectionContacts .bg-pattern", 1, {
        y: 100,
        autoAlpha: 0
      });

      const sceneHidePattern = new this.$scrollmagic.Scene({
        triggerElement: "#sectionContacts",
        triggerHook: -0.5
        // duration: 1000
      }).setTween(a);

      this.$scrollmagic.controller.addScene(scene);
      this.$scrollmagic.controller.addScene(sceneHidePattern);
    } else {
      const tween1 = this.$gsap.TweenLite.from([".fish", ".cucumber"], 1, {
        y: 300
      });

      const tween2 = this.$gsap.TweenLite.from(
        [".pineapple", ".watermelon", ".grape", ".meat"],
        1,
        { y: 500, delay: 0.1 }
      );

      const tween3 = this.$gsap.TweenLite.from(".road", 1, {
        y: 400,
        delay: 0.2
      });

      const tween4 = this.$gsap.TweenLite.from(".bg-shadow", 1, {
        autoAlpha: 0,
        delay: 0.5,
        ease: this.$gsap.Power0.easeInOut
      });

      tl.add(tween1, 0)
        .add(tween2, 0)
        .add(tween3, 0)
        .add(tween4, 0);

      const isSmMobile = window.matchMedia("(max-width: 22.6em)").matches;
      const scene = new this.$scrollmagic.Scene({
        triggerElement: footer,
        triggerHook: isSmMobile ? 0.2 : 0.3
      }).on("start", e => {
        if (e.scrollDirection === "FORWARD") {
          tl.play();
        } else {
          tl.reverse();
        }
      });

      this.$scrollmagic.controller.addScene(scene);
    }
  },
  methods: {
    // scrollTo
    onStart() {
      this.$store.dispatch("switchIsScrollTo", true);
    },
    onDone() {
      this.$store.dispatch("switchIsScrollTo", false);
    }
  }
};
</script>

<style src="./Footer.scss" lang="scss" scoped></style>
