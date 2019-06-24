<template>
  <div id="show">
    <Navbar />
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
          <div class="card border-0 mb-4 animated fadeInUp">
            <img class="card-img-top img-fluid rounded-0" v-if="article.imageUrl" :src="article.imageUrl" alt="...">
            <div class="card-body ">
              <h3 class="card-title">{{article.title}}</h3>
              <ul class="list-inline text-muted small">
                <li class="list-inline-item"><i class="far fa-clock"></i>
                  {{updated}}</li>
              </ul>
              <p class="card-text animated fadeInUp" v-html="article.content"></p>
              <router-link :to="{ name: 'article-list'}" class="btn btn-link text-uppercase text-center animated fadeInUp"><i
                  class="fas fa-long-arrow-alt-left"></i> Back</router-link>
            </div>
          </div>
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
        updated: ''
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
            this.updated = moment(doc.updated).format('LL')
          }
        })
      }
    },
    components: {
      Navbar
    }
  }
</script>