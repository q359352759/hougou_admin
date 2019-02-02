<template>
    <div class="app-container">
        <el-main>
            <div class="box_1">
                <draggable element="ul" :options="{handle:'.header'}" v-model="myArray" v-for="(item, index) in shops_list" @end="drop(shops_list[index].list,index)" class="sortable">
                    <li class="ui-state-default item" :class="{'active':x.id==item.active.id}" v-for="(x, index_1) in item.list">
                        <!-- <div class="img_box" @click="select(item,x,index,index_1)">
                            <img v-if="x.logo" :src="x.logo" />
                        </div> -->
                        <div class="text_1" @click="select(item,x,index,index_1)">{{x.cbotype}}</div>
                        <div class="btn_1">
                            <span @click="modify(x)"><i class="el-icon-edit"></i></span>
                            <span @click="删除(x)"><i class="el-icon-delete"></i></span>
                        </div>
                    </li>
                    <li @click="add(item)" class="add">+</li>
                </draggable>
                
                <!-- <draggable v-model="myArray" :options="{draggable:'.item'}">
                    <div v-for="element in myArray" :key="element.id" class="item">
                        {{element.name}}
                    </div>
                    <button slot="footer" @click="add()">Add</button>
                </draggable> -->
            </div>
            <!-- 添加 -->
            <el-dialog class="add_box" title="添加" center :visible.sync="add_box" width="300px">
                <!-- <div class="img_box" @click="select_input()">
                    <span v-if="!details.logo">点击选择图片</span>
                    <img v-if="details.logo" :src="details.logo" alt="" srcset="">
                </div> -->
                <el-form size="small" :model="details" :rules="rules" ref="details"  label-width="50px">
                    <el-form-item label="名称" prop="cbotype">
                        <el-input v-model="details.cbotype" placeholder="名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="排序">
                        <el-input v-model="details.sort" placeholder="排序"></el-input>
                    </el-form-item> -->
                </el-form>
                <div class="text-center">
                    <el-button class="btn-block" @click="Sure()" type="primary" size="small">确定</el-button>
                </div>
            </el-dialog>
            
        </el-main>
        
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions } from "vuex";
export default {
    name:"",
    components: {
        draggable
    },
    data () {
        return {
            myArray:[
                {'name':'测试'}
            ],
            test:{'title':123},
            Loading: true,
            add_box:false,
            shops_tree:[],      //店铺3级分类
            shops_list:[
                // {
                //     active:'',
                //     list:[],
                // }
            ],
            active_obj:{},      //当前点击的选项
            active_url:[],      //保存点击级别
            rules:{
                cbotype:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min:1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
                ]
            },
            modify_obj:'',      //暂时保存修改的
            details:{       //详情
                cbotype:'',

                // sort:'',
                // logo:'',
                // id: 8,
                // level: 1,
                // logo: null,
                // name: "丽人",
                // pid: null,
                // sort: 2,
                // updateTime: "2018-11-16T09:05:12.000+0000"
            },
            isadd:true,         //是否是添加
        }
    },
    methods: {
        ...mapActions({
            添加分销类型:'分销/分销类型/添加分销类型',
            修改分销类型:'分销/分销类型/修改分销类型',
            删除分销分类:'分销/分销类型/删除分销分类',
            查询所有分销分类:'分销/分销类型/查询所有分销分类',
            加载:'加载中/加载'
        }),
        tests(){
            function set_list(orderlist,newlist,index){
                var index=index ? index : 0;
                if(index==0){
                    orderlist[0].list==newlist[0];
                }else{
                    orderlist[index].list=newlist
                }
                if(orderlist[index+1]){
                    var id=orderlist[index].active.id
                    var obj=[]
                    for(var i=0;i<newlist.length;i++){
                        if(newlist[i].id==id){
                            obj=newlist[i].children
                        }
                    }
                    // if(obj.length>0){
                        set_list(orderlist,obj,index+1)
                    // }else{
                        // console.log(3)
                    // }
                }
            }
            set_list(this.shops_list,this.shops_tree)
        },
        drop(x,index){
            console.log('拖动结束')
            // var list=[];
            // for(var i=0;i<x.length;i++){
            //     list.push(x[i])
            // }
            //     list=list.reverse()
            // for(var i=0;i<list.length;i++){
            //     list[i].sort=i+1
            // }
            // console.log(list);
            // this.update_1(list);
        },
        删除(x){
            this.$confirm('此操作将删除此类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.删除分销分类(x.id).then(x=>{
                    if(x.data.code==200){
                        this.$message({ message: '删除成功！',type: 'success'});
                        this.get_shops_tree();
                    }else{
                        this.$message({ message: x.data.msg ? x.data.msg : x.data.message, type: 'error'});
                    }
                }).catch(err=>{
                    this.$message({showClose: true, message: '网络错误，稍后再试.', type: 'error'});
                })
            }).catch(() => {
            });
        },
        修改(list){
            this.修改分销类型(this.details).then(x=>{
                if(x.data.code==200){
                    this.$message({ message: '修改成功.',type: 'success'});
                    this.get_shops_tree();
                }else{
                    this.$message({ message: x.data.msg ? x.data.msg : x.data.message , type: 'error'});
                }
            }).catch(err=>{
                this.$message({ message: '网络错误，稍后再试.', type: 'error'});
            })
        },
        //确定
        Sure(){
            this.$refs['details'].validate((valid) => {
                if (valid) {
                    if(this.isadd){
                        console.log('添加')
                        this.添加()
                    }else{
                        // var list=[this.details];
                        this.修改()
                    }
                    this.add_box=false;           
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async 添加(){
            console.log(this.details);
            try {
                var 添加=await this.添加分销类型(this.details);
                if(添加.data.code==200){    
                    this.$message({message: '设置成功',type: 'success'});
                }else{
                    this.$message.error(添加.data.msg ? 添加.data.msg : 添加.data.message);
                }   
            } catch (error) {
                this.$message.error('网络错误稍后再试');
                return
            }
            this.get_shops_tree();
        },
        //选择图片
        select_input(){
            $('.file_box').html('<input type="file" accept="image/*">');
            $('.file_box').children().click();
        },
        //修改按钮
        modify(x){
            console.log(x);
            this.isadd=false;
            this.details=Object.assign({},x);
            this.add_box=true;
        },
        //添加按钮
        add(x){
            console.log(x);
            this.isadd=true;
            this.details={
                pid:x.pid,
                level: x.level,
                // logo: "",
                cbotype: "",
                // sort: ''
            };
            this.add_box=true;
        },
        //选择
        select(x,y,index,index_1){
            console.log(x,y,index);
            this.active_url[index]=index_1;
            this.active_obj=x;
            x.active=y;
            this.shops_list.splice(index+1)
            var obj={
                active:'',
                pid:y.id,
                list:y.children,
                level:this.shops_list.length+1
            }
            this.shops_list.push(obj)
        },
        //查询店铺类别
        get_shops_tree(){
            this.加载(true)
            this.查询所有分销分类().then(x=>{
                console.log(x)
                if(x.data.code==200){
                    this.shops_tree=x.data.data;
                    var obj={
                            active:'',
                            pid:null,
                            list:x.data.data,
                            level:1
                        }
                    if(this.shops_list.length>0){
                        console.log('添加类型')
                        this.shops_list[0].list=x.data.data;
                    }else{
                        console.log('添加对象',obj);
                        this.shops_list.push(obj);
                    }
                    this.tests()
                    this.加载(false)
                }else{
                    this.加载(false)
                }
            }).catch(err=>{
                this.加载(false)
            })
        }
    },
    mounted () {
        //查询3级分类
        this.get_shops_tree();
    }
}
</script>

<style lang="scss" scoped>
ul{
    margin: 0px;
    padding: 0px;
}
li{
    list-style: none;
}
.el-dialog__title{
    line-height: inherit;
    font-size: inherit;
}
.el-dialog--center .el-dialog__body,
.el-dialog__body{
    padding-top:0px; 
}
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

.box_1{
    display: flex;
}
.box_1>ul{
    width: 200px;
    margin: 0px 5px;
}
.box_1 .add{
    height: 35px;
    line-height: 35px;
    background: #a7a8a9;
    text-align: center;
    color: #ffffff;
    font-size: 20px;
}
.box_1 .item{
    display: flex;
    height: 35px;
    align-items: center;
    background-color: rgba(229, 229, 229, 1);
    border: 1px solid #cccccc;
    padding: 0px 2px;
}
.box_1 .item.active{
    background: #ffffff;
}
.box_1 .img_box{
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    background: #cccccc;
}
.box_1 .text_1{
    flex-grow: 1;
    padding: 0px 3px 0px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.box_1 .btn_1{
    flex-shrink: 0;
    padding: 0px 3px;
}
.box_1 .btn_1>span:nth-child(1){
    color:#409EFF;
    cursor: pointer;
}
.box_1 .btn_1>span:nth-child(2){
    color:red;
    cursor: pointer;
}

.box_1 .img_box img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* #sortable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
  #sortable li { margin: 0 3px 3px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 18px; }
  #sortable li span { position: absolute; margin-left: -1.3em; } */

/* 添加 */
.add_box{

}
.add_box .img_box{
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 20px;
    background: #cccccc;
}
.add_box .img_box img{
    max-width: 100%;
    max-height: 100%;
}


body,html{
    height: 100%;
}
#app{
    height: 100%;
}
.el-main{
    height: 100%;
}

.test>li{
   height: 30px;
    margin: 2px auto;
    display: flex;
}
.test>li>div{
    background: #cccccc;
    width: 300px;
    height: 30px;;
}



</style>
