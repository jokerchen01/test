<template>
  <div class="leaving">
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="ruleForm.name"
            placeholder="搜索离校申请(学号)"
          ></el-input>
        </el-col>
      </el-row>
      <div class="tableList">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection"> </el-table-column>

          <el-table-column label="姓名" prop="name"> </el-table-column>
          <el-table-column label="学号" prop="date"> </el-table-column>
          <el-table-column label="学院" prop="name"> </el-table-column>
          <el-table-column label="专业班级" prop="name"> </el-table-column>
          <el-table-column label="电话" prop="name"> </el-table-column>
          <el-table-column label="权限" prop="name"> </el-table-column>

          <el-table-column align="center" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="goDetail"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <section class="detail">
      <el-dialog
        title="申请详情"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form label-width="80px" v-model="form">
          <el-form-item label="申请人">
            <el-col :span="8">
              <el-input v-model="form.applicant"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="学号">
            <el-col :span="8">
              <el-input v-model="form.sno"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="专业班级">
            <el-col :span="24">
              <el-input v-model="form.class"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="电话">
            <el-col :span="8">
              <el-input v-model="form.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="请假理由">
            <el-col :span="24">
              <textarea class="textarea"></textarea>
            </el-col>
          </el-form-item>
          <el-form-item label="出校时间">
            <el-col :span="8">
              <el-date-picker
                v-model="form.start_time"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="返校时间">
            <el-col :span="8">
              <el-date-picker
                v-model="form.end_time"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="目的地">
            <el-col :span="24">
              <el-input v-model="form.destination"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="审批记录">
            <el-col :span="24">
              <el-table :data="form.tableList" style="width: 100%">
                <el-table-column prop="Approver" label="操作人" width="width">
                </el-table-column>
                <el-table-column prop="opinion" label="审批意见" width="width">
                </el-table-column>
                <el-table-column prop="time" label="处理时间" width="width">
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
          <el-form-item label="审批人">
            <el-col :span="24">
              <el-input v-model="form.Approver"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="审批意见">
            <el-col :span="24">
              <el-input v-model="form.opinion"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="审批结果">
            <el-radio-group v-model="form.reason">
              <el-radio label="同意"></el-radio>
              <el-radio label="拒绝"></el-radio>
              <el-radio label="不做处理"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">同意</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >拒绝</el-button
          >
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogVisible: false,
      form: {
        applicant: "",
        sno: "",
        class: "",
        phone: "",
        reason: "",
        leave_time: "",
        return_time: "",
        destination: "",
        Approver: "",
        opinion: "",
        start_time: "",
        end_time: "",
        tableList: [
          {
            Approver: "张三",
            opinion: "无",
            time: "2022-11-28",
          },
        ],
      },
      resource: "",
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    goDetail() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.leaving {
  width: 90%;
  margin-top: 30px;
  padding-left: 30px;

  .detail {
    height: 500px;
    overflow-y: auto;
    textarea {
      resize: none;
      min-height: 80px;
      width: 100%;
      outline-color: rgb(84, 157, 254); // 鼠标聚焦边框颜色
    }
  }
  .tableList {
    ::v-deep {
      .el-table__header {
        background: transparent;
      }
      .el-table thead tr{
        color: #909399;
        font-weight: 500;
         background: #fff !important;
      }
      .el-table tbody tr {
         color: black;
         background: #fff !important;
      }
      .el-table tr {
        font-size: 16px;
      }
      
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
}
</style>