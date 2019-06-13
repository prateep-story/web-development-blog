<template>
  <div id="read">
    <Navbar />
    <div class="container">
      <div class="row my-3" id="read">
        <div class="col-md-12">
          <img class="img-fluid rounded-0 animated fadeIn" v-if="article.imageUrl" :src="article.imageUrl" alt="...">
          <hr class="animated fadeIn">
          <h5 class="mt-4 animated fadeInUp">{{article.title}}</h5>
          <p class="small animated fadeInUp">{{created}} | {{article.category}}</p>
          <hr class="animated fadeIn">
          <p class="animated fadeInUp" v-html="article.content"></p>
          <hr class="animated fadeIn">
          <router-link :to="{ name: 'blog'}" class="btn btn-link btn-sm text-uppercase animated fadeInUp"><i
              class="fas fa-long-arrow-alt-left"></i> Back</router-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import firebase from '../firebase'
  import Navbar from '../components/frontend/Navbarฺ'
  import Footer from '../components/frontend/Footer'
  import moment from 'moment'

  var database = firebase.firestore()

  export default {
    name: 'read',
    data() {
      return {
        id: '',
        article: [],
        created: ''
      }
    },
    created() {
      this.onShow()
    },
    methods: {
      onShow() {
        database.collection('articles').doc(this.$route.params.id).get().then((doc) => {
          if (doc.exists) {
            this.article = doc.data()
            this.id = doc.id
            this.created = moment(doc.created).format('LL')
          }
        })
      }
    },
    components: {
      Navbar,
      Footer
    }
  }
</script>