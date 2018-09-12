import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

// qs 模块 获取url的queryString
let {keyword,id} = qs.parse(location.search.substr(1))
new Vue({
  el: '.container',
  data: {
    keyword: keyword,
    id: parseInt(id),
    searchlist: null
  },
  created() {
    axios.get(url.searchlist,{
      params:{
        keyword: this.keyword,
        id: this.id
      }
    }).then(res => {
      this.searchlist = res.data.lists
    })
  },
  methods: {

  },
  filters: {
    number(price){
      return parseFloat(price).toFixed(2)
    }
  }
})


