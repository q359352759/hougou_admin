<template>
    <div class="app-container">
        <el-row>
            <el-col :span="12">
                <el-button-group>
                    <el-button @click="Choice_state(0)" size="mini" :type="query.state=='0' ? 'primary' : 'info'">待审核</el-button>
                    <el-button @click="Choice_state(1)" size="mini" :type="query.state=='1' ? 'primary' : 'info'">已通过</el-button>
                    <el-button @click="Choice_state(2)" size="mini" :type="query.state=='2' ? 'primary' : 'info'">未通过</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="12">
                <div class="text-right">
                    <span v-if="query.state==0">待审核：{{list_total}}家</span> 
                    <span v-if="query.state==1">已通过：{{list_total}}家</span> 
                    <span v-if="query.state==2">未通过：{{list_total}}家</span>
                </div>
            </el-col>
        </el-row>

        <ul class="查询条件" style="overflow: auto;">
            <li>
                <el-date-picker style="width:330px" size="mini" v-model="time" type="daterange" align="left" start-placeholder="开始日期"
                    end-placeholder="结束日期" :default-time="['08:00:00', '08:00:00']" @change="timeChange"
                    value-format="yyyy-MM-dd dd:hh:mm">
                </el-date-picker>
            </li>
            <li><el-input style="width:150px" size="mini" clearable class="input_1" v-model="query.referrerPhone"  placeholder="推荐人"></el-input></li>
            <li><el-input style="width:150px" size="mini" clearable v-model="query.name" placeholder="商家名称"></el-input></li>
            <li v-show="管理员"><el-cascader placeholder="请选择区域" style="width:250px" size="mini" expand-trigger="hover" :options="区域列表" :props="address_props" :clearable="true" v-model="area" @change="handleChange"></el-cascader></li>
            <li><el-cascader placeholder="请选择类型" style="width:180px" size="mini" expand-trigger="hover" :options="店铺类型" :props="address_props" :clearable="true" v-model="shopsType" @change="typeChange"></el-cascader></li>
            <li><el-button size="mini" icon="el-icon-search" @click="waitpay()" circle></el-button></li>
            <li><el-button size="mini" type="info" round @click="qingkong()">清空</el-button></li>
        </ul>

        <div class="box_3" >
                <el-table :data="table_list" border size="mini" style="margin:10px 0px 0px;width: 100%;text-align: center">
                    <el-table-column prop="name" label="申请商家" align="center"></el-table-column>
                    <el-table-column label="区域" align="center" width="250">
                        <template slot-scope="scope">
                            <div class="area">
                                {{scope.row.areaCode | 过滤后区域}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="时间" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.createTime | filter_time('yyyy-MM-dd')}}
                            </div>
                            <div>
                                {{scope.row.createTime | filter_time('hh:mm')}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="referrerPhone" label="推荐人" align="center"></el-table-column>
                    <el-table-column label="法人" align="center">
                        <template slot-scope="scope">
                            <el-button @click="查看实名认证(scope.row)" size="mini" type="text">{{scope.row.iaiName}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="营业执照" align="center">
                        <template slot-scope="scope">
                            <el-button @click="查看营业执照(scope.row)" size="mini" type="text">{{scope.row.businessNature=='1' ? '个体经营' : '实体'}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="分类" align="center">
                        <template slot-scope="scope">
                            {{scope.row.shopType | filter_type }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                    <el-table-column label="地址信息" align="center">
                        <template slot-scope="scope">
                            <el-button @click="查看地址(scope.row)" size="mini" type="text">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="店招" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="查看图片(scope.row.signboard,0)" type="text">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="环境图片" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="查看图片(scope.row.environmentalImg,0)" type="text">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="服务" align="center">
                        <template slot-scope="scope">
                            <el-popover
                                placement="top"
                                width="200"
                                trigger="click"
                                :content="scope.row.serviceType | filter_serviceType">
                                <el-button slot="reference" size="mini" type="text">查看</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="tongyi(scope.row)" v-if="scope.row.state==0" type="text">同意</el-button>
                            <span class="text-red" @click="jujue(scope.row)" v-if="scope.row.state==0" style="color:red">拒绝</span>
                            <!-- <el-button size="mini" @click="tongyi(scope.row)" type="text">同意</el-button>
                            <span class="text-red" @click="jujue(scope.row)" style="color:red">拒绝</span> -->
                            <el-button @click="$router.push('/dianpu/tianJiaShenHe?id='+scope.row.id)" size="mini" type="text">查看更多</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        <!-- 法人 -->
        <el-dialog class="legal_person_box" title="法人信息" center :visible.sync="显示法人认证" width="360px">
            <farenrenzheng :details="认证详情" @setimg='getimg'/>
        </el-dialog>

        <!-- 营业执照 -->
        <el-dialog class="License_box" title="个体经营" center :visible.sync="License_box" width="360px">
            <ul>
                <li>营业执照号：{{details.blnumber}}</li>
                <li>
                    <img @click="查看图片(details.businessLicense,2)" v-if="details.businessLicense" :src="details.businessLicense" alt="">
                </li>
            </ul>
        </el-dialog>

        <!-- 地图 -->
        <el-dialog class="address_box" title="地址详情" center :visible.sync="address_box" width="360px">
            <ul>
                <li>区域：{{details.areaCode | 过滤后区域}}</li>
                <li>地址: {{details.address}}</li>
                <li>经纬度：{{details.x}}，{{details.y}}</li>
                <li class="baiduMap" id="baiduMap"></li>
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
                        <img @click="查看单个图片(x)" :src="x" alt="">
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 驳回弹出框 -->
        <el-dialog class="cause_box" title="驳回内容" size="mini" :visible.sync="cause_box" width="360px">
            <div contenteditable="true" class="text_box"></div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cause_box = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="quding()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
//递归
// function convert(arr, id) {
//     var res = [];
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i].parentid == id) {
//             res.push(arr[i]);
//             var children = convert(arr, arr[i].id);
//             if (children.length > 0) {
//                 arr[i].children = convert(arr, arr[i].id);
//             }
//         }
//     }
//     return res;
// }

//反向递归
function get_url(list, type, return_list) {
    var return_list = return_list ? return_list : [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == type) {
            return_list.unshift(list[i].name)
        } else {
            if (list[i].children) {
                var length=return_list.length
                var res=get_url(list[i].children, type, return_list);
                if(res.length!=length){
                    get_url(list, list[i].id, return_list);
                }
            }
        }
        //unshift
    };
    return return_list;
}

// 验证手机号码
var checkPhone = function (rule, value, callback) {
    if (!value) {
        return callback(new Error('手机号不能为空'));
    } else {
        const reg = /^1[0-9]\d{9}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error('请输入正确的手机号'));
        }
    }
}

