<template>
    <div class="app-container">
        <el-main>
            <el-button @click="block()" icon="el-icon-arrow-left" circle></el-button>
            <div class="box_1">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="类型">
                        <el-select v-model="form.type" placeholder="请选择类型">
                            <el-option v-for="item in type_list" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="form.headline"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <div class="ueditor">
                            <div ref="ueditor"></div>
                        </div>
                    </el-form-item>
                    <el-form-item >
                        <el-switch v-model="form.common_1"></el-switch>
                        <span>设为常见问题</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="onSubmit()">确定</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            
            
        </el-main>

        <div class="file_box hidden">
            <input type="file" accept="image/*">
        </div>
        
    </div>
</template>

<script>

export default {
    name:"",
    components: {
    },
    data () {
        return {
            Loading: true,
            // query:{
            //     type:0
            // },
            id:'',
            form:{
                // id:'',       //增
                type:'',        //类型id
                headline:'',    //标题
                content:'',     //内容
                state:"1",      //隐藏或显示       
                common:"0",     //常见或不常见
                common_1:false
            },
            type_list: [],
            editor:'',
            config:{					//编译器配置
                initialFrameWidth: null,
                initialFrameHeight: 200,
                elementPathEnabled:false,           //是否显示路径
                wordCount:false,                    //是否开启字数统计  
                imageScaleEnabled:true,             //启用图片拉伸缩放
                imagePopup:true,                    //图片操作的浮层开关，默认打开
                toolbars:[
                    [
                    'undo', //撤销
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    'subscript', //下标
                    'fontborder', //字符边框
                    'superscript', //上标
                    'selectall', //全选
                    'horizontal', //分隔线
                    'inserttitle', //插入标题
                    'cleardoc', //清空文档
                    'fontsize', //字号
                    'spechars', //特殊字符
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                ]
            ]
            },
        }
    },
    mounted() {
        this.editor = UE.getEditor(this.$refs.ueditor,this.config);
        UE.registerUI('上传图片',function(editor,uiName){
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName,{
                execCommand:function(){
                    $('.file_box').html('<input type="file" accept="image/*">');
                    $('.file_box').children().click();
                }
            });

            //创建一个button
            var btn = new UE.ui.Button({
                //按钮的名字
                name:uiName,
                //提示
                title:uiName,
                //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
                cssRules :'background-position: -380px 0px;',
                //点击时执行的命令
                onclick:function () {
                    //这里可以不用执行命令,做你自己的操作也可
                    editor.execCommand(uiName);
                }
            });
            //当点到编辑内容上时，按钮要做的状态反射
            editor.addListener('selectionchange', function () {
                var state = editor.queryCommandState(uiName);
                if (state == -1) {
                    btn.setDisabled(true);
                    btn.setChecked(false);
                } else {
                    btn.setDisabled(false);
                    btn.setChecked(state);
                }
            });
            //因为你是添加button,所以需要返回这个button
            return btn;
        })
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    width: 600px;
    margin: 0px auto;
}
.ueditor{
    line-height: initial;
}
</style>
