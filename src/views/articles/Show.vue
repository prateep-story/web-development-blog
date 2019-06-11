<template>
  <div id="show">
    <Navbar/>
    <div class="container">
      <div class="row my-3">
        <div class="col-md-12">
          <nav aria-label="breadcrumb ">
            <ol class="breadcrumb rounded-0 bg-light px-0">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'article-list'}">Articles</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{article.title}}</li>
            </ol>
          </nav>

          <img class="img-fluid rounded-0" v-if="article.imageUrl" :src="article.imageUrl" alt="...">
          <hr>
          <h5 class="mt-4">{{article.title}}</h5>
          <p class="small">{{created}} | {{article.category}}</p>
          <hr>
          <p v-html="article.content"></p>
          <hr>
    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from '../../firebase'
  import Navbar from '../../components/backend/Navbar'
  import moment from 'moment'

  var database = firebase.firestore()

  export default {
    name: 'show-article',
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
      Navbar
    }
  }
</script>