function list_empty(arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i].children.length==0){
            delete arr[i].children;
        }else{
            list_empty(arr[i].children)
        }
    }
}

var 区域列表=[];
var 服务类型_1=[]
var 店铺类型_1=[];
import { mapGetters } from "vuex";
import { dateFtt , 过滤地区 ,convert } from "@/assets/js/currency.js";

import farenrenzheng from '@/views/代理商/components/法人认证弹出框.vue';
import $ from 'jquery';
export default {
    name:'',
    data () {
        return {
            Loading: true,
            table_list: [],
            time: '',
            shops_tree: [],      //分类三级列表
            area_list: [],      //地区列表
            area: [],           //区域
            serviceType_list:[],    //服务列表
            address_props: {
                value: 'id',
                label: 'name',
            },
            Referee_dialog: false,   //
            legal_person_box: false,  //法人弹出框
            License_box: false,          //营业执照
            address_box: false,          //地址详情
            cause_box:false,             //驳回弹出框
            enlarge_img_box: false,      //图片放大
            enlarge_img_list:[],         //放大的图片列表
            
            enlarge_img:'',         //点击的图片索引值
            // x:104.00195
            details: {                  //详情
            },
            query:{
                state:0,     
                areaCode:'',
                referrerPhone:'',
                name:'',
                startTime:'',
                endTime:'',
                shopType:'',
                start:0,
                length:10
            },
            page_index:1,
            page_size:10,
            list_total:0,
            shopsType:[],
            SUPER_ADMIN:false,  //管理员
            AREA_MANAGER:false, //区域代理
            areaManager:"",

            显示法人认证:false,
            认证详情:'',
            图片放大前一步:0
        }
    },
    components:{
        farenrenzheng
    },
    filters:{
        过滤后区域(id){
            var list=过滤地区( 区域列表 ,id)
            var str='';
                list.forEach(item => {
                    str+=item.name+'/'
                });
            return str.substring(0,str.length-1)
        },
        filter_time(time, type) {
            if (time) {
                return dateFtt(time, type)
            } else {
                return time;
            }
        },
        //过滤类型
        filter_type(type) {
            var shops_tree=店铺类型_1;
            var type_url = get_url(shops_tree, type)
            return type_url.join('/');
        },
        //过滤服务
        filter_serviceType(type){
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
            // return service_list;
            return string;
        }
    },
    computed: {
        ...mapGetters({
            代理商信息:'登陆/代理商信息',
            区域:'区域/区域',
            服务类型:'通用/服务类型',
            店铺类型:'通用/店铺类型',
            管理员:'登陆/管理员'
        }),
        区域列表(){
            var list=convert(this.区域);
            return list
        }
    },
    methods: {
        //同意
        tongyi(x){
            var obj=Object.assign({},x)
                obj.state=1
            this.update_1(obj); 
        },
        //拒绝
        jujue(x){
            this.details=x
            this.cause_box=true;
        },
        quding(){
            var kong=/^\s*$/;
            if(kong.test($('.text_box').text())){
                // console.log(123)
                this.$message({ showClose: true, message: '请输入驳回理由', type: 'error' });
            }else{
                var obj=Object.assign({},this.details);
                this.cause_box=false;
                    obj.state=2;
                    obj.cause=$('.text_box').html()
                this.update_1(obj);
            }
        },
        //修改
        update_1(obj){
            this.$axios({
                method:'put',
                url:'/api-s/shops/update',
                data:obj
            }).then(x=>{
                if(x.data.code==200){
                    this.$message({showClose: true,message: '设置成功',type: 'success'});
                }else{
                    this.$message({
                        showClose: true,
                        message: x.data.msg ? x.data.msg : x.data.message,
                        type: 'error'
                    });
                }
                this.page_index=1;
                this.查询数据();
            }).catch(err=>{
                this.$message({ showClose: true, message: '系统错误，稍后再试。', type: 'error'});
            })
        },
        //清空
        qingkong(){
            this.area=[];
            this.time='';
            this.query.startTime='';
            this.query.endTime='';
            this.query.referrerPhone='';
            this.query.name='';
        },
        waitpay(){
            this.page_index=1;
            this.查询数据()
        },
        //法人认证返回值
        getimg(x){
            this.显示法人认证=false;
            this.enlarge_img_list=[x];
            this.enlarge_img_box=true;
            this.enlarge_img=this.enlarge_img_list[0];
        },
        查看实名认证(x){
            console.log(x)
            this.显示法人认证=true;
            this.认证详情=x;
            this.图片放大前一步=1;
        },
        查看单个图片(x){
            this.enlarge_img=x;
        },
        关闭图片放大(){
            if(this.图片放大前一步==1){
                this.显示法人认证=true;
            }else if(this.图片放大前一步==2){
                this.License_box = true;
            }
            this.enlarge_img_box=false;
        },
        查看图片(x,type){
            this.图片放大前一步=type;
            this.License_box=false
            console.log(x.split(','));
            this.enlarge_img_list=x.split(',');
            this.enlarge_img_box=true;
            this.enlarge_img=this.enlarge_img_list[0];
        },
        查看营业执照(x){
            this.图片放大前一步=2
            this.details = x
            this.License_box = true;
        },
        查看地址(x) {
            console.log(x);
            var this_1 = this;
            this.details=x;
            var lng=x.x;
            var lat=x.y
            this.address_box = true;
            setTimeout(function () {
                var map = new BMap.Map("baiduMap");
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                map.centerAndZoom(new BMap.Point(lng, lat),20);
                var mk = new BMap.Marker({ lng: lng, lat: lat});
                map.addOverlay(mk);
                // map.panTo({lng:104.00195,lat:30.639975});
            }, 1000)
        },
        //选择时间
        timeChange(x) {
            console.log(x, this.time)
            if(x){
                this.query.startTime=x[0];
                this.query.endTime=x[1];
            }else{
                this.query.startTime='';
                this.query.endTime='';
            }
            this.查询数据();
        },
        Choice_state(x) {
            this.query.state = x;
            this.page_index=1;
            this.查询数据();
        },
        //选择区域
        handleChange(x) {
            console.log(x, this.area)
            this.查询数据();
        },
        //选择类型
        typeChange(){
            console.log(this.shopsType)
            this.page_index=1;
            this.查询数据();
        },
        查询数据() {
            this.query.start=(this.page_index-1)*this.page_size;
            this.query.areaCode=this.管理员 ? "" : this.代理商信息.areaCode;
            this.query.shopType=this.shopsType ? this.shopsType[this.shopsType.length-1] : '';
            this.$axios.get('/api-s/shops/findAll',{params:this.query}).then(x=>{
                console.log(x);
                this.table_list = x.data.data.data
                this.list_total=x.data.data.total
            })
        }
    },
    mounted() {
        this.query.state=this.$route.query.state ? this.$route.query.state : 0 ; 
        this.查询数据();
        区域列表=this.区域;
        服务类型_1=this.服务类型;
        店铺类型_1=this.店铺类型;

        // console.log(this.区域)
        // console.log(this.服务类型)
    },
}
</script>

<style lang="scss" scoped>
.text-right{
    text-align: right
}
.查询条件{
    margin: 23px 0px 0px;
    display: flex;
    text-align: center;
    >li{
        margin: 0px 20px 0px 0px;
    }
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

/* 地址 */
.address_box .baiduMap{
    height: 230px;
}


/* 图片放大 */
.enlarge_img{
    display: none;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2002;
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


/* 驳回弹出框 */
.cause_box .text_box{
    border: 1px solid #cccccc;
    min-height: 200px;
    outline: none;
    padding: 5px
}
.cause_box .el-dialog__body{
    padding-bottom: 0px;
}

</style>
