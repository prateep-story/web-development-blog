import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from './views/Home.vue'
import Blog from './views/Blog.vue'
import Category from './views/Category.vue'
import Read from './views/Read.vue'
import About from './views/About.vue'
import Resume from './views/Resume.vue'
import Login from './views/Login.vue'
import ArticleList from './views/articles/Index.vue'
import CreateArticle from './views/articles/Create.vue'
import EditArticle from './views/articles/Edit.vue'
import ShowArticle from './views/articles/Show.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/read',
      name: 'read',
      component: Read
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/articles/index',
      name: 'article-list',
      component: ArticleList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/articles/create',
      name: 'create-article',
      component: CreateArticle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/articles/edit',
      name: 'edit-article',
      component: EditArticle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/articles/show',
      name: 'show-article',
      component: ShowArticle,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('/articles/index');
  else next();
})

export default router