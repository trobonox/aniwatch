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
      

      <div class="nsfw-warning" v-if="result && result.data.Page.media[resultNumber].hasOwnProperty('isAdult')">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-128" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="result && result.data.Page.media[resultNumber].isAdult">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p v-if="result && result.data.Page.media[resultNumber].isAdult">You cannot view adult content on this website.</p>
      </div>

      
      <div class="anime-wrapper">

        <svg xmlns="http://www.w3.org/2000/svg" class="icon-100 arrow-left" v-if="result" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="pageArrowLeft()">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7" />
        </svg>
        
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

        <svg xmlns="http://www.w3.org/2000/svg" class="icon-100 arrow-right" v-if="result" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="pageArrowRight()">
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

export default {
  name: 'AniWatch',
  data() {
    return {
      darkMode: true,
      animeName: '',
      resultNumber: 0,
      url : 'https://graphql.anilist.co',
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
      
      fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json',},
        body: JSON.stringify({
          query: this.query,
          variables: {
            search: this.animeName,
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
    },
    handleError(error) {
      alert('Error, check console');
      console.error(error);
    },


    pageArrowRight() {
      if(this.resultNumber == this.result.data.Page.media.length - 1) {
        this.resultNumber = 0;
        return;
      }

      this.resultNumber++;
    },

    pageArrowLeft() {
      if(this.resultNumber == 0) {
        this.resultNumber = this.result.data.Page.media.length - 1;
        return;
      }

      this.resultNumber--;
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
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
