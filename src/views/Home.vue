<template>
  <div id="home">
    <Navbar />
    <div class="container">
      <div class="row my-3">
        <div class="col-md-12">
          <div class="card mb-3 border-0" v-bind:key="id" v-for="(article, id) in articles">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img v-if="article.imageUrl" :src="article.imageUrl" class="card-img img-fluid rounded-0" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title mb-0">
                    <router-link :to="{ name: 'read', params: {id: article['id']} }">
                      {{article.title}}</router-link>
                  </h5>
                  <ul class="list-inline text-muted small">
                    <li class="list-inline-item"><i class="far fa-clock"></i>
                      {{article.updated}}</li>
                    <li class="list-inline-item"><i class="far fa-folder-open"></i>
                      <router-link :to="{ name: 'category', params: {category: article['category']} }">
                        {{article.category}}</router-link>
                    </li>
                  </ul>
                  <hr>
                  <p class="card-text" v-html="article.content.substring(0,300)+'...'"></p>

                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-4">
              <button class="btn btn-outline-primary btn-block rounded-0 text-uppercase animated fadeInUp"
                v-if="articles.length" v-on:click="loadMore()">
                Load more <i class="fas fa-caret-down"></i>
              </button>
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
    name: 'home',
    data() {
      return {
        articles: [],
        paging: {
          article_per_page: 3,
          end: false,
          loading: false
        },
        ref: {
          articles: null,
          articlesNext: null
        }
      }
    },
    created() {
      this.ref.articles = database.collection('articles').where("status", "==", true).orderBy('updated', 'desc')
      const firstPage = this.ref.articles.limit(this.paging.article_per_page)
      this.handleQuestions(firstPage)
    },
    methods: {
      loadMore() {
        if (this.paging.end) {
          return
        }

        this.paging.loading = true
        this.handleQuestions(this.ref.articlesNext).then((documentSnapshots) => {
          this.paging.loading = false

          if (documentSnapshots.empty) {
            this.paging.end = true
          }
        })
      },
      handleQuestions(ref) {
        return new Promise((resolve) => {
          ref.get().then((documentSnapshots) => {
            if (documentSnapshots.empty) {
              this.paging.end = true
              resolve(documentSnapshots)
            }

            documentSnapshots.forEach((doc) => {
              let article = doc.data()
              article.id = doc.id
              article.updated = moment(doc.created).format('LL')
              this.articles.push(article)
            })

            const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1]

            if (!lastVisible) {
              return
            }

            this.ref.articlesNext = this.ref.articles
              .startAfter(lastVisible)
              .limit(this.paging.article_per_page)

            resolve(documentSnapshots)
          })
        })
      }
    },
    components: {
      Navbar
    }
  }
</script>