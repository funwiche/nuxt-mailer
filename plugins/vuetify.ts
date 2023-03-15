import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/scss/variables.scss";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
export default defineNuxtPlugin((nuxtApp) => {
  const theme = useCookie("theme");
  const device_mode = useCookie("device_mode");
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: theme.value || device_mode.value || "light",
      themes: {
        dark: {
          dark: true,
          colors: {
            background: "#000000",
            surface: "#2C2C2E",
            primary: "#E9E9EA",
            accent: "#8F8F94",
            secondary: "#1C1C1E",
            info: "#0C66C2",
            success: "#00BA7C",
            warning: "#FF8E00",
            error: "#D9000C",
            card: "#1C1C1E",
          },
        },
        light: {
          dark: false,
          colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            primary: "#161616",
            accent: "#8F8F94",
            secondary: "#F2F2F7",
            info: "#0C66C2",
            success: "#00BA7C",
            warning: "#FF8E00",
            error: "#D9000C",
            card: "#FFFFFF",
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
