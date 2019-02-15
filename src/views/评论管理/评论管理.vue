<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-button-group>
                    <el-button @click="选择状态(0)" size="mini" :type="query.checktype=='0' ? 'primary' : 'info'">待查阅</el-button>
                    <el-button @click="选择状态(1)" size="mini" :type="query.checktype=='1' ? 'primary' : 'info'">已查阅</el-button>
                    <!-- <el-button @click="选择状态(2)" size="mini" :type="query.checktype=='2' ? 'primary' : 'info'">已隐藏</el-button> -->
                </el-button-group>
            </el-col>
        </el-row>
        
        <el-table :data="list" border style="margin:10px 0px 0px" size="mini">
            <el-table-column label="商家" align="center">
                <template slot-scope="scope">
                    <div class="蓝色字体">{{scope.row.店铺名}}</div>                        
                </template>
            </el-table-column>
            <el-table-column prop="用户信息.phone" label="电话电话" align="center">
                <template slot-scope="scope">
                    <div class="蓝色字体">{{scope.row.用户信息.phone}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="商品.name" label="商品" align="center"></el-table-column>
            <el-table-column prop="remark" label="评价" align="center"></el-table-column>
            <el-table-column label="图片" align="center">
                <template slot-scope="scope">
                    <div class="蓝色字体">{{scope.row.remarkimg ? scope.row.remarkimg.split(',').length : 0}}张</div>
                </template>
            </el-table-column>
            <el-table-column label="时间" align="center">
                <!-- yyyy.MM.dd hh:mm -->
                <template slot-scope="scope">
                    <div v-show="!scope.row.lastcomment">{{scope.row.createtime | 时间格式化('yyyy.MM.dd')}}</div>
                    <div v-show="!scope.row.lastcomment">{{scope.row.createtime | 时间格式化('hh:mm')}}</div>
                    <div v-show="scope.row.lastcomment">{{scope.row.lastcomment | 时间格式化('yyyy.MM.dd')}}</div>
                    <div v-show="scope.row.lastcomment">{{scope.row.lastcomment | 时间格式化('hh:mm')}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="查阅(scope.row)" type="text">查阅</el-button>                    
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



        <div class="评论详情">
            <ul class="header">
                <li class="Head_portrait">
                    <img src="static/image/login-bg.jpg" alt="" srcset="">
                </li>
                <li class="text">
                    <div>
                        <div class="name">
                            用户名
                        </div>
                        <div class="xingxing">
                            <xingxing :number="5" />
                        </div>
                    </div>
                    <div class="time">
                        <span>{{评论详情.createtime | 时间格式化('yyyy.MM.dd')}}</span>
                    </div>
                </li>
            </ul>
            <ul class="content_1">
                <li>
                    <div class="left_1">
                        <div class="text_1">
                            <div>评论评论评论评论评论评论评论评论评论评论评论评论</div>
                        </div>
                        <div class="img_box">
                            <div>
                                <ul class="img_list">
                                    <li>
                                        <img src="static/image/login-bg.jpg" alt="">
                                    </li>
                                    <li>
                                        <img src="static/image/login-bg.jpg" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="dianzan">
                                <i class="icon iconfont icon-dianzan1"></i>
                                88
                            </div>
                        </div>
                    </div>
                    <div class="right_1">
                        <div>屏蔽</div>
                    </div>
                </li>
                <li v-for="(回复item, index1) in 2" >
                    <div class="left_1">
                        <ul class="header_1">
                            <li class="name" v-if="!回复item.clerksid">
                                张三回复：
                            </li>
                            <li class="name" v-if="回复item.clerksid">
                                李四回复：
                            </li>
                            <li class="time_1 mui-text-center">
                                <!-- <span v-show="回复item.commenttype==1">{{回复item.createtime | 计算时间差(item.createtime)}}</span> -->
                                <span>7天后追评</span>
                            </li>
                            <li class="time_2 mui-text-right">{{回复item.createtime | 时间格式化('yyyy.MM.dd hh:mm')}}</li>
                        </ul>
                        <div class="text_1">
                            <div>评论评论评论评论评论评论评论评论评论评论评论评论</div>
                        </div>
                        <div class="img_box">
                            <div>
                                <ul class="img_list">
                                    <li>
                                        <img src="static/image/login-bg.jpg" alt="">
                                    </li>
                                    <li>
                                        <img src="static/image/login-bg.jpg" alt="">
                                    </li>
                                </ul>
                            </div>
                            <!-- <div class="dianzan">
                                <i class="icon iconfont icon-dianzan1"></i>
                                100
                            </div> -->
                        </div>
                    </div>
                    <div class="right_1">
                        <div>屏蔽</div>
                    </div>
                    <!-- <ul class="huifu mui-clearfix">
                        <div class="mui-pull-right" @tap="回复(item)">回复</div>
                        <div class="mui-pull-right">不回复</div>
                    </ul> -->
                </li>
            </ul>
        </div>

        <div class="评论详情">
            <ul class="header">
                <li class="Head_portrait">
                    <img v-if="评论详情.用户信息 && 评论详情.用户信息.headImgUrl" :src="评论详情.用户信息.headImgUrl" alt="" srcset="">
                </li>
                <li class="text">
                    <div>
                        <div class="name">
                            {{评论详情.用户信息.nickname | 名字转码}}
                        </div>
                        <div class="xingxing">
                            <xingxing :number="评论详情.score" />
                        </div>
                    </div>
                    <div class="time">
                        <span>{{评论详情.createtime | 时间格式化('yyyy.MM.dd')}}</span>
                    </div>
                </li>
            </ul>
            <ul class="content_1">
                <li>
                    <div class="text_1">
                        <div v-html="评论详情.remark"></div>
                    </div>
                    <div class="img_box">
                        <div>
                            <ul class="img_list" v-if="评论详情.remarkimg && 评论详情.remarkimg.split(',').length>0">
                                <li v-for="(img_item, img_index) in 评论详情.remarkimg.split(',')" :key="img_index">
                                    <img :src="img_item" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="dianzan">
                            <i class="icon iconfont icon-dianzan1"></i>
                            {{评论详情.somegreattimes ? 评论详情.somegreattimes : 0}}
                        </div>
                    </div>
                    <ul class="huifu mui-clearfix" v-if="评论详情.shopreplytype==0">
                        <div class="mui-pull-right" @tap="回复(评论详情,index)">回复</div>
                        <div class="mui-pull-right" @click="不回复(评论详情,index)">不回复</div>
                    </ul>
                </li>
                <li v-for="(回复item, index1) in 评论详情.shopCommodityCommentList" :key="index1">
                    <ul class="header_1">
                        <li class="name" v-if="!回复item.clerksid">
                            {{回复item.用户信息.nickname | 名字转码}}回复：
                        </li>
                        <li class="name" v-if="回复item.clerksid">
                            {{回复item.店员.clerksname | 名字转码}}回复：
                        </li>
                        <li class="time_1 mui-text-center">
                            <span v-show="回复item.commenttype==1">{{回复item.createtime | 计算时间差(item.createtime)}}</span>
                        </li>
                        <li class="time_2 mui-text-right">{{回复item.createtime | 时间格式化('yyyy.MM.dd hh:mm')}}</li>
                    </ul>
                    <div class="text_1">
                        <div v-html="回复item.remark"></div>
                    </div>
                    <div class="img_box">
                        <div>
                            <ul class="img_list" v-if="回复item.remarkimg && 回复item.remarkimg.split(',').length>0">
                                <li v-for="(img_item, img_index) in 回复item.remarkimg.split(',')" :key="img_index">
                                    <img :src="img_item" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="dianzan">
                            <i class="icon iconfont icon-dianzan1"></i>
                            {{回复item.somegreattimes ? 回复item.somegreattimes : 0}}
                        </div>
                    </div>
                    <!-- <ul class="huifu mui-clearfix">
                        <div class="mui-pull-right" @tap="回复(item)">回复</div>
                        <div class="mui-pull-right">不回复</div>
                    </ul> -->
                </li>
            </ul>
        </div>



    </div>
</template>

<script>
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";
import { 当前时间格式化 } from "@/assets/js/currency.js";

import { api_查询评论列表 } from "@/接口/评论接口.js";
import { api_根据shopid查询店铺 } from "@/接口/店铺接口.js";
import { api_通过username查询 } from "@/接口/用户接口.js";
import { api_根据id查询商品 } from "@/接口/商品接口.js";

import { mapGetters, mapActions } from "vuex";

import xingxing from "@/components/xingxing.vue";
export default {
    name:"",
    components:{
        xingxing
    },
    data () {
        return {
            query:{
                start:0,
                length:10,
                checktype:0,
                areaCode:''
            },
            page_index:1,
            list:[],
            total:0,
            评论详情:{
                用户信息:{}
            }
        }
    },
    computed: {
        ...mapGetters({
            代理商信息:'登陆/代理商信息',
            管理员:'登陆/管理员',
        })  
    },
    filters:{
        时间格式化(time,type){
            try {
                return 当前时间格式化(type,time)
            } catch (error) {
                return time
            }
        },
        名字转码(name){
            try {
                return b64DecodeUnicode(name)
            } catch (error) {
                return name
            }
        }
    },
    methods: {
        ...mapActions({
            加载中:"加载中/加载"
        }),
        查阅(item){
            this.评论详情=item;
        },
        选择状态(type){
            this.query.checktype=type;
            this.page_index=1;
            this.list=[];
            this.查询()
        },
        current_change(x){
            console.log(x);
            this.page_index=x;
            this.list=[];
            this.查询()
        },
        查询(){
            this.加载中(true)
            this.query.start=(this.page_index-1)*this.query.length;
            this.query.areaCode=this.管理员 ? '' : this.代理商信息.areaCode;
            api_查询评论列表(this.query).then(x=>{
                if(x.data.code==200){
                    var list=x.data.data.data
                    list.forEach(item => {
                        item.店铺名='';
                        item.用户信息={};
                        item.商品={};
                        if(item.shopid){
                            api_根据shopid查询店铺(item.shopid).then(r=>{
                                item.店铺名=r.data.code==200 ? r.data.data.name : ''
                            })
                        }
                        if(item.userid){
                            api_通过username查询(item.userid).then(r=>{
                                if(r.data.code==200){
                                    item.用户信息=r.data.data;
                                }
                            });
                        }
                        if(item.commodityid){
                            api_根据id查询商品(item.commodityid).then(r=>{
                                if(r.data.code==200){
                                    item.商品=r.data.data;
                                }
                            })
                        }
                    });
                    this.list=list;
                    this.total=x.data.data.total;
                }else{
                    this.$message.error(x.data.msg ? x.data.msg : x.data.message);
                }
                this.加载中(false)
            }).catch(err=>{
                this.$message.error('系统错误稍后再试');
                this.加载中(false)
            })
        },
        初始化(){

        }
    },
    mounted () {
        console.log(12)
        this.查询()
    }
}
</script>

<style lang="scss" scoped>
.分页{
    margin: 10px;
    text-align: right;
}
.蓝色字体{
    color: rgba(42, 130, 228, 1);
}


.评论详情 {
    width: 420px;
    padding: 0px 10px;
    background: rgba(204, 204, 204, 1);
    margin: 0px 0px 5px 0px;
    .header {
        display: flex;
        padding: 6px 0px;
        flex-shrink: 0;
        .Head_portrait {
            width: 38px;
            height: 38px;
            margin: 0px 12px 0px 0px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .text {
            flex-grow: 1;
            div {
                display: flex;
                justify-content: space-between;
            }
            .name {
                color: rgba(80, 80, 80, 1);
                font-size: 14px;
            }
            .time {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
            }
        }
    }
    .content_1 {
        > li {
            border-bottom: 1px solid rgba(246, 246, 246, 1);
            padding: 0px 0px 8px 0px;
            margin: 0px 0px 6px 0px;
            display: flex;
        }
        > li:last-child {
            margin: 0px;
            border: none;
        }
        .left_1{
            flex-grow: 1;
        }
        .right_1{

        }
        padding: 0px 0px 0px 50px;
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
        .header_1 {            
            display: flex;
            align-items: center;
            justify-content: space-between;
            >li{
                width: calc(100% / 3);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .time_1 {
                color: #fc6621;
            }
            .time_2 {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
            }
        }
        .text_1 {
            margin: 0px 0px 8px 0px;
        }
        .img_box {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            .img_list {
                display: flex;
                flex-wrap: wrap;
                > li {
                    width: 60px;
                    height: 60px;
                    margin: 0px 8px 0px 0px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .dianzan {
                color: rgba(166, 166, 166, 1);
                font-size: 14px;
                i {
                    color: #f86c0c;
                    font-size: 24px;
                }
            }
        }
        .huifu {
            padding: 11px 0px 0px 0px;
            div {
                width: 52px;
                height: 22px;
                border-radius: 22px;
                line-height: 20px;
                font-size: 12px;
                margin: 0px 0px 0px 12px;
                text-align: center;
            }
            > div:nth-child(1) {
                color: #007aff;
                border: 1px solid #007aff;
            }
            > div:nth-child(2) {
                color: #808080;
                border: 1px solid #808080;
            }
        }
    }
}

</style>

