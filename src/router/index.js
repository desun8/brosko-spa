import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../Home.vue";
// import BuyInner from "../Components/Buy/Inner/Inner.vue";

import Page from "../Components/_common/Page/Page.vue";
import PageInner from "../Components/_common/PageInner/PageInner.vue";


import FeedbackPage from "../Components/Feedback/FeedbackPage.vue";

import page404 from "../page404.vue";

Vue.use(VueRouter);

// const routes = [
//   { path: "/", name: "home", component: Home },
//   { path: "/buy", name: "buy-inner", component: BuyInner, props: true },
//   { path: "/buy/:slug", name: "buy", component: Page, props: true },
//   { path: "/places/:slug", name: "places", component: Page, props: true },
//   { path: "/events/:slug", name: "events", component: Page, props: true },
//   { path: "/job/:slug", name: "job", component: Page, props: true },
//   { path: "*", name: "404", component: page404 }
// ];

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "/buy",
        name: "buy-inner",
        component: PageInner,
        props: true
      },
      {
        path: "/buy/:slug",
        name: "buy",
        component: Page,
        props: true
      },
      {
        path: "/promotions/:slug",
        name: "promotions",
        component: Page,
        props: true
      },
      {
        path: "/places/:slug",
        name: "places",
        component: Page,
        props: true
      },
      {
        path: "/events/:slug",
        name: "events",
        component: Page,
        props: true
      },
      {
        path: "/job",
        name: "job-inner",
        component: PageInner,
        props: true
      },
      {
        path: "/job/:slug",
        name: "job",
        component: Page,
        props: true
      },
      {
        path: "/feedback",
        name: "feedback",
        component: FeedbackPage,
        props: true
      }
    ]
  },
  { path: "*", name: "404", component: page404 }
];

export default new VueRouter({
  // mode: "history",
  // base: __dirname,
  routes
});
