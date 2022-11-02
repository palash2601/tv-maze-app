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
      name: "dashboard",
      query: {
        search: val,
      },
    });
  }
}
</script>

<template>
  <div class="banner">
    <h1>Its fun time</h1>
    <h2>Browse TV Shows & Web Series</h2>
    <SearchInputVue
      :value="searchStr"
      @search-change="searchChangeHandler"
    ></SearchInputVue>
  </div>
  <section v-if="!error" class="padding-l-r-16">
    <ShowsList
      v-if="searchStr"
      :shows="showsSearchResults"
      :isLoading="isLoading"
      :displayAsMultiRowList="true"
    >
    </ShowsList>
    <section v-else v-for="genre in ['Drama', 'Comedy', 'Sports']" :key="genre">
      <h2>{{ genre }}</h2>
      <ShowsList
        :shows="showsByGenre(genre)"
        :isLoading="isLoading"
      ></ShowsList>
    </section>
  </section>
</template>

<style scope>
.banner {
  color: white;
  background-image: url("../../assets/banner.webp");
  background-color: #cccccc;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  height: 380px;
  width: 100%;
  padding: 0 16px;
}

.banner h1 {
  margin-bottom: 0;
}

@media only screen and (min-width: 421px) and (max-width: 768px) {
  .banner {
    height: 300px;
  }
}

@media only screen and (min-width: 361px) and (max-width: 420px) {
  .banner {
    height: 280px;
  }
}

@media only screen and (max-width: 360px) {
  .banner {
    height: 200px;
  }
}
</style>
