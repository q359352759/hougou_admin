<template>
    <div class="app-container">
            <ul class="box_2">
                <li>
                    <el-date-picker size="mini" v-model="time" type="daterange" align="left" start-placeholder="开始日期"
                        end-placeholder="结束日期"  @change="timeChange"
                        value-format="yyyy-MM-dd dd:hh:mm">
                    </el-date-picker>
                </li>
                <!-- <li>
                    <el-input size="mini" clearable class="input_1" v-model="query.referrerPhone" style="text-align: center;" placeholder="推荐人"></el-input>
                </li> -->
                <li>
                    <el-input size="mini" clearable v-model="query.name" placeholder="商家名称"></el-input>
                </li>
                <li v-show="管理员">
                    <el-cascader placeholder="请选择区域" style="width:250px" size="mini" expand-trigger="hover" :options="区域列表"
                        :props="address_props" :clearable="true" v-model="area" @change="handleChange">
                    </el-cascader>
                </li>
                <!-- <li>
                    <el-cascader placeholder="请选择类型" style="width:250px" size="mini" expand-trigger="hover" :options="shops_tree"
                        :props="address_props" :clearable="true" v-model="shopsType" @change="typeChange">
                    </el-cascader>
                </li> -->
                <li>
                    <el-button size="mini" icon="el-icon-search" @click="waitpay()" circle></el-button>
                </li>
                <li>
                    <el-button size="mini" type="info" round @click="qingkong()">清空</el-button>
                </li>
            </ul>

            <div class="box_3">
                <el-table :data="table_list" border size="mini" style="width: 100%;text-align: center">
                    <el-table-column prop="shopName" label="商家" align="center"></el-table-column>
                    <el-table-column prop="name" label="商品名" align="center"></el-table-column>
                    <!-- <el-table-column label="区域" align="center" width="250">
                        <template slot-scope="scope">
                            <div class="area">
                                {{scope.row.areaCode | filter_area}}
                            </div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="createTime" label="时间" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.createTime | dateFtt('yyyy-MM-dd')}}
                            </div>
                            <div>
                                {{scope.row.createTime | dateFtt('hh:mm')}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                    <el-table-column prop="marketPrice" label="市场价" align="center"></el-table-column>
                    <el-table-column prop="sellingPrice" label="售价" align="center"></el-table-column>
                    <el-table-column label="红包抵扣方式" align="center">
                        <template slot-scope="x">
                            {{x.row.twtreid==1 ? '%' : '元'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="percentage" label="红包抵扣比例" align="center"></el-table-column>
                    <el-table-column prop="deduction" label="红包抵扣金额" align="center"></el-table-column>
                    <el-table-column label="分佣类型" align="center">
                        <template slot-scope="x">
                            {{x.row.commissionType==1 ? '%' :'元' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="commissionPercentage" label="分佣比例" align="center"></el-table-column>
                    <el-table-column prop="commission" label="分佣金额" align="center"></el-table-column>
                    <el-table-column label="上架状态" align="center">
                        <template slot-scope="x">
                            {{x.row.state==1 ? '上架' :'下架'}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column fixed="right" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="LowerShelf(scope.row)" v-if="scope.row.state==1" type="text">下架</el-button>                            
                            <!-- <span class="text-red" @click="jujue(scope.row)" style="color:red">删除</span> -->
                            <el-button @click="more(scope.row)" size="mini" type="text">查看更多</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { dateFtt , convert } from "@/assets/js/currency.js";
export default {
    name:"",
    data () {
        return {
            time:'',
            query:{
                start:0,
                length:10,
                areaCode:'',
                startTime:'',
                endTime:'',
            },
            address_props: {
                value: 'id',
                label: 'name',
            },
            area: [],           //区域
            // shopsType:[],       //店铺类型
            loading:'',
            region_code:'',     //区域code 代理商区域code
            table_list:[],
            total:0,
            page_index:1,
        }
    },
    computed: {
        ...mapGetters({
            userInfo:'登陆/userInfo',
            areaManager:'登陆/代理商信息',
            管理员:'登陆/管理员',
            区域:'区域/区域',
            服务类型:'通用/服务类型',
            店铺类型:'通用/店铺类型'
        }),
        区域列表(){
            var list=convert(this.区域);
            return list;
        }
    },
    filters: {
        
        // 过滤区域
        filter_area(id, list) {
            if (!id) return '';
            var area = get_url(list, id)
            return area.join(' / ');
        },
        //时间过滤
        dateFtt(time,type) {
            if (time) {
                // return dateFtt(time, 'yyyy-MM-dd hh:mm')
                return dateFtt(time, type)
            } else {
                return time;
            }
        },
    },
    methods: {
        openloading(type) {
            if(type){
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }else{
                setTimeout(x=>{
                    this.loading.close()
                },500)
            }
        },
        //点击查看
        waitpay(){
            this.get_commodity();
        },
        //清空
        qingkong(){
            this.time='';
            this.query.startTime='';
            this.query.endTime='';
            this.query.name='';
            this.area=[];
        },
        //查看更多
        more(x){
            location.href="../CommodityDetails/CommodityDetails.html?id="+x.id;
        },
        //点击下架
        LowerShelf(x){
            openloading(true)
            var obj=Object.assign({},x)
                obj.state=obj.state==0 ? 1 : 0;
                obj.arrImg=x.img.split(',');
            var access_token=localStorage.access_token;
            this.$axios({
                method:'post',
                url:'/api-s/shops/commodity/update?_='+new Date().getTime(),
                data:[obj],
                headers:{
                    "Authorization" : "Bearer " + localStorage.getItem("access_token")
                }
            }).then(res=>{
                if(res.data.code==200){
                    this.$message({ message: '设置成功。', type: 'success' });
                    x.state=x.state==0 ? 1 : 0;
                }else{
                    this.$message.error(res.data.msg ? res.data.msg : x.data.message);
                }
                openloading(false)
            }).catch(err=>{
                this.$message.error('系统错误稍后再试。');
                openloading(false)
            })

            // this.$http({
            //     method:'post',
            //     url:ip+'/api-s/shops/commodity/update?_='+new Date().getTime(),
            //     // 1547780997035
            //     body:[obj],
            //     headers:{
            //         "Authorization" : "Bearer " + localStorage.getItem("access_token")
            //     }
            // }).then(res=>{
            //     console.log(res)
            //     if(res.body.code==200){
            //         this.$message({
            //             message: '设置成功。',
            //             type: 'success'
            //         });
            //         x.state=x.state==0 ? 1 : 0;
            //     }else if(res.body.code){
            //         this.$message.error(res.body.msg);
            //     }else{
            //         this.$message.error(res.body.message);
            //     }
            // },error=>{
            //     this.$message.error('系统错误稍后再试。');
            //     console.log(error);
            // })
        },
        //时间选择
        timeChange(x){
            if(x){
                this.query.startTime=x[0];
                this.query.endTime=x[1];
            }else{
                this.query.startTime='';
                this.query.endTime='';
            }
            this.get_commodity();
        },
        //选择地区
        handleChange(){
            this.get_commodity()
        },
        //选择类型
        typeChange(){
            console.log(this.shopsType)
        },
        // 查询商品信息
        get_commodity(){
            this.openloading(true)
            if(this.管理员){
                this.query.areaCode=this.area.length>0 ? this.area[this.area.length-1] : '';
            }else{
                this.query.areaCode=this.管理员 ? '' : this.areaManager.areaCode
            }
            this.query.start=(this.page_index-1)*this.query.length;
            this.$axios.get('/api-s/shops/findCommodity',{params:this.query}).then(x=>{
                this.table_list=x.data.data.data;
                this.total=x.data.data.total;
                this.openloading(false)
            }).catch(errr=>{
                this.openloading(false)
            })
        }
    },
    mounted() {
        this.get_commodity()
    },
}
</script>

<style lang="scss" scoped>

.box_2{
    margin: 0px 0px 0px;
    display: flex;
    text-align: center;
}
.box_2>li{
    margin: 0px 20px 0px 0px;
}
.box_2 input{
    text-align: center;
}

.box_3{
    margin: 5px 0px 0px 0px;
}
</style>
