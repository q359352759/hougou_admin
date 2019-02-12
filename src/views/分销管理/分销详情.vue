<template>
    <div class="app-container 分销详情">
        <el-button @click="block()" type="info" icon="el-icon-arrow-left" circle></el-button> 
        <el-main>
            <div class="box_2">
                {{招募信息.shopName}}
                <!-- <el-button size="small" type="info">基本信息</el-button> -->
            </div>
            <el-row>
                <el-col :span="12">
                    <ul class="box_3">
                        <!-- <li class="标题1">修改前</li> -->
                        <li class="申请时间">
                            申请时间：
                            <span v-if="招募信息.updatetime">{{招募信息.updatetime | 时间格式化}}</span>
                            <span v-if="!招募信息.updatetime">{{招募信息.applytime | 时间格式化}}</span>
                        </li>
                        <li>
                            <span>状态：</span>
                            <span v-show="招募信息.state==0">未处理</span>
                            <span v-show="招募信息.state==1">已通过</span>
                            <span v-show="招募信息.state==2">已驳回</span>
                        </li>
                        <li v-show="招募信息.state==2 || 招募信息.state==3">
                            <span v-show="招募信息.state==2">驳回理由：</span>
                            <span v-show="招募信息.state==3">隐藏理由：</span>
                            <div v-html="招募信息.cause"></div>
                        </li>
                        <li>业务：{{业务_1}}</li>
                        <li>宣传语：{{招募信息.tagline}}</li>
                        <li>分销员职责：{{招募信息.position}}</li>
                        <li>
                            <span>分销员要求：</span>
                            <span v-show="招募信息.hasexperience==0">无需从业经验</span>
                            <span v-show="招募信息.hasexperience==1">有从业经验</span>
                            <span v-show="招募信息.sex==0">性别不限</span>
                            <span v-show="招募信息.sex==1">男</span>
                            <span v-show="招募信息.sex==2">女</span>
                            <span>{{招募信息.minage}}至{{招募信息.maxage}}岁</span>
                        </li>
                        <li>招募区域：{{招募信息.regionalscope}}</li>
                        <li>招募开始时间：{{招募信息.createtime | 时间格式化}}</li>
                        <li>招募结束时间：{{招募信息.overtime | 时间格式化}}</li>
                        <li>联系电话：{{招募信息.phone}}</li>
                        <li>招募微信：{{招募信息.wechat}}</li>
                        <li>背景音乐：{{招募信息.bgm}}</li>
                        <li>语音介绍：</li>
                        <li>最低佣金：{{招募信息.mincommissionscale}}%</li>
                        <li>宣传内容：</li>
                        <li class="宣传内容" v-html="招募信息.leaflets"></li>
                        <li class="按钮">
                            <el-button v-if="招募信息.state==0" @click="修改(2)" size="mini" type="danger" round>拒绝</el-button>
                            <el-button v-if="招募信息.state==0" @click="修改(1)" size="mini" type="primary" round>同意</el-button>
                            <el-button v-if="招募信息.state==1" @click="修改(3)" size="mini" type="primary" round>隐藏</el-button>
                            <el-button v-if="招募信息.state==3" @click="修改(1)" size="mini" type="primary" round>取消隐藏</el-button>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="12">
                    <ul class="box_3" v-show="false">
                        <li class="标题1">修改后</li>
                        <li class="申请时间">申请时间：</li>
                        <li>状态:</li>
                        <li>业务：</li>
                        <li>宣传语：</li>
                        <li>分销员职责：</li>
                        <li>分销员要求：</li>
                        <li>招募区域：</li>
                        <li>联系电话：</li>
                        <li>招募微信：</li>
                        <li>背景音乐：</li>
                        <li>语音介绍：</li>
                        <li>最低佣金：</li>
                        <li>宣传内容：</li>
                        <li>内容</li>
                    </ul>
                </el-col>
            </el-row>
        </el-main>
        <!-- 驳回弹出框 -->
        <el-dialog size="mini" class="cause_box" custom-class="class_1" title="请输入理由" :visible.sync="显示驳回输入框" width="360px">
            <div contenteditable="true" ref="驳回理由" class="text_box"></div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="显示驳回输入框 = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="确定驳回()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { dateFtt , get_url } from "@/assets/js/currency.js";

