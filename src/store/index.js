import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import jsonBuy from "../_apiData/dataBuy.json";
import jsonPlaces from "../_apiData/dataPlaces.json";
import jsonEvents from "../_apiData/dataEvents.json";
import jsonJob from "../_apiData/dataJob.json";
import jsonContacts from "../_apiData/dataContacts.json";
import jsonProducts from "../_apiData/dataProducts.json";

Vue.use(Vuex);

const testAxios = data =>
new Promise((resolve, reject) => {
  resolve(data);
});

const form = {
  tag: "menu",
  vacancy: null
};
const status = {
  isScrollTo: false,
  scrollDone: true,
  isProducts: false,
  modalActive: false,
  showWelcome: false
};

export default new Vuex.Store({
  state: {
    data: null,
    formTag: "menu",
    vacancy: null,
    isScrollTo: false,
    scrollDone: true,
    isProducts: false,
    modalActive: false,
    showWelcome: false,
    lightbox: {
      images: [],
      showThumbs: false,
      ref: null
    }
  },
  mutations: {
    setData(state, payload) {
      // console.warn(payload);
      state.data = payload;
    },
    setFormTag(state, payload) {
      state.formTag = payload;
    },
    setVacancy(state, payload) {
      state.vacancy = payload;
    },
    setScrollTo(state, payload) {
      state.isScrollTo = payload;
    },
    setScrollDone(state, payload) {
      state.scrollDone = payload;
    },
    setProducts(state, payload) {
      state.isProducts = payload;
    },
    setModalActive(state, payload) {
      state.modalActive = payload;
    },
    setShowWelcome(state, payload) {
      state.showWelcome = payload;
    },
    setLightboxImages(state, payload) {
      state.lightbox.images = payload;
    },
    setLightboxRef(state, payload) {
      state.lightbox.ref = payload;
    }
  },
  actions: {
    async getData({ state, commit }, local = false) {
      try {
        if (local) {
          // тестовый данные, для разработки фронта
          const buy = await testAxios(jsonBuy);
          const products = await testAxios(jsonProducts);
          const places = await testAxios(jsonPlaces);
          const events = await testAxios(jsonEvents);
          const job = await testAxios(jsonJob);
          const contacts = await testAxios(jsonContacts);

          commit("setData", {
            buy: buy.data,
            products: products.data,
            places: places.data,
            events: events.data,
            job: job.data,
            contacts: contacts.data,
          });
        } else {
          // данные с сервера, для прода
          const buy = await axios.get("/api/v1/goods");
          const products = await axios.get("/api/v1/promotions");
          const places = await axios.get("/api/v1/places");
          const events = await axios.get("/api/v1/events");
          const job = await axios.get("/api/v1/vacancies");
          const contacts = await axios.get("/api/v1/contacts");
          
          commit("setData", {
            buy: buy.data.data,
            products: products.data.data,
            places: places.data.data,
            events: events.data.data,
            job: job.data.data,
            contacts: contacts.data.data
          });
        }
      } catch (error) {
        commit("setData", null);
      }
    },
    changeFormTag({ state, commit }, tag) {
      switch (tag) {
        case "menu":
        case "footer":
        case "vacancy":
        commit("setFormTag", tag);
        break;
        default:
        commit("setFormTag", "menu");
        break;
      }
    },
    getVacancy({ state, commit }, vacancy) {
      commit("setVacancy", vacancy);
    },
    switchIsScrollTo({ state, commit }, bool) {
      commit("setScrollTo", bool);
    },
    switchScrollDone({ state, commit }, bool) {
      commit("setScrollDone", bool);
    },
    switchIsProducts({ state, commit }, bool) {
      commit("setProducts", bool);
    },
    switchModalActive({ state, commit }, bool) {
      commit("setModalActive", bool);
    },
    disableShowWelcome({ state, commit }) {
      commit("setShowWelcome", false);
    },
    getLightboxImages({ state, commit }, images) {
      commit("setLightboxImages", images);
    },
    getLightboxRef({ state, commit }, ref) {
      commit("setLightboxRef", ref);
    }
  }
});
