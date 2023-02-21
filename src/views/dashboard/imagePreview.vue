<template>
  <div class="image-preview-ehl-custom-click">
    <i class="el-icon-close close-icon" @click="onClose"></i>
    <img class="img" :src="url" alt="">
  </div>
</template>

<script>
export default {
  name: "imagePreview",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      firstShow: false,
    }
  },
  created() {
    this.firstShow = false
    document.body.addEventListener("click", this.onBodyClick)
  },
  methods: {
    onClose(){
      this.$emit("update:show", false)
    },
    onBodyClick(e){
      if(!this.firstShow){
        return this.firstShow = true
      }
      const eventPathList = e.path
      let bol = true
      for(let i=0; i<eventPathList.length; i++){
        const classList = eventPathList[i].classList
        if(classList){
          Object.keys(classList).forEach(key=>{
            if(classList[key] === 'image-preview-ehl-custom-click'){
              bol = false
              return
            }
          })
        }
        if(!bol) break
      }
      if(bol){
        this.onClose()
      }
    }
  },
  beforeDestroy() {
    this.firstShow = false
    document.body.removeEventListener("click", this.onBodyClick)
  }
}
</script>

<style scoped lang="scss">
  .image-preview-ehl-custom-click{
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 60px 20px 30px 20px;
    min-width: 780px;
    min-height: 960px;
    background: #022b45;
    display: flex;
    justify-content: center;
    .img{
      width: auto;
      height: 960px;
      object-fit: cover;
    }
    .close-icon{
      position: absolute;
      right: 20px;
      top: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #909399
    }
  }
</style>
