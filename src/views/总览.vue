<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24" class="地址">{{过滤后区域}}</el-col>
        </el-row>  
        <ul class="box_1">
            <li class="item_1" @click="$router.push('/dianpu/liebiao')">
                <div>
                    <div><span>{{所有数据.商家入驻待审核.total}}</span>家</div>
                    <div>待审核店铺</div>
                </div>
                <div><i class="icon iconfont icon-mn_dianpu_fill"></i></div>
            </li>
            <li class="item_2" @click="$router.push('/dianpu/xiugaiLibiao')">
                <div>
                    <div><span>{{所有数据.商家修改待审核.total}}</span>家</div>
                    <div>店铺资料修改</div>
                </div>
                <div><i class="icon iconfont icon-mingpian2"></i></div>
            </li>
            <li class="item_3">
                <div>
                    <div><span>{{评价待查阅}}</span>个</div>
                    <div>待查阅评价</div>
                </div>
                <div><i class="icon iconfont icon-huaduo"></i></div>
            </li>
            <li class="item_4">
                <div>
                    <div><span>-0</span>个</div>
                    <div>待查阅商品</div>
                </div>
                <div><i class="icon iconfont icon-bao"></i></div>
            </li>
            <li class="item_5">
                <div>
                    <div><span>-0</span>个</div>
                    <div>待查阅简介</div>
                </div>
                <div><i class="icon iconfont icon-wendang"></i></div>
            </li>
        </ul>

        <ul class="box_2">
            <li class="header_1">
                <div>商家</div>
                <div>订单</div>
                <div>销售额</div>
                <div>代理人</div>
                <div>红购使者</div>
                <div>分润</div>
                <div>群发</div>
            </li>
            <li>
                <div>{{所有数据.商家.total}}家</div>
                <div>{{所有数据.订单总数.total}}笔</div>
                <div>-0元</div>
                <div>{{所有数据.代理人总数.total}}个</div>
                <div>{{所有数据.红购使者.total}}个</div>
                <div>-0元</div>
                <div>-0条</div>
            </li>
        </ul>

        <el-row class="box_3">
            <el-col :span="12">
                <div class="树状图 margin_right">
                    <div class="标题">订单数量走势</div>
                    <div ref="订单走势图" class="走势图"></div>
                    <ul class="按钮">
                        <li>
                            <span @click="改变订单走势日期类型('')" :class="{'蓝色字体':订单走势.type==''}">年</span>
                            <span @click="改变订单走势日期类型('year')" :class="{'蓝色字体':订单走势.type=='year'}">月</span>
                            <span @click="改变订单走势日期类型('month')" :class="{'蓝色字体':订单走势.type=='month'}">日</span>
                        </li>
                        <li class="时间选择器" v-if="订单走势.type!=''">
                            <div class="显示时间">{{订单走势.展示数据.年}}</div>
                            <el-date-picker
                                class="时间输入框"
                                v-model="订单走势.展示数据.年"
                                :type="订单走势.type"
                                :value-format="订单走势.value_format"
                                :clearable="false"
                                size="mini">
                            </el-date-picker>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="树状图 margin_left">
                    <div class="标题">销售额走势</div>
                    <div ref="销售额走势" class="走势图"></div>
                    <ul class="按钮">
                        <li>
                            <span @click="改变销售走势日期类型('')" :class="{'蓝色字体':销售走势.type==''}">年</span>
                            <span @click="改变销售走势日期类型('year')" :class="{'蓝色字体':销售走势.type=='year'}">月</span>
                            <span @click="改变销售走势日期类型('month')" :class="{'蓝色字体':销售走势.type=='month'}">日</span>
                        </li>
                        <li class="时间选择器" v-if="销售走势.type!=''">
                            <div class="显示时间">{{销售走势.时间}}</div>
                            <el-date-picker
                                @change="changeTime_2"
                                class="时间输入框"
                                v-model="销售走势.时间"
                                :type="销售走势.type"
                                :value-format="销售走势.value_format"
                                :clearable="false"
                                size="mini">
                            </el-date-picker>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="饼图 margin_right">
                    <div ref="使者代理人" class="走势图"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="饼图 margin_right">
                    <div ref="活跃店铺" class="走势图"></div>
                </div>
            </el-col>
        </el-row>

              
    </div>
</template>

<script>
import echarts from 'echarts'

