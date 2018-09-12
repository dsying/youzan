### 过滤器
```javascript
  //价格保留两位有效数字
  filters:{
    number(price){
      return parseFloat(price).toFixed(2)
    }
  }
```
直接在html 中加个 管道       **|**
```html
<div class="price">￥{{ good.price | number }}</div>
```

### class绑定
```html
<div v-bind:class="{ active: isActive }"></div>
<!--或-->
<div :class="{ active: isActive }"></div>
```


### data中的数据设为null
list:null

1 通过异步接口获取数据,lodaing

2 获取回来的数据
 * 有数据 渲染   list&&list.length
 * 无数据 空状态的提示 list&&!list.length    


