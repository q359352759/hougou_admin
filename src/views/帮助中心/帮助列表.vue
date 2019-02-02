<template>
    <div class="app-container">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
            <el-tab-pane v-for="item in 新帮助类型" :label="item.name" :key="item.id" :name="item.id.toString()" style="min-height:500px;">                
                
                <el-table 
                 v-loading="item.loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.2)"
                 :data="item.list" border size="mini" style="width: 100%;text-align: center">
                    <el-table-column prop="headline" label="标题" align="center"></el-table-column>
                    <el-table-column label="添加/修改时间" align="center" width="250">
                        <template slot-scope="scope">
                            <div v-show="scope.row.updateTime">{{scope.row.updateTime | filter_time}}(修改时间)</div>
                            <div v-show="!scope.row.updateTime">{{scope.row.createTime | filter_time}}(创建时间)</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="作者" align="center"></el-table-column>
                    <el-table-column label="是否显示" align="center">
                        <template slot-scope="scope">
                            <span style="color:#67C23A" >
                                <i v-show="scope.row.state==1" class="el-icon-check"></i>
                            </span>
                                <!-- <span>{{scope.row.state==1 ? '显示中':'已隐藏'}}</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="是否常见" align="center">
                        <template slot-scope="scope">
                            <span style="color:#67C23A" >
                                <i v-show="scope.row.common==1" class="el-icon-check"></i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="300" align="center">
                        <template slot-scope="scope">
                            <el-button v-show="scope.row.state==1" @click="隐藏显示(scope.row)" size="mini" type="text" style="color:#d43030">隐藏</el-button>
                            <el-button v-show="scope.row.state!=1" @click="隐藏显示(scope.row)" size="mini" type="text" style="color:#2a82e4">显示</el-button>
                            <el-button v-if="scope.row.common==1" @click="设置常见(scope.row)" size="mini" type="text" style="color:#d43030">取消常见问题</el-button>
                            <el-button v-if="scope.row.common!=1" @click="设置常见(scope.row)" size="mini" type="text" style="color:#2a82e4">设为常见问题</el-button>
                            <el-button @click="$router.push('/bangzhu/xiangqing?id='+scope.row.id)" size="mini" type="text">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination 
                    :page-size="item.query.length"
                    :current-page="item.page_index"
                    @current-change="item.current_change"
                    layout="prev, pager, next"
                    :total="item.total">
                </el-pagination>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { mapActions , mapGetters } from "vuex";
import { dateFtt } from "@/assets/js/currency.js";
export default {
    name: "",
    data() {
        return {
            activeName: '',
            新帮助类型:[]
        }
    },
    computed: {
        ...mapGetters({
            帮助类型:'帮助中心/帮助类型',
        })
    },
    filters: {
        filter_time(time){
            try {
                return dateFtt(time,'yyyy-MM-dd hh:mm')
            } catch (error) {
                return time
            }
        }  
    },
    methods: {
        ...mapActions({
            查询帮助类型:'帮助中心/查询帮助类型',
            查询列表:'帮助中心/查询列表',
            加载:'加载中/加载',
            修改列表:'帮助中心/修改列表'
        }),
        隐藏显示(item){
            var obj=Object.assign({},item);
                obj.state=obj.state==1 ? 0 : 1;
            this.加载(true);
            this.修改列表([obj]).then(x=>{
                if(x.data.code==200){
                    item.state=item.state==1 ? 0 : 1;
                    this.$message.success('设置成功.');
                    // this.$message({message: '恭喜你，这是一条成功消息',type: 'success'});
                }else{
                    this.$message.error(x.msg ? x.msg : x.message);
                }
                this.加载(false);
            }).catch(err=>{
                this.加载(false);
                this.$message.error('网路错误。');
            })
        },
        设置常见(item){
            var x=Object.assign({},item)
            x.common=x.common==1 ? 0 : 1;
            this.加载(true);
            this.修改列表([x]).then(x=>{
                if(x.data.code==200){
                    item.common=item.common==1 ? 0 : 1;
                    this.$message.success('设置成功.');
                }else{
                    this.$message.error(x.msg ? x.msg : x.message);
                }
                this.加载(false);
            }).catch(err=>{
                this.加载(false);
                this.$message.error('网路错误。');
            })
        },
        查询数据(obj){
            obj.loading=true
            if(obj.query.type==''){
                delete obj.query.type
            }
            obj.query.start=(obj.page_index-1)*obj.query.length
            this.查询列表(obj.query).then(x=>{
                console.log(x.data.data.data)
                // this.$set(obj, "list", x.data.data.data);
                obj.list=x.data.data.data;
                obj.total=x.data.data.total;
                setTimeout(x=>{
                    obj.loading=false
                },500)
            })
        },
        async 初始化(){
            await this.查询帮助类型();
            // var list=[{'name':'全部','id':''},...this.帮助类型];
            var list=[{'name':'全部','id':''}];
            this.帮助类型.forEach(x=>{
                var obj=Object.assign({},x)
                list.push(obj);
            })
            list.forEach(x=>{
                x.list=[];
                x.page_index=1
                x.loading=true;
                x.total=0
                x.query={
                    start:0,
                    length:10,
                    type:x.id
                }
                x.current_change=val=>{
                    x.page_index=val;
                    this.查询数据(x)
                }
            });
            this.新帮助类型=list
            this.新帮助类型.forEach(item=>{
                this.查询数据(item);
            })
        }
    },
    mounted () {
        this.初始化();
        var str=1
    }
}
</script>

<style lang="scss" scoped>
</style>