import { mapActions , mapGetters , mapMutations} from "vuex";
import { get_url , 过滤地区 , 当前时间格式化 } from "@/assets/js/currency.js";
import { api_查询订单列表 } from "@/接口/订单接口.js";
import { api_某月的每天营业额 , api_某年每月营业额 , api_某年的总营业额 } from "@/接口/营业额接口.js";
import { api_查询评论列表 } from "@/接口/评论接口.js";
import { getCountDays } from "@/assets/js/time.js";
export default {
    name:"",
    data () {
        return {
            value10:"",
            chart_1:'',
            chart_2:'',
            chart_3:'',
            订单走势:{
                type:'',    //year month date
                value_format:"",    //yyyy-MM-dd
                展示数据:{
                    年:"2019"
                },
                query:{
                    type:'year',
                    startTime:'',
                    endTime:''
                }
            },
            销售走势:{
                type:'',    //year month date
                value_format:"",    //yyyy-MM-dd
                时间:""
            },
            销售走势年报:[],
            销售走势月报:[],
            销售走势日报:[],
            评价待查阅:0
        }
    },
    filters: {
        
    },
    computed: {
        ...mapGetters({
            所有数据:'代理商/总览/所有数据',
            代理商信息:'登陆/代理商信息',
            管理员:"登陆/管理员",
            区域:'区域/区域'
        }),
        过滤后区域(){
            try {
                var list=过滤地区(this.区域,this.代理商信息.areaCode)
            } catch (error) {
                var list=[];
            }
            var str='';
                list.forEach(item => {
                    str+=item.name+'/'
                });
            return str.substring(0,str.length-1)
        }
    },
    methods: {
        ...mapActions({
            数据初始化:'代理商/总览/数据初始化',
            代理人总数:'代理商/总览/代理人总数',
            查询红购使者:"代理商/总览/查询红购使者"
            // 查询商家:'代理商/总览/查询商家',
        }),
        改变订单走势日期类型(type){
            this.订单走势.type=type;
            if(type=='year'){
                this.订单走势.展示数据.年=当前时间格式化('yyyy')
                this.订单走势.value_format='yyyy';
            }else if(type=='month'){
                this.订单走势.展示数据.年=当前时间格式化('yyyy-MM')
                this.订单走势.value_format='yyyy-MM';
            }
        },
        改变销售走势日期类型(type){
            this.销售走势.type=type;
            if(type=='year'){
                this.销售走势.时间=当前时间格式化('yyyy')
                this.销售走势.value_format='yyyy';
            }else if(type=='month'){
                this.销售走势.时间=当前时间格式化('yyyy-MM')
                this.销售走势.value_format='yyyy-MM';
            }
            this.查询销售统计()
        },
        changeTime_2(){
            console.log( this.销售走势)
            this.查询销售统计();
        },
        设置销售额走势(){
            var dataZoom_end=100;
            var 最大值=0;
            var xAxis_data=[];
            var series_data=[];
            if(this.销售走势.type==''){  
                var list = Array.from(this.销售走势年报);
                list.sort(function (num1, num2) {
                    return num1.营业额 - num2.营业额;
                });
                最大值 =list.length > 0 ? Math.ceil(list[list.length - 1].营业额) : 0;
                dataZoom_end=100/(this.销售走势年报.length/6)
                this.销售走势年报.forEach(item=>{
                    xAxis_data.push(item.value+'年');
                    series_data.push(item.营业额)
                })
            }else if(this.销售走势.type=='year'){
                var list = Array.from(this.销售走势月报);
                list.sort(function (num1, num2) {
                    return num1.final - num2.final;
                });
                最大值 =list.length > 0 ? Math.ceil(list[list.length - 1].final) : 0;
                dataZoom_end=100/(this.销售走势月报.length/6)
                this.销售走势月报.forEach(item=>{
                    xAxis_data.push(item.month+'月');
                    series_data.push(item.final)
                })
            }else{
                var list = Array.from(this.销售走势日报);
                list.sort(function (num1, num2) {
                    return num1.final - num2.final;
                });
                最大值 =list.length > 0 ? Math.ceil(list[list.length - 1].final) : 0;
                dataZoom_end=100/(this.销售走势日报.length/6);
                this.销售走势日报.forEach(item=>{
                    xAxis_data.push(item.day+'日');
                    series_data.push(item.final);
                })
            }
            
            this.chart_2.setOption({
                grid:{
                    left:"50px",
                    top:"20px",
                    right:"50px",
                    bottom:"20px"
                },
                tooltip: {},
                dataZoom:[
                    {
                        type: 'inside',
                        show: true,
                        start: 0,
                        end: dataZoom_end      //最大100
                    }
                ],
                xAxis: [{
                    data: xAxis_data
                }],
                yAxis: [{
                    type : 'value',
                    max: 最大值,
                    min: 0
                }],
                series: [{
                    label: {
                        show: true,
                        color:'#000000'
                    },
                    itemStyle: {
                        color:"#3c90f7"
                    },
                    type: 'line',
                    data: series_data
                }]
            });
        },
        设置红购使者和代理人饼图(){
            this.chart_3.setOption({
                tooltip : {
                    show:true,
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: ['红购使者', '代理人']
                },
                series : [
                    {
                        radius : '65%',
                        type: 'pie',
                        data:[
                            {value:this.所有数据.代理人总数.total, name: '红购使者',itemStyle:{color:'#7c4bd8'}},
                            {value:this.所有数据.红购使者.total, name: '代理人',itemStyle:{color:'#e05667'}},
                        ]
                    }
                ]
            })
        },
        async 查询销售统计(){
            var this_1=this;
            if(this.销售走势.type==''){
                var 销售走势年报=this.销售走势年报
                for(let i=0;i<销售走势年报.length;i++){
                    console.log(销售走势年报[i]);
                    var query={
                        years:销售走势年报[i].value,
                        areaCode:this.管理员 ? '' : this.代理商信息.areaCode,
                        // shopid:'D5995964EE8D9AA3B630CAE96679253F',
                    }
                    await api_某年的总营业额(query).then(x=>{
                        if(x.data.code==200){
                            销售走势年报[i].营业额=x.data.data ? x.data.data : 0;
                        }else{
                            销售走势年报[i].营业额=0
                        }
                    })
                }
                this.设置销售额走势()
            }else if(this.销售走势.type=='year'){
                var query={
                        years:this.销售走势.时间,
                        areaCode:this.管理员 ? '' : this.代理商信息.areaCode,
                        // state:1,
                        // shopid:'D5995964EE8D9AA3B630CAE96679253F',
                    }
                this.销售走势月报=[];
                var 当前月份=当前时间格式化('yyyy-MM');
                for (let i = 1; i <= 12; i++) {
                    var newdate = this.销售走势.时间 + "-" + (i < 10 ? "0" + i : i);
                    if (newdate <= 当前月份) {
                        this.销售走势月报.push({ month: i, final: 0 });
                    }
                }
                api_某年每月营业额(query).then(x=>{
                    if(x.data.code==200){
                        var data = x.data.data;
                        this.销售走势月报.forEach(item => {
                            var obj = data.find(x => x.month == item.month);
                            if (obj) {
                                item.final = obj.final;
                            }
                        });
                    }
                    this.设置销售额走势()
                })
            }else{
                this.销售走势日报=[];
                var 当月天数=getCountDays(this.销售走势.时间);
                var date = new Date(this.销售走势.时间);
                var 当前时间=当前时间格式化('yyyy-MM-dd');
                for (let i = 1; i <= 当月天数; i++) {
                    if (i < 10) {
                        var dayTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-0" + i;
                    } else {
                        var dayTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + i;
                    }
                    if (dayTime <= 当前时间) {
                        this_1.销售走势日报.push({ final: 0, dayTime: dayTime, day: i });
                    }
                }
                var query={
                        startDay:this.销售走势.时间+'-01',
                        endDay:this.销售走势.时间+当月天数,
                        areaCode:this.管理员 ? '' : this.代理商信息.areaCode,
                        // shopid:'D5995964EE8D9AA3B630CAE96679253F',
                    }
                api_某月的每天营业额(query).then(x=>{
                    if(x.data.code==200){
                        var data = x.data.data;
                        this.销售走势日报.forEach(item => {
                            var obj = data.find(x => x.dayTime == item.dayTime);
                            if (obj) {
                                item.final = obj.final;
                            }
                        });
                    }
                    this.设置销售额走势()
                })
            }
        },
        初始化(){
            this.数据初始化();
            Promise.all([this.代理人总数(),this.查询红购使者()]).then(x=>{
                this.设置红购使者和代理人饼图();  
            });
            this.查询销售统计();
            var 评论_query={
                    start:0,
                    length:10,
                    checktype:0,
                }
            api_查询评论列表(评论_query).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    this.评价待查阅=x.data.data.total
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted() {
        var this_1=this;
        var date=new Date();
        var 年=date.getFullYear();
        for(let i=2018;i<=年;i++){
            var obj={
                    value:i
                }
            this_1.销售走势年报.push(obj)
        }


        //订单走势
        this.chart_1 = echarts.init(this.$refs.订单走势图)
        //订单走势
        this.chart_2 = echarts.init(this.$refs.销售额走势)
        //红购使者和代理人
        this.chart_3 = echarts.init(this.$refs.使者代理人);
        // 活跃店铺
        this.chart_4 = echarts.init(this.$refs.活跃店铺);
        this.初始化();
       
        this.chart_1.setOption({
            grid:{
                left:"50px",
                top:"20px",
                right:"50px",
                bottom:"20px"
            },
            tooltip: {
                
            },
            dataZoom:[
                {
                    type: 'inside',
                    show: true,
                    start: 0,
                    end: 100/2      //最大100
                }
            ],
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: {
                
            },
            series: [{
                barMaxWidth:"30px",
                itemStyle: {
                    color:"#3c90f7"
                },
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
            }]
        })
        
        
        this.chart_4.setOption({
            tooltip : {
                show:true,
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ['活跃店铺数量', '一般店铺数量']
            },
            series : [
                {
                    radius : '65%',
                    type: 'pie',
                    data:[{
                            value:535,
                            name: '活跃店铺数量',
                            itemStyle:{color:'#3c90f7'},
                            label:{
                                show:true
                            }
                        },
                        {
                            value:50, 
                            name: '一般店铺数量',
                            itemStyle:{color:'#55bfc0'}
                        },
                    ]
                }
            ]
        })
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    display: flex;
    justify-content: space-between;
    margin: 20px 0px 0px;
    li{
        cursor: pointer;
        width: calc(100% * (140 / 850));
    	height: calc( (100vw - 180px) * (60 / 850)) ;
        display: flex;
        border-radius: 6px;
        align-items: center;
        justify-content: space-between;
        padding: 0px 1%;
        color: #ffffff;
    	// font-size: 12px;
        font-size: calc( ((100vw - 180px) * (140 / 850)) * (12 / 140));
    }
    li:hover{
        opacity: 0.8;
    }
    span{
        font-size: calc( ((100vw - 180px) * (140 / 850)) * (18 / 140));
    }
    i{
        font-size: calc( ((100vw - 180px) * (140 / 850)) * (32 / 140));
    }
    .item_1{
        background: #1cb497;
    }
    .item_2{
        background: #ef7578;
    }
    .item_3{
        background: #1fbdcf;
    }
    .item_4{
        background: #cb5e89;
    }
    .item_5{
        background: #fdb250;
    }
}
.box_2{
    border-top: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    margin: 30px 0px 0px;
    text-align: center;
    font-size: 14px;
    >li{
        display: flex;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #E5E5E5;
        div{
            width: calc(100% / 7);
            border-left: 1px solid #E5E5E5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    >li.header_1{
        color: #ffffff;
        background: #86BE14;
    }
}

.box_3{
    margin: 20px 0px 0px;
    .树状图{
        background: #f6f6f6;
        .标题{
            padding: 16px 0px 0px;
            text-align: center;
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .走势图{
            height: 300px;
        }
        .按钮{
            padding: 25px;
            display: flex;
            justify-content: space-between;
            .蓝色字体{
                color: #007aff;
            }
            .时间选择器{
                position: relative;
                .显示时间{
                    color: #007aff;
                }
                .时间输入框{
                    position: absolute;
                    opacity: 0;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                }
            }
        }
    }
    .饼图{
        .走势图{
            height: 300px;
        }
    }
    .margin_right{
        margin: 0px 5px 0px 0px;
    }
    .margin_left{
        margin: 0px 0px 0px 5px;
    }
}




.地址{
    text-align: center;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    font-weight: bold;
    margin: 10px 0px;
}
.统计{
    padding: 0px 8px;
    ul{
        .标题{
            text-align: center;
            margin: 0px 0px 6px;
        }
        background: #f6f6f6;
        padding: 10px 17px;
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
        min-height: 160px;
    }
    .蓝色字体{
        color: #2a82e4;
        cursor: pointer;
    }
    .鼠标样式{
        cursor: pointer;
    }
    .鼠标样式:hover{
        color: #2a82e4;
    }
}
</style>