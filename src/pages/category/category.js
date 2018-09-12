import './category.css'
import 'css/common.css'
import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue'
import mixin from "js/mixin.js";
// import Foot from 'components/Foot.vue'

new Vue({
  el: '#app',
  data: {
    toplist: null,
    navIndex: 0,
    hotGoods: null,      //商品榜
    hotKeywords: null,   //关键词榜
    hotShops: null,      //门店榜
    categoryList: null,  //热门分类
    brandList: null,     //热门品牌
  },
  created() {
    //加载导航
    this.getTopList()
    //分类初始加载综合排行
    this.getSubList(0)
  },
  //引入一个混入对象，替代可复用的Foot组件和过滤器number
  mixins: [mixin],
  //  - components: {
  //  -   Foot
  //  - },
  //  - filters: {
  //  -   number(price) {
  //  -     return parseFloat(price).toFixed(2)
  //  -   }
  //  - },
  methods: {
    //导航
    getTopList: function () {
      axios.get(url.topList).then(resolve => {
        this.toplist = resolve.data.lists
      })
    },
    //综合排行
    getCategoryRank: function () {
      axios.get(url.rank).then(resolve => {
        this.hotGoods = resolve.data.data.hotGoods
        this.hotShops = resolve.data.data.hotShops
        this.hotKeywords = resolve.data.data.hotKeywords
      })
    },
    //普通排行
    getSubList: function (index, id) {
      this.navIndex = index
      if (index === 0) {
        //综合排行
        this.getCategoryRank()
      } else {
        axios.get(url.sublist, {
          params: {
            id: id
          }
        }).then(res => {
          this.categoryList = res.data.data.categoryList
          this.brandList = res.data.data.brandList
        })
      }
    },
    //
    toSearch: function (list) {
      location.href =  `search.html?keyword=${list.name}&id=${list.id}`
    }

  }
})
