<template>
  <div id="create">
    <Navbar />
    <div class="container">
      <div class="row my-3">
        <div class="col-md-12">
          <div id="add-article">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb rounded-0 bg-light px-0">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'article-list'}">Articles</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Create</li>
              </ol>
            </nav>
            <form v-on:submit.prevent="onStore" enctype="multipart/form-data">
              <div class="form-group">
                <input type="text" id="title" v-model="title" class="form-control rounded-0" placeholder="Title"
                  required>
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
                  <div v-if="preview" class="col-md-12">
                    <figure class="figure">
                      <img :src="preview" class="figure-img img-fluid rounded-0" alt="...">
                    </figure>
                    <hr>
                  </div>
                </div>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="image" @change="onSelectImage" required>
                  <label class="custom-file-label rounded-0" for="image"><span v-if="filename">{{file.name}}</span>
                    <span v-else>Image</span> </label>
                </div>
              </div>
              <div class="form-group">
                <editor api-key="5w5zcz2dc6leb58m2arq1xumlvtek6neb00m9y792idywef0" v-model="content" :init="initValue"
                  rows="20" id="editor"></editor>
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
    name: 'create-article',
    data() {
      return {
        articles: [],
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
        category: 'Category',
        status: true,
        file: '',
        filename: '',
        preview: '',
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
    methods: {
      onSelectImage(event) {
        var file = event.target.files[0]
        var extension = file.name.split('.').pop()
        var time = new Date().getTime()
        var filename = time + '.' + extension
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.preview = fileReader.result
        })
        fileReader.readAsDataURL(file)
        this.file = file
        this.filename = filename
      },
      onStore() {
        var title = this.title
        var content = this.content
        var category = this.category
        var slug = this.createSlug(this.title)
        var status = this.status
        var file = this.file
        var filename = this.filename

        var storageRef = storage.ref('images/articles/' + filename)
        storageRef.put(file).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            var databaseRef = database.collection('articles').doc()
            databaseRef.set({
              title: title,
              content: content,
              slug: slug,
              category: category,
              status: status,
              image: filename,
              imageUrl: downloadURL,
              created: new Date(),
              updated: new Date()
            }).then(function () {
              alert('Record successfully created.')
              router.push({
                name: 'article-list'
              })
            })
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