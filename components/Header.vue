<template>
  <header style="position: sticky; top: 0; z-index: 99">
    <v-card
      flat
      rounded="0"
      height="65"
      color="background"
      class="border-b px-4 d-flex align-center"
    >
      <div class="text-h6 font-weight-black">Nuxt3 Vuetify.js</div>
      <v-spacer />
      <v-btn
        v-if="isDark"
        icon="mdi-lightbulb-on-outline"
        @click="theme = 'light'"
        variant="text"
      />
      <v-btn
        v-else
        icon="mdi-weather-night"
        variant="text"
        @click="theme = 'dark'"
      />
    </v-card>
  </header>
</template>

<script setup>
import { useTheme } from "vuetify";
const vuetifyTheme = useTheme();
const theme = useCookie("theme");
const device_mode = useCookie("device_mode");
const isDark = computed(() =>
  theme.value ? theme.value === "dark" : device_mode.value === "dark"
);
watch(theme, (val) => {
  val = val || device_mode.value;
  vuetifyTheme.global.name.value = val;
  document.documentElement.setAttribute("data-mode", val);
  document.documentElement.style.setProperty("color-scheme", val);
});
</script>

<style lang="scss" scoped></style>
