<template>
    <div class="app-container">
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
                    <li>店铺地址：{{shop.address}}<span class="xiangqing" @click="查看地图()">地图</span></li>
                    <li>经度：{{shop.x}}</li>
                    <li>纬度：{{shop.y}}</li>
                    <li>营业时间：{{shop.openTime}}--{{shop.closeTime}}</li>
                    <li>法人：{{shop.iaiName}}<span class="xiangqing" @click="查看法人认证()">查看认证详情</span></li>
                    <li>营业执照：<span class="xiangqing" @click="查看营业执照()">{{shop.businessNature=='1' ? '个人经营' : '公司经营'}}</span></li>
                    <li>区域：{{shop.areaCode | filter_area}}</li>
                    <li>推荐人：<span class="xiangqing">{{shop.referrerPhone}}</span></li>
                    <li>推荐人区域：</li>
                    <li>店铺服务：{{shop.serviceType | filter_serviceType}}</li>
                    <li>店招：</li>
                    <li>
                        <div class="img_box" @click="图片放大(shop.signboard,0)">
                            <img :src="shop.signboard" alt="">
                        </div>
                    </li>
                    <li>环境图片：</li>
                    <li>
                        <div class="img_box" @click="图片放大(shop.environmentalImg,1)">
                            <img :src="environmentalImg[0]" alt="">
                            <span>共{{environmentalImg.length}}张</span>
                        </div>
                    </li>
                    <li class="btn_box" v-if="shop.state==0">
                    <!-- <li class="btn_box"> -->
                        <el-button @click="ToExamine(2)" size="mini" type="danger" round>拒绝</el-button>
                        <el-button @click="ToExamine(1)" size="mini" type="primary" round>同意</el-button>
                    </li>
                </ul>
            </el-col>
        </el-row>

        <!-- 地图 -->
        <el-dialog class="address_box" title="地址详情" center :visible.sync="address_box" width="500px">
            <ul>
                <!-- <li>区域：{{details.areaCode | filter_area}}</li> -->
                <!-- <li>地址: {{details.address}}</li> -->
                <!-- <li>经纬度：{{details.x}}，{{details.y}}</li> -->
                <li class="baiduMap" id="baiduMap"></li>
            </ul>
        </el-dialog>

        <!-- 法人 -->
        <el-dialog class="legal_person_box" title="法人信息" center :visible.sync="legal_person_box" width="360px">
            <table>
                <tbody>
                    <tr>
                        <td>姓名：</td>
                        <td>
                            <div>{{shop.iaiName}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>性别：</td>
                        <td>
                            <div>{{shop.sex==0 ? '男'  : '女'}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>名族：</td>
                        <td>
                            <div>
                                {{shop.nation}}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>出生：</td>
                        <td>
                            <div>{{shop.birthday}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>住址：</td>
                        <td>
                            <div>{{shop.iaiAddress}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>身份证号：</td>
                        <td>
                            <div>{{shop.idNumber}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>签发机关：</td>
                        <td><div>{{shop.issueArea}}</div></td>
                    </tr>
                    <tr>
                        <td>有效期限：</td>
                        <td><div>{{shop.validity}}</div></td>
                    </tr>
                    <tr>
                        <td>身份证正面：</td>
                        <td>
                            <!-- <div> -->
                            <img @click="图片放大(shop.frontImg,2)" v-if="shop.frontImg" :src="shop.frontImg" alt="">
                            <!-- </div> -->
                        </td>
                    </tr>
                    <tr>
                        <td>身份证背面：</td>
                        <td>
                            <img @click="图片放大(shop.reverseImg,2)" v-if="shop.reverseImg" :src="shop.reverseImg" alt="">
                        </td>
                    </tr>
                </tbody>
            </table>
        </el-dialog>

        <!-- 营业执照 -->
        <el-dialog class="License_box" title="个体经营" center :visible.sync="License_box" width="360px">
            <ul>
                <li>营业执照号：{{shop.blnumber}}</li>
                <li>
                    <img @click="图片放大(shop.businessLicense,3)" v-if="shop.businessLicense" :src="shop.businessLicense" alt="">
                </li>
            </ul>
        </el-dialog>
        <!-- 图片放大 -->
         <div class="enlarge_img" :class="{'active':enlarge_img_box}">
            <div class="mask" @click="关闭图片放大()"></div>
            <div class="img_box">
                <div>
                    <img :src="enlarge_img" alt="">
                </div>
                <ul v-if="enlarge_img_list.length>1">
                    <li v-for="x in enlarge_img_list" :class="{'active':x==enlarge_img}">
                        <img @click="select_img(x)" :src="x" alt="">
                    </li>
                </ul>
            </div>
        </div>

        <!-- 驳回弹出框 -->
        <el-dialog class="cause_box" title="驳回内容" :visible.sync="cause_box" width="360px">
            <div contenteditable="true" class="text_box"></div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cause_box = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="quding()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { dateFtt ,get_url , 过滤地区} from "@/assets/js/currency.js";
import { mapGetters } from "vuex";
import $ from 'jquery'
var 区域_1=[];
var 服务类型_1=[];
var 店铺类型_1=[];
export default {
    name:'',
    data () {
        return {
            shop:{},
            shopId:'',

            Loading:false,
            enlarge_img_box:false,
            License_box:false,      //营业执照
            address_box:false,     //地图弹出框
            legal_person_box:false, //省份证信息弹出框
            shops_tree: [],      //分类三级列表
            area_list: [],      //地区列表
            serviceType_list:[],    //服务列表
            enlarge_img:'',     //图片放大
            enlarge_img_list:[], //图片放大列表
            cause_box:false,       //驳回弹出框

            上一步:0,       //1 环境图片 2 身份证  3 营业执照
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
        //同意或拒绝
        ToExamine(x){
            if(x==2){
                this.cause_box=true;
            }else{
                var obj=Object.assign({},this.shop);
                     obj.state=1
                this.update_1(obj);   
            }
        },
        quding(){
            var kong=/^\s*$/;
            if(kong.test($('.text_box').text())){
                // console.log(123)
                this.$message({showClose: true,message: '请输入驳回理由',type: 'error'});
            }else{
                this.cause_box=false;
                var obj=Object.assign({},this.shop);
                    obj.state=2;
                    obj.cause=$('.text_box').html()
                this.update_1(obj);
            }
        },
        update_1(obj){
            this.$axios({
                method:'put',
                url:'/api-s/shops/update',
                data:obj
            }).then(x=>{
                if(x.data.code==200){
                    this.$alert('设置成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            history.back()
                        }
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: x.data.msg ? x.data.msg : x.data.message,
                        type: 'error'
                    });
                }
            }).catch(err=>{
                this.$message({showClose: true,message: '系统错误，稍后再试。', type: 'error'});
            })
            // this.$http({
            //     method:'put',
            //     url:ip+'/api-s/shops/update',
            //     body:obj
            // }).then(x=>{
            //     console.log(x)
            //     if(x.body.code==200){
            //         this.$alert('设置成功！', '提示', {
            //             confirmButtonText: '确定',
            //             callback: action => {
            //                 history.back()
            //             }
            //         });
            //     }else{
            //         this.$message({
            //             showClose: true,
            //             message: x.body.msg,
            //             type: 'error'
            //         });
            //     }
                
            // },err=>{
            //     console.log(err)
            //     this.$message({
            //         showClose: true,
            //         message: '系统错误，稍后再试。',
            //         type: 'error'
            //     });
            // })
        },
        select_img(x){
            this.enlarge_img=x;
        },
        关闭图片放大(){
            this.enlarge_img_box=false;
            if(this.上一步==1){

            }else if(this.上一步==2){
                this.legal_person_box=true;
            }else if(this.上一步==3){
                this.License_box=true;
            }
        },
        图片放大(x,type){
            this.上一步=type;
            if(this.上一步==1){

            }else if(this.上一步==2){
                this.legal_person_box=false;
            }else if(this.上一步==3){
                this.License_box=false
            }
            this.enlarge_img_list=x.split(',');
            this.enlarge_img_box=true;
            this.enlarge_img=this.enlarge_img_list[0];
        },
        查看法人认证(){
            this.legal_person_box=true;
        },
        查看地图(){
            this.address_box=true;
            var lng=this.shop.x
            var lat=this.shop.y
            this.address_box = true;
            setTimeout(function () {
                var map = new BMap.Map("baiduMap");
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                map.centerAndZoom(
                    new BMap.Point(lng, lat),
                    20
                );
                var mk = new BMap.Marker({ lng: lng, lat: lat});
                map.addOverlay(mk);
                // map.panTo({lng:104.00195,lat:30.639975});
            }, 1000)
        },
        查看营业执照(){
            this.License_box=true
        },
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
        },
        //返回上一页
        block(){
            history.back();
        },
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
    // position: fixed;
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
