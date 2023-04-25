<template>
    <div>

        <baidu-map class="search-view" @ready="mapReady" @click="getLocation" v-show="!dialogVisible">
            <!-- 搜索框 -->
            <!--   <bm-control :offset="{ width: '10px', height: '10px' }">
                <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
                    <el-input class="complete" v-model="keyword"></el-input>
                </bm-auto-complete>
                <el-button type="primary" @click="search">搜索</el-button>
            </bm-control> -->
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                @locationSuccess="locationSuccess"></bm-geolocation>
            <!-- 弹框 -->
            <!--  <bm-info-window :position="{ lng: longitude, lat: latitude }" :show="infoWindowShow" @clickclose="infoWindowClose">
        <p>纬度:{{ this.latitude }}</p>
        <p>经度:{{ this.longitude }}</p>
      </bm-info-window> -->
        </baidu-map>
        <el-dialog title="请选择地点" :visible.sync="dialogVisible" width="50%">
            <baidu-map class="search-view2" @ready="mapReady">
                <!-- 搜索框 -->
                <bm-control :offset="{ width: '10px', height: '10px' }">
                    <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
                        <el-input class="complete" v-model="keyword"></el-input>
                    </bm-auto-complete>
                    <el-button type="primary" @click="search">搜索</el-button>
                </bm-control>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                    @locationSuccess="locationSuccess"></bm-geolocation>
                <!-- 弹框 -->
                <!--  <bm-info-window :position="{ lng: longitude, lat: latitude }" :show="infoWindowShow" @clickclose="infoWindowClose">
        <p>纬度:{{ this.latitude }}</p>
        <p>经度:{{ this.longitude }}</p>
      </bm-info-window> -->
            </baidu-map>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>


export default {
    // 组件名
    name: "index",
    props: {
        position: {
            type: String,
            default: ""
        }
    },
    // 数据初始
    data() {
        return {

            point: null,//点位
            BMap: null,
            map: null, //实例

            keyword: '',

            longitude: '',
            latitude: '',
            dialogVisible: false

        };
    },
    // 初始化，获取数据集
    mounted() {




    },
    // 事件方法
    methods: {
        //地图初始化

        mapReady({ BMap, map }) {
            this.BMap = BMap
            this.map = map
            this.point = new BMap.Point(113.27, 23.13); // 选择一个经纬度作为中心点
            map.centerAndZoom(this.point, 12); //设置地图中心点和缩放级别

            this.map.enableScrollWheelZoom();//开启鼠标滚轮缩放功能。仅对PC上有效
            this.map.enableContinuousZoom();//启用连续缩放效果，默认禁用   

            let marker = new BMap.Marker(this.point);
            this.map.addOverlay(marker);//添加一个标注
        },

        //逆地址解析
        search() {
            this.map.clearOverlays()
            let myGeo = new this.BMap.Geocoder()

            myGeo.getPoint(this.keyword, (point) => {
                if (point) {

                    this.map.centerAndZoom(point, 15)
                    this.latitude = point.lat
                    this.longitude = point.lng

                    let marker = new BMap.Marker(point);
                    this.map.addOverlay(marker);//添加一个标注
                }
            })
        },

        //点击获取经纬度
        getLocation(e) {
            this.longitude = e.point.lng
            this.latitude = e.point.lat

            this.dialogVisible = true
        },



        locationSuccess({ point, AddressComponent, marker }) {
            console.log(AddressComponent);
        },
        cancel() {
            this.dialogVisible = false



        },
        confirm() {
            this.cancel()
            this.$emit('choose', this.keyword);
        }

    },
};
</script>
  
<style lang="scss">
.search-view {
    width: 300px;
    height: 100px;

}

.search-view2 {
    width: 700px;
    height: 400px;

    .complete {
        &::v-deep {
            .el-input__inner {
                background-color: #fff !important;
            }
        }
    }
}

.search-box {
    display: flex;
    align-items: center;
}

.complete {
    width: 210px;
    margin-right: 15px
}
</style>