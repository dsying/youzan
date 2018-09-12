import Foot from 'components/Foot.vue'

/*
mixins:混入  是一种分发Vue组件中可复用功能的非常灵活的方式
        混入对象可以包含任意组件选项，当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项
*/

//定义一个混入对象
let mixin =  {
  components: {
    Foot
  },
  filters: {
    currency(price) {
      return parseFloat(price).toFixed(2)
    }
  },
}

export default mixin
