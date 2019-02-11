<template>
    <div class="app-container">
        <el-row>
            <el-col :span="12">
                <el-button-group>
                    <el-button @click="选择类型(0)" size="mini" :type="query.state=='0' ? 'primary' : 'info'">待审核</el-button>
                    <el-button @click="选择类型(1)" size="mini" :type="query.state=='1' ? 'primary' : 'info'">已通过</el-button>
                    <el-button @click="选择类型(2)" size="mini" :type="query.state=='2' ? 'primary' : 'info'">未通过</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="12">
                <div class="text-right">
                    <span v-if="query.state==0">待审核：{{总数}}家</span> 
                    <span v-if="query.state==1">已通过：{{总数}}家</span> 
                    <span v-if="query.state==2">未通过：{{总数}}家</span>
                </div>
            </el-col>
        </el-row>

        <div class="box_2" >
            <el-table :data="list" border size="mini" style="margin:10px 0px 0px;width: 100%;text-align: center">
                <el-table-column prop="shopName" label="申请商家" align="center"></el-table-column>
                <el-table-column label="申请时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.applytime | 时间格式化}}
                    </template>
                </el-table-column>
                <el-table-column prop="regionalscope" label="区域" align="center"></el-table-column>
                <el-table-column prop="mincommissionscale" label="最低分佣比例（%）" align="center"></el-table-column>
                <el-table-column prop="allrecruitment" label="总招募人数（人）" align="center"></el-table-column>
                <el-table-column label="展示天数" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="tongyi(scope.row)" v-if="scope.row.state==0" type="text">同意</el-button>
                        <span class="text-red" @click="jujue(scope.row)" v-if="scope.row.state==0" style="color:red">拒绝</span> -->
                        <el-button @click="$router.push('/fenxiao/xiangqing?id='+scope.row.id+'&shopid='+scope.row.shopid)" size="mini" type="text">查看更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="box_3 text-right">
            <el-pagination
                small
                layout="prev, pager, next"
                :page-size="query.length"
                current-change="fenye"
                :total="总数">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { dateFtt } from "@/assets/js/currency.js";
import { mapActions } from "vuex";
export default {
    name:"",
    data () {
        return {
            page_index:1,
            总数:0,
            list:[],
            query:{
                start:0,
                length:10,
                state:0,
            }
        }
    },
    filters:{
        时间格式化(time){
            try {
                return dateFtt(time,'yyyy.MM.dd hh:mm')
            } catch (error) {
                return time
            }
        }
    },
    methods: {
        ...mapActions({
            加载:'加载中/加载',
            查询分销:'分销/查询分销'
        }),
        fenye(x){
            this.page_index=x;
            this.查询()
        },
        选择类型(x){
            this.page_index=1;
            this.list=[];
            this.query.state=x;
            this.查询()
        },
        查询(){
            this.加载(true)
            this.query.start=(this.page_index-1)*this.query.length
            this.查询分销(this.query).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    this.总数=x.data.data.total;
                    this.list=x.data.data.data;
                }else{
                    this.$message({ showClose: true, message: x.data.msg ? x.data.msg : x.data.message, type: 'error'});
                }
                this.加载(false)
            }).catch(err=>{
                this.加载(false);
                this.$message({ showClose: true, message: '系统错误，稍后再试。', type: 'error'});
                console.log(err);
            })
        }
    },
    mounted() {
        this.查询()
    },
}
</script>

<style lang="scss" scoped>
.text-right{
    text-align: right;
}
.box_2{
    margin: 10px 0px 0px;
}
</style>
