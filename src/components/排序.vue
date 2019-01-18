<template>
    <div class="排序">
        <div>{{name}}</div>
        <i class="el-icon-sort-up" :class="{'active':type==2}"></i>
        <i class="el-icon-sort-down" :class="{'active':type==1}"></i>
    </div>
</template>

<script>
//@click.native
export default {
    name:'',
    props: {
        name:{
            default:'未设置排序'
        },
        type:{
            default:0
        }
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.排序{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 108px;
    height: 32px;
    background-color: rgba(229, 229, 229, 1);
    border-radius: 3px;
    font-size: 13px;
    transition: all 0.3s;
    cursor: pointer;
    i{
        color: #d0cccc;
        font-size: 20px;
        width: 18px;
    }
    .active{
        color: #20a0ff;
    }
}
.排序:hover{
    background: #f3f3f3;
}
</style>
