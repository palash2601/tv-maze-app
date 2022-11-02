<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import useShows from "@/composables/shows";
import Message from "primevue/message";
const { loadMoreShows, showsCount, error } = useShows();

if (showsCount.value === 0) {
  loadMoreShows();
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">TVShows</RouterLink>
    </nav>
  </header>
  <main>
    <Message :severity="'error'" v-if="error" :closable="false"
      >Something went wrong</Message
    >
    <RouterView />
  </main>
</template>

<style scoped>
main {
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 24px;
  padding: 0 16px;
}

nav {
  width: 100%;
  height: 64px;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 0 8px;
}

nav a.router-link-exact-active {
  color: green;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: white;
}

/* @media (min-width: 1024px) {

  nav {
    text-align: left;
    margin-left: -1rem;

  }
} */
</style>
