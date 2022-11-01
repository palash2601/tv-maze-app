<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from "vue-router";


import ShowsList from '@/components/ShowsList.vue'
import SearchInputVue from "@/components/SearchInput.vue";
import useShows from "@/composables/shows";
import { onErrorCaptured, watch } from "vue";


const router = useRouter();
const route = useRoute();

const { isLoading, searchShows, hasMoreShows,
  loadMoreShows, showsCount, showsByGenre, error, showsSearchResults } = useShows();

if (route.query.search) {
  searchShows(route.query.search as string);
} else {
  if (showsCount.value === 0) {
    loadMoreShows();
  }
}

watch(() => route.query.search, () => {
  if (route.query.search) {
    searchShows(route.query.search as string);
  }

})


function searchChangeHandler(val: string) {
  if (val) {
    router.push({
      name: 'home',
      query: {
        search: val,
      },
    })
  }

}
</script>

<template>

  <SearchInputVue :value="(route.query.search as string)" @search-change="searchChangeHandler"></SearchInputVue>

  <p v-if="error">Something went wrong</p>
  <section v-else>
    <ShowsList v-if="route.query.search" :shows="showsSearchResults" :isLoading="isLoading" :hasMoreShows="hasMoreShows"
      @load-more="loadMoreShows"></ShowsList>
    <h2>Drama</h2>
    <ShowsList :shows="showsByGenre('Drama')" :isLoading="isLoading" :hasMoreShows="hasMoreShows"
      @load-more="loadMoreShows"></ShowsList>
    <h2>Romance</h2>
    <ShowsList :shows="showsByGenre('Romance')" :isLoading="isLoading" :hasMoreShows="hasMoreShows"
      @load-more="loadMoreShows"></ShowsList>

  </section>

</template>
