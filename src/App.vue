<template>
  <div class="app" :class="{ 'dark' : darkMode }">
    <div class="header">
      <router-link to="/" class="branding">
        <svg xmlns="http://www.w3.org/2000/svg" class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        <div class="header-text">AniWatch</div>
      </router-link> 
      
      <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" class="header-icon darkmode-toggle" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="toggleDarkMode()">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="header-icon darkmode-toggle" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="toggleDarkMode()">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>    

    </div>

    <router-view></router-view>

    <div class="footer">
      <a class="footer-text" href="https://github.com/trobonox">© 2021-2022 Trobonox</a>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'AniWatch',
  data() {
    return {
      darkMode: true
    }
  },
  methods: {  
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
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

  --background: rgb(213, 223, 233);
  --background-searchbar: rgb(238, 243, 247);
  --background-header: rgb(93, 82, 190);
  --background-card: rgb(215, 222, 226);

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

  transition: background-color 0.4s cubic-bezier(.42,0,.58,1);
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

  transition: background 0.3s ease-in-out;
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

a, li {
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

  transition: background-color 0.3s ease-in-out;

  z-index: 10;
}

.branding {
  display: flex;
  flex-direction: row;

  cursor: pointer;
}

.header:hover .header-icon{
  color: var(--icon-hover);
}

.header:hover .header-text{
  color: var(--icon-hover);
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



</style>
