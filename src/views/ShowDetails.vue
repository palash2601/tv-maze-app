<script setup lang="ts">
import { useRoute } from "vue-router";
import useShows from "@/composables/shows";

const route = useRoute();
const { show, fetchShow, isLoading } = useShows();

fetchShow(route.params.id as string);
</script>

<template>

  <h1 v-if="isLoading">Loading.....</h1>
  <div class="about" v-else-if="show">
    {{ show.name }}
    {{ show.language }}
    {{ show.summary }}
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
