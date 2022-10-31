<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from "vue-router";
import useShows from "@/composables/shows";

import ShowsList from '@/components/ShowsList.vue'
import SearchInputVue from "@/components/SearchInput.vue";


const router = useRouter();
const route = useRoute();
const { shows, fetchShows, isLoading } = useShows();

if (route.query.search) {
  fetchShows(route.query.search as string);
}

function searchChangeHandler(val: string) {
  router.push({
    name: 'home',
    query: {
      search: val,
    },
  })
}
</script>

<template>

  <SearchInputVue :value="(route.query.search as string)" @search-change="searchChangeHandler"></SearchInputVue>
  <ShowsList></ShowsList>

</template>
