<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">
                <img src="../../assets/logo.png" width="24" height="24" class="d-inline-block align-top img-fluid mr-1"
                    alt="">
                    <span class="d-inline-block my-1"><strong>RATEEP.me</strong><small>บันทึกของนายประทีป</small></span>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link text-uppercase" :to="{name: 'home'}">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-uppercase" :to="{name: 'blog'}">Blog</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-uppercase" :to="{name: 'about'}">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-uppercase" :to="{name: 'login'}">Login</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'navbar'
    }
</script>