<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div class="container">
                <div class="navbar-brand">
                <img src="../../assets/logo.png" width="24" height="24" class="d-inline-block align-top img-fluid mr-1"
                    alt="">
                    <span class="d-inline-block my-1"><strong>RATEEP.me</strong><small>จัดการบล็อกของฉัน</small></span>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'create-article'}"><i class="fas fa-plus"></i> Create</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'article-list'}">Articles</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" v-on:click="onLogout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import firebase from '../../firebase'
    import router from '../../router'

    export default {
        name: 'navbar',
        methods: {
            onLogout() {
                var signOut = confirm('Are you sure you want to sign out?')
                if (signOut) {
                    firebase.auth().signOut().then(function () {
                        router.push({
                            name: 'home'
                        })
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .navbar-toggler {
        border-radius: 0;
    }
</style>