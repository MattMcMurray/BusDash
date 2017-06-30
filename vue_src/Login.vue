<template>

    <div class="container">
        <div class="form-group login-form">
            <a href="/auth/github" class="btn btn-block btn-github btn-social">
            <i class="fa fa-github"></i>
                Sign in with GitHub
            </a>
        </div>
    </div>
</template>

<script>
import NavBar from './DashNav.vue'

export default {
    name: 'login',
    components: {NavBar},
    data () {
        return {

        }
    }
}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>