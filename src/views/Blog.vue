<template>
  <div id="blog">
    <Navbar />
    <div class="container">
      <div class="row my-3">
        <div class="col-md-12">
          <div class="input-group mb-3">
            <input type="text" class="form-control rounded-0" v-model="search" placeholder="Search..."
              aria-label="Recipient's username" aria-describedby="button-addon">
            <div class="input-group-append">
              <button class="btn btn-primary rounded-0" type="button" id="button-addon"><i
                  class="fas fa-search"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4" v-bind:key="id" v-for="(article, id) in filteredList">
          <div class="card border-0 mb-4">
            <img class="card-img-top img-fluid rounded-0" v-if="article.imageUrl" :src="article.imageUrl" alt="...">
            <div class="card-body px-0">
              <h5 class="card-title">{{article.title}}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">{{article.created}}</small>
                <router-link :to="{ name: 'read', params: {id: article['id']} }" class="btn btn-link btn-sm">Read More
                  <i class="fas fa-long-arrow-alt-right"></i></router-link>
              </div>
            </div>
          </div>
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
    name: 'blog',
    data() {
      return {
        id: '',
        search: '',
        articles: []
      }
    },
    created() {
      this.listData()
    },
    methods: {
      listData() {
        database.collection('articles').where("status", "==", true).orderBy('updated', 'desc').onSnapshot(
          querySnapshot => {
            querySnapshot.forEach((doc) => {
              var data = {
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                imageUrl: doc.data().imageUrl,
                created: moment(doc.data().created.toDate()).fromNow(),
              }
              this.articles.push(data)
            })
          })
      }
    },
    computed: {
      filteredList() {
        return this.articles.filter(article => {
          return article.title.trim().includes(this.search.trim())
        })
      }
    },
    components: {
      Navbar,
      Footer
    }
  }
</script>