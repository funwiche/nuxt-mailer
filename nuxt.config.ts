// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [{ src: "/js/main.js", defer: true }],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: { baseURL: process.env.BASE_URL || "http://localhost:3000" },
    nodemailerConfig: {
      host: process.env.EMAIL_ADDRESS?.split("@")[1],
      port: 465, //587
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_SECRET,
      },
    },
  },
});
