<script setup lang="ts">
import { useRoute } from "vue-router";
import useShows from "@/composables/shows";

const route = useRoute();
const { show, fetchShowDetails, isLoading, error } = useShows();

fetchShowDetails(route.params.id as string);
</script>

<template>

  <h1 v-if="isLoading">Loading.....</h1>
  <p v-else-if="error">Something went wrong</p>
  <article v-else-if="show">
    <h2> {{ show.name }}</h2>
    <section class="container-2-col">
      <div>
        <img :alt="show.name" :src="show.image?.medium" />
      </div>
      <section>
        <dl>
          <dt>Rating</dt>
          <dd>{{ show.rating.average }}</dd>
          <dt>Premiered</dt>
          <dd>{{ show.premiered }}</dd>
        </dl>
        <div v-for="genre in show.genres" :key="genre">
          {{ genre }}
        </div>
        <span v-html="show.summary"></span>
      </section>
    </section>
    <h3>Seasons</h3>
    <div v-for="season in show._embedded.seasons" :key="season.id">

      <section class="container-2-col">
        <img :alt="season.name" :src="season.image?.medium" />
        <dl>
          <dt>Premiered</dt>
          <dd>{{ season.premiereDate }}</dd>
          <dt>Episodes</dt>
          <dd>{{ season.episodeOrder }}</dd>
        </dl>
      </section>
      <span v-html="season.summary"></span>

    </div>
  </article>

</template>

<style scoped>
.container-2-col {
  display: flex;
  /* grid-template-columns: 1fr 8fr;
  gap: 12px; */
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
