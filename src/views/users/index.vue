<template>
  <div class="leaving">
    <el-form>
      <el-button type="primary" round @click="newUser">新增角色</el-button>
      <div class="tableList">
        <el-table :data="tableData" style="width: 100%">

          <el-table-column label="用户名" prop="username"> </el-table-column>
          <el-table-column label="所属街道" prop="street"> </el-table-column>
          <el-table-column label="姓名" prop="name"> </el-table-column>
          <el-table-column label="性别" prop="sex"> </el-table-column>
          <el-table-column label="电子邮箱" prop="email"> </el-table-column>
          <el-table-column label="电话" prop="phone"> </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">

              <el-button type="danger" icon="el-icon-delete" circle @click="deleted(scope.row.name)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <section class="detail">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        确认删除该用户吗？
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handle">确定</el-button>
        </span>
      </el-dialog>
    </section>
    <section class="detail">
      <el-dialog title="提示" :visible.sync="dialogVisible2" width="40%" :before-close="handleClose2">
        <el-form :model="users" label-position="left" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="users.username" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="users.password" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="users.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="所属街道" label-width="100px">
            <el-select v-model="users.street" placeholder="请选择">
                  <el-option v-for="item in streetOptions" :key="item.street" :label="item.street" :value="item.street">
                  </el-option>
                </el-select>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="handle2">确定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      name: '',
      users: {
        username: '',
        password: '',
        name: '',
        street:''
      },
      streetOptions: [],
    };
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    getUserInfo() {
      this.$api.event.reqAllUsers().then((res) => {

        this.tableData = res.data

      })
      this.$api.event.reqEventStreet().then((res) => {
        this.streetOptions = res.data
      })
    },
    deleted(name) {

      this.name = name
      this.dialogVisible = true
    },
    handle() {
      this.$api.event.reqUsersDelete({
        name: this.name
      }).then((res) => {
        res.code == 200 ? (this.$message.success('删除成功!'), this.getUserInfo()) : this.$message.error('删除失败!');
      })
      this.dialogVisible = false
    },
    handle2() {
      this.$api.event.reqNewUser({
        users: this.users
      }).then((res) => {
        res.code == 200 ? (this.$message.success('添加成功!'), this.getUserInfo()) : this.$message.error('添加失败!');
      })
      this.dialogVisible2 = false
    },
    newUser() {
      this.dialogVisible2 = true
    }
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

      .el-table thead tr {
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