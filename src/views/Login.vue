<template>
  <section id="login">
    <div class="row justify-content-center">
      <div class="col-md-3">
        <form class="m-5" v-on:submit.prevent="onLogin">
          <div class="text-center mb-3">
            <img class="mb-3 img-fluid" src="../assets/logo.png" alt="" width="85">
            <h1 class="h3 font-weight-normal">Blog Login</h1>
            <small>You already have a blog, login. Connection</small>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0" id="inputEmail"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" class="form-control rounded-0" placeholder="Email address" aria-label="Email address"
              aria-describedby="inputEmail" v-model="email">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text rounded-0" id="inputPassword"><i class="fas fa-key"></i></span>
            </div>
            <input type="password" class="form-control rounded-0" placeholder="Password" aria-label="Password"
              aria-describedby="inputPassword" v-model="password">
          </div>
          <hr class="">
          <button class="btn btn-primary btn-block rounded-0" type="submit"><i class="fas fa-sign-in-alt"></i>
            Login</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import firebase from '../firebase'
  import router from '../router'

  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onLogin() {
        firebase.auth().signInWithEmailAndPassword(this.email.trim(), this.password).then(function () {
          alert('Welcome to blog management!')
          router.push({
            name: 'article-list'
          })
        }).catch(function (error) {
          alert(error.message)
        })
      }
    }
  }
</script>
