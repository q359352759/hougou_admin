<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24" class="地址">{{过滤后区域}}</el-col>
            <el-col :span="8" class="统计">
                <ul>
                    <li class="标题">商家</li>
                    <li class="鼠标样式" @click="$router.push('/dianpu/liebiao?state=1')">商家：{{所有数据.商家.total}}家</li>
                    <li>今日新增：-0家 </li>
                    <li>申请入驻待审核：{{所有数据.商家入驻待审核.total}}家<span @click="$router.push('/dianpu/liebiao')" class="蓝色字体 ">去审核</span></li>
                    <li>资料修改待审核：{{所有数据.商家修改待审核.total}}家 <span @click="$router.push('/dianpu/xiugaiLibiao')" class="蓝色字体">去审核</span></li>
                    <li>待查阅商品：-0个 <span class="蓝色字体">去查阅</span> </li>
                    <li>待查阅店铺简介：-0个 <span class="蓝色字体">去查阅</span></li>
                </ul>
            </el-col>
            <el-col :span="8" class="统计">
                <ul>
                    <li class="标题">代理人</li>
                    <li>共计：{{所有数据.代理人总数.total}}人</li>
                    <li>今日新增：-0人 </li>
                </ul>
            </el-col>
            <el-col :span="8" class="统计">
                <ul>
                    <li class="标题">订单</li>
                    <li>共计：{{所有数据.订单总数.total}}笔</li>
                    <li>今日新增：-0笔 </li>
                </ul>
            </el-col>
        </el-row>        
    </div>
</template>

<script>
import { mapActions , mapGetters , mapMutations} from "vuex";
import { get_url , 过滤地区 } from "@/assets/js/currency.js";
export default {
    name:"",
    data () {
        return {
            
        }
    },
    filters: {
        
    },
    computed: {
        ...mapGetters({
            所有数据:'代理商/总览/所有数据',
            代理商信息:'登陆/代理商信息',
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
            // 查询商家:'代理商/总览/查询商家',
        })
    },
    mounted() {
        this.数据初始化();
        // this.查询商家()
    },
}
</script>

<style lang="scss" scoped>
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