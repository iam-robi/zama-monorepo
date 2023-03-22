// following this example https://github.com/productdevbook/oku-nuxt3-template/tree/master/src
import { defineStore } from "pinia";
import { useNuxtApp, useRuntimeConfig } from "#app";
import { KeysState } from "./keys.types";


export const useKeys = defineStore("keys", {
  state: (): KeysState => ({
    cks: null,
    sks: null,
    serialized_cks: null, 
    serialized_sks: null,
  }),
  actions: {
    async writeToFile() {

    }
  },
  getters: {
  
  },
});
