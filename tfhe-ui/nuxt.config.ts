// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
      nitro: {
        experimental: {
          wasm: true
        }
      },
      sourcemap: {
        server: true,
        client: false,
      },
      modules: [
        '@nuxt/ui',
        [
          "@pinia/nuxt",
          {
            autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
          },
        ],
      ]

})
