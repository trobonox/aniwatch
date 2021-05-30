<template>
  <div class="app">
    <div class="header">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
      <div class="header-text">AniWatch</div>
    </div>

    <div class="content">
      <input
        v-model="animeName"
        class="searchbar"
        type="text"
        placeholder="Search for Anime..."
        @keypress.enter="searchForAnime"
      >
      
      <div class="nsfw-warning" v-if="result && result.data.Page.media[0].isAdult">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>You cannot view adult content on this website.</p>
        </div>
      <div class="anime-card" v-if="result" :class="{ 'blur-overlay' : result.data.Page.media[0].isAdult }">        
        <h1 v-if="result" >{{result.data.Page.media[0].title.english}} ({{ result.data.Page.media[0].seasonYear }})</h1>
        <img v-if="result" class="cover" :src="result.data.Page.media[0].coverImage.large" :alt="result.data.Page.media[0].title.english + ' Cover'"/>
        <p v-if="result" v-html="result.data.Page.media[0].description"></p>
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
      animeName: '',
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
                        studios (sort: NAME){
                            nodes{
                                name
                            }
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
      
      
      fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json',},
        body: JSON.stringify({
          query: this.query,
          variables: {
            search: this.animeName,
            page: 1,
            perPage: 3
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
    }
  }

}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap');

html {
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
}

h1 {
  margin-bottom: 15px;
  margin-top: 0;
}

.app {
  position: relative;
  min-height: 100vh;
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #5d52be;
  margin: 0;
  padding: 5px 5px;
  position: sticky;
  top: 0;
  
  font-weight: 400;
  font-family: inherit;

  box-shadow: 0px 8px 25px 4px rgba(0, 0, 0, 0.2);
}

.header-text {
  text-align: center;
  color: white;
  font-size: 1.5em;
}

.icon {
  width: 32px;
  height: 32px;
  color: white;
  padding-right: 2px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;
  padding-top: 25px;

  padding-bottom: 2.5rem;
}

.searchbar {
  padding: 10px 20px;
  width: 500px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  
  border: none;
  border-radius: 4px;

  text-align: center;
  font-family: inherit;
  font-size: 15px;

  margin-bottom: 10px;
}

.cover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.anime-card {
  background-color: #f0f0f3;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-content: center;
  align-self: center;
  align-items: center;
  text-align: center;

  margin-top: 20px;
  margin-left: 500px;
  margin-right: 500px;

  padding: 20px 50px;

  z-index: 0;
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

  color: rgba(0, 0, 0, 0.5);
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

.icon2{
  width: 128px;
  height: auto;
}

</style>
