<template>
  <el-card class="box-card">
    <div class="header">
      <div class="icon">新增事件</div>
      <el-button type="primary" round class="return" @click="back">返回</el-button>
      <!--   <el-button type="primary" round class="search">上报</el-button>
      <el-button type="primary" round class="reset">保存</el-button> -->
    </div>
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div>事件基本信息</div>
        </div>
        <el-form label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8"><el-form-item label="事件名称" prop="name">
                <el-input v-model="eventInfo.title" width="100px" :disabled="true"></el-input> </el-form-item></el-col>
            <el-col :span="8">
              <el-form-item label="事件分类" prop="name">
                <el-input v-model="eventInfo.classify" width="100px" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"><el-form-item label="发生时间">
                <el-input v-model="eventInfo.time" width="100px" :disabled="true"></el-input></el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><el-form-item label="事件性质" prop="name">
                <el-input v-model="eventInfo.properties" width="100px" :disabled="true"></el-input>
              </el-form-item></el-col>
            <el-col :span="8">
              <el-form-item label="紧急程度" prop="name">
                <el-input v-model="eventInfo.level" width="100px" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发生位置" prop="region">
                <el-input v-model="eventInfo.position" width="100px" :disabled="true"></el-input>
              </el-form-item>
            </el-col>


          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属街道" required>
                <el-input v-model="eventInfo.street" width="100px" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" required>
                <el-col :span="8">
                  <el-input v-model="eventInfo.street" width="100px" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="事件描述" prop="type">
            <textarea rows="5" cols="170" style="resize: none;border: 1px solid #ccc;" readonly="readonly">
              {{ eventInfo.describe }}
            </textarea>
          </el-form-item>

          <div style="font-weight: 700; margin: 20px 0">上报人信息</div>

          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="eventInfo.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="性别">
                <el-radio-group v-model="eventInfo.sex" :disabled="true">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="8"><el-form-item label="联系电话">
                <el-input v-model="eventInfo.phone" placeholder="" :disabled="true"></el-input> </el-form-item></el-col>
          </el-row>
          <div style="font-weight: 700; margin: 20px 0">事件附件</div>
          <el-form-item label="">
            <el-upload action="#" class="avatar-uploader" list-type="picture-card" :on-preview="handlePictureCardPreview"
              :file-list="ImageList">
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-dialog>
          </el-form-item>
          <el-form-item>

          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </el-card>
</template>

<script>

export default {
  props: {
    id: {
      type: String,

    }
  },
  data() {
    return {
      dialogVisible: false,
      value1: '',
      eventInfo: [],

      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      imageUrl: '',
      ImageList:[]
    };
  },
  watch: {
    id: {
      handler(newVal) {

        if (newVal) {
          this.getEventInfo()
        }
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    getEventInfo() {
      this.$api.event.reqEventInfo({
        id: this.id
      }).then((res) => {
        this.eventInfo = res.data[0]
        this.ImageList = JSON.parse(res.data[0].img)
        console.log(res.data[0]);
      })
    },
    back() {
      this.$emit("changeState", "search");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  padding: 20px;
}

.header {
  display: flex;
  margin-bottom: 20px;

  .icon {
    width: 2000px;
    font-weight: 700;
    font-size: 20px;
    padding-top: 10px;
  }

  .return {
    width: 150px;
    height: 30px;
    line-height: 5px;
  }

  .search {
    width: 150px;
    height: 30px;
    line-height: 5px;
    margin: 0 20px;
  }

  .reset {
    width: 150px;
    height: 30px;
    line-height: 5px;
  }
}

.pagination {
  text-align: center;
}

.content {
  .box-card {
    margin-bottom: 20px;

    &::v-deep {
      .el-select .el-input__inner {
        width: 371px;
      }

      .el-input--suffix .el-input__inner {
        width: 371px;
      }
    }

    .clearfix {
      font-weight: 700;
    }
  }
}
</style>
