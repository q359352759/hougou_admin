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
                        <li class="标题1">修改前</li>
                        <li class="申请时间">
                            申请时间：
                            <span v-if="招募信息.updatetime">{{招募信息.updatetime | 时间格式化}}</span>
                            <span v-if="!招募信息.updatetime">{{招募信息.applytime | 时间格式化}}</span>
                        </li>
                        <!-- <li>
                            <span>状态：</span>
                            <span v-show="招募信息.state==0">未处理</span>
                            <span v-show="招募信息.state==1">已通过</span>
                            <span v-show="招募信息.state==2">已驳回</span>
                        </li> -->
                        <!-- <li v-show="招募信息.state==2">
                            <span>驳回理由：</span>
                            <div v-html="招募信息.cause"></div>
                        </li> -->
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
                        <li>
                            <span>状态：</span>
                            <span v-show="修改后.state==0">未处理</span>
                            <span v-show="修改后.state==1">已通过</span>
                            <span v-show="修改后.state==2">已驳回</span>
                        </li>
                        <li v-show="修改后.state==2">
                            <span>驳回理由：</span>
                            <div v-html="修改后.cause"></div>
                        </li>
                        <li class="按钮">
                            <el-button v-if="修改后.state==0" @click="修改(2)" size="mini" type="danger" round>拒绝</el-button>
                            <el-button v-if="修改后.state==0" @click="修改(1)" size="mini" type="primary" round>同意</el-button>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="12">
                    <ul class="box_3">
                        <li class="标题1">修改后</li>
                        <li class="申请时间">
                            申请时间：
                            <span v-if="修改后.updatetime">{{修改后.updatetime | 时间格式化}}</span>
                            <span v-if="!修改后.updatetime">{{修改后.applytime | 时间格式化}}</span>
                        </li>
                        <!-- <li>
                            <span>状态：</span>
                            <span v-show="招募信息.state==0">未处理</span>
                            <span v-show="招募信息.state==1">已通过</span>
                            <span v-show="招募信息.state==2">已驳回</span>
                        </li> -->
                        <!-- <li v-show="修改后.state==2">
                            <span>驳回理由：</span>
                            <div v-html="修改后.cause"></div>
                        </li> -->
                        <li :class="{'text-red':业务_1!=业务_2}">业务：{{业务_2}}</li>
                        <li :class="{'text-red':招募信息.tagline!=修改后.tagline}">宣传语：{{修改后.tagline}}</li>
                        <li :class="{'text-red':招募信息.position!=修改后.position}">分销员职责：{{修改后.position}}</li>
                        <li>
                            <span>分销员要求：</span>
                            <span v-show="修改后.hasexperience==0" :class="{'text-red':招募信息.hasexperience!=修改后.hasexperience}">无需从业经验</span>
                            <span v-show="修改后.hasexperience==1" :class="{'text-red':招募信息.hasexperience!=修改后.hasexperience}">有从业经验</span>
                            <span v-show="修改后.sex==0" :class="{'text-red':招募信息.sex!=修改后.sex}">性别不限</span>
                            <span v-show="修改后.sex==1" :class="{'text-red':招募信息.sex!=修改后.sex}">男</span>
                            <span v-show="修改后.sex==2" :class="{'text-red':招募信息.sex!=修改后.sex}">女</span>
                            <span :class="{'text-red':(招募信息.minage!=修改后.minage || 招募信息.maxage!=修改后.maxage)}">{{修改后.minage}}至{{修改后.maxage}}岁</span>
                        </li>
                        <li :class="{'text-red':招募信息.regionalscope!=修改后.regionalscope}">招募区域：{{修改后.regionalscope}}</li>
                        <li>招募开始时间：{{修改后.createtime | 时间格式化}}</li>
                        <li>招募结束时间：{{修改后.overtime | 时间格式化}}</li>
                        <li :class="{'text-red':招募信息.phone!=修改后.phone}">联系电话：{{修改后.phone}}</li>
                        <li :class="{'text-red':招募信息.wechat!=修改后.wechat}">招募微信：{{修改后.wechat}}</li>
                        <li :class="{'text-red':招募信息.bgm!=修改后.bgm}">背景音乐：{{修改后.bgm}}</li>
                        <li>语音介绍：</li>
                        <li :class="{'text-red':招募信息.mincommissionscale!=修改后.mincommissionscale}">最低佣金：{{修改后.mincommissionscale}}%</li>
                        <li>宣传内容：</li>
                        <li class="宣传内容" v-html="修改后.leaflets"></li>
                        <!-- <li class="按钮">
                            <el-button v-if="修改后.state==0" @click="修改(2)" size="mini" type="danger" round>拒绝</el-button>
                            <el-button v-if="修改后.state==0" @click="修改(1)" size="mini" type="primary" round>同意</el-button>
                        </li> -->
                    </ul>
                </el-col>
            </el-row>
        </el-main>
        <!-- 驳回弹出框 -->
        <el-dialog size="mini" class="cause_box" custom-class="class_1" title="驳回内容" :visible.sync="显示驳回输入框" width="360px">
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

