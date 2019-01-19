<template>
    <div class="app-container">
        <ul class="box_1">
            <li>
                <el-button-group >
                    <el-button @click="Choice_state(0)" size="mini" :type="query.state=='0' ? 'primary' : 'info'">待审核</el-button> 
                    <el-button @click="Choice_state(1)" size="mini" :type="query.state=='1' ? 'primary' : 'info'">已通过</el-button>
                    <el-button @click="Choice_state(2)" size="mini" :type="query.state=='2' ? 'primary' : 'info'">未通过</el-button>
                </el-button-group>
            </li>
            <li>
                <span>待审核金额：</span>{{Statistics.audited}}元  <span>已通过：</span>{{Statistics.adopt}}元  <span>未通过：</span>{{Statistics.NotThrough}}元
            </li>
        </ul>

        <ul class="box_2">
            <li>
                <el-date-picker style="width:230px" size="mini" v-model="选择的时间" type="daterange" align="left" start-placeholder="开始日期"
                    end-placeholder="结束日期" @change="timeChange"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </li>
            <li>
                <el-input size="mini"  v-model="query.phone" placeholder="用户手机号码"></el-input>
            </li>
            <li>
                <el-input size="mini" v-model="query.thereviewer" placeholder="审核人员"></el-input>
            </li>
            <li>
                <el-button size="mini" icon="el-icon-search" @click="waitpay()" circle></el-button>
            </li>
            <li>
                <el-button size="mini" type="primary" round @click="qingkong()">清空</el-button>
            </li>
        </ul>

        <div class="table_1">
            <el-table  :data="list_1" size="mini" border stripe style="width: 100%;text-align: center">
                <el-table-column :key="Math.random()" label="申请人" align="center" prop="realName"></el-table-column>
                <el-table-column :key="Math.random()" label="申请时间" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.createTime | dateFtt('yyyy-MM-dd')}}
                        </div>
                        <div>
                            {{scope.row.createTime | dateFtt('hh:mm:ss')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :key="Math.random()"  v-if="query.state!=0" label="审核时间" align="center">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.updateTime | dateFtt('yyyy-MM-dd')}}
                        </div>
                        <div>
                            {{scope.row.updateTime | dateFtt('hh:mm:ss')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :key="Math.random()" label="用户角色" align="center">
                    <template slot-scope="scope">
                        区域代人
                    </template>
                </el-table-column>
                <el-table-column :key="Math.random()" label="手机号" align="center" prop="phone"></el-table-column>
                <el-table-column :key="Math.random()" label="提现类型" align="center">
                    <template slot-scope="x">
                        <span v-show="x.row.type==0">代理人团队补贴</span>
                        <span v-show="x.row.type==1">代理人分润</span>
                        <span v-show="x.row.type==2">代理商分润</span>
                        <!-- type 0 代理人团队补贴 1 代理人分润 2 代理商分润 -->
                    </template>
                </el-table-column>
                <el-table-column :key="Math.random()"  v-if="query.state=='0'" label="可提现金额" align="center" ></el-table-column>
                <el-table-column :key="Math.random()" label="提现金额" align="center" prop="realityAmount"></el-table-column>
                <el-table-column :key="Math.random()" label="费率" align="center" prop="rate"></el-table-column>
                <el-table-column :key="Math.random()" label="状态" align="center">
                    <template slot-scope="x">
                        <span v-show="x.row.state==0">待审核</span>
                        <span v-show="x.row.state==1">通过</span>
                        <span v-show="x.row.state==2">驳回</span>
                    </template>
                </el-table-column>
                <el-table-column :key="Math.random()" label="审核员" align="center" prop="thereviewer" v-if="query.state!=0"></el-table-column>
                <el-table-column :key="Math.random()" label="操作" align="center" fixed="right" v-if="query.state==0">
                    <template slot-scope="scope">
                        <el-button @click="同意(scope.row)" size="mini" type="text">同意</el-button>
                        <el-button @click="拒绝(scope.row)" size="mini" type="text">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            size="mini"
            title="请在下方输入拒绝理由"
            :visible.sync="拒绝理由显示框"
            :append-to-body="true"
            width="500px">
            <div class="text_box" contenteditable="true"></div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="拒绝理由显示框 = false">取 消</el-button>
                <el-button size="small" type="primary" @click="确定拒绝()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 再次提交输入名字提示语 -->
        <el-dialog custom-class="box_4" size="mini" :title="Confirmation_title" :visible.sync="Confirmation" width="400px">
            <el-form size="mini" ref="详情" :rules="rules" :model="详情" label-width="100px">
                <el-form-item label="收款方姓名" prop="name">
                    <el-input v-model="详情.name" placeholder="请确认收款方姓名"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  size="mini" @click="submitForm('详情')">确定</el-button>
            </div>
        </el-dialog>

        <div class="box_3 text-right">
            <el-pagination
                :page-size="query.length"
                :current-page="page_index"
                @current-change="current_change"
                layout="prev, pager, next"
                :total="list_total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFtt } from "@/assets/js/currency.js";
import $ from 'jquery'
export default {
    name:"",
    data () {
        return {
            选择的时间:[],
            Statistics:{
                audited:0,      //待审核
                adopt:0,        //通过
                NotThrough:0    //未通过
            },
            query:{
                state:0,
                start:0,
                length:10,
                phone:'',
                thereviewer:'',
                startTime:'',  //开始时间
                endTime:'',     //
            },
            page_index:0,
            list_1:[],
            list_total:0,
            详情:{},
            拒绝理由显示框:false,
            Confirmation_title:'',
            Confirmation:false,
            rules:{
                name:[
                    { required: true, message: '请输入名字。', trigger: 'blur' },
                ]
            },
        }
    },
    filters:{
        dateFtt(time,type){
            try {
                return  dateFtt(time,type)       
            } catch (error) {
                return time
            }
        }
    },
    computed: {
        ...mapGetters({
            管理员:'登陆/管理员',
            userInfo:'登陆/userInfo'
        })
    },
    created(){
        if(!this.管理员){
            this.$router.push('/authority')
        }
    },
    methods: {
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
        waitpay(){
            this.查询();
        },
        qingkong(){
            this.选择的时间=[];
            this.query.phone='';
            this.query.thereviewer='';
            this.query.startTime='';
            this.query.endTime=''
        },
        //分页
        current_change(x){
            console.log(x);
            this.page_index=x;
            this.查询()
        },
        //选择时间
        timeChange(){
            if(this.选择的时间 && this.选择的时间.length>1){
                this.query.startTime=this.选择的时间[0]+' 00:00';
                this.query.endTime=this.选择的时间[1]+' 24:00';
            }else{
                this.query.startTime='';
                this.query.endTime='';
            }
            this.page_index=1;
            this.list_1=[];
            this.查询();
        },
        Choice_state(x){
            this.query.state=this.query.state===x ? '' : x;
            this.查询();
        },
        查询(){
            this.isloading(true)
            this.query.start=this.query.length*(this.page_index-1);
            this.$axios.get('/api-u/agent/waitpay',{params:this.query}).then(x=>{
                if(x.data.code==200){
                    this.list_1=x.data.data.data;
                    this.list_total=x.data.data.total;
                }else{                
                    this.$message.error(x.data.msg ? x.data.msg : x.data.message);
                }
                this.isloading(false);
            }).catch(err=>{
                this.isloading(false);
                this.$message.error('网路错误，稍后再试。');
            })
        },
        同意(x){
            this.$confirm('此操作将会转账给用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.详情=Object.assign({},x);
                this.提交(1);
            }).catch(() => {});
        },
        //开始验证
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.提交(1);
                    this.Confirmation=false;
                } else {
                    return false;
                }
            });
        },
        拒绝(x){
            this.详情=Object.assign({},x);
            this.拒绝理由显示框=true;
        },
        确定拒绝(){
            var kong=/^\s*$/;
            var html =$('.text_box').html();
            if(kong.test($('.text_box').text())){
                this.$notify.error({title: '错误',message: '请填写拒绝理由。'});
                return;
            }
            this.拒绝理由显示框=false;
            //0 待审核 1 通过 2 拒绝
            this.提交(2,$('.text_box').html());
        },
        提交(state,cause){
            this.isloading(true)
            // /shops/opt/AgentsShareProfit
            var obj=Object.assign({},this.详情);
                obj.state=state;
                obj.cause=cause ? cause : '';
                obj.name=obj.name ? obj.name : '张三' 
                obj.assessorid=this.userInfo.username
            this.$axios.post('/api-s/shops/opt/AgentsShareProfit',obj).then(x=>{
                this.isloading(false)
                if(x.data.code=='PAYEE_USER_INFO_ERROR' || x.data.code=="PAYEE_ACC_OCUPIED"){
                    this.Confirmation_title=x.data.msg;
                    this.Confirmation=true;
                    this.$notify({title: '提示',message: x.data.msg,type: 'warning'});
                }else if(x.data.code==200){
                    this.$message({message: x.data.msg,type: 'success'});
                }else{
                    this.$message({message: x.data.msg ? x.data.msg : x.data.message,type: 'success'});
                }
                this.查询();
            }).catch(err=>{
                this.isloading(false)
                this.$message.error('网络错误稍后再试');
            })
        },
        //金额统计
        get_findsum(){
            this.$axios.get('/api-u/agent/agentUser/findsum').then(x=>{
                console.log(x);
                if(x.data.code==200){
                    for(var i=0;i<x.data.data.length;i++){
                        if(x.data.data[i].state==0){
                            this.Statistics.audited=x.data.data[i]['sum(realityAmount)']           //待审核
                        }else if(x.data.data[i].state==1){
                            this.Statistics.adopt=x.data.data[i]['sum(realityAmount)']           //通过
                        }else if(x.data.data[i].state==2){
                            this.Statistics.NotThrough=x.data.data[i]['sum(realityAmount)']           //未通过
                        }
                    }
                }  
            }).catch(err=>{})
        }
    },
    mounted() {
        this.查询();
        this.get_findsum()
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    display: flex;
    align-items: center;
    >li:last-child{
         text-align: right;
        flex-grow: 1;
    }
}

.box_2{
    margin: 5px 0px 0px;
    display: flex;
    text-align: center;
    >li{
        margin: 0px 20px 0px 0px;
    }
}

.table_1{
    margin: 10px 0px 0px;
    white-space: nowrap;
    *{
        white-space: nowrap;
    }
}
.text_box{
    min-height: 100px;
    border: 1px solid #cccccc;
    outline: none;
    margin: -20px 0px;
    padding: 5px;
}

.box_4 .el-dialog__body{
    padding: 0px 20px;
}
</style>
