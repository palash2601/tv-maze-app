<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Show } from "@/types";
import Carousel from "primevue/carousel";
import Skeleton from "primevue/skeleton";
import { computed, onMounted, ref, watch } from "vue";
import MultiRowList from "./MultiRowList.vue";

const props = defineProps<{
  shows: Show[];
  isLoading: Boolean;
  displayAsMultiRowList?: Boolean;
}>();

const isCarouselVisible = ref(true);

const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 4,
    numScroll: 4,
  },
  {
    breakpoint: "768px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "480px",
    numVisible: 2,
    numScroll: 2,
  },
];

const numVisible = computed(() => {
  return props.shows.length < 5 ? props.shows.length : 5;
});

function computeCarouselVisibility() {
  if (props.displayAsMultiRowList) {
    isCarouselVisible.value = false;
    return;
  }

  let currentBreakPoint = responsiveOptions[0];
  for (let i = 0; i < responsiveOptions.length; i++) {
    if (window.innerWidth < parseInt(responsiveOptions[i].breakpoint)) {
      currentBreakPoint = responsiveOptions[i];
    }
  }
  isCarouselVisible.value = currentBreakPoint.numVisible < props.shows.length;
}

window.addEventListener("resize", computeCarouselVisibility);

watch(
  () => props.shows,
  () => {
    computeCarouselVisibility();
  }
);

onMounted(() => {
  computeCarouselVisibility();
});

const multiRowListItems = computed(() => {
  return props.shows.map((show) => ({
    image: show.image?.medium,
    id: show.id,
    name: show.name,
    link: `/showDetails/${show.id}`,
  }));
});
</script>

<template>
  <div v-if="isLoading">
    <Skeleton data-test="skeleton" width="100%" height="14rem" />
  </div>

  <h1 v-else-if="props.shows.length === 0">No results found</h1>
  <Carousel data-test="Carousel" v-else-if="!!isCarouselVisible" :value="props.shows"
    :responsiveOptions="responsiveOptions" :numVisible="numVisible" :numScroll="4" :showIndicators="false">
    <template #item="slotProps">
      <RouterLink :to="'/showDetails/' + slotProps.data.id">
        <img v-if="slotProps.data.image" :src="slotProps.data.image?.medium" :alt="slotProps.data.name" />
        <h3 v-else>{{ slotProps.data.name }}</h3>
      </RouterLink>
    </template>
  </Carousel>

  <MultiRowList :withPadding="true" v-else :items="multiRowListItems" data-test="MultiRowList"></MultiRowList>
</template>

<style scope>
.p-carousel {
  margin: 0 -16px;
}

.foo :deep(.unstyled-ul) {
  padding-left: 16px;
}
</style>
