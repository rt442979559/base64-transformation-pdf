<template>
  <div>
    <el-table
      v-bind="$attrs"
      :data="tableData"
      border
      class="custom-table"
      :row-class-name="tableRowClassName"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
      header-cell-class-name="custom-table-header"
    >
      <template v-if="showSerialNumber">

      </template>
      <template v-for="(item,index) in tabelColumn">
        <template v-if="item.type==='index'">
          <!-- 显示序号 -->
          <el-table-column
            :key="index"
            label="序号"
            type="index"
            width="80"
            align="center"
          />
        </template>
        <template v-else>
          <!-- 正常表格渲染 -->
          <el-table-column v-if="item.labels" :key="index" :label="item.label">
            <!-- 合并单元格 -->
            <template v-for="(labelsItem,labelsIndex) in item.labels">
              <el-table-column v-if="labelsItem.render" :key="labelsIndex" :label="labelsItem.label" :width="labelsItem.width" :prop="labelsItem.prop">
                <template #default="scope">
                  <cell
                    :render="labelsItem.render"
                    :row="scope.row"
                    :index="scope.index_ + 1"
                    :column="labelsItem"
                  />
                </template>
              </el-table-column>
              <template v-else>
                <el-table-column :key="labelsIndex" :prop="labelsItem.prop" :label="labelsItem.label" :width="labelsItem.width" />
              </template>
            </template>
          </el-table-column>
          <template v-else>
            <!-- render形式渲染 -->
            <el-table-column v-if="item.render" :key="index" :label="item.label" :width="item.width" :prop="item.prop">
              <template #default="scope">
                <cell
                  :render="item.render"
                  :row="scope.row"
                  :index="scope.index_ + 1"
                  :column="item"
                />
              </template>
            </el-table-column>
            <!-- 正常表格渲染 -->
            <template v-else>
              <el-table-column :key="index" :prop="item.prop" :label="item.label" :width="item.width" />
            </template>
          </template>
        </template>

      </template>
      <!-- 自定义插槽 -->
      <slot name="tabelColumn" />
    </el-table>
    <div
      v-if="showPagination"
      class="pagination-box"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :total="allCount"
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import cell from './cell.vue'
export default defineComponent({
  name: 'CustomTable',
  components: {
    cell
  },
  props: {
    // 表格列
    columnStyle: {
      type: Array as any,
      default: () => [{ index: '1', class: 'column_sky' }]
    },
    // 表格列
    tabelColumn: {
      type: Array as PropType<Array<object>>,
      default: () => []
    },
    // 获取列表接口
    tableDataApi: {
      default: null,
      type: Function as PropType<(tableQuery)=>Promise<any> >
    },
    // 获取列表参数
    tableQuery: {
      default: () => {},
      type: Object as PropType<Object>
    },
    // 数据特殊处理
    tableDataDispose: {
      default: null,
      type: Function as PropType<(data)=>[]>
    },
    // 显示序号
    showSerialNumber: {
      default: false,
      type: Boolean as PropType<Boolean>
    },
    // 直接传入数据
    defaultData: {
      default: () => [],
      type: Array as PropType<Array<any>>
    },
    // 传入数据总数
    propsAllCount: {
      default: null,
      type: Number as PropType<Number>
    }
  },
  emits: ['success'],
  setup(props, ctx) {
    const tableData = ref<Array<any>>([])
    const allCount = ref<Number>(0)
    const showPagination = computed(() => { return allCount.value > 0 })

    /**
     * 请求数据
     */
    const handlerApiData = () => {
      props.tableDataApi(props.tableQuery).then(res => {
        if (res.success) {
          let data:Array<any> = []
          if (props.tableDataDispose) {
            data = props.tableDataDispose(res)
          } else {
            data = res.data.data
          }

          // 接口数据 参数不对 人员行为分析模块需要的参数
          // const allCount = res.data.data.allCount
          const allCount = res.data.allCount
          // 数据需要特殊处理
          tableData.value = data
          allCount.value = allCount
          // 抛出成功事件
          ctx.emit('success', data)
        }
      })
    }
    /**
     * 更新表格数据
     */
    const $updateTableData = () => {
      props.tableDataApi && handlerApiData()
    }
    watch(props.defaultData, (val) => {
      if (val.length > 0) {
        tableData.value = val
      } else {
        // handlerApiData()
      }
    }, { immediate: true })

    watch(props.propsAllCount, (val) => {
      if (val)allCount.value = val
    }, { immediate: true })

    const addClass = ({ row, column, rowIndex, columnIndex }) => {
      for (let i = 0; i < props.columnStyle.length; i++) {
        if (props.columnStyle[i].index === columnIndex) {
          return props.columnStyle[i].class
        }
      }
    }
    const testData = ref([
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ])

    onMounted(() => {
    })

    return {
      tableData,
      allCount, showPagination,
      $updateTableData,
      testData, addClass
    }
  }
})
</script>

<style lang='scss' scoped>
.pagination-box {
  padding: 0;
  margin-top: -10px;
  display: flex;
  justify-content: flex-end;
}
.custom-table {
  width: 100%;
  overflow-y: scroll;
  // border-radius: $radius8;
  &::-webkit-scrollbar {
    display: none;
  }
}

</style>
<style lang='scss'>
.column_sky {
  color: #00eaff;
}
.custom-table {
  .custom-table-header {
    background-color: #f7f8fa;
    font-size: 12px;
    color: #666666;
    padding: 6px 0;

    // padding: 0;
  }
  .el-table__row {
    td {
      padding: 6px 0 !important;
    }
  }
}

</style>
