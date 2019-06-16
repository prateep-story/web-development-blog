<template>
  <div id="edit">
    <Navbar />
    <div class="container">
      <div class="row my3">
        <div id="edit-article" class="col-md-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb rounded-0 bg-light px-0">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'article-list'}">Articles</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'show-article', params: {id: article['id'], slug: article['slug']} }">
                  {{article.title}}</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Edit</li>
            </ol>
          </nav>
          <form v-on:submit.prevent="onUpdate" enctype="multipart/form-data">
            <div class="form-group">
              <input type="text" name="title" id="title" v-model.trim="article.title" class="form-control rounded-0"
                placeholder="หัวข้อ" required>
            </div>
            <div class="form-group">
              <select class="form-control rounded-0" id="category" v-model="category">
                <option selected disabled>Category</option>
                <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <div class="row">
                <div v-if="article.imageUrl" class="col-md-12">
                  <figure class="figure">
                    <img :src="article.imageUrl" class="figure-img img-fluid rounded-0" alt="...">
                  </figure>
                  <hr>
                </div>
              </div>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="file" @change="onSelectImage">
                <label class="custom-file-label rounded-0" for="file"><span v-if="filename">{{file.name}}</span> <span
                    v-else>Choose image... </span> </label>
              </div>
            </div>
            <div class="form-group">
              <editor api-key="5w5zcz2dc6leb58m2arq1xumlvtek6neb00m9y792idywef0" v-model.trim="article.content"
                :init="initValue" rows="20" id="editor"></editor>
            </div>
            <div class="form-group">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="publish" name="status" v-bind:value="true"
                  v-model="status" checked>
                <label class="custom-control-label" for="publish">Publish</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="draf" name="status" v-bind:value="false"
                  v-model="status">
                <label class="custom-control-label" for="draf">Draf</label>
              </div>
            </div>
            <button class="btn btn-primary rounded-0 mb-3"><i class="fas fa-save"></i> Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from '../../firebase'
  import router from '../../router'
  import Navbar from '../../components/backend/Navbar'
  import editor from '@tinymce/tinymce-vue'

  var database = firebase.firestore()
  var storage = firebase.storage()

  export default {
    name: 'edit-article',
    data() {
      return {
        id: this.$route.params.id,
        article: [],
        title: '',
        content: '',
        slug: '',
        options: [{
            text: 'การพัฒนาเว็บ',
            value: 'การพัฒนาเว็บ'
          },
          {
            text: 'ออกแบบเว็บไซต์',
            value: 'ออกแบบเว็บไซต์'
          },
          {
            text: 'เทคโนโลยี',
            value: 'เทคโนโลยี'
          },
          {
            text: 'ไลฟ์สไตล์',
            value: 'ไลฟ์สไตล์'
          },
          {
            text: 'ไม่มีหมวดหมู่',
            value: 'ไม่มีหมวดหมู่'
          },
        ],
        category: '',
        status: '',
        file: '',
        filename: '',
        initValue: {
          plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen code image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help',
          toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
          image_title: true,
          image_class_list: [{
              title: 'img-fluid',
              value: 'img-fluid'
            },
            {
              title: 'img-thumbnail',
              value: 'img-fluid img-thumbnail'
            },
            {
              title: 'rounded',
              value: 'img-fluid rounded'
            },
            {
              title: 'rounded-circle',
              value: 'img-fluid rounded-circle'
            },
          ],
          table_class_list: [{
              title: 'Table',
              value: 'table'
            },
            {
              title: 'Table Striped',
              value: 'table table-striped'
            },
            {
              title: 'Table Dark',
              value: 'table table-dark'
            },
            {
              title: 'Table Bordered',
              value: 'table table-bordered'
            },
            {
              title: 'Table Borderless',
              value: 'table table-borderless'
            },
            {
              title: 'Table Hover',
              value: 'table table-hover'
            },
          ],
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: function (callback) {
            var input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')
            input.onchange = function () {
              var file = this.files[0]
              var reader = new FileReader()
              reader.onload = function () {
                var id = 'blobid' + (new Date()).getTime()
                var blobCache = window.tinymce.activeEditor.editorUpload.blobCache
                var base64 = reader.result.split(',')[1]
                var blobInfo = blobCache.create(id, file, base64)
                blobCache.add(blobInfo)
                callback(blobInfo.blobUri(), {
                  title: file.name
                })
              }
              reader.readAsDataURL(file)
            }
            input.click()
          }
        }
      }
    },
    created() {
      this.onEdit()
    },
    methods: {
      onEdit() {
        var databaseRef = database.collection('articles')
        databaseRef.doc(this.$route.params.id).get().then((doc) => {
          if (doc.exists) {
            this.article = doc.data()
            this.category = doc.data().category
            this.status = doc.data().status
          }
        })
      },
      onSelectImage(event) {
        var file = event.target.files[0]
        var extension = file.name.split('.').pop()
        var time = new Date().getTime()
        var filename = time + '.' + extension
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.article.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(file)
        this.file = file
        this.filename = filename
      },
      onUpdate() {
        var id = this.id
        var title = this.article.title
        var content = this.article.content
        var slug = this.createSlug(this.article.title)
        var file = this.file
        var filename = this.filename
        var category = this.category
        var status = this.status
        var oldFile = this.article.image

        if (file) {
          storage.ref().child('images/articles/' + oldFile).delete()
          storage.ref('images/articles/' + filename).put(file).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              database.collection('articles').doc(id).update({
                image: filename,
                imageUrl: downloadURL,
              })
            })
          })
        }
        database.collection('articles').doc(id).update({
          title: title,
          content: content,
          category: category,
          slug: slug,
          status: status,
          updated: new Date()
        }).then(function () {
          alert('Record successfully updated.')
          router.push({
            name: 'article-list'
          })
        })
      },
      createSlug: function (title) {
        var slug = ''
        slug = title.toLowerCase().replace(/\s+/g, '-')
          .replace('%', 'เปอร์เซนต์')
          .replace(/[^\u0E00-\u0E7F\w-]+/g, '')
          .replace(/--+/g, '-') 
          .replace(/^-+/, '')
          .replace(/-+$/, '')
        return slug;
      }
    },
    components: {
      editor,
      Navbar
    }
  }
</script>