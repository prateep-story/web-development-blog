<template>
  <div id="blog">
    <Navbar />
    <div class="container">
      <div class="row my-3">
        <div class="col-md-12">
          <div class="input-group mb-3 animated fadeInUp">
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
          <div class="card border-0 mb-4 animated fadeInUp">
            <img class="card-img-top img-fluid rounded-0" v-if="article.imageUrl" :src="article.imageUrl" alt="...">
            <div class="card-body px-0">
              <h5 class="card-title"><router-link :to="{ name: 'read', params: {id: article['id']} }" >{{article.title}}</router-link></h5>
                                <ul class="list-inline text-muted small">
                    <li class="list-inline-item"><i class="far fa-clock"></i>
                      {{article.updated}}</li>
                    <li class="list-inline-item"><i class="far fa-folder-open"></i>
                      <router-link :to="{ name: 'category', params: {category: article['category']} }">
                        {{article.category}}</router-link>
                    </li>
                  </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from '../firebase'
  import Navbar from '../components/frontend/Navbarฺ'
  import moment from 'moment'

  var database = firebase.firestore()

  export default {
    name: 'blog',
    data() {
      return {
        category: '',
        search: '',
        articles: []
      }
    },
    created() {
      this.listData()
    },
    methods: {
      listData() {
        database.collection('articles').where("category", "==", this.$route.params.category).orderBy('updated', 'desc').onSnapshot(
          querySnapshot => {
            querySnapshot.forEach((doc) => {
              var data = {
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                category: doc.data().category,
                imageUrl: doc.data().imageUrl,
                updated: moment(doc.created).format('LL')
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
      Navbar
    }
  }
</script>