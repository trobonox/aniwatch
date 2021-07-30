!<template>
    <div>
        <h1>{{ result.data.Page.characters[resultNumber].name.full }}</h1>
        <img class="cover character-img" :src="result.data.Page.characters[resultNumber].image.large" :alt="result.data.Page.characters[resultNumber].name.full + ' image'">
        <vue-markdown :source="result.data.Page.characters[resultNumber].description"></vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from '@adapttive/vue-markdown'

export default {
    name: 'AnimeCardContent',
    props: ['result', 'resultNumber'],
    components: {VueMarkdown},
    
    methods: {
        toTitleCase(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    }
}
</script>

<style>
.character-img{
    margin: 10px 0;
}

.vue-markdown {
    color: var(--text-primary);
}
</style>
