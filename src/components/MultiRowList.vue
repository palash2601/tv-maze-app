<script setup lang="ts">
import { RouterLink } from "vue-router";

import defaultImage from "../../assets/no-image-available.webp";

const props = defineProps<{
  items:
  | {
    image: string;
    id: number;
    name: string;
    link: string;

  }[]
  | undefined;
  withPadding?: boolean;
}>();
</script>

<template>
  <ul :class="[{ 'padding-16': props.withPadding }, 'cards', 'unstyled-ul']">
    <li v-for="item in props.items" :key="item.id">
      <RouterLink :to="item.link">
        <img :src="item.image || defaultImage" :alt="item.name" />
      </RouterLink>
      <slot :name="item.id"></slot>
    </li>
  </ul>
</template>

<style scoped>
.unstyled-ul {
  list-style: none;
  padding-left: 0;
}

.padding-16 {
  padding-left: 16px;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}

@media only screen and (min-width: 767px) and (max-width: 1024px) {
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }
}

@media only screen and (min-width: 421px) and (max-width: 768px) {
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }
}

@media only screen and (max-width: 420px) {
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }
}
</style>
