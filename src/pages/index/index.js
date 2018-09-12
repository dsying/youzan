import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui'
import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

Vue.use(InfiniteScroll);

new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum : 1,
    pageSize : 6,
    loading: false, // 加载的状态 false:加载完成   true:正在加载  加载的过程中不能重复加载  节流
    allLoaded: false,//是否全部加载完毕,
    banner: null
  },
  created(){
    this.getLists()
    this.getIndexBanner()
  },
  methods:{
    getLists() {
      if(this.allLoaded) return

      this.loading = true;
      axios.get(url.hotLists,{
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }).then(res => {
        let currList = res.data.lists
        //判断是否全部加载完毕
        if(currList.length < this.pageSize){
          this.allLoaded = true
        }
        if(this.lists){
          this.lists = this.lists.concat(currList)
        }else{
          //初次加载
          this.lists = currList
        }
        this.loading = false
        this.pageNum++
      })
    },
    getIndexBanner() {
      axios.get(url.indexBanner).then(res => {
        this.banner = res.data.lists
        
      }).catch(error => {

      })
    }
  },
  components:{
    Foot,
    Swipe
  }
  
})
