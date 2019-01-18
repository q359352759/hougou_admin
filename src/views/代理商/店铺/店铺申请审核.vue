<template>
    <div>
        <el-button class="block" @click="返回上一页()" size="mini" type="info" icon="el-icon-arrow-left" circle></el-button>    
        <div class="title_1 text-center">{{shop.name}}</div>

        <el-row>
            <el-col :span="12">
                <ul class="box_3">
                    <li>店铺名称：{{shop.name}}</li>
                    <li>申请入驻时间：{{shop.createTime | dateFtt('yyyy-MM-dd hh:mm:ss')}}</li>
                    <li>店铺分类：{{shop.shopType | filter_type}}</li>
                    <li>联系电话：{{shop.phone}}</li>
                    <li>店铺区域：{{shop.areaCode | filter_area}}</li>
                    <li>店铺地址：{{shop.address}}<span class="xiangqing" @click="see_address()">地图</span></li>
                    <li>经度：{{shop.x}}</li>
                    <li>纬度：{{shop.y}}</li>
                    <li>营业时间：{{shop.openTime}}--{{shop.closeTime}}</li>
                    <li>法人：{{shop.iaiName}}<span class="xiangqing" @click="see_iaiName()">查看认证详情</span></li>
                    <li>营业执照：<span class="xiangqing" @click="see_businessNature()">{{shop.businessNature=='1' ? '个人经营' : '公司经营'}}</span></li>
                    <li>区域：{{shop.areaCode | filter_area}}</li>
                    <li>推荐人：<span class="xiangqing">{{shop.referrerPhone}}</span></li>
                    <li>推荐人区域：</li>
                    <li>店铺服务：{{shop.serviceType | filter_serviceType}}</li>
                    <li>店招：</li>
                    <li>
                        <div class="img_box" @click="see_img(shop.signboard)">
                            <img :src="shop.signboard" alt="">
                        </div>
                    </li>
                    <li>环境图片：</li>
                    <li>
                        <div class="img_box" @click="see_img(shop.environmentalImg)">
                            <img :src="environmentalImg[0]" alt="">
                            <span>共{{environmentalImg.length}}张</span>
                        </div>
                    </li>
                    <li class="btn_box" v-if="shop.state==0">
                        <el-button @click="ToExamine(2)" size="mini" type="danger" round>拒绝</el-button>
                        <el-button @click="ToExamine(1)" size="mini" type="primary" round>同意</el-button>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { dateFtt ,get_url , 过滤地区} from "@/assets/js/currency.js";
import { mapGetters } from "vuex";

var 区域_1=[];
var 服务类型_1=[];
var 店铺类型_1=[];
export default {
    name:'',
    data () {
        return {
            shop:{},
            shopId:''
        }
    },
    computed: {
        ...mapGetters({
            区域:'区域/区域',
            服务类型:'通用/服务类型',
            店铺类型:'通用/店铺类型'
        }),
        environmentalImg(){
            try {
                var list = this.shop.environmentalImg.split(',');
            } catch (error) {
                var list = [];
            }
            return  list;
        }
    },
    filters:{
        //时间过滤
        dateFtt(time,type) {
            try {
                return dateFtt(time, type)                
            } catch (error) {
                return time;
            }
        },
        //过滤类型
        filter_type(type) {
            var type_url = get_url(店铺类型_1, type)
            var str='';
            type_url.forEach(item => {
                str+=item.name+'-'
            });
            return str.substring(0,str.length-1);
        },
        // 过滤区域
        filter_area(id, list) {
            if (!id) return '';
            var area = 过滤地区(区域_1, id)
            console.log('过滤区域',area)
            var str='';
            area.forEach(item=>{
                str+=item.name+'/'
            })
            return str.substring(0,str.length-1);
        },
        //过滤服务
        filter_serviceType(type){
            if(!type) return;
            var service_list=type.split(',');
            var serviceType_list=服务类型_1;
            var string=''
            for(var i=0;i<serviceType_list.length;i++){
                for(var j=0;j<service_list.length;j++){
                    if(serviceType_list[i].id==service_list[j]){
                        string+=string=='' ? serviceType_list[i].name : ' 、 '+serviceType_list[i].name
                    }
                }
            }
            return string;
        }
    },
    methods: {
        返回上一页(){
            history.back();
        },
        查询店铺(){
            this.$axios.get('/api-s/shops/'+this.shopId).then(x=>{
                console.log('店铺详情',x);
                if(x.data.code==200){
                    this.shop=x.data.data;
                }
            })
        }
    },
    mounted() {
        this.shopId=this.$route.query.id;
        this.查询店铺();
        区域_1=this.区域;
        服务类型_1=this.服务类型;
        店铺类型_1=this.店铺类型;
    },
}
</script>

