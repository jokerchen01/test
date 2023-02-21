<template>
  <el-card class="box-card">
    <div class="header">
      <div class="icon">新增事件</div>
      <el-input v-model="value" placeholder="请输入事件编号"></el-input>
      <el-button type="primary" round class="search">查询</el-button>
      <el-button type="primary" round class="reset">重置</el-button>
    </div>
    <div class="content">
      <el-card class="box-card" v-for="(v, index) in list" :key="index">
        <div slot="header" class="clearfix">
          <div class="left">
            <span>{{ v.name }}</span>
            <div>
              <div>事件编号:</div>
              <div>上报人:</div>
              <div>所属街道:</div>
              <div>事件分类:</div>
              <div>上报时间:</div>
            </div>
          </div>
          <div class="right">
            <span>图片</span>
          </div>
        </div>

       
      </el-card>
    </div>
  
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 20px;

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
  .box-card {
    margin-bottom: 20px;
    .clearfix {
      display: flex;
      .left {
        width: 1200px;
        height: 100px;
        & > div {
          display: flex;
          margin-top: 20px;
          & > div {
            flex: 1;
          }
        }
      }
      .right {
      }
    }
  }
}
</style>