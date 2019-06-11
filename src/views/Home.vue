<template>
  <div id="home">
    <Navbar />
    <div class="container">
      <div class="row my-3">
        <div class="col-md-8">
          <div class="card border-0 mb-4" v-bind:key="id" v-for="(article, id) in articles">
            <img class="card-img-top rounded-0" v-if="article.imageUrl" :src="article.imageUrl" alt="...">
            <div class="card-body px-0">
              <h5 class="card-title">{{article.title}}</h5>
              <p class="card-text" v-html="article.content.substring(0,150)+'...'"></p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">{{article.created}}</small>
                <router-link :to="{ name: 'read', params: {id: article['id']} }" class="btn btn-link btn-sm">Read More
                  <i class="fas fa-long-arrow-alt-right"></i></router-link>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-4">
              <button class="btn btn-outline-primary btn-block rounded-0 text-uppercase" v-if="articles.length"
                v-on:click="loadMore()">
                Load more <i class="fas fa-caret-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-none d-sm-block">
          <div class="right-sidebar" v-if="articles.length">
            <div id="avatar" class="text-center">
              <img src="../assets/avatar.jpg" class="rounded-circle mx-auto d-block my-3" width="200px" alt="...">
              <h3 class="card-title text-center text-uppercase mb-2">ประทีป อุ่นอก</h3>
              <h6 class="text-center text-muted mb-3">web developer & designer</h6>
              <hr>
            </div>
            <ul class="list-unstyled">
              <li class="text-justify px-2">สิ่งมีชีวิตตัวเล็กๆ หัวฟูๆ ผิดคล้ำๆหน่อย ดำรงชีวิตบนพื้นโลกแห่งนี้
                ทานข้าวเป็นอาหารหลัก
                ปัจจุบันทำงานเป็นพนักงานในบริษัทแห่งหนึ่ง ชื่อชอบเทคโนโลยี การออกแบบ การเขียนโปรแกรม
                และการพัฒนาเว็บไซต์เป็นพิเศษ รักธรรมชาติ
                แม่น้ำ สายลม แสงแดด และต้นไม้</li>
            </ul>
            <div class="row justify-content-center my-3">
              <div class="col-md-8">
                <router-link :to="{ name: 'about'}" class="btn btn-primary btn-block rounded-0 text-uppercase">
                  Read my
                  story</router-link>
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
              article.created = moment(doc.data().created.toDate()).fromNow()
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
      Navbar,
      Footer
    }
  }
</script>