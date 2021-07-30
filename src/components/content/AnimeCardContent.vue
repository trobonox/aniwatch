!<template>
    <div>
        <h1 v-if="result.data.Page.media[resultNumber].title.english"> <a :href="result.data.Page.media[resultNumber].siteUrl"> {{result.data.Page.media[resultNumber].title.english}} ({{ result.data.Page.media[resultNumber].seasonYear }}) </a> </h1>
        <h1 v-else> <a :href="result.data.Page.media[resultNumber].siteUrl"> {{result.data.Page.media[resultNumber].title.romaji}} ({{ result.data.Page.media[resultNumber].seasonYear }}) </a> </h1>

        <div v-if="result.data.Page.media[resultNumber].status && result.data.Page.media[resultNumber].nextAiringEpisode"><p v-if="result.data.Page.media[resultNumber].status == 'RELEASING'">Episode {{ result.data.Page.media[resultNumber].nextAiringEpisode.episode }} airs in {{ daysUntilEpisodeAiring }} days</p></div>

        <div class="rating">
        <svg v-if="result.data.Page.media[resultNumber].averageScore <= 100 && result.data.Page.media[resultNumber].averageScore >= 70" xmlns="http://www.w3.org/2000/svg" class="icon-green" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="9" y1="10" x2="9.01" y2="10" />
            <line x1="15" y1="10" x2="15.01" y2="10" />
            <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
        </svg>
        <svg v-if="result.data.Page.media[resultNumber].averageScore < 70 && result.data.Page.media[resultNumber].averageScore >= 50" xmlns="http://www.w3.org/2000/svg" class="icon-orange" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="9" y1="10" x2="9.01" y2="10" />
            <line x1="15" y1="10" x2="15.01" y2="10" />
        </svg>
        <svg v-if="result.data.Page.media[resultNumber].averageScore <= 50 " xmlns="http://www.w3.org/2000/svg" class="icon-red" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="9" y1="10" x2="9.01" y2="10" />
            <line x1="15" y1="10" x2="15.01" y2="10" />
            <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
        </svg>
        <h2> {{ result.data.Page.media[resultNumber].averageScore }}% </h2>
        </div>

        <img class="cover" :src="result.data.Page.media[resultNumber].coverImage.large" :alt="result.data.Page.media[resultNumber].title.romaji + ' Cover'"/>

        <div class="badges-wrapper">
        <div class="badges">
            <div class="info-badge">{{ titleCaseAnimeType }}</div>
            <div class="info-badge" v-if="result.data.Page.media[resultNumber].status">{{ toTitleCase(result.data.Page.media[resultNumber].status).replace(/_/g, " ") }}</div>
            <div class="info-badge" v-if="result.data.Page.media[resultNumber].episodes && result.data.Page.media[resultNumber].episodes > 1">{{ result.data.Page.media[resultNumber].episodes }} Episodes</div>
            <div class="info-badge" v-if="result.data.Page.media[resultNumber].episodes && result.data.Page.media[resultNumber].episodes == 1" >{{ result.data.Page.media[resultNumber].episodes }} Episode</div>
            <div class="info-badge" v-if="result.data.Page.media[resultNumber].season && result.data.Page.media[resultNumber].seasonYear">{{ toTitleCase(result.data.Page.media[resultNumber].season) }} {{ result.data.Page.media[resultNumber].seasonYear }}</div>
        </div>
        <div class="badges">
            <div class="genre-badge" v-for="genre in result.data.Page.media[resultNumber].genres" :key="genre.index">{{ genre }}</div>
        </div>
        </div>
    
        <p v-html="result.data.Page.media[resultNumber].description"></p>
    </div>
</template>

<script>
export default {
    name: 'AnimeCardContent',
    props: ['result', 'resultNumber'],
    
    methods: {
        toTitleCase(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    },

    computed: {
        titleCaseAnimeType() {
            var animeType = this.result.data.Page.media[this.resultNumber].format;

            if (animeType == "TV" || animeType == "OVA" || animeType == "ONA") {
                return animeType;
            } else {
                return this.toTitleCase(animeType);
            }
        },

        daysUntilEpisodeAiring() {
            var secondsUntilAiring = this.result.data.Page.media[this.resultNumber].nextAiringEpisode.timeUntilAiring;

            return Math.floor(secondsUntilAiring / 86400)
        }
    }
}
</script>
