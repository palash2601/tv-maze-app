<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

import ShowsList from "@/components/ShowsList.vue";
import SearchInputVue from "@/components/SearchInput.vue";
import useShows from "@/composables/shows";
import { onMounted, ref, watch } from "vue";

const router = useRouter();
const route = useRoute();

const { isLoading, searchShows, showsByGenre, error, showsSearchResults } =
  useShows();
const searchStr = ref("");

onMounted(() => {
  searchShowsWithStr();
});

watch(() => route.query.search, searchShowsWithStr);

function searchShowsWithStr() {
  searchStr.value = route.query.search as string;
  if (searchStr.value) {
    searchShows(searchStr.value);
  }
}

function searchChangeHandler(val: string) {
  if (val) {
    router.push({
      name: "home",
      query: {
        search: val,
      },
    });
  }
}
</script>

<template>
  <SearchInputVue
    :value="searchStr"
    @search-change="searchChangeHandler"
  ></SearchInputVue>

  <section v-if="!error">
    <ShowsList
      v-if="searchStr"
      :shows="showsSearchResults"
      :isLoading="isLoading"
      :displayAsMultiRowList="true"
    >
    </ShowsList>
    <section v-else>
      <h2>Drama</h2>
      <ShowsList
        :shows="showsByGenre('Drama')"
        :isLoading="isLoading"
      ></ShowsList>
      <h2>Romance</h2>
      <ShowsList
        :shows="showsByGenre('Romance')"
        :isLoading="isLoading"
      ></ShowsList>
      <h2>Sports</h2>
      <ShowsList
        :shows="showsByGenre('Sports')"
        :isLoading="isLoading"
      ></ShowsList>
    </section>
  </section>
</template>
