<template>
  <div id="articles">
    <Navbar />
    <div class="container">
      <div class="row my-3">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4 mb-3" v-bind:key="id" v-for="(article, id) in articles">
              <div class="card border-0">
                <img class="card-img-top img-fluid rounded-0" v-if="article.imageUrl" :src="article.imageUrl" alt="...">
                <div class="card-body px-0">
                  <h5 class="card-title">{{article.title}} <i v-if="article.status == true" class="far fa-check-circle text-success"></i><i v-else class="far fa-times-circle"></i>
                  </h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted"><i class="far fa-clock"></i> {{article.created}}</small>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-link btn-sm text-info text-uppercase"
                        v-on:click="onShow(article.id, article.slug)">Preview</button>
                      <button type="button" class="btn btn-link btn-sm text-warning text-uppercase"
                        v-on:click="onEdit(article.id, article.slug)">Edit</button>
                      <button type="button" class="btn btn-link btn-sm text-danger text-uppercase"
                        v-on:click="onDelete(article.id)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center my-3">
        <div class="col-md-3">
          <button class="btn btn-outline-primary btn-block rounded-0 text-uppercase" v-if="articles.length"
            v-on:click="loadMore()">
            Load more <i class="fas fa-caret-down"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import firebase from '../../firebase'
  import router from '../../router'
  import Navbar from '../../components/backend/Navbar'
  import moment from 'moment'

  var database = firebase.firestore()
  var storage = firebase.storage()

  export default {
    name: 'article-list',
    data() {
      return {
        id: '',
        slug: '',
        articles: [],
        paging: {
          article_per_page: 6,
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
      this.ref.articles = database.collection('articles').orderBy('updated','desc')
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
              article.created = moment(doc.created).format('LL')
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
      },
      onEdit(id,slug) {
        router.push({
          name: 'edit-article',
          params: {
            id: id,
            slug: slug
          }
        })
      },
      onShow(id,slug) {
        router.push({
          name: 'show-article',
          params: {
            id: id,
            slug: slug
          }
        })
      },
      onDelete(id) {
        var Delete = confirm('Are you sure you want to delete this item?')
        if (Delete) {
          database.collection('articles').doc(id).get().then((doc) => {
            var image = doc.data().image
            storage.ref().child('images/articles/' + image).delete()
            database.collection('articles').doc(id).delete().then(function () {
              alert('Record successfully deleted')
              location.reload()
              router.push({
                name: 'article-list'
              })
            })

          })
        }

      },
      onSingOut() {
        firebase.auth().signOut().then(function () {
          router.push({
            name: 'home'
          })
        })
      }
    },
    components: {
      Navbar
    }
  }
</script>