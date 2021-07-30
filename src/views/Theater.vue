<template>
  <div class="theater-wrapper">
    <div class="content" v-if="toTitleCase(getSafe(() => $route.params.mode)) == 'Anime' || toTitleCase(getSafe(() => $route.params.mode)) == 'Character' ">
      <p class="info-text">Get basic info about every Anime or Character! (Provided by anilist.co)</p>

      <input
        v-model="animeName"
        class="searchbar"
        type="text"
        :placeholder="'Search for ' + toTitleCase($route.params.mode) + '...'"
        @keypress.enter="searchForAnime()"
      >


      <div class="nsfw-warning" v-if="cardDisplayed && isAdultContent">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-128" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>You cannot view adult content on this website.</p>
      </div>

      <div class="anime-wrapper">

        <svg xmlns="http://www.w3.org/2000/svg" class="icon-100 arrow-left"  fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="pageArrowLeft()" v-if="cardDisplayed">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7" />
        </svg>
        
        <CardComponent :searchQuery="animeName" :animeSearch="animeSearch" :characterSearch="characterSearch" ref="card" @result="onValidResult()"></CardComponent>

        <svg xmlns="http://www.w3.org/2000/svg" class="icon-100 arrow-right"  fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="pageArrowRight()" v-if="cardDisplayed">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
        </svg>

      </div>

    </div>
    <div class="content error" v-else>
      <p class="error-text">Please select a valid search mode.</p>
      <router-link to="/">Go Back</router-link>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: 'TheaterView',
  components: {
    CardComponent
  },
  data() {
    return {
      darkMode: true,
      animeName: '',
      cardDisplayed: false,
      adultContent: false,
      animeSearch: true,
      characterSearch: false
    }
  },
  
  methods: {
    searchForAnime() {
      this.$refs.card.searchForAnime();
    },

    pageArrowRight() {

      if(this.$refs.card) {
        
        if(this.animeSearch) {
          if(this.$refs.card.resultNumber == this.$refs.card.result.data.Page.media.length - 1) {
            this.$refs.card.resultNumber = 0;
            return;
          }
        }

        if(this.characterSearch){
          if(this.$refs.card.resultNumber == this.$refs.card.result.data.Page.characters.length - 1) {
            this.$refs.card.resultNumber = 0;
            return;
          }
        }
        

        this.$refs.card.resultNumber++;
      }
      
    },

    pageArrowLeft() {

      if(this.$refs.card) {
        
        if(this.animeSearch){
          if(this.$refs.card.resultNumber == 0) {
            this.$refs.card.resultNumber = this.$refs.card.result.data.Page.media.length - 1;
            return;
          }
        }

        if(this.characterSearch){
          if(this.$refs.card.resultNumber == 0) {
            this.$refs.card.resultNumber = this.$refs.card.result.data.Page.characters.length - 1;
            return;
          }
        }
        

        this.$refs.card.resultNumber--;
      }

    },

    onValidResult() {
      this.cardDisplayed = true;
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

  mounted() {
    this.cardDisplayed = false;

    if(this.$route.params){
          if(this.$route.params.mode.toLowerCase() == "anime") {
              this.animeSearch = true;
              this.characterSearch = false;
              return;
          }

          if(this.$route.params.mode.toLowerCase() == "character") {
              this.animeSearch = false;
              this.characterSearch = true;
              return;
          }
      }   
  },

  computed: {
    isAdultContent() {
      if(this.$refs.card.result.data.Page.media){
        if(this.$refs.card.result.data.Page.media[this.$refs.card.resultNumber].isAdult){
          return true;
        }
      }

      return false;
    }
  },


}

function getSafe(fn) {
    try { return fn(); }
    catch (e) { return '' }
}
</script>

<style>

.content {
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;

  padding-bottom: 2.5rem;
}

.info-text {
  margin-top: 15px;
}

.searchbar {
  padding: 10px 20px;
  width: 30rem;
  box-shadow: 0px 4px 8px var(--shadow-primary);
  
  border: none;
  border-radius: 4px;

  text-align: center;
  font-family: inherit;
  font-size: 15px;

  margin-bottom: 10px;

  color: var(--text-primary);
  background-color: var(--background-searchbar);

  transition: background-color 0.3s ease-in-out;
}

.blur-overlay {
  filter: blur(20px);
  pointer-events:none;

  /* Disable selection of anything */
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.nsfw-warning {
  position: absolute;
  z-index: 2;

  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;

  font-size: 20px;
}

.anime-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 0px 13rem;
}

.arrow-right {
  padding-right: 25px;
}

.arrow-left {
  padding-left: 25px
}

.arrow-left:hover,
.arrow-right:hover {
  color: var(--accent-dim);

  cursor: pointer;
}

.error {
  margin-top: 2rem;
}

.error-text {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>

