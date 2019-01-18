<template>
    <div class="enlarge_img" >
        <div class="mask" @click="close_1()"></div>
        <div class="img_box">
            <div>
                <img :src="enlarge_img" alt="">
            </div>
            <ul v-if="imglist && imglist.length>1">
                <li v-for="(item, index) in imglist" :key="index" :class="{'active':enlarge_img==item}">
                    <img @click="enlarge_img=item" :src="item" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    props: {
        imglist:{
            default:()=>[]
        },
        closeA:{    //定义onOK属性
            type: Function
        }
    },
    data () {
        return {
            enlarge_img:''
        }
    },
    methods: {
        close_1(){
            // this.$emit('closeA');
            if(this.closeA){
                this.closeA()
            }
        }
    },
    watch: {
        imglist(list){
            this.enlarge_img=list[0];
        }
    }
}
</script>

<style lang="scss" scoped>

/* 图片放大 */
.enlarge_img{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2002;
}

.enlarge_img .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0px;
    left: 0px;
}
.enlarge_img .img_box{
    position: relative;
    z-index: 2;
    height: 100%;
    width: 850px;
    background: #000000;
    margin: 0px auto;
    padding: 5px;
    display: flex;
    flex-direction:column;
}
.enlarge_img .img_box>div{
    flex-grow: 1;
    height: 0;
}
.enlarge_img .img_box>div img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.enlarge_img .img_box>ul{
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-top: 1px solid #ffffff;
    padding: 10px 0px 0px ;
}
.enlarge_img .img_box>ul li{
    width: 50px;
    height: 50px;
    margin: 5px;
}
.enlarge_img .img_box>ul li.active img{
    border: 3px solid #ffffff;
}
.enlarge_img .img_box>ul li img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
