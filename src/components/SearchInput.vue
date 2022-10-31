<script setup lang="ts">
import { ref } from 'vue'

const searchInput = ref<HTMLFormElement>();

const props = defineProps<{
  value: string;
}>();
</script>

<template>
  <div className="search-input">
    <input id="searchInput" label="Search" :value="props.value" ref="searchInput" />
    <button @click="$emit('searchChange', searchInput?.value)">Search</button>
  </div>
</template>

<style scoped>
input,
select {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  font-size: 15px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
}

.search-input {
  display: grid;
  grid-template-columns: 5fr 1fr;
  column-gap: 10px;

}
</style>