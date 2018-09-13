import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from "js/mixin.js";
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

// qs 模块 获取url的queryString
let {keyword,id} = qs.parse(location.search.substr(1))
new Vue({
  el: '#app',
  data: {
    keyword: keyword,
    id: parseInt(id),
    pageNum: 1,
    pageSize: 8,
    searchlist: null,
    isShow: false,
    loading: false, // 加载的状态 false:加载完成   true:正在加载  加载的过程中不能重复加载  节流
    allLoaded: false,//是否全部加载完毕,
  },
  created() {
    //this.getSearchList()
  },
  methods: {
    //查询列表
    getSearchList(){
      if(this.allLoaded) return
      //因为rap返回的mock数据 始终的8条 为了模拟数据全部返回的场景，触发三次后 把pageSize手动改为10
      if(this.pageNum > 3){
        this.pageSize = 10
      }
      this.loading = true
      axios.get(url.searchlist,{
          params:{
            keyword: this.keyword,
            id: this.id,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
        let currList = res.data.lists
        if(currList.length < this.pageSize) {
          this.allLoaded = true
        }

            if (this.searchlist){
              this.searchlist = this.searchlist.concat(currList)
            } else{
              this.searchlist = currList
            }
            this.loading = false
            this.pageNum++;
        })

    },
    //监听 触摸滚动
    touchMove() {
      if(document.documentElement.scrollTop > 100){
        this.isShow = true
      }else{
        this.isShow = false
      }
    },
    //返回 顶部
    toTop() {
      document.documentElement
    }
  },
  // 引入一个 混入对象
  mixins:[mixin],

  //  - filters: {
  //  -   number(price){
  //  -     return parseFloat(price).toFixed(2)
  //  -   }
  //  - }
})


