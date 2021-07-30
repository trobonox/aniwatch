!<template>
    <div class="home-container">
        <div class="welcome-text">
            <h1>Welcome to AniWatch!</h1>
            <h2>Select a search mode:</h2>
        </div>
        <router-link to="/theater/anime" class="link">Theater Search (Anime)</router-link>
        <router-link to="/theater/character" class="link">Theater Search (Character)</router-link>
        <a class="link">Classic Search (soon)</a>
    </div>
</template>

<style>

h1, h2, p {
    color: var(--text-primary);
}

.home-container {
    display: flex;
    flex-direction: column;
  
    justify-content: center;
    align-content: center;
    align-self: center;
    align-items: center;
    text-align: center;

    padding-bottom: 2.5rem;
    padding-top: 1rem;
}

.welcome-text {
    margin-bottom: 10px;
}

.link {
    margin: 5px 0;
}


</style>