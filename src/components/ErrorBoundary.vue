
<script setup lang="ts">
import { ref, onErrorCaptured, onUpdated, onRenderTracked, computed } from 'vue';


let errorMe = ref(false);

const plusOne = computed(() => errorMe.value)

// onActivated(() => {
//     errorMe.value = true;
// })

// onRenderTracked(({ effect, target, type, key }) => {
//     // debugger;
// })

onUpdated(() => {
    // text content should be the same as current `count.value`
    console.log('updated called');
})

onErrorCaptured((err, vm, info) => {
    console.log({ err, vm, info })
    errorMe.value = true;

    console.log(errorMe.value)
})

</script>

<template>
    {{ plusOne }}
    <h1 v-if="errorMe">Something went wrong</h1>
    <div v-else>
        <slot></slot>
    </div>
</template>