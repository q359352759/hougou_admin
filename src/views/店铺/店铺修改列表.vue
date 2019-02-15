<template>
    <div class="app-container">
        <el-row>
            <el-col :span="12" style="min-height:10px;">
                <el-button-group>
                    <el-button @click="选择状态(0)" size="mini" :type="query.state=='0' ? 'primary' : 'info'">未处理</el-button>
                    <el-button @click="选择状态(1)" size="mini" :type="query.state=='1' ? 'primary' : 'info'">已通过</el-button>
                    <el-button @click="选择状态(2)" size="mini" :type="query.state=='2' ? 'primary' : 'info'">未通过</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="12">
                <div class="text-right">
                    <span>待审核：{{数量}}家</span>
                </div>
            </el-col>
        </el-row>

        <ul class="box_2">
            <li>
                <el-date-picker style="width:230px" size="mini" v-model="选择的时间" type="daterange" align="left" start-placeholder="开始日期"
                    end-placeholder="结束日期" @change="timeChange"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </li>
            <li>
                <el-input size="mini" clearable v-model="query.referrerPhone" placeholder="推荐人"></el-input>
            </li>
            <li>
                <el-input size="mini" clearable v-model="query.name" placeholder="商家名称"></el-input>
            </li>
            <!-- <li v-show="SUPER_ADMIN">
                <el-cascader placeholder="请选择区域" style="width:250px" size="mini" expand-trigger="hover" :options="area_list" :props="address_props" :clearable="true" v-model="area" @change="handleChange"></el-cascader>
            </li> -->
            <li>
                <el-cascader placeholder="选择类型" style="width:250px" size="mini" expand-trigger="hover" :options="店铺类型" :props="三级配置" :clearable="true" v-model="选择的店铺类型" @change="typeChange"></el-cascader>
            </li>
            <li>
                <el-button size="mini" icon="el-icon-search" @click="waitpay()" circle></el-button>
            </li>
            <li>
                <el-button size="mini" type="info" round @click="qingkong()">清空</el-button>
            </li>
        </ul>

        <div class="box_3">
            <el-table :data="列表" border size="mini" style="width: 100%;">
                <el-table-column prop="name" label="申请商家" align="center"></el-table-column>
                <el-table-column label="区域" align="center" width="250">
                    <template slot-scope="scope">
                        <div class="area">
                            {{scope.row.areaCode | 过滤区域(区域)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="时间" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.createTime | 过滤时间('yyyy-MM-dd')}}
                        </div>
                        <div>
                            {{scope.row.createTime | 过滤时间('hh:mm')}}
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
                        {{scope.row.shopType | 过滤店铺类型(店铺类型) }}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column label="地址信息" align="center">
                    <template slot-scope="scope">
                        <el-button @click="查看地址信息(scope.row)" size="mini" type="text">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="店招" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="see_img(scope.row.signboard)" type="text">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="环境图片" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="see_img(scope.row.environmentalImg)" type="text">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="服务" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button @click="ses_serviceType(scope.row.serviceType)" size="mini" type="text">查看</el-button> -->
                        <el-popover
                            placement="top"
                            width="200"
                            trigger="click"
                            :content="scope.row.serviceType | 过滤服务(服务类型)">
                            <el-button slot="reference" size="mini" type="text">查看</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100" align="center" fixed="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state==0" style="color:red">未处理</span>
                            <span v-if="scope.row.state==1">已通过</span>
                            <span v-if="scope.row.state==2">已驳回</span>
                            <!-- <el-button size="mini" @click="tongyi(scope.row)" v-if="scope.row.state==0" type="text">同意</el-button>
                            <span class="text-red" @click="jujue(scope.row)" v-if="scope.row.state==0" style="color:red">拒绝</span> -->
                        </template>
                    </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="tongyi(scope.row)" v-if="scope.row.state==0" type="text">同意</el-button>
                        <span class="text-red" @click="jujue(scope.row)" v-if="scope.row.state==0" style="color:red">拒绝</span> -->
                        <el-button @click="查看更多(scope.row)" size="mini" type="text">查看更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <!-- 法人 -->
        <el-dialog class="legal_person_box" title="法人信息" center :visible.sync="显示法人认证" width="360px">
            <farenrenzheng :details="认证详情" @setimg='getimg'/>
        </el-dialog>


        <!-- 图片放大 -->
        <tupianfangda v-show="显示图片放大" :imglist="放大列表" :closeA="关闭图片放大"/>

        <!-- 营业执照 -->
        <el-dialog class="营业执照" title="个体经营" center :visible.sync="显示执照详情" width="360px">
            <ul>
                <li>营业执照号：{{执照详情.blnumber}}</li>
                <li>
                    <img @click="查看执照图片(执照详情.businessLicense)" v-if="执照详情.businessLicense" :src="执照详情.businessLicense" alt="">
                </li>
            </ul>
        </el-dialog>

        <!-- 地图 -->
        <el-dialog class="address_box" title="地址详情" center :visible.sync="显示地址详情" width="360px">
            <ul>
                <li>区域：{{details.areaCode | 过滤区域(区域)}}</li>
                <li>地址: {{details.address}}</li>
                <li>经纬度：{{details.x}}，{{details.y}}</li>
                <li class="baiduMap" id="baiduMap"></li>
            </ul>
        </el-dialog>

    </div>
</template>

