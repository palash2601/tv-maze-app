<script setup lang="ts">
import { RouterLink } from "vue-router";


const props = defineProps<{
    items: {
        image: string;
        id: number;
        name: string;
        link: string;
    }[] | undefined;
}>();
</script>

<template >
    <ul class="cards unstyled-ul">
        <li v-for="item in props.items" :key="item.id">
            <RouterLink :to="item.link">
                <img :src="item.image" :alt="item.name" />
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

.cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
    padding: 0 44px;
}


@media only screen and (min-width: 767px) and (max-width: 1024px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 30px;
        padding: 0 44px;
    }

    img {
        height: 240px;
    }
}

@media only screen and (min-width: 421px) and (max-width: 768px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
    }

    img {
        height: 200px;
    }
}

@media only screen and (min-width: 361px) and (max-width: 420px) {
    .cards {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
    }

    img {
        height: 180px;
    }
}

@media only screen and (max-width: 360px) {

    img {
        height: 140px;
    }
}
</style>
