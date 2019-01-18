<template>
    <div>
        <ul class="头部">
            <li>
                <el-date-picker
                    size="small"
                    v-model="时间段"
                    type="daterange"
                    @change="change_time"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </li>
            <li>
                <el-input size="small" v-model="query.shopName" placeholder="商家"></el-input>
            </li>
            <li>
                <el-input size="small" placeholder="分销员"></el-input>
            </li>
            <li>
                <paixu name="营业额" :type='排序类型' @click.native="改变排序()"/>
            </li>
            <li>
                <el-button size="small" icon="el-icon-search" circle></el-button>
            </li>
            <li>
                <el-button size="small" type="info" @click="清空()" round>清空</el-button>
            </li>
            <li class="共计">
                共计消费：231231212元
            </li>
        </ul>
        
        <el-table :data="list" border size="mini" class="表格">
            <el-table-column prop="shopName" align="center" label="商家"></el-table-column>
            <el-table-column align="center" label="顾客">
                <template slot-scope="scope">
                    {{scope.row.客户.nickname | filter_name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="分销员"></el-table-column>
            <el-table-column align="center" label="店员"></el-table-column>
            <el-table-column align="center" label="时间">
                <template slot-scope="scope">
                    <div>{{scope.row.createTime | 过滤时间('yyyy.MM.dd')}}</div>
                    <div>{{scope.row.createTime | 过滤时间('hh:mm:ss')}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="金额">
                <template slot-scope="scope">
                    {{scope.row.amount+scope.row.deduction}}
                </template>
            </el-table-column>
            <el-table-column prop="deduction" align="center" label="红包抵扣"></el-table-column>
            <el-table-column prop="amount" align="center" label="用户支付"></el-table-column>
            <el-table-column prop="platformFee" align="center" label="平台费"></el-table-column>
            <el-table-column align="center" label="佣金"></el-table-column>
            <el-table-column prop="turnover" align="center" label="商家营业额"></el-table-column>
            <el-table-column align="center" fixed="right" label="商品">
                <template slot-scope="scope">
                    <el-button type="text" @click='查看商品(scope.row)' size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="评价">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="分页">
            <el-pagination
                :page-size="query.length"
                @current-change="current_change"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>

        <div class="商品订单" v-show="显示商品详情">
            <div class="内容区">
                <div class="标题">
                    {{详情类型==0 ? '订单商品' : '现金支付'}}
                </div>
                <div class="关闭" @click="显示商品详情=false">
                    <i class="el-icon-close"></i>
                </div>
                <ul class="商品详情" v-if="详情类型==0">
                    <li v-for="(item, index) in 商品详情" :key="index">
                        <div class="商品内容">
                            <div class="商品图片">
                                <img v-if="item.img.split(',').length>0" :src="item.img.split(',')[0]" alt="">
                            </div>
                            <div class="文字内容">
                                <div class="数量 pull-right">x{{item.数量}}</div>
                                <div class="商品名">{{item.name}}</div>
                                <div class="售价">￥{{item.sellingPrice}}</div>
                                <div class="可抵扣">可抵扣：{{item.deduction}}元</div>
                            </div>
                        </div>
                        <div class="专享图标">
                            <!-- <img src="image/shengri1.png" alt="" srcset=""> -->
                            <!-- <img src="image/xingren.png" alt="" srcset=""> -->
                        </div>
                        <div class="抵扣详情">
                            红包抵扣：{{item.抵扣红包 | fitler_hongbao}}
                        </div>
                    </li>
                </ul>
                <ul class="商品详情" v-if="详情类型==1">
                    <li>
                        <div class="现金支付">
                            金额：{{现金支付详情.paymentAmount}}
                        </div>
                        <div class="抵扣详情">
                            红包抵扣：{{现金支付详情.shopOrderCommoditys[0].shopOrderRedEnvelopeList | filter_xianjin}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import paixu from '@/components/排序.vue';
import {mapGetters , mapActions} from 'vuex';
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";

import { dateFtt } from "@/assets/js/currency.js";

const 查询条件={
        shopName:'',
        start:0,
        length:10,
        shopid:'',
        state:1,
        startTime:'',
        endTime:'',
        areaCode:'',
        order:'orderscreateTime',   //时间 orderscreateTime 金额 ordersturnover
        orderType:'DESC',    //ASC DESC
    }
export default {
    name:'',
    components:{
        paixu
    },
    data () {
        return {
            时间段:[],
            query:Object.assign({},查询条件),
            排序类型:0,
            list:[],
            total:0,
            page_index:1,
            loading:true,
            显示商品详情:false,
            详情类型:0,
            商品详情:{}
        }
    },
    filters:{
        filter_name(name){
            try {
                return b64DecodeUnicode(name)
            } catch (error) {
                return name
            }
        },
        过滤时间(time,type){
            return dateFtt(time,type)
        },
        fitler_hongbao(list){
            if(list.length==0){
                return '0元';
            }else{
                var newlist=[];
                list.forEach(item=>{
                    var 旧红包=newlist.find(x=>x.envelopeType==item.envelopeType);
                    if(旧红包){
                        旧红包.抵扣总金额=旧红包.抵扣总金额+item.paymentAmount
                    }else{
                        var 新红包=Object.assign({},item);
                        新红包.抵扣总金额=新红包.paymentAmount;
                        newlist.push(新红包);
                    }
                })
                var str=''
                //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
                var 红包类型={
                        0:'店铺红包',
                        1:'商品红包',
                        2:'节日红包',
                        3:'签到红包',
                        4:'庆典红包',
                        5:'生日红包',
                        8:'平台红包'
                    }
                newlist.forEach(item=>{
                    str+=红包类型[item.envelopeType]+item.抵扣总金额+'元,';
                })
                return str.substring(0,str.length-1);
            }
        },
    },
    computed: {
        ...mapGetters({
            代理商信息:'登录/代理商信息'
        })
    },
    methods: {
        //分页
        current_change(x){
            console.log(x,this.page_index)
            this.page_index=x;
            this.查询数据()
        },
        //改变时间
        change_time(x){
            if(this.时间段){
                this.query.startTime=this.时间段[0]
                this.query.endTime=this.时间段[1]
            }else{
                this.query.startTime=''
                this.query.endTime=''
            };
            this.list=[];
            this.page_index=1
            this.查询数据();
        },
        改变排序(){
            if(this.排序类型==0){
                this.排序类型=1
            }else if(this.排序类型==1){
                this.排序类型=2
            }else{
                this.排序类型=0
            };

            if(this.排序类型==0){
                this.query.order='orderscreateTime';
                this.query.orderType='DESC'
            }else if(this.排序类型==1){
                this.query.order='ordersturnover';
                this.query.orderType='DESC';
            }else{
                this.query.order='ordersturnover';
                this.query.orderType='ASC';
            }
            this.list=[];
            this.page_index=1
            this.查询数据();
        },
        清空(){
            this.query=Object.assign({},查询条件);
            this.查询数据();
        },
        查询数据(){
            this.query.areaCode=this.代理商信息.areaCode;
            this.query.start=(this.page_index-1)*this.query.length;
            this.$axios.get('/api-s/shops/findAllShopOrders',{params:this.query}).then(x=>{
                if(x.data.code==200){
                    // this.list=this.list.concat(x.data.data.data);
                    var list=x.data.data.data;
                    list.forEach(element => {
                        element.客户={}
                        this.查询用户(element)
                    });
                    this.list=list;
                    this.total=x.data.data.total;
                    this.loading=false;
                }else{
                    this.$message.error(x.data.msg ? x.data.msge : x.data.message);
                }
            }).catch(err=>{
                this.$message.error('网络错误，稍后再试。');
            })
        },
        查询用户(item){
            this.$axios.get('/api-u/users/findByUserid/'+item.userid).then(x=>{
                item.客户=x.data.data;
            })
        },
        查看商品(item){
            this.详情类型=item.orderType;
            if(item.orderType==0){
                this.商品详情=[];
                var shopOrderCommoditys=item.shopOrderCommoditys;
                console.log(shopOrderCommoditys);
                shopOrderCommoditys.forEach(item=>{
                    var 旧商品=this.商品详情.find(x=>x.commodityid==item.commodityid);
                    if(旧商品){
                        旧商品.数量++;
                        旧商品.抵扣红包=旧商品.抵扣红包.concat(item.shopOrderRedEnvelopeList)
                    }else{
                        var 新商品=Object.assign({},item);
                            新商品.数量=1;
                            新商品.抵扣红包=新商品.shopOrderRedEnvelopeList;
                        this.商品详情.push(新商品)
                    }
                })
            }else{
                this.现金支付详情=item
            }
            this.显示商品详情=true;
        },
    },
    mounted () {
        this.查询数据();
    }
}
</script>

<style lang="scss" scoped>
.头部{
    display: flex;
    align-items: center;
    margin: 10px 0px 0px;
    >li{
        margin: 0px 10px 0px 0px;
    }
    .共计{
        flex-grow: 1;
        text-align: right;
    }
}
.表格{
    margin: 10px 0px 0px;
}
.分页{
    text-align: right;
}



.商品订单{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}
.商品订单 .内容区{
    background: #f6f6f6;
    position: relative;
    width: 344px;
    height: 483px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(204, 204, 204, 1) solid 1px;
}
.商品订单 .标题{
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    padding: 12px 0px;
    text-align: center;
} 
.商品订单 .关闭{
    color: rgba(153, 153, 153, 1);
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
}
.商品订单 .关闭:hover{
    color: red;
}
.商品订单 .商品详情{
    padding: 0px 12px;
    overflow: auto;
    color: #505050;
    font-size: 12px;
}
.商品订单 .商品详情::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.商品订单 .商品详情::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.商品订单 .商品详情::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}

.商品订单 .商品详情>li{
    background: #ffffff;
    margin: 0px 0px 5px 0px;
    position: relative;
}
.商品订单 .商品详情>li .商品内容{
    display: flex;
    padding: 8px 8px 0px 8px;
    border-bottom: 1px solid #f6f6f6;
}
.商品订单 .商品图片{
    width: 61px;
    height: 46px;
    border: 1px solid #cccccc;
    margin: 0px 6px 0px 0px;
    flex-shrink: 0;
}
.商品订单 .商品图片 img{
    width: 100%;
    height: 100%;
}
.商品订单 .文字内容{
    position: relative;
    width: 0;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.商品订单 .专享图标{
    position: absolute;
    width: 18px;
    height: 18px;
    top: 37px;
    right: 16px;
}
.商品订单 .专享图标 img{
    width: 100%;
    height: 100%;
}
.商品订单 .抵扣详情{
    line-height: 30px;
    padding: 0px 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.商品订单 .现金支付{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #f6f6f6;
    padding: 0px 8px;
    font-size: 20px;
}
</style>