import { mapActions } from "vuex";
export default {
    name:"",
    data () {
        return {
            招募信息:{},
            修改后:{},
            招募信息_1:{},
            自定义业务:[],
            业务类型:[],
            显示驳回输入框:false
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
        },
        业务_2(){
            var str='';
            var list=this.修改后.cbonum ? this.修改后.cbonum.split(',') : [];
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
            根据id查询修改详情:"分销/根据id查询修改详情",
            查询自定义业务:"分销/查询自定义业务",
            修改分销:"分销/修改分销",
            查询所有分销分类:"分销/分销类型/查询所有分销分类",
            更新修改详情:"分销/更新修改详情"
        }),
        block(){
            history.back()
        },
        async 修改(x){
            if(x==1){
                var obj=Object.assign({},this.修改后);
                    obj.state=1;
                    obj.id=this.招募信息.id;
                try {
                    var r=await this.修改分销(obj);
                    if(r.data.code!=200){
                        this.$message({showClose: true,message: r.data.msg ? r.data.msg : r.data.message , type: 'error'});
                        return
                    }
                } catch (error) {
                    this.$message({showClose: true,message: '系统错误，稍后再试。',type: 'error'});
                    return
                }
                var obj1=Object.assign({},this.修改后);
                    obj1.state=1
                this.更新修改详情(obj1).then(r2=>{
                    if(r2.data.code==200){
                        this.$message({message: '设置成功',type: 'success'});
                        history.back();
                    }else{
                        this.$message({showClose: true,message: r2.data.msg ? r2.data.msg : r2.data.message , type: 'error'});
                    }
                }).catch(err=>{
                    this.$message({showClose: true,message: '系统错误，稍后再试。',type: 'error'});
                })
            }else{
                this.显示驳回输入框=true;
            }
        },
        确定驳回(){
            console.log(this.$refs.驳回理由.innerText);
            var text=this.$refs.驳回理由.innerText;
            var html=this.$refs.驳回理由.innerHTML;
            var kong=/^\s*$/;
            if(kong.test(text)){
                this.$message({showClose: true,message: '请输入驳回理由',type: 'error'});
            }else{
                var obj=Object.assign({},this.修改后);
                    obj.state=2;
                    obj.cause=html;
                this.更新修改详情(obj).then(r2=>{
                    if(r2.data.code==200){
                        this.$message({message: '设置成功',type: 'success'});
                        history.back();
                    }else{
                        this.$message({showClose: true,message: r2.data.msg ? r2.data.msg : r2.data.message , type: 'error'});
                    }
                }).catch(err=>{
                    this.$message({showClose: true,message: '系统错误，稍后再试。',type: 'error'});
                })
            }
        },
        初始化(){
            this.加载(true)
            var query={
                    start:0,
                    length:10,
                    shopid:this.$route.query.shopid
                }
            Promise.all([this.查询所有分销分类(),this.查询分销(query),this.查询自定义业务(query),this.根据id查询修改详情(this.$route.query.id)]).then(x=>{
                console.log(x)
                if(x[0].data.code==200){
                    this.业务类型=x[0].data.data;
                }
                if(x[1].data.code==200 && x[1].data.data.data.length>0){
                    this.招募信息=x[1].data.data.data[0];
                }
                if(x[2].data.code==200){
                    this.自定义业务=x[2].data.data.data;
                }
                if(x[3].data.code==200){
                    this.修改后=x[3].data.data
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
.text-red{
    color: red;
}
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
