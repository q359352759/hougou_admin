<template>
    <div class="app-container">
        <el-button @click="block()" type="info" icon="el-icon-arrow-left" circle></el-button>
        <div class="title_1 text-center">{{commodity.name}}</div>
        <div class="box_2">
            <span>基本信息</span>
        </div>
        <el-row>
            <el-col :span="12">
                <ul class="box_3">
                    <li>商品名称：{{commodity.name}}</li>
                    <li>申请时间：{{commodity.createTime | dateFtt('yyyy-MM-dd hh:mm')}}</li>
                    <li>更新时间：{{commodity.updateTime | dateFtt('yyyy-MM-dd hh:mm')}}</li>
                    <li>单位：{{commodity.unit}}</li>
                    <li>市场价：{{commodity.marketPrice}}</li>
                    <li>销售价：{{commodity.sellingPrice}}</li>
                    <li>抵扣方式：{{commodity.twtreid==1 ? '%' : '元'}}</li>
                    <li>抵扣比例：{{commodity.percentage ? commodity.percentage+'%' : ''}}</li>
                    <li>抵扣金额：{{commodity.deduction}}</li>
                    <li>佣金方式：{{commodity.commissionType==1 ? '%' : '元'}}</li>
                    <li>佣金比例：{{commodity.commissionPercentage ? commodity.commissionPercentage+ '%' : ''}}</li>
                    <li>佣金金额：{{commodity.commission}}</li>
                    <li>商品图片：</li>
                    <li>
                        <div class="img_box" @click="see_img()">
                            <img v-if="commodity.img && commodity.img.split(',').length>0"  :src="commodity.img.split(',')[0]" alt="">
                            <span>共{{commodity.img ? commodity.img.split(',').length : 0}}张</span>
                        </div>
                    </li>
                    <li>商品描述：</li>
                    <li class="miaoshu" >
                        <div v-html="commodity.remark"></div>
                    </li>
                    <!-- <li class="btn_box" v-if="shop.state==0"> -->
                    <li class="btn_box">
                        <!-- <el-button @click="ToExamine(2)" size="mini" type="danger" round>拒绝</el-button>
                        <el-button @click="ToExamine(1)" size="mini" type="primary" round>同意</el-button> -->
                    </li>
                </ul>
            </el-col>
        </el-row>
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
import { dateFtt } from "@/assets/js/currency.js";
export default {
    name:'',
    data () {
        return {
            Loading:false,
            enlarge_img_box:false,  //图片放大弹出框

            commodity:{},
            id:'',
            enlarge_img:'',     //图片放大
            enlarge_img_list:[], //图片放大列表
        }
    },
    computed: {
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
            if (time) {
                // return dateFtt(time, 'yyyy-MM-dd hh:mm')
                return dateFtt(time, type)
            } else {
                return time;
            }
        },
    },
    methods: {
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
        //根据ID查询商品
        get_commodity(){
            this.$axios.get('/api-s/shops/commodity/findById/'+this.id).then(x=>{
                console.log(x)
                if(x.data.code==200){
                    this.commodity=x.data.data;
                }else{
                    this.$message.error(x.data.msg ? x.data.msg : x.data.message);
                }
            }).catch(err=>{
                this.$message.error('系统错误稍后再试。');
            })
        },
        //查看大图
        see_img(){
            this.enlarge_img_list=this.commodity.img ? this.commodity.img.split(',') : [];
            this.enlarge_img=this.enlarge_img_list.length>0 ? this.enlarge_img_list[0] : '';
            this.enlarge_img_box=true;
            // this.enlarge_img=
        },
        //点击单个图片
        select_img(x){
            this.enlarge_img=x;
        },
        close_1(){
            this.enlarge_img_box=false;
        }
    },
    mounted() {
        this.id=this.$route.query.id;
        this.get_commodity();
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
.box_3 .miaoshu{

}
.box_3 .miaoshu>div{
    max-width: 370px;
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
