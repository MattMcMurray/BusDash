<template>
    <div class="homepage-msg">
        <section class="hero is-success is-fullheight is-bold" v-if="displayHero">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Dash4Bus
                </h1>
                <h2 class="subtitle">
                    Welcome to Dash4Bus for Winnipeg Transit! Please log in to start monitoring bus stops.
                </h2>
                </div>
            </div>
        </section>

        <div class="container add-monitor-tip">
            <article class="message">
                <div class="message-header">
                    <p><em>Hmm...</em></p>
                </div>
                <div class="message-body">
                    It looks like there aren't any monitors setup <small>(or there is no internet connection)</small>.
                    <br>
                    Try creating a new monitor to see the results.
                </div>
            </article>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyMonitorWarning',
    props: ["displayHero"],
    data() {
        return {
        }
    }
}

</script>

<style>
.add-monitor-tip {
    padding-top: 5em;
}

.message-body {
    text-align: center;
}
</style>