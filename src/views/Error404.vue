<template>
    <div class="err-wrapper">
        <h1>Error 404</h1>
        <p class="err-text">We could not find the page you were looking for.</p>
    </div>
</template>

<script>
    export default {
        name: 'Error404'
    }
</script>

<style>

.err-wrapper{
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

.err-text{
    font-size: 20px;
}

</style>