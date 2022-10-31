<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import useShows from "@/composables/shows";
import { watch } from "vue";

const route = useRoute();
const { shows, fetchShows, isLoading } = useShows();

if (route.query.search) {
    fetchShows(route.query.search as string);
}

watch(() => route.query.search, (val, oldVal) => {
    fetchShows(route.query.search as string);
})
</script>

<template>
    <h1 v-if="isLoading">Loading.....</h1>
    <h1 v-else-if="shows.length === 0">No results found</h1>
    <ul v-else class="cards unstyled-ul">
        <li v-for="item in shows" :key="item.show.id">
            <RouterLink :to="'/showDetails/' + item.show.id">
                <article class="card">
                    <img :src="item.show.image?.medium" :alt="item.show.name" />
                    <div class="container">
                        <header>
                            <h2>{{ item.show.name }}</h2>
                        </header>


                        <div class="content">
                            <p> {{ item.show.summary?.slice(0, 100) }} </p>
                        </div>
                    </div>

                </article>
            </RouterLink>
        </li>
    </ul>
</template>

<style scoped>
.unstyled-ul {
    list-style: none;
    padding-left: 0;
}

.cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
}

.card {
    display: grid;
    grid-template-rows: max-content 200px 1fr;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    background-color: #ffffff;
    border-radius: 5px;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.card .container {
    padding: 2px 16px;
}

@media only screen and (min-width: 767px) and (max-width: 1024px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
    }
}

@media only screen and (min-width: 421px) and (max-width: 768px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 30px;
    }
}

@media only screen and (max-width: 420px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
    }
}
</style>
