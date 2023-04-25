<template>
  <div class="main">
    <el-card class="box-card">
      <div class="header">
        <div class="icon"></div>
        <el-input v-model="id" placeholder="请输入事件编号(数字)" @input="handleEdit"></el-input>
        <el-button type="primary" round class="search" @click="goSearch" >查询</el-button>
        <el-button type="primary" round class="reset" @click="goReset">重置</el-button>
      </div>
      <div class="content">
        <div class="table-main">
          <div class="list-card" v-for="(v, index) in list.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            :key="v.id">
            <div class="icon">
              <img src="@/assets/images/event/jnqsjsnxt.ce1e5be8.png" />
            </div>
            <div class="clearfix">
              <div class="item-info">
                <div class="left">
                  <div class="title">{{v.title}}</div>
                  <div>
                    <div>事件编号:{{ v.id }}</div>
                    <div>上报人:{{ v.name }}</div>
                    <div>所属街道:{{ v.street }}</div>
                    <div>事件分类:{{ v.classify }}</div>
                    <div>上报时间:{{ v.time }}</div>
                  </div>
                </div>
                <div class="right">
                  <div class="event-state">
                    <img src="@/assets/images/event/下载 (4).png" alt="" />
                    <div class="event-state-text">日常事件</div>
                  </div>
                </div>
              </div>

              <div class="line"></div>
              <div class="detail">
                <el-button type="primary" round @click="goDetail(v.id)">详情</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-pagination background layout="prev, pager, next" :total=list.length :current-page="currentPage"
          :page-size="pageSize" @current-change="handleCurrentChange" class="pagination">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>

export default {
  props: {
    state: {
      type: String,

    }
  },
  data() {
    return {
      id: "",
      list: [],
      page: 1,
      currentPage: 1,
      pageSize: 5,


    };
  },
  watch: {
    state: {
      handler(newVal) {
        this.getInfo(newVal)

      },
      immediate: true
    }
  },
  mounted() {


  },
  methods: {
    getInfo(newVal) {
      if (newVal == '待处理') {
        this.$api.event.reqEventSearch().then((res) => {
          this.list = res.data.filter((v) => {

            return v.state == '待处理'
          })
        })
      } else if (newVal == '处理中') {
        this.$api.event.reqEventSearch().then((res) => {
          this.list = res.data.filter((v) => {

            return v.state == '处理中'
          })
        })
      } else if (newVal == '已完成') {
        this.$api.event.reqEventSearch().then((res) => {
          this.list = res.data.filter((v) => {

            return v.state == '已完成'
          })
        })
      } else {
        this.$api.event.reqEventSearch().then((res) => {
          this.list = res.data
        })
      }

    },
    goDetail(id) {
      this.$emit("changeState", "detail");
      this.$emit("changeID", id);
    },
    handleCurrentChange(page) {
      this.currentPage = page
    },
    goSearch() {

      if (this.state != '全部') {
        this.$api.event.reqEventSearchState({
          id: this.id,
          state: this.state
        }).then((res) => {
          res.data.length != 0 ? (this.list = res.data, this.$message.success('查询成功!')) : this.$message.error('编号不存在，请重新查询!');
        })
      } else {
        this.$api.event.reqEventSearchID({
          id: this.id
        }).then((res) => {
          res.data.length != 0 ? (this.list = res.data, this.$message.success('查询成功!')) : this.$message.error('编号不存在，请重新查询!');
        })
      }


    },
    handleEdit(e) {
      let value = e.replace(/^(0+)|[^\d]+/g, ''); // 以0开头或者输入非数字，会被替换成空
      value = value.replace(/(\d{15})\d*/, '$1') // 最多保留15位整数
      this.id = value
    },

    goReset() {
      this.getInfo(this.state)
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;

  .box-card {
    height: calc(((((100vh - 24px) - 20px) - 20px) - 10px) - 10px);
    margin: 20px;

    .header {
      display: flex;
      margin: 20px 0;

      .icon {
        width: 2000px;
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
      display: flex;
      width: 100%;
      height: 620px;
      margin-top: 16px;
      flex: 1;
      flex-direction: column;

      .table-main {
        flex: 1;
        padding: 20px 20px 0 20px;
        overflow: auto;
        height: 100%;

        .list-card {
          position: relative;

          .icon {
            position: absolute;
            left: -14px;
            top: -18px;
          }

          .clearfix {
            width: 100%;
            height: 160px;
            margin-bottom: 30px;
            box-shadow: 0 4px 14px 0 rgb(188 214 254 / 43%);
            border-radius: 8px;
            border: 1px solid #f1f5ff;
            background: #f1f5ff url("~@/assets/images/event/下载 (5).png") no-repeat calc(100% + 15px) calc(100% - 99px);

            .item-info {
              display: flex;

              .left {
                width: 1300px;
                height: 120px;
                padding-left: 20px;

                .title {
                  font-weight: 700;
                  padding-top: 10px;
                }

                &>div {
                  display: flex;
                  margin-top: 20px;

                  &>div {
                    flex: 1;
                  }
                }
              }

              .right {
                margin-top: 30px;

                .event-state {
                  position: relative;
                  color: #69b41b;

                  .event-state-text {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 69px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    font-size: 16px;
                  }
                }
              }
            }

            .line {
              width: calc(100% - 40px);
              height: 1px;
              background-color: #3986fe;
              position: absolute;
              bottom: 40px;
              left: 50%;

              transform: translateX(-50%);
            }

            .detail {
              text-align: right;
            }
          }
        }
      }
    }
  }

  .footer {
    height: 100px;
    width: 100%;

    &::v-deep {
      .el-pagination {
        text-align: center;
      }
    }
  }
}
</style>
