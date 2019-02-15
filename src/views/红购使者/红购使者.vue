<template>
    <div class="app-container">
        <el-row :gutter="5">
            <el-col :span="4">
                <el-cascader
                    size="mini"
                    style="width:100%"
                    :filterable="true"
                    :clearable="true"
                    placeholder="全部区域"
                    :props="address_props"
                    expand-trigger="hover"
                    :options="三级区域"
                    v-model="selectedOptions2"
                    @change="handleChange">
                </el-cascader>
            </el-col>
            <el-col :span="4">
                <el-input v-model="phone" size="mini" placeholder="请输入电话"></el-input>
            </el-col>
            <el-col :span="16">
                <ul class="box_1">
                    <li>
                        <i @click="getAgentUser()" class="el-icon-search"></i>
                    </li>
                    <li>
                        区域代理人总数：{{list_total}}人    
                    </li>
                    <!-- <li>区域代理商总数：156人 </li> -->
                    <li>
                        <el-button v-if="管理员" type="info" size="mini" @click="add()" round>手动添加</el-button>
                    </li>
                </ul>
            </el-col>
        </el-row>

        
        <div class="box_2">
            <el-table :data="list_1" size="mini" border stripe  style="width: 100%;">
                <el-table-column label="名字" align="center" prop="realName"></el-table-column>
                <el-table-column label="区域" align="center" >
                    <template  slot-scope="scope">
                        <div>{{scope.row.areaCode | filter_area(区域)}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="手机号码" align="center" prop="phone"></el-table-column>
                <el-table-column label="推荐人(号码)" align="center" prop="referrerPhone"></el-table-column>
                <el-table-column label="加入时间" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.createTime | dateFtt}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="团队（人）" align="center" >
                    <template slot-scope="scope">
                        <div>
                            <span>直{{scope.row.directly}}人</span>
                            <span>|</span>
                            <span>间{{scope.row.indirect}}人</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="补贴金额（元）" align="center" prop="subsidiesall"></el-table-column>
                <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="mini">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="box_3">
            <el-pagination
                :page-size="page_size"
                :current-page="page_index"
                @current-change="current_change"
                layout="prev, pager, next"
                :total="list_total">
            </el-pagination>
        </div>

        <el-dialog title="添加区域代理人" :visible.sync="add_dialog" width="30%" center>
            <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="150px">
                <el-form-item label="请选择区域:" prop="areaCode">
                    <el-cascader
                        style="width:100%"
                        :props="address_props"
                        expand-trigger="hover"
                        :options="三级区域"
                        v-model="ruleForm.areaCodeList"
                        placeholder="请选择区域"
                        @change="areaCodeChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="被推荐人真实姓名:" prop="realName">
                    <el-input v-model="ruleForm.realName" placeholder="被推荐人真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="电话:" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="电话"></el-input>
                </el-form-item>
                <el-form-item label="推荐人号码:" prop="referrerPhone">
                    <el-input v-model="ruleForm.referrerPhone" placeholder="推荐电话号码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  size="mini" @click="submitForm('ruleForm')">添加</el-button>
            </div>
        </el-dialog>

        <el-dialog title="查看详情" :visible.sync="details_dialog" width="25%" center>
            <table class="table table-border table_1"> 
                <tbody>
                    <tr>
                        <td>真实姓名：</td>
                        <td>{{details_obj.realName}}</td>
                    </tr>
                    <tr>
                        <td>区域：</td>
                        <td>
                            {{details_obj.areaCode | filter_area(区域)}}
                        </td>
                    </tr>
                    <tr>
                        <td>电话：</td>
                        <td>{{details_obj.phone}}</td>
                    </tr>
                    <tr>
                        <td>推荐人电话：</td>
                        <td>{{details_obj.referrerPhone}}</td>
                    </tr>
                    <tr>
                        <td>加入时间：</td>
                        <td>{{details_obj.createTime | dateFtt}}</td>
                    </tr>
                    <tr>
                        <td>团队：</td>
                        <td>
                            <span>直推{{details_obj.directly}}</span>
                            <span>|</span>
                            <span>间推{{details_obj.indirect}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>补贴金额：</td>
                        <td>{{details_obj.subsidiesall}}</td>
                    </tr>
                </tbody>
            </table>
        </el-dialog>

    </div>
</template>

<script>
// 验证手机号码
var checkPhone =function (rule, value, callback){
    if (!value) {
      return callback(new Error('手机号不能为空'));
    } else {
      const reg = /^1[0-9]\d{9}$/
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    }
}

import { mapGetters } from "vuex";
import { 过滤地区 , dateFtt } from "@/assets/js/currency.js";
export default {
    name:'',
    data () {
        return {
            loading:'',
            message: 'Hello Vue!',
            phone:"",
            address_props:{
                value:'id',
                label:'name',
            },
            area:[],            //没有递归的
            filterable:true,
            selectedOptions2: [],
            options: [],        //地区
            list_2:[],          //地区 用于弹出框
            list_1: [],           //列表
            list_total:0,        //列表总页数
            page_index:1,
            page_size:10,
            add_dialog:false,   //添加弹出框
            ruleForm:{
                realName:'',    //真实姓名
                phone:'',       //电话号码
                referrerPhone:'',   //推荐人电话号码
                areaCodeList:[],    //区域列表
                areaCode:'',        //区域code
                userid:'',         //好电话号码相同
            },
            rules:{
                areaCode:[
                    { required: true, message: '请选择地区', trigger: 'blur' },
                ],
                realName:[
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                phone:[
                    // { required: true, message: '请输入电话号码',trigger: 'blur'},
                    // { type: 'number', message: '电话号码必须是11位数字',trigger: 'blur'}
                    {validator: checkPhone, trigger: 'blur'}
                ],
                referrerPhone:[
                    // { required: true, message: '请输入电话号码',trigger: 'blur'},
                    // { type: 'number', message: '电话号码必须是11位数字',trigger: 'blur'}
                    {validator: checkPhone, trigger: 'blur'}
                ]
            },
    // =========================
            details_dialog:false,   //查看详情
            details_obj:{},          //详情
            三级区域:[]
        }
    },
    computed: {
        ...mapGetters({
            管理员:'登陆/管理员',
            代理商信息:'登陆/代理商信息',
            区域:'区域/区域',
            三级区域1:'区域/三级区域'
        }),
    },
    filters:{
        // 过滤区域
        filter_area(id,list){
            if(!id) return
            var str='';
            var a=过滤地区(list,id);
                a.forEach(element => {
                    str+=element.name+' / '
                });
            return str.substring(0,str.lastIndexOf('/'));
        },
        //时间过滤
        dateFtt(time){
            try {
                return dateFtt(time,'yyyy-MM-dd hh:mm')
            } catch (error) {
                return time
            }
        }
    },
    methods: {
        openloading(type){
            if(type){
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }else{
                setTimeout(() => {
                    this.loading.close();
                }, 500);
            }            
        },
        //查看详情
        handleClick(x){
            this.details_dialog=true;
            this.$axios.get('/api-u/agentUser/me?userid='+x.userid).then(x=>{
                this.details_obj=x.data.data;
            }).catch(err=>{})
        },
        //弹出添加框
        add(){
            this.add_dialog=true;
        },
        //弹出框选择地区
        areaCodeChange(x){
            console.log(x);
            this.ruleForm.areaCode=(x && x.length>0) ? x[x.length-1] : ''
        },
        //开始验证
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // lert('submit!');
                    this.registered_agentUser()
                } else {
                    return false;
                }
            });
        },
        //添加
        registered_agentUser(){
            this.ruleForm.userid=this.ruleForm.phone;
            console.log(this.ruleForm);
            this.$axios.post('/api-u/opt/agentUser/registered',this.ruleForm).then(x=>{
                console.log(x)
                if(x.data.code==200){
                    this.$message({showClose: true,message: '添加成功',type: 'success'});
                    this.getAgentUser();
                }else{
                    this.$message({showClose: true,message: x.data.msg ? x.data.msg : x.data.message,type: 'error'});
                }
                this.add_dialog=false;
            }).catch(err=>{
                console.log(err);
                this.$message({showClose: true,message: error.body.message,type: 'error'});
            })
        },
        handleChange(value) {
            this.page_index=1
            this.getAgentUser()
        },
        //分页
        current_change(x){
            console.log(x)
            this.page_index=x;
            this.getAgentUser();
        },
        //查询代理人
        getAgentUser(){
            if(this.管理员){
                var address=(this.selectedOptions2 && this.selectedOptions2.length>0) ? this.selectedOptions2[this.selectedOptions2.length-1] : '';
            }else{
                var address=this.代理商信息.areaCode
            }
            console.log(address)
            var query={
                    start:(this.page_index-1)*this.page_size,
                    length:this.page_size,
                    phone:this.phone,
                    areaCode:address,
                    type:2
                }
            this.openloading(true)
            this.$axios.get('/api-u/agentUser/find',{params:query}).then(x=>{
                this.list_1=x.data.data.data;
                this.list_total=x.data.data.total;
                this.openloading(false)
            }).catch(err=>{
                this.openloading(false)
            })
        }
    },
    mounted() {
        console.log('加载完成2');
        this.getAgentUser();
        setTimeout(x=>{
            this.三级区域=this.三级区域1
        },100)

    },
}
</script>


<style lang="scss" scope>

.box_1{
    display: flex;
    align-items: center;
}
.box_1>li{
    margin: 0px 15px;
}
.box_1>li:nth-child(1){
    font-size: 25px;
}
.box_1>li:last-child{
    text-align: right;
    flex-grow: 1;
}

.box_2{
    margin: 10px 0px 0px;
}
.box_3{
    text-align: right;
    padding: 20px 0px;
}

.table_1 tr>td:nth-child(1){
    width: 130px;
    text-align: right;
}

</style>