<style lang="scss" scoped>

/* 图片放大 */
.enlarge_img{
    display: none;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2010;
}
.enlarge_img.active{
    display: block;
}
.enlarge_img .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0px;
    left: 0px;
}
.enlarge_img .img_box{
    position: relative;
    z-index: 2;
    height: 100%;
    width: 850px;
    background: #000000;
    margin: 0px auto;
    padding: 5px;
    display: flex;
    flex-direction:column;
}
.enlarge_img .img_box>div{
    flex-grow: 1;
    height: 0;
}
.enlarge_img .img_box>div img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.enlarge_img .img_box>ul{
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-top: 1px solid #ffffff;
    padding: 10px 0px 0px ;
}
.enlarge_img .img_box>ul li{
    width: 50px;
    height: 50px;
    margin: 5px;
}
.enlarge_img .img_box>ul li.active img{
    border: 3px solid #ffffff;
}
.enlarge_img .img_box>ul li img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* 地址 */
.address_box .baiduMap{
    height: 400px;
}

/* 营业执照 */
.License_box{
    text-align: center;
}

.License_box .el-dialog__body{
    padding-top:0px; 
}
.License_box li{
    text-align: center;
    margin: 10px 0px;
}
.License_box img{
    width: 165px;
}
.text-red{
    color: red;
    cursor: pointer;
}

/* 法人信息 */
.legal_person_box .el-dialog__body{
    padding-top: 0px;
}
.legal_person_box table{
    width: 100%;
}
.legal_person_box table tr>td{
    padding: 2px;
}
.legal_person_box table tr>td:nth-child(1){
    width: 10px;
    white-space: nowrap;
    text-align: right;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
}
.legal_person_box table tr>td:nth-child(2) div{
    max-width: 100%;
    padding: 3px;
    min-height: 18px;
    background-color: rgba(246, 246, 246, 1);
}
.legal_person_box table tr>td:nth-child(2) img{
    max-width: 100%;
}

/* 驳回弹出框 */
.cause_box{

}
.cause_box .text_box{
    border: 1px solid #cccccc;
    min-height: 200px;
    outline: none;
    padding: 5px
}
.cause_box .el-dialog__body{
    padding-bottom: 0px;
}


.block{
    position: fixed;
    top: 20px;
    left: 20px;
}
.el-main{
    padding-left: 60px;
    padding-right: 60px;
}

.title_1{
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
}
.box_2{
    border-bottom: 1px solid rgba(153, 153, 153, 1);
    margin: 20px 0px 0px 0px;
}
.box_2 span{
    margin: 0px 0px 8px 0px;
    display: block;
    width: 106px;
    height: 32px;
    line-height: 32px;
    text-align: center;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(0, 186, 173, 1);
}

.box_3{
    padding: 0px 0px 40px;
}
.box_3>li{
    margin: 3px 0px 0px;
}
.box_3 .btn_box{
    margin: 40px 0px 0px;
}
.box_3 .xiangqing{
    color: rgba(42, 130, 228, 1);
    margin: 0px 0px 0px 5px;
    cursor: pointer;
}
.box_3 .img_box{
    position: relative;
    width: 175px;
}
.box_3 .img_box img{
    width: 100%;
}
.box_3 .img_box span{
    position: absolute;
    right: 0px;
    top: 0px;
    width: 62px;
	height: 22px;
    text-align: center;
    line-height: 22px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(153, 153, 153, 1);
}

</style>
