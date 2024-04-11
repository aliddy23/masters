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
</script>
