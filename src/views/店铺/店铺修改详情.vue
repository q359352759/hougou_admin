<template>
    <div class="app-container">
        <el-button @click="block()" type="info" icon="el-icon-arrow-left" circle></el-button> 
        <el-main>
            <div class="box_2">
                <!-- <span>基本信息</span> -->
                <el-button size="small" type="info">基本信息</el-button>
            </div>
            <el-row>
                <el-col :span="12">
                    <ul class="box_3">
                        <li class="title_2">修改前</li>      
                        <li class="time_1"></li>                  
                        <li>店铺名称：{{shop.name}}</li>
                        <li>申请入驻时间：{{shop.createTime | dateFtt('yyyy-MM-dd hh:mm:ss')}}</li>
                        <li>店铺分类：{{shop.shopType | filter_type(店铺类型)}}</li>
                        <li>联系电话：{{shop.phone}}</li>
                        <li>店铺区域：{{shop.areaCode | filter_area(区域)}}</li>
                        <li>店铺地址：{{shop.address}}<span class="xiangqing" @click="see_address()">地图</span></li>
                        <li>经度：{{shop.x}}</li>
                        <li>纬度：{{shop.y}}</li>
                        <li>营业时间：{{shop.openTime}}--{{shop.closeTime}}</li>
                        <li>法人：{{shop.iaiName}}<span class="xiangqing" @click="see_iaiName()">查看认证详情</span></li>
                        <li>营业执照：<span class="xiangqing" @click="see_businessNature()">{{shop.businessNature=='1' ? '个人经营' : '公司经营'}}</span></li>
                        <li>区域：{{shop.areaCode | filter_area(区域)}}</li>
                        <li>推荐人：<span class="xiangqing">{{shop.referrerPhone}}</span></li>
                        <li>推荐人区域：</li>
                        <li>店铺服务：{{shop.serviceType | filter_serviceType(服务类型)}}</li>
                        <li>店招：</li>
                        <li>
                            <div class="img_box" @click="see_img(shop.signboard)">
                                <img :src="shop.signboard" alt="">
                            </div>
                        </li>
                        <li>环境图片：</li>
                        <li>
                            <div class="img_box" @click="see_img(shop.environmentalImg)">
                                <img  v-if="shop.environmentalImg" :src="shop.environmentalImg.split(',')[0]" alt="">
                                <span>共{{shop.environmentalImg ? shop.environmentalImg.split(',').length : 0}}张</span>
                            </div>
                        </li>
                        <!-- <li class="btn_box" v-if="shop.state==0">
                            <el-button @click="ToExamine(2)" size="mini" type="danger" round>拒绝</el-button>
                            <el-button @click="ToExamine(1)" size="mini" type="primary" round>同意</el-button>
                        </li> -->
                    </ul>
                </el-col>
                <el-col :span="12">
                    <ul class="box_3">
                        <li class="title_2">修改后</li>
                        <li class="time_1">修改时间：{{new_shop.updateTime |  dateFtt('yyyy-MM-dd hh:mm:ss')}}</li>       
                        <li :class="{'text-red':shop.name!=new_shop.name}">店铺名称：{{new_shop.name}}</li>
                        <li>申请入驻时间：{{new_shop.createTime | dateFtt('yyyy-MM-dd hh:mm:ss')}}</li>
                        <li :class="{'text-red':shop.shopType != new_shop.shopType}">店铺分类：{{new_shop.shopType | filter_type(店铺类型)}}</li>
                        <li :class="{'text-red':shop.phone != new_shop.phone}">联系电话：{{new_shop.phone}}</li>
                        <li :class="{'text-red':shop.areaCode!=new_shop.areaCode}">店铺区域：{{new_shop.areaCode | filter_area(区域)}}</li>
                        <li>店铺地址：{{new_shop.address}}<span class="xiangqing" @click="see_address()">地图</span></li>
                        <li :class="{'text-red':shop.x != new_shop.x}">经度：{{new_shop.x}}</li>
                        <li :class="{'text-red':shop.y != new_shop.y}">纬度：{{new_shop.y}}</li>
                        <li :class="{'text-red':(shop.openTime!=new_shop.openTime || shop.closeTime!=new_shop.closeTime)}">营业时间：{{new_shop.openTime}}--{{new_shop.closeTime}}</li>
                        <li>法人：{{new_shop.iaiName}}<span class="xiangqing" @click="see_iaiName()">查看认证详情</span></li>
                        <li>营业执照：<span class="xiangqing" @click="see_businessNature()">{{new_shop.businessNature=='1' ? '个人经营' : '公司经营'}}</span></li>
                        <li :class="{'text-red':shop.areaCode!=new_shop.areaCode}">区域：{{new_shop.areaCode | filter_area(区域)}}</li>
                        <li>推荐人：<span class="xiangqing">{{new_shop.referrerPhone}}</span></li>
                        <li>推荐人区域：</li>
                        <li>店铺服务：{{new_shop.serviceType | filter_serviceType(服务类型)}}</li>
                        <li>店招：</li>
                        <li>
                            <div class="img_box" @click="see_img(new_shop.signboard)">
                                <img :src="new_shop.signboard" alt="">
                            </div>
                        </li>
                        <li>环境图片：</li>
                        <li>
                            <div class="img_box" @click="see_img(new_shop.environmentalImg)">
                                <img  v-if="new_shop.environmentalImg" :src="new_shop.environmentalImg.split(',')[0]" alt="">
                                <span>共{{new_shop.environmentalImg ? new_shop.environmentalImg.split(',').length : 0}}张</span>
                            </div>
                        </li>
                        <li v-if="new_shop.state==2">
                            驳回理由：
                        </li>
                        <li v-if="new_shop.state==2" v-html="new_shop.cause"></li>
                        <li class="btn_box">
                        <!-- <li class="btn_box"> -->
                            <el-button v-if="new_shop.state==0" @click="ToExamine(2)" size="mini" type="danger" round>拒绝</el-button>
                            <el-button v-if="new_shop.state==0" @click="ToExamine(1)" size="mini" type="primary" round>同意</el-button>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </el-main>      
        <!-- 图片放大 -->
         <div class="enlarge_img" :class="{'active':enlarge_img_box}">
            <div class="mask" @click="close_1()"></div>
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
        
        <!-- 地图 -->
        <el-dialog class="address_box" title="地址详情" center :visible.sync="address_box" width="500px">
            <ul>
                <!-- <li>区域：{{details.areaCode | filter_area}}</li> -->
                <!-- <li>地址: {{details.address}}</li> -->
                <!-- <li>经纬度：{{details.x}}，{{details.y}}</li> -->
                <li class="baiduMap" id="baiduMap"></li>
            </ul>
        </el-dialog>
        <!-- 营业执照 -->
        <el-dialog class="License_box" title="个体经营" center :visible.sync="License_box" width="360px">
            <ul>
                <li>营业执照号：{{shop.blnumber}}</li>
                <li>
                    <img @click="see_img(shop.businessLicense)" v-if="shop.businessLicense" :src="shop.businessLicense" alt="">
                </li>
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
                            <img @click="see_img(shop.frontImg)" v-if="shop.frontImg" :src="shop.frontImg" alt="">
                            <!-- </div> -->
                        </td>
                    </tr>
                    <tr>
                        <td>身份证背面：</td>
                        <td>
                            <img @click="see_img(shop.reverseImg)" v-if="shop.reverseImg" :src="shop.reverseImg" alt="">
                        </td>
                    </tr>
                </tbody>
            </table>
        </el-dialog>

        <!-- 驳回弹出框 -->
        <el-dialog class="cause_box" title="驳回内容" :visible.sync="cause_box" width="360px">
            <div contenteditable="true" class="text_box"></div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cause_box = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="quding()">确 定</el-button>
            </span>
        </el-dialog>

        <div id="Loading" v-show="Loading">
            <div>
                <i class="el-icon-loading"></i>
                <div>
                    加载中
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import { dateFtt , 过滤地区 , get_url} from "@/assets/js/currency.js";
import { mapGetters } from "vuex";
export default {
    name:"",
    data () {
        return {
            shop:{},
            new_shop:{},

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
            newshop_id:'',    //用于查询修改后使用
            update_index:0,
            index:0
        }
    },
    computed: {
        ...mapGetters({
            区域:'区域/区域',
            服务类型:'通用/服务类型',
            店铺类型:'通用/店铺类型',
        })
    },
    filters:{
        // 过滤区域
        filter_area(id, list) {
            if (!id) return '';
            var area = 过滤地区(list, id);
            var str="";
                area.forEach(element => {
                    str+=element.name+' / '
                });
            return str.substring(0,str.lastIndexOf('/'));
        },
        dateFtt(time,type) {
            try {
                return dateFtt(time, type)
            } catch (error) {
                return time;
            }
        },
        //过滤类型
        filter_type(type,list) {
            var type_url = get_url(list, type);
            var str='';
                type_url.forEach(item=>{
                    str+=item.name+'-'
                })
            return str.substring(0,str.length-1);
        },
        //过滤服务
        filter_serviceType(type,list){
            if(!type) return;
            var service_list=type.split(',');
            var serviceType_list=list;
            var string=''
            for(var i=0;i<serviceType_list.length;i++){
                for(var j=0;j<service_list.length;j++){
                    if(serviceType_list[i].id==service_list[j]){
                        string+=string=='' ? serviceType_list[i].name : ' 、 '+serviceType_list[i].name
                    }
                }
            }
            // return service_list;
            return string;
        }
    },
    methods: {
        //审核
        ToExamine(x){
            console.log(x)
            if(x==2){
                this.cause_box=true;
            }else{
                var obj=Object.assign({},this.new_shop)
                    obj.state=1
                this.index=2
                this.update_1(obj);
                let {...update_obj}=this.new_shop;
                update_obj.state=1;
                this.update_update(update_obj);
            }
        },
        //驳回
        quding(){
            var kong=/^\s*$/;
            if(kong.test($('.text_box').text())){
                // console.log(123)
                this.$message({showClose: true,message: '请输入驳回理由',type: 'error'});
            }else{
                var obj=Object.assign({},this.shop)
                this.cause_box=false;
                    obj.cause=$('.text_box').html()
                this.index=1
                let {...update_obj}=this.new_shop;
                    update_obj.state=2;
                    update_obj.cause=$('.text_box').html();
                this.update_update(update_obj);
            }
        },
        update_1(obj){
            this.$axios({
                method:'put',
                url:'/api-s/shops/update',
                data:obj
            }).then(x=>{
                if(x.body.code==200){
                   this.update_index++;
                    if(this.update_index==this.index){
                        this.$alert('设置成功！', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                history.back()
                            }
                        });
                    }
                }else{
                    this.$message({ showClose: true, message: x.data.msg ? x.data.msg : x.data.message, type: 'error' });
                }
            }).catch(err=>{
                this.$message({showClose: true,message: '系统错误，稍后再试。',type: 'error'});
            })
        },
        //修改 修改后的状态
        update_update(obj){
            this.$axios.post('/api-s/shops/update/update',obj).then(x=>{
                if(x.data.code==200){
                    this.update_index++
                    if(this.update_index==this.index){
                        this.$alert('设置成功！', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                history.back()
                            }
                        });
                    }
                }else{
                    this.$message({ showClose: true, message: x.data.msg ? x.data.msg : x.data.message, type: 'error' });
                }
            }).catch(err=>{
                this.$message({ showClose: true, message:'系统错误，稍后再试。', type: 'error' });
            })
        },
        delete_1(){
            this.$axios.get('/api-s/shops/update/delete/'+this.new_shop.id).then(x=>{
                if(x.data.code==200){
                    this.$alert('设置成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            history.back()
                        }
                    });
                }else{
                    this.$message({ showClose: true, message: x.body.msg, type: 'error' });
                }
            }).catch(err=>{
                this.$message({ showClose: true, message: '系统错误，稍后再试。', type: 'error' });
            })
        },
        //返回上一页
        block(){
            history.back();
        },
        //图片放大
        see_img(x){
            console.log(x.split(','));
            this.enlarge_img_list=x.split(',');
            this.enlarge_img_box=true;
            this.enlarge_img=this.enlarge_img_list[0];
        },
        //
        select_img(x){
            this.enlarge_img=x;
        },
        //关闭图片放大
        close_1(){
            this.enlarge_img_box=false;
        },
        //查看位置
        see_address(){
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
        //查看身份证
        see_iaiName(){
            this.legal_person_box=true;
        },
        //查看公司营业执照
        see_businessNature(){
            this.License_box=true
        },
        //查询修改前的店铺
        get_shop(){
            this.$axios.get('/api-s/shops/'+this.shopId).then(x=>{
                 this.shop=x.data.data;
            })
        },
        //查询修改后的店铺
        get_new_shop(){
            this.$axios.get('/api-s/shops/update/finByUserid/'+this.newshop_id).then(x=>{
                this.new_shop =x.data.data;
            })
        }
    },
    mounted() {
        this.Loading = false;
        
        this.shopId=this.$route.query.id;
        this.newshop_id=this.$route.query.userid
        //根据店铺Id查询店铺信息
        this.get_shop()
        //根据店铺Id查询店铺信息
        this.get_new_shop()
    },
}
</script>

<style lang="scss" scoped>

#Loading{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 5;
    display: flex;
    justify-content:  center;
    align-items: center;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
}
#Loading i{
    font-size: 30px;
}

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

.box_3{
    padding: 0px 0px 40px;
}
.box_3>li{
    margin: 3px 0px 0px;
}
.box_3>li.title_2{
    margin: 20px 0px;
}
.box_3>li.time_1{
    height: 20px;
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
    opacity: 0.5;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(153, 153, 153, 1);
}
</style>
