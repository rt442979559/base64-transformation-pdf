<script lang='ts'>
import { defineComponent, h, PropType } from 'vue'
interface Params {
  row:object,
  index:number,
  column?:object
}
export default defineComponent({
  name: 'Cell',
  props: {
    render: {
      type: Function as PropType<(h, params) => void>,
      default: () => {}
    },
    row: {
      type: Object as PropType<Object>,
      default: {}
    },
    index: {
      type: Number as PropType<number>,
      default: null
    },
    column: {
      type: Object as PropType<Object>,
      default: {}
    }
  },
  setup(props, ctx) {
    const params:Params = {
      row: props.row,
      index: props.index
    }

    if (props.column)params.column = props.column
    // console.log(props.render, 'render')
    // const temp:Array<any> = []
    // temp.push(h('span', { props: 'name' }, 'test1'))
    // temp.push(h('span', { props: 'name' }, 'test2'))
    // console.log(props.render(h, params))
    // const temp2:any = props.render(h, params)
    // console.log(temp2)
    return () => props.render(h, params)
    // return () => h('div', {
    //   type: 'prime',
    //   size: 'mini'
    // }, 'test')
  }
})
</script>
