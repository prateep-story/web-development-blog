<template>
    <div id="about">
        <Navbar />
        <div class="container">
            <div class="row my-3">
                <div class="col-md-12">
                    <div class="card mb-3 border-0">
                        <div class="row no-gutters">
                            <div class="col-md-2">
                                <img src="../assets/avatar.jpg" class="card-img img-fluid rounded-circle animated fadeIn"
                                    width="200px" alt="...">
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h3 class="card-title">เกี่ยวกับประทีป</h3>
                                    <p class="card-text">นายประทีป อุ่นอก (นก) สิ่งมีชีวิตตัวเล็กๆ หัวฟูๆ ผิดคล้ำๆหน่อย
                                        ดำรงชีวิตบนพื้นโลกแห่งนี้
                                        ทานข้าวเป็นอาหารหลัก จบการศึกษาคณะวิทยาศาสตร์และเทคโนโลยี
                                        สาขาวิชาวิทยาการคอมพิวเตอร์
                                        มหาวิทยาลัยราชภัฏกำแพงเพชร ปัจจุบันเป็นพนักงานธุรการบัญชี ณ
                                        บริษัทแห่งหนึ่งในจังหวัดกำแพงเพชร
                                        ชื่นชอบเทคโนโลยี การออกแบบ การเขียนโปรแกรม และการพัฒนาเว็บไซต์เป็นพิเศษ
                                        รักธรรมชาติ
                                        แม่น้ำ สายลม แสงแดด และต้นไม้ </p>
                                        <hr>
                                    <ul class="socialIcons text-center">
                                        <li class="facebook"><a href="#"><i
                                                    class="fab fa-fw fa-facebook-f"></i>Facebook</a></li>
                                        <li class="twitter"><a href="#"><i class="fab fa-fw fa-twitter"></i>Twitter</a>
                                        </li>
                                        <li class="instagram"><a href="#"><i
                                                    class="fab fa-fw fa-instagram"></i>Instagram</a>
                                        </li>
                                        <li class="github"><a href="#"><i class="fab fa-fw fa-github"></i>Github</a>
                                        </li>
                                        <li class="resume">
                                            <router-link :to="{ name: 'resume'}">
                                                <i class="fas fa-fw fa-user"></i>Resume</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '../components/frontend/Navbarฺ'
    export default {
        name: 'about',
        components: {
            Navbar
        }
    }
</script>

<style scoped>
    ul.socialIcons {
        padding: 0;
    }

    .socialIcons li {
        background: yellow;
        list-style: none;
        display: inline-block;
        margin: .25rem;
        border-radius: 2rem;
        overflow: hidden;
    }

    .socialIcons li a {
        display: block;
        padding: .4em;
        max-width: 2em;
        min-width: 2em;
        height: 2em;
        white-space: nowrap;
        line-height: 1.5em;
        transition: .5s;
        text-decoration: none;
        color: #fff;
    }

    .socialIcons li i {
        margin-right: .5em;
    }

    .socialIcons li:hover a {
        max-width: 200px;
        padding-right: 1em;
    }

    .socialIcons .facebook {
        background: #3b5998;
    }

    .socialIcons .twitter {
        background: #00aced;
    }

    .socialIcons .instagram {
        background: #cd486b;
    }

    .socialIcons .github {
        background: #c92228;
    }

    .socialIcons .resume {
        background: #666666;
    }
</style>