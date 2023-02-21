<template>
  <section>
    <div class="table_pop">
      <el-table
        style="width: 100%"
        max-height="600"
        :data="problemObj.problemList"
      >
        <el-table-column type="index" label="序号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="event_no"
          label="事件编号"
          align="center"
          width="150"
        >
        </el-table-column>
        <!--  prop="event_source" -->
        <el-table-column
          label="事件来源"
          :show-overflow-tooltip="true"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <span>区城运平台</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="event_type_pid"
          label="事件分类"
          :show-overflow-tooltip="true"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="submit_time"
          label="上报时间"
          :show-overflow-tooltip="true"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="map_info"
          label="事件地点"
          :show-overflow-tooltip="true"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="紧急程度"
          :show-overflow-tooltip="true"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="事件详情"
          :show-overflow-tooltip="true"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="event_status"
          label="事件状态"
          :show-overflow-tooltip="true"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <span @click="goDetails(scope.row.uuid)" class="reply">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="problemObj.page"
        :page-size="problemObj.pageSize"
        :total="problemObj.total"
        @current-change="handleTableChange"
      >
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    problemObj: {
      type: Object,
    },
  },

  data() {
    return {};
  },

  methods: {
    handleTableChange(page) {
      this.$emit("handleTableChange", page);
    },
    goDetails(id) {
      this.$parent.isShowContainer = false;
      //对应外层组件
      this.$emit("showDetail", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.table_pop {
  ::v-deep {
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      width: 36px;
      height: 36px;
      line-height: 36px;
      background: rgba(174, 216, 255, 0.06);
      border-radius: 2px;
    }
    .el-pager li.active {
      width: 36px;
      height: 36px;
      background: rgba(174, 216, 255, 0.06);
      border-radius: 2px;
    }
  }
}
</style>