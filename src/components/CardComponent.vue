<template>
    <div class="card" v-if="result" :class="{ 'blur-overlay' : getSafe(() => result.data.Page.media[resultNumber].isAdult) }">        
        <AnimeCardContent v-if="animeSearch" :result="result" :resultNumber="resultNumber"/>
        <CharacterCardContent v-if="characterSearch" :result="result" :resultNumber="resultNumber"/>
    </div>
</template>

<script>
import { characterQuery } from '@/queries/characterQuery.js';
import { animeQuery } from '@/queries/animeQuery';

import AnimeCardContent from './content/AnimeCardContent.vue';
import CharacterCardContent from './content/CharacterCardContent.vue';

export default {
   name: 'CardComponent',
   props: ['searchQuery', 'animeSearch', 'characterSearch'],
   components: { AnimeCardContent, CharacterCardContent },
    data() {
        return {
            resultNumber: 0,
            api_base : 'https://graphql.anilist.co',
            result: ''
        }
    },

    methods: {
        searchForAnime() {
            this.resultNumber = 0;
            let queryType = (this.characterSearch == true) ? characterQuery : animeQuery;
            
            fetch(this.api_base, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json',},
                body: JSON.stringify({
                query: queryType,
                variables: {
                    search: this.searchQuery,
                    page: 1,
                    perPage: 50
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
        },

        getSafe
    },

    updated() {
        if(!this.result.data.Page.media) { return }

        if(this.result.data.Page.media[this.resultNumber].isAdult) {
            this.$emit('adult', true);
        }
        else{
            this.$emit('nodault', false);
        }
    },

    
}

function getSafe(fn) {
    try { return fn(); }
    catch (e) { return '' }
}
</script>

<style>
.cover {
  box-shadow: 0px 4px 8px var(--shadow-primary);
  border-radius: 5px;
}

.card {
  background-color: var(--background-card);
  box-shadow: 0px 4px 8px var(--shadow-primary);
  border-radius: 16px;

  transition: background-color 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;
  text-align: center;

  margin: 20px 50px;

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