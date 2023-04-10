<template>
  <v-app style="background: #121212">
    <v-main>
      <Stream v-if="user" />
      <Login v-else />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Stream from "./views/Stream.vue";
import Login from "./views/Login.vue";

let user = ref(true);

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();
</script>

<style></style>
