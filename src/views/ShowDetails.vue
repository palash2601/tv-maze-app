<script setup lang="ts">
import { useRoute } from "vue-router";
import Tag from "primevue/tag";
import useShows from "@/composables/shows";
import MultiRowList from "@/components/MultiRowList.vue";
import { computed } from "vue";
import Skeleton from "primevue/skeleton";

const route = useRoute();
const { show, fetchShowDetails, isLoading, error } = useShows();

fetchShowDetails(route.params.id as string);

const multiRowListItems = computed(() => {
  return show.value?._embedded.seasons.map((season) => ({
    image: season.image?.medium,
    id: season.id,
    name: season.name,
    link: ``,
  }));
});
</script>

<template>
  <h1 v-if="isLoading">
    <Skeleton width="100%" height="14rem" />
  </h1>
  <article v-else-if="show && !error" class="padding-l-r-16">
    <h2>{{ show.name }}</h2>
    <section class="container-2-col">
      <div class="details__img">
        <img :alt="show.name" :src="show.image?.medium" />
      </div>
      <section>
        <dl>
          <dt>Rating</dt>
          <dd>{{ show.rating.average }}</dd>
          <dt>Premiered</dt>
          <dd>{{ show.premiered }}</dd>
        </dl>
        <div class="genre-list">
          <Tag
            v-for="genre in show.genres"
            :key="genre"
            class="mr-2"
            value="Primary"
            rounded
            >{{ genre }}</Tag
          >
        </div>
        <section v-html="show.summary"></section>
      </section>
    </section>

    <h3>Seasons</h3>
    <MultiRowList :items="multiRowListItems">
      <template
        v-for="season in show._embedded.seasons"
        :key="season.id"
        #[season.id]
      >
        <h4 class="season__title">Season {{ season.number }}</h4>
        <dl class="season__dl">
          <dt>Premiered</dt>
          <dd>{{ season.premiereDate }}</dd>
          <dt>Episodes</dt>
          <dd>{{ season.episodeOrder }}</dd>
        </dl>
      </template>
    </MultiRowList>
  </article>
</template>

<style scoped>
.details__img {
  display: flex;
  justify-content: center;
}

.season__title {
  margin: 0;
}

.season__dl {
  margin: 0;
}

.genre-list .p-tag:not(:first-child) {
  margin-left: 6px;
}

.container-2-col {
  display: flex;
  flex-direction: row;
}

.container-2-col img {
  padding-right: 16px;
}

dl {
  display: flex;
  align-self: baseline;
  flex-wrap: wrap;
  max-width: 380px;
}

dt {
  font-weight: 300;
  width: 40%;
  padding: 4px 0;
}

dd {
  margin-left: auto;
  width: 60%;
  padding: 4px 0;
}

@media only screen and (max-width: 600px) {
  .container-2-col {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
