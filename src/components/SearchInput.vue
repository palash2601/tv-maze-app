<script setup lang="ts">
import { ref } from "vue";

const searchInput = ref<HTMLFormElement>();

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits(['searchChange']);

function handle(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement
  if (e.key === 'Enter' && target.value) {
    emit('searchChange', target.value)
  }
  return false;
}
</script>

<template>
  <div className="search-input">
    <input id="searchInput" :value="props.value" ref="searchInput" aria-label="Search" @keypress="handle" />
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
  background-color: #295c2a;
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
