<template>
  <div class="home">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username" class="width_input" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" class="width_input"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" class="width_input"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" class="width_input"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" class="width_input"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>

export default {
  components: {

  },

  data() {
    return {
      form: {
        username: '',
        name: '',
        sex: '',
        age: '',
        email: "",
        phone: ''

      }

    };
  },
  mounted() {

    this.$api.event.reqEventUserInfo({
      username: this.$store.state.user.name
    }).then((res) => {
      this.form = res.data[0]

    })
  },
  methods: {
    onSubmit() {
      this.$api.event.reqEventUserChangeInfo({
        form: this.form
      }).then((res) => {
        if(res.code==200){
          this.$message({
                message: "保存成功！",
                type: "success",
              });
        }
      })
    },
    cancel(){
      this.$router.push({
        path:'/'
      })
    }
  },
};
</script>
  
<style>
.home {
  margin-top: 20px;
  margin-left: 30px;
}

.width_input {
  width: 500px;
}
</style>