<script>
var 区域列表=[];
var 店铺类型列表=[];
import { mapGetters } from "vuex";
import { dateFtt , get_url ,过滤地区} from "@/assets/js/currency.js";
import farenrenzheng from '@/views/代理商/components/法人认证弹出框.vue';
import tupianfangda from '@/views/代理商/components/图片放大.vue';
export default {
    name:'',
    components:{
        farenrenzheng,
        tupianfangda
    },
    data () {
        return {
            三级配置:{
                value: 'id',
                label: 'name',
            },
            数量:0,
            选择的店铺类型:[],
            选择的时间:[],
            query:{
                state:0,
                start:0,
                length:10,
                referrerPhone:'',
                name:'',
                startTime:'',
                endTime:'',
                shopType:'',
            },
            page_index:1,
            列表:[],
            显示法人认证:false,
            认证详情:{},
            显示执照详情:false,
            执照详情:{},
            显示图片放大:false,
            放大列表:[],
            图片放大前一步:1,   //0表示没有上一步弹出框 1 法人弹出框 2 营业执照弹出框 3 
            显示地址详情:false,
            details:{}
        }
    },
    filters:{
        // 过滤区域
        过滤区域(id, list) {
            if (!id) return '';
            var area = 过滤地区(list, id);
            var str='';
                area.forEach(element => {
                   str+=element.name+'/' 
                });
            return str.substring(0,str.length-1);
        },
        过滤时间(time,type){
            try {
                return dateFtt(time,type)
            } catch (error) {
                return time
            }
        },
        过滤店铺类型(type,list){
            var type_url = get_url(list , type);
            var str='';
                type_url.forEach(item=>{
                    str+=item.name+'/'
                })
            return str.substring(0,str.length-1);
        },
        过滤服务(type,list){
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
        },
    },
    computed: {
        ...mapGetters({
            店铺类型:'通用/店铺类型',
            服务类型:'通用/服务类型',
            区域:'区域/区域',
            userInfo:'登陆/userInfo',
            代理商信息:'登陆/代理商信息',
            管理员:'登陆/管理员'
            
        })
    },
    methods: {
        查看更多(x){
            console.log('查看更多');
            this.$router.push('/dianpu/xiugaiXiangqing?id='+x.id+"&userid="+x.userid);
        },
        
        isloading(x){
            if(x){
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }else{
                this.loading.close();
            }
        },
        //查找
        waitpay(){
            this.page_index=1;
            this.查询数据();
        },
        qingkong(){
            this.选择的店铺类型=[];
            this.选择的时间=[];
            this.query.startTime='';
            this.query.endTime='';
            this.query.shopType='';
            this.query.name='';
        },
        //选择时间
        timeChange(){
            console.log(this.选择的时间);
            this.page_index=1
            this.查询数据()
        },
        //选择类型
        typeChange(){
            console.log(this.选择的店铺类型);
            this.page_index1
            this.查询数据()
        },
        选择状态(x){
            this.query.state=this.query.state===x ? '' : x;
            this.page_index=1
            this.查询数据()
        },
        查询数据() {
            this.isloading(true);
            this.列表=[];
            
            this.query.areaCode=this.管理员 ? '' : this.代理商信息.areaCode
            this.query.startTime=this.选择的时间 ? this.选择的时间[0] : '';
            this.query.endTime=this.选择的时间 ? this.选择的时间[1] : '';
            this.query.start=(this.page_index-1)*this.query.length;
            this.query.shopType=this.选择的店铺类型 ? this.选择的店铺类型[this.选择的店铺类型.length-1] : '';
            this.$axios.get('/api-s/shops/update/findAll',{params:this.query}).then(x=>{
                this.isloading(false);
                if(x.data.code==200){
                    this.列表 = x.data.data.data
                    this.数量=x.data.data.total;
                }else{
                    this.$message.error(x.data.msg ? x.data.msg : x.data.message);
                }
            }).catch(err=>{
                this.isloading(false);
                this.$message.error('网络错误，稍后再试。');
            })
        },
        查看实名认证(x){
            console.log(x)
            this.显示法人认证=true;
            this.认证详情=x;
            this.图片放大前一步=1;
        },
        //法人认证返回值
        getimg(x){
            console.log(x);
            this.显示图片放大=true;
            this.放大列表=[x];
            this.显示法人认证=false;
        },
        关闭图片放大(){
            this.显示图片放大=false;
            if(this.图片放大前一步==1){              
                this.显示法人认证=true;
            }else if(this.图片放大前一步==2){
                 this.显示执照详情 = true;
            }
        },
        查看营业执照(x){
            this.图片放大前一步=2
            this.执照详情 = x
            this.显示执照详情 = true;
        },
        查看执照图片(x){
            this.显示执照详情 = false;
            this.显示图片放大=true;
            this.放大列表=[x];
        },
        查看地址信息(x){
            console.log(x);
            var this_1 = this;
            this.details=x;
            var lng=x.x;
            var lat=x.y
            this.显示地址详情 = true;
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
        see_img(x){
            console.log(x.split(','));
            this.图片放大前一步=0
            this.放大列表=x.split(',');
            this.显示图片放大=true;
        }
    },
    mounted () {
        this.查询数据()
    }
}
</script>

<style lang="scss" scoped>
.text-right{
    text-align: right;
}
.box_2{
    margin: 5px 0px 0px;
    display: flex;
    text-align: center;
    >li{
        margin: 0px 20px 0px 0px;
    }
}
.box_3{
    margin: 5px 0px 0px;
}


/* 营业执照 */
.营业执照{
    text-align: center;
    .text-red{
        color: red;
        cursor: pointer;
    }
}
.营业执照 li{
    text-align: center;
    margin: 10px 0px;
}
.营业执照 img{
    width: 165px;
}

.address_box .baiduMap{
    height: 230px;
}

</style>
