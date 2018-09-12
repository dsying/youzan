<template>
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swp-page swiper-slide" v-for="list in lists">
            <a class="js-no-follow" :href="list.clickUrl" >
                <img :src="list.img" >
            </a>
        </div>
    </div>
      
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>
  </div> 
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
  export default {
      name: 'swipe',
      props: {
          lists:{
              type: Array,
              require: true
          }
      },
      created() {
          console.log('created:',document.querySelectorAll('.swiper-slide'))
      },
      mounted() {
        console.log('mounted:',document.querySelectorAll('.swiper-slide'))
        new Swiper('.swiper-container', {
            loop:true,
            pagination: {
                el: '.swiper-pagination',
            },
        });
      },
      watch:{
          lists(newVal,oldVal){
              console.log(newVal,oldVal)
              console.log('befor nextTick:' ,document.querySelectorAll('.swiper-slide'))
              this.$nextTick(()=>{
                  console.log('afterTick:',document.querySelectorAll('.swiper-slide'))
              })
          }
      }
  }
</script>

<style>
.swiper-slide>a{
    width:100% !important;
    height: 100%;
}
</style>
