<template>
  <el-card class="box-card">
    <div class="header">
      <div class="icon">新增事件</div>
      <el-button type="primary" round class="search" @click='increased'>上报</el-button>
      <el-button type="primary" round class="reset" @click='preserve'>保存</el-button>
    </div>
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div>事件基本信息</div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
          enctype="multipart/form-data">
          <el-row>
            <el-col :span="8"><el-form-item label="事件名称" prop="name">
                <el-input v-model="ruleForm.title"></el-input> </el-form-item></el-col>

            <el-col :span="8">
              <el-form-item label="事件分类" prop="name">
                <el-cascader v-model="ruleForm.classify" :options="classifyOptions" @change="handleChange"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8"><el-form-item label="发生时间" class="time">
                <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="选择日期时间" value-format="yyyy-DD-MM hh:mm:ss">
                </el-date-picker></el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><el-form-item label="事件性质" prop="name">
                <el-select v-model="ruleForm.properties" placeholder="请选择">
                  <el-option v-for="item in propertiesOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> </el-form-item></el-col>
            <el-col :span="8">
              <el-form-item label="紧急程度" prop="name">
                <el-select v-model="ruleForm.level" placeholder="请选择">
                  <el-option v-for="item in levelOptions" :key="item.level" :label="item.level" :value="item.level">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <div class="map"><Map @choose="choose"></Map></div>
          </el-row>
          <el-form-item label="发生位置" prop="region">
            <el-input v-model="ruleForm.position"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属街道" required>
                <el-select v-model="ruleForm.street" placeholder="请选择">
                  <el-option v-for="item in streetOptions" :key="item.street" :label="item.street" :value="item.street">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" required>

                <el-input v-model="ruleForm.community" placeholder="请输入详细地址"></el-input>

              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="事件描述" prop="type">
            <textarea rows="5" cols="170" style="resize: none" v-model="ruleForm.describe"></textarea>
          </el-form-item>

          <div style="font-weight: 700; margin: 20px 0">上报人信息</div>

          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="8"><el-form-item label="联系电话">
                <el-input v-model="ruleForm.phone" placeholder=""></el-input> </el-form-item></el-col>
          </el-row>
          <div style="font-weight: 700; margin: 20px 0">事件附件</div>
          <el-form-item label="">
            <el-upload class="avatar-uploader" action="http://localhost:8080/dev-api/event_img" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" :file-list="ImageList">

              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="img" alt="" />
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
import Map from './map.vue'
export default {
  components: {
    Map
  },
  data() {
    return {
      dialogVisible: false,
      img: '',
      ImageList: [],
      value: "",

      propertiesOptions: [],
      levelOptions: [],
      streetOptions: [],
      classifyOptions: [{
        value: '城运事件',
        label: '城运事件',
        children: [{
          value: '城市管理',
          label: '城市管理',
          children: [{
            value: '街面秩序类其他街面秩序类',
            label: '街面秩序类其他街面秩序类'
          }, {
            value: '市容环卫类-广告店招类',
            label: '市容环卫类-广告店招类'
          }, {
            value: '其他城管类其他城管类',
            label: '其他城管类其他城管类'
          }, {
            value: '市政设施类其他公用设施类',
            label: '市政设施类其他公用设施类'
          }, {
            value: '文化、文物类-违规出版和出售类',
            label: '文化、文物类-违规出版和出售类'
          }, {
            value: '文化文物类非法印刷经营类',
            label: '文化文物类非法印刷经营类'
          }]
        }, {
          value: '公共卫生',
          label: '公共卫生',
          children: [{
            value: '卫生类-食物中毒类',
            label: '卫生类-食物中毒类'
          }, {
            value: '卫生类_细菌感染类',
            label: '卫生类_细菌感染类'
          }, {
            value: '卫生类-离流感等动物类疫情',
            label: '卫生类-离流感等动物类疫情'
          }, {
            value: '卫生类-诺如病毒类',
            label: '卫生类-诺如病毒类'
          },
          {
            value: '卫生类_细菌感染类',
            label: '卫生类_细菌感染类'
          }, {
            value: '卫生类流感类',
            label: '卫生类流感类'
          }, {
            value: '卫生类其他中毒类',
            label: '卫生类其他中毒类'
          }, {
            value: '疫情防控类冷链运输类',
            label: '疫情防控类冷链运输类'
          }, {
            value: '疫情防控类境外输入类',
            label: '疫情防控类境外输入类'
          }, {
            value: '疫情防控类跨省输入类',
            label: '疫情防控类跨省输入类'
          },]
        }
          , {
          value: '环保',
          label: '环保',
          children: [{
            value: '环境保护类固体危险废物类',
            label: '环境保护类固体危险废物类'
          }, {
            value: '环境保护类-暴露垃圾类',
            label: '环境保护类-暴露垃圾类'
          }, {
            value: '环境保护类噪声扰民类',
            label: '环境保护类噪声扰民类'
          }, {
            value: '环境保护类油烟扰民类',
            label: '环境保护类油烟扰民类'
          }, {
            value: '环境保护类废气污染类',
            label: '环境保护类废气污染类'
          }, {
            value: '环境保护类水污染类',
            label: '环境保护类水污染类'
          }, {
            value: '环境保护类扬尘污染类',
            label: '环境保护类扬尘污染类'
          }, {
            value: '环境保护类动物腐尸类',
            label: '环境保护类动物腐尸类'
          }, {
            value: '环境保护类土壤污染类',
            label: '环境保护类土壤污染类'
          }, {
            value: '环境保护类大气污染类',
            label: '环境保护类大气污染类'
          }, {
            value: '环境保护类生态破坏、乱砍滥伐乱移树木类',
            label: '环境保护类生态破坏、乱砍滥伐乱移树木类'
          },
          ]
        }
          , {
          value: '政府服务',
          label: '政府服务',
          children: [{
            value: '民生服务类-救灾募捐类',
            label: '民生服务类-救灾募捐类'
          }, {
            value: '民生服务类-民间组织类',
            label: '民生服务类-民间组织类'
          }, {
            value: '民生服务类-区划地名类',
            label: '民生服务类-区划地名类'
          }, {
            value: '民生服务类社会服务类',
            label: '民生服务类社会服务类'
          }, {
            value: '民生服务类-其他民生服务类',
            label: '民生服务类-其他民生服务类'
          }, {
            value: '社情民意类关爱救助类',
            label: '社情民意类关爱救助类'
          }, {
            value: '社情民意类投诉咨询类',
            label: '社情民意类投诉咨询类'
          }, {
            value: '民生服务类-福利慈善类',
            label: '民生服务类-福利慈善类'
          },
          ]
        }
          , {
          value: '灾害类',
          label: '灾害类',
          children: [{
            value: '自然灾害类洪涝灾害类',
            label: '自然灾害类洪涝灾害类'
          }, {
            value: '自然灾害类其他地质灾害',
            label: '自然灾害类其他地质灾害'
          }, {
            value: '自然灾害类地震灾害类',
            label: '自然灾害类地震灾害类'
          }, {
            value: '自然灾害类森林(草原)火灾类',
            label: '自然灾害类森林(草原)火灾类'
          }, {
            value: '自然灾害类-气象灾害类',
            label: '自然灾害类-气象灾害类'
          }, {
            value: '自然灾害类干旱灾害类',
            label: '自然灾害类干旱灾害类'
          }, {
            value: '自然灾害类-其他自然灾害类',
            label: '自然灾害类-其他自然灾害类'
          }, {
            value: '自然灾害类-山体滑坡灾害类',
            label: '自然灾害类-山体滑坡灾害类'
          }, {
            value: '自然灾害类-泥石流灾害类',
            label: '自然灾害类-泥石流灾害类'
          }, {
            value: '自然灾害类-地面場陷灾害类',
            label: '自然灾害类-地面場陷灾害类'
          },]
        }
          , {
          value: '安全应急',
          label: '安全应急',
          children: [
            {
              value: '安全生产类其他安全生产类',
              label: '安全生产类其他安全生产类'
            }, {
              value: '社会治安类其他社会治安类',
              label: '社会治安类其他社会治安类'
            }, {
              value: '社会治安类公共场所类安全事件',
              label: '社会治安类公共场所类安全事件'
            }, {
              value: '社会治安类涉暴恐类',
              label: '社会治安类涉暴恐类'
            }, {
              value: '社会治安类涉枪涉爆类',
              label: '社会治安类涉枪涉爆类'
            }, {
              value: '社会治安类-涉黄、赌、毒类',
              label: '社会治安类-涉黄、赌、毒类'
            }, {
              value: '社会治安类涉黑涉恶类',
              label: '社会治安类涉黑涉恶类'
            },
            {
              value: '社会治安类涉盗、抢类',
              label: '社会治安类涉盗、抢类'
            },
            {
              value: '社会治安类传销诈骗类',
              label: '社会治安类传销诈骗类'
            },
            {
              value: '消防安全类群租房消防隐患类',
              label: '消防安全类群租房消防隐患类'
            }, {
              value: '消防安全类危险用火类',
              label: '消防安全类危险用火类'
            }, {
              value: '消防安全类消防设施异常类',
              label: '消防安全类消防设施异常类'
            }, {
              value: '消防安全类消防通道堵塞类',
              label: '消防安全类消防通道堵塞类'
            }, {
              value: '消防安全类消防知识宣传教育类',
              label: '消防安全类消防知识宣传教育类'
            }, {
              value: '消防安全类危险用电类',
              label: '消防安全类危险用电类'
            },

          ]
        }
          , {
          value: '保障类',
          label: '保障类',
          children: [{
            value: '劳动保障类其他劳动保障类',
            label: '劳动保障类其他劳动保障类'
          }, {
            value: '劳动保障类-工资福利',
            label: '劳动保障类-工资福利'
          }, {
            value: '劳动保障类-极端方式讨薪类',
            label: '劳动保障类-极端方式讨薪类'
          }, {
            value: '劳动保障类-强迫劳动类',
            label: '劳动保障类-强迫劳动类'
          }, {
            value: '劳保保障类使用童工类',
            label: '劳保保障类使用童工类'
          }, {
            value: '劳动保障类-工伤认定、赔偿等问题类',
            label: '劳动保障类-工伤认定、赔偿等问题类'
          },]
        }
          , {
          value: '舆情舆论',
          label: '舆情舆论',
          children: [{
            value: '舆情、舆论类征地拆迁类',
            label: '舆情、舆论类征地拆迁类'
          }, {
            value: '舆情、舆论类房地产市场类',
            label: '舆情、舆论类房地产市场类'
          }, {
            value: '舆情、舆论类-劳动社保类',
            label: '舆情、舆论类-劳动社保类'
          }, {
            value: '舆论、舆论类金融及非法集资类',
            label: '舆论、舆论类金融及非法集资类'
          }, {
            value: '舆情、舆论类生态环境类',
            label: '舆情、舆论类生态环境类'
          }, {
            value: '舆情、舆论类教育医疗类',
            label: '舆情、舆论类教育医疗类'
          }, {
            value: '舆情、舆论类-交通运输类',
            label: '舆情、舆论类-交通运输类'
          }, {
            value: '舆情、舆论类-生活保障类',
            label: '舆情、舆论类-生活保障类'
          }, {
            value: '舆情、舆论类.其他舆情类',
            label: '舆情、舆论类.其他舆情类'
          }, {
            value: '舆情、舆论类-网络舆情类',
            label: '舆情、舆论类-网络舆情类'
          },]
        }
          , {
          value: '市场监管',
          label: '市场监管',
          children: [{
            value: '市场监管类-特种设备安全类',
            label: '市场监管类-特种设备安全类'
          }, {
            value: '市场监管类-食品药品安全类',
            label: '市场监管类-食品药品安全类'
          }, {
            value: '市场监管类三小行业食品安全类',
            label: '市场监管类三小行业食品安全类'
          }, {
            value: '市场监管类-监管其他类',
            label: '市场监管类-监管其他类'
          },]
        }
          , {
          value: '交管交安',
          label: '交管交安',
          children: [{
            value: '交通设施类其他交通设施类',
            label: '交通设施类其他交通设施类'
          }, {
            value: '交通管理类重点车辆管理类',
            label: '交通管理类重点车辆管理类'
          }, {
            value: '交通管理类非法占道施工类',
            label: '交通管理类非法占道施工类'
          }, {
            value: '交通管理类交通安全设施隐患类',
            label: '交通管理类交通安全设施隐患类'
          }, {
            value: '交通管理类其他交通管理类',
            label: '交通管理类其他交通管理类'
          },]
        }
          , {
          value: '矛盾纠纷',
          label: '矛盾纠纷',
          children: [{
            value: '群体性类-劳动社保类',
            label: '群体性类-劳动社保类'
          }, {
            value: '群体性类征地拆迁类',
            label: '群体性类征地拆迁类'
          }, {
            value: '群体性类-教育医疗类',
            label: '群体性类-教育医疗类'
          }, {
            value: '群体性类交通运输类',
            label: '群体性类交通运输类'
          }, {
            value: '群体性类生活保障类',
            label: '群体性类生活保障类'
          }, {
            value: '群体性类-其他群体性事件类',
            label: '群体性类-其他群体性事件类'
          }, {
            value: '纠纷类婚恋家庭纠纷类',
            label: '纠纷类婚恋家庭纠纷类'
          }, {
            value: '纠纷类-邻里纠纷类',
            label: '纠纷类-邻里纠纷类'
          },]
        }, {
          value: '文教旅',
          label: '文教旅',
          children: [{
            value: '教育监管类违规违法动学类',
            label: '教育监管类违规违法动学类'
          }, {
            value: '教育监管类学校安全隐患类',
            label: '教育监管类学校安全隐患类'
          }, {
            value: '教育监管类教育机构类',
            label: '教育监管类教育机构类'
          }, {
            value: '教育监管类涉及教师类',
            label: '教育监管类涉及教师类'
          }, {
            value: '教育监管类教育体制关',
            label: '教育监管类教育体制关'
          }]
        }, {
          value: '司法',
          label: '司法',
          children: [{
            value: '法律和行政类-法律服务类',
            label: '法律和行政类-法律服务类'
          }, {
            value: '法律和行政类-法律援助类',
            label: '法律和行政类-法律援助类'
          }, {
            value: '法律和行政类-行政复议类',
            label: '法律和行政类-行政复议类'
          },]
        }
        ]
      }],
      ruleForm: {
        title: '',
        classify: '',
        time: '',
        properties: '',
        level: '',
        position: '',
        street: '',
        describe: '',
        community: '',
        name: "",
        sex: '',
        phone: '',
        ImageList: '',
        state: '待处理',
        opinion: ''

      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],

        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],


      },

    };
  },
  mounted() {
    this.getEventProperties()
    this.getEventLevel()
    this.getEventStreet()
  },
  methods: {
    handleChange(value) {

    },
    getEventProperties() {
      this.$api.event.reqEventProperties().then((res) => {
        this.propertiesOptions = res.data
      })
    },
    getEventLevel() {
      this.$api.event.reqEventLevel().then((res) => {
        this.levelOptions = res.data
      })
    },
    getEventStreet() {
      this.$api.event.reqEventStreet().then((res) => {
        this.streetOptions = res.data
      })
    },
    increased() {
      console.log(this.ruleForm);

      this.$api.event.reqEventDetail({
        ruleForm: this.ruleForm
      }).then((res) => {
        res.code == 200 ? (this.$message.success('上报成功!'), this.$router.push('/')) : this.$message.error('上报失败!，请重新上报');
      })
    },
    preserve() {

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
    handleAvatarSuccess(res, file, fileList) {
      this.ruleForm.ImageList = fileList
      console.log(this.ruleForm.ImageList);
      /* this.ruleForm.img = URL.createObjectURL(file.raw); */

    },
    beforeAvatarUpload(file) {

      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.img = file.url;
      this.dialogVisible = true;
    },
    choose(keyword) {
      this.ruleForm.position = keyword
    }
  },
};
</script>

<style lang="scss" scoped>
@import url('./new.scss');
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
        // width: 371px;
        width: 370px;
      }

      .el-input--suffix .el-input__inner {
        // width: 371px;
        width: 370px;
      }

      .el-picker-panel {
        background-color: transparent !important;
      }
    }

   

    .clearfix {
      font-weight: 700;
    }
  }
}

.map {
  position: absolute;
  top: -30px;
  right: 140px;
  width: 300px;
  height: 100px;

}
</style>

