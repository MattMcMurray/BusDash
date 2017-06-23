<template>
    <nav class="nav">
        <div class="nav-left">
            <a class="nav-item">
                <span class="icon">
                    <i class="fa fa-bus"></i>
                </span>
                <span>&nbsp;Dash4Bus 2.0</span>
            </a>
        </div>

        <div class="nav-center">

        </div>

        <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
        <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
        <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
        </span>

        <!-- This "nav-menu" is hidden on mobile -->
        <!-- Add the modifier "is-active" to display it on mobile -->
        <div class="nav-right nav-menu">
            <a class="nav-item" href="/"> Home </a>

            <div class="nav-item">
                <div class="field is-grouped">
                   <p class="control">
                        <a class="button is-primary" href="/login">
                            <span class="icon">
                                <i class="fa fa-sign-in"></i>
                            </span>
                            <span>Log in</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
            }
        }
    }

</script>

<style lang="scss">
.button.is-primary {
    background-color: #2ecc71;

    &:hover {
        background-color: lighten(#2980b9, 10%);
    }
}

.nav {
    background-color: #ecf0f1;
}
</style>