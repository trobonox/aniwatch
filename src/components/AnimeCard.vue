<template>
    <div class="anime-card" v-if="result" :class="{ 'blur-overlay' : result.data.Page.media[resultNumber].isAdult }">        
        <h1 v-if="result.data.Page.media[resultNumber].title.english"> <a :href="result.data.Page.media[resultNumber].siteUrl"> {{result.data.Page.media[resultNumber].title.english}} ({{ result.data.Page.media[resultNumber].seasonYear }}) </a> </h1>
        <h1 v-else> <a :href="result.data.Page.media[resultNumber].siteUrl"> {{result.data.Page.media[resultNumber].title.romaji}} ({{ result.data.Page.media[resultNumber].seasonYear }}) </a> </h1>

        <p v-if="result.data.Page.media[resultNumber].status == 'RELEASING'">Episode {{ result.data.Page.media[resultNumber].nextAiringEpisode.episode }} airs in {{ daysUntilEpisodeAiring }} days</p>

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
   name: 'AnimeCard',
   props: ['searchQuery'],
    data() {
        return {
            resultNumber: 0,
            api_base : 'https://graphql.anilist.co',
            query : `
            query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                Page (page: $page, perPage: $perPage) {
                    pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                    }
                    media (id: $id, search: $search, type: ANIME) {
                        id
                        format
                        title {
                            native
                            romaji
                            english
                        }
                        isAdult
                        description               
                        status
                        episodes
                        genres
                        season
                        seasonYear
                        siteUrl
                        averageScore
                        nextAiringEpisode {
                        timeUntilAiring
                        episode
                        }
                        coverImage{
                            medium
                            large
                            extraLarge
                            color
                        }
                    }
                }
            }
            `,
            result: ''
        }
    },

    methods: {
        searchForAnime() {
            this.resultNumber = 0;
            
            fetch(this.api_base, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json',},
                body: JSON.stringify({
                query: this.query,
                variables: {
                    search: this.searchQuery,
                    page: 1,
                    perPage: 8
                }
                })
            }).then(this.handleResponse)
                .then(this.handleData)
                .catch(this.handleError);
        },

        handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        },
        handleData(data) {
            this.result = data;
            this.$emit('result', true);
        },
        handleError(error) {
            alert('Error, check console');
            console.error(error);
        },

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
    },

    upadte() {
        if(this.result.data.Page.media[this.resultNumber].isAdult) {
            this.$emit('adult', true);
        }
        else{
            this.$emit('nodault', false);
        }
    }
}
</script>

<style>
.cover {
  box-shadow: 0px 4px 8px var(--shadow-primary);
  border-radius: 5px;
}

.anime-card {
  background-color: var(--background-card);
  box-shadow: 0px 4px 8px var(--shadow-primary);
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;
  text-align: center;

  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;

  padding: 20px 50px;

  z-index: 0;
}

.rating {
  display: flex;
  flex-direction: row;
  
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;

  margin-bottom: 10px;
}

.genre-badge {
  padding: 8px 8px;
  margin: 5px 5px;

  border-radius: 5px;

  color: var(--text-badge);
  background: var(--accent);
}

.info-badge {
  padding: 8px 8px;
  margin: 5px 5px;

  border-radius: 5px;

  color: var(--text-badge);
  background: var(--accent-secondary);
}

.badges {
  display: flex;
  flex-direction: row;
  
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;

  margin: 5px 0;
}

.badges-wrapper {
  margin: 10px 0;
}

</style>