import { mapGetters , mapActions } from "vuex";
export default {
    name:"",
    data () {
        return {
            招募信息:{},
            招募信息_1:{},
            自定义业务:[],
            业务类型:[],
            显示驳回输入框:false,
            type:2      //用于驳回和隐藏
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
    computed: {
        ...mapGetters({
            userInfo:'登陆/userInfo'
        }),
        业务_1(){
            var str='';
            var list=this.招募信息.cbonum ? this.招募信息.cbonum.split(',') : [];
            var newlist=[]
            list.forEach(x=>{
                var r=get_url(this.业务类型,x)
                var obj=r[r.length-1]
                newlist.push(obj.cbotype);
            })
            this.自定义业务.forEach(x=>{
                newlist.push(x.name);
            })
            return newlist.join('、')
        }
    },
    methods: {
        ...mapActions({
            加载:'加载中/加载',
            查询分销:"分销/查询分销",
            根据id查询分销:"分销/根据id查询分销",
            查询自定义业务:"分销/查询自定义业务",
            修改分销:"分销/修改分销",
            查询所有分销分类:"分销/分销类型/查询所有分销分类",
        }),
        block(){
            history.back()
        },
        修改(x){
            if(x==1){
                var obj=Object.assign({},this.招募信息);
                    obj.state=1;
                this.调用修改接口(obj);
            }else{
                this.type=x
                this.显示驳回输入框=true;
            }
        },
        确定驳回(){
            console.log(this.$refs.驳回理由.innerText);
            var text=this.$refs.驳回理由.innerText;
            var html=this.$refs.驳回理由.innerHTML;
            var kong=/^\s*$/;
            if(kong.test(text)){
                this.$message({showClose: true,message: '请输入理由',type: 'error'});
            }else{
                var obj=Object.assign({},this.招募信息);
                    obj.state=this.type;
                    obj.cause=html;
                this.调用修改接口(obj);
            }
        },
        调用修改接口(obj){
            this.修改分销(obj).then(x=>{
                if(x.data.code==200){
                    this.$message({message: '设置成功',type: 'success'});
                    history.back();
                }else{
                    this.$message({showClose: true,message: x.data.msg ? x.data.msg : x.data.message , type: 'error'});
                }
            }).catch(err=>{
                this.$message({showClose: true,message: '系统错误，稍后再试。',type: 'error'});
            })
        },
        初始化(){
            this.加载(true)
            var query={
                    start:0,
                    length:10,
                    shopid:this.$route.query.shopid
                }
            Promise.all([this.查询所有分销分类(),this.根据id查询分销(this.$route.query.id),this.查询自定义业务(query)]).then(x=>{
                if(x[0].data.code==200){
                    this.业务类型=x[0].data.data;
                }
                if(x[1].data.code==200){
                    this.招募信息=x[1].data.data;
                    this.招募信息.isconsulted=1;
                    this.assessorid=this.userInfo.username
                    this.修改分销(this.招募信息)
                }
                if(x[2].data.code==200){
                    this.自定义业务=x[2].data.data.data;
                }

                
                this.加载(false)
            }).catch(err=>{
                this.加载(false)
            })
        }
    },
    mounted() {
        
        this.初始化();
    },
}
</script>

<style lang="scss" scoped>
.box_2{
    border-bottom: 1px solid rgba(153, 153, 153, 1);
}
.box_3{
    padding: 0px 0px 40px;
    li{
        margin: 3px 0px 0px;
    }
    .标题1{
        margin: 20px 0px;
    }
    .申请时间{
        height: 20px;
    }
    .宣传内容{
        max-width: 375px;
        height: 667px;
        overflow: auto;
        border-radius: 5px;
        border: 10px solid #cccccc;
    }
    .按钮{
        margin: 40px 0px 0px;
    }
}
.text_box{
    min-height: 100px;
    border: 1px solid #cccccc;
    padding: 3px;
}


</style>

<style lang="scss">
.分销详情{
    .el-dialog__body{
        padding: 10px 20px;
    }
}
</style>
