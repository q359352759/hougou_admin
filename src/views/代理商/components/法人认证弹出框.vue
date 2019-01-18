<template>
    <table>
        <tbody>
            <tr>
                <td>姓名：</td>
                <td>
                    <div>{{details.iaiName}}</div>
                </td>
            </tr>
            <tr>
                <td>性别：</td>
                <td>
                    <div>{{details.sex==0 ? '男'  : '女'}}</div>
                </td>
            </tr>
            <tr>
                <td>名族：</td>
                <td>
                    <div>
                        {{details.nation}}
                    </div>
                </td>
            </tr>
            <tr>
                <td>出生：</td>
                <td>
                    <div>{{details.birthday}}</div>
                </td>
            </tr>
            <tr>
                <td>住址：</td>
                <td>
                    <div>{{details.iaiAddress}}</div>
                </td>
            </tr>
            <tr>
                <td>身份证号：</td>
                <td>
                    <div>{{details.idNumber}}</div>
                </td>
            </tr>
            <tr>
                <td>签发机关：</td>
                <td><div>{{details.issueArea}}</div></td>
            </tr>
            <tr>
                <td>有效期限：</td>
                <td><div>{{details.validity}}</div></td>
            </tr>
            <tr>
                <td>身份证正面：</td>
                <td>
                    <!-- <div> -->
                    <img @click="see_img(details.frontImg)" v-if="details.frontImg" :src="details.frontImg" alt="">
                    <!-- </div> -->
                </td>
            </tr>
            <tr>
                <td>身份证背面：</td>
                <td>
                    <img @click="see_img(details.reverseImg)" v-if="details.reverseImg" :src="details.reverseImg" alt="">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name:"",
    props: {
        details:{
            default:{}
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
        see_img(x){
            console.log(x); 
            this.$emit('setimg',x);
        }
    },
}
</script>

<style lang="scss" scoped>
table{
    width: 100%;
}
table tr>td{
    padding: 2px;
}
table tr>td:nth-child(1){
    width: 10px;
    white-space: nowrap;
    text-align: right;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
}
table tr>td:nth-child(2) div{
    max-width: 100%;
    padding: 3px;
    min-height: 18px;
    background-color: rgba(246, 246, 246, 1);
}
table tr>td:nth-child(2) img{
    max-width: 100%;
}
</style>
