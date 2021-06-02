<template>
  <div class="app" :class="{ 'dark' : darkMode }">
    <div class="header">
      <div class="branding" onClick="window.location.reload();">
        <svg xmlns="http://www.w3.org/2000/svg" class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        <div class="header-text">AniWatch</div>
      </div> 
      
      <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" class="header-icon darkmode-toggle" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="toggleDarkMode()">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="header-icon darkmode-toggle" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="toggleDarkMode()">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>    

    </div>

    <div class="content">
      <p class="info-text">Get basic info about every Anime! (Provided by anilist.co)</p>
      
      <input
        v-model="animeName"
        class="searchbar"
        type="text"
        placeholder="Search for Anime..."
        @keypress.enter="searchForAnime"
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
        
        <AnimeCard :searchQuery="animeName" ref="card" @result="onValidResult()"></AnimeCard>

        <svg xmlns="http://www.w3.org/2000/svg" class="icon-100 arrow-right"  fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="pageArrowRight()" v-if="cardDisplayed">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
        </svg>

      </div>
    </div>

    <div class="footer">
      <a class="footer-text" href="https://github.com/trobonox">© 2021 Trobonox</a>
    </div>
    
  </div>
</template>

<script>
import AnimeCard from "@/components/AnimeCard.vue";

export default {
  name: 'AniWatch',
  components: {
    AnimeCard
  },
  data() {
    return {
      darkMode: true,
      animeName: '',
      cardDisplayed: false,
      adultContent: false
    }
  },
  
  methods: {
    searchForAnime() {
      this.$refs.card.searchForAnime();
    },

    pageArrowRight() {

      if(this.$refs.card) {
        
        if(this.$refs.card.resultNumber == this.$refs.card.result.data.Page.media.length - 1) {
          this.$refs.card.resultNumber = 0;
          return;
        }

        this.$refs.card.resultNumber++;
      }
      
    },

    pageArrowLeft() {

      if(this.$refs.card) {
        
        if(this.$refs.card.resultNumber == 0) {
          this.$refs.card.resultNumber = this.$refs.card.result.data.Page.media.length - 1;
          return;
        }

        this.$refs.card.resultNumber--;
      }

    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },

    onValidResult() {
      this.cardDisplayed = true;
    },

  },

  mounted() {
    this.cardDisplayed = false;
  },

  computed: {
    isAdultContent() {
      if(this.$refs.card.result.data.Page.media[this.$refs.card.resultNumber].isAdult){
        return true;
      }

      return false;
    }
  }


}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap');

.app {
  --accent: rgb(93, 82, 190);
  --accent-dim: rgba(93, 82, 190, 0.75);
  --accent-secondary: rgb(107, 116, 245);
  
  --header: white;
  --footer: rgba(0, 0, 0, 0.5);

  --background: rgb(237, 241, 245);
  --background-searchbar: white;
  --background-header: rgb(93, 82, 190);
  --card-background: rgb(233, 233, 233);

  --icon-primary: black;
  --icon-dim: rgba(0, 0, 0, 0.75);
  --icon-hover: rgba(255, 255, 255, 0.664);

  --icon-green: rgb(33, 175, 33);
  --icon-orange: rgb(206, 138, 50);
  --icon-red: rgb(168, 44, 44);

  --text-primary: black;
  --text-secondary: rgba(0, 0, 0, 0.6);
  --text-badge: white;

  --shadow-primary: rgba(0, 0, 0, 0.25);
  --shadow-dim: rgba(0, 0, 0, 0.2);

  position: relative;
  min-height: 100vh;

  background-color: var(--background);
}

.app.dark {
  --accent: rgb(121, 107, 245);
  --accent-dim: rgb(163, 153, 255);
  --accent-secondary: rgb(107, 116, 245);

  --header: rgb(150, 139, 250);
  --footer: rgba(255, 255, 255, 0.5);

  --icon-primary: rgb(255, 255, 255);
  --icon-dim: hsla(0, 0%, 100%, 0.5);
  --icon-hover: rgb(118, 106, 223);

  --icon-green: rgb(108, 255, 108);
  --icon-orange: rgb(255, 191, 108);
  --icon-red: rgb(255, 108, 108);
  
  --background: rgb(18, 18, 18);
  --background-searchbar: rgb(38, 38, 38);
  --background-header: hsl(0, 0%, 18%);
  --background-card: rgb(43, 43, 43);

  --text-primary: rgba(255, 255, 255, 0.87);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-badge: var(--text-primary);

  --shadow-dim: rgba(0, 0, 0, 0.1);
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


h1, p{
  margin-top: 0;
  margin-bottom: 5px;

  color: var(--text-primary);
}

h2 {
  margin: 0 7px;
  font-size: 15px;

  color: var(--text-primary);
}

a {
  text-decoration: none;

  color: var(--text-primary);
}

a:hover {
  color: var(--accent-dim);
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0;
  padding: 5px 20px;
  position: sticky;
  top: 0;
  
  font-family: inherit;

  background: var(--background-header);
  box-shadow: 0px 8px 25px 4px var(--shadow-dim);

  z-index: 10;
}

.branding {
  display: flex;
  flex-direction: row;

  cursor: pointer;
}

.header-text {
  text-align: center;
  font-size: 1.5em;

  color: var(--header);
}

.header-icon {
  width: 32px;
  height: auto;
  padding-right: 2px;

  color: var(--header);
}

.header-icon:hover {
  color: var(--icon-hover);
}

.icon-128 {
  width: 128px;
  height: auto;

  color: var(--icon-primary);
}

.icon-100 {
  max-width: 100px;
  min-width: 100px;
  height: auto;

  color: var(--icon-dim);
}

.icon-green {
  color: var(--icon-green);
}

.icon-orange {
  color: var(--icon-orange);
}

.icon-red {
  color: var(--icon-red);
}

.darkmode-toggle {
  display: flex;
  justify-content: flex-end;

  cursor: pointer;
}

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
  width: 500px;
  box-shadow: 0px 4px 8px var(--shadow-primary);
  
  border: none;
  border-radius: 4px;

  text-align: center;
  font-family: inherit;
  font-size: 15px;

  margin-bottom: 10px;

  color: var(--text-secondary);
  background-color: var(--background-searchbar);
}


.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem; 

  display: flex;
  flex-direction: row;
  
  justify-content: center;
  align-content: center;
  text-align: center;
  align-items: center;

  color: var(--footer);
}

.footer-text {
  text-decoration: none;
  color: inherit;

  position: absolute;
  z-index: 1;
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

  margin: 0px 400px;
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

</style>
