<template>
    <div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

		<div class="title-container">
			<h3 @click='获取测试()'>红购系统</h3>
		</div>


		<el-form-item prop="username" size="mini">
			<span class="svg-container">
			<svg-icon icon-class="user" />
			</span>
			<el-input
			v-model="loginForm.username"
			:placeholder="$t('login.username')"
			name="username"
			type="text"
			auto-complete="on"
			/>
		</el-form-item>
		<el-form-item prop="password" size="mini">
			<span class="svg-container">
			<svg-icon icon-class="password" />
			</span>
			<el-input
			:type="passwordType"
			v-model="loginForm.password"
			:placeholder="$t('login.password')"
			name="password"
			auto-complete="on"
			@keyup.enter.native="handleLogin" />
			<span class="show-pwd" @click="showPwd">
				<svg-icon icon-class="eye" />
			</span>
		</el-form-item>

		<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
		</el-form>
    
  	</div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";
import { mapActions , mapGetters} from "vuex";
export default {
  	name: 'Login',
  	components: { LangSelect, SocialSign },
  	data() {
		const validateUsername = (rule, value, callback) => {
		//   if (!isvalidUsername(value)) {
		//     callback(new Error('Please enter the correct user name'))
		//   } else {
			callback()
		//   }
		}
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('The password can not be less than 6 digits'))
			} else {
				callback()
			}
		}
		return {
			loginForm: {
				username: '15884461879',
				password: '123456'
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }]
			},
			passwordType: 'password',
			loading: false,
			showDialog: false,
			redirect: undefined
		}
	},
	watch: {
		$route: {
		handler: function(route) {
			this.redirect = route.query && route.query.redirect
		},
		immediate: true
		}
	},
	computed:{
		...mapGetters({
			userInfo:'登陆/userInfo',
			权限:'登陆/权限',
			代理商信息:'登陆/代理商信息'
		})
	},
  	methods: {
		...mapActions({
            // LoginByUsername:'user/LoginByUsername',
            获取token:'登陆/获取token',
			获取用户Id:'登陆/获取用户Id',
			保存token:'登陆/保存token',
            获取用户信息:'登陆/获取用户信息',
            设置用户信息:'登陆/设置用户信息',
            查询用户权限:'登陆/查询用户权限',
            设置权限:'登陆/设置权限',
            查询代理商信息:'登陆/查询代理商信息'
        }),
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = ''
			} else {
				this.passwordType = 'password'
			}
		},
		handleLogin(){
			this.开始登陆()
		},
		获取测试(){
			// this.$store.dispatch('GetUserInfo', this.loginForm).then(() => {
			// 	console.log(123)
			// 	this.$router.push({ path: this.redirect || "/" })
			// })
				
		},
		async 开始登陆(){
			this.loading = true
			var 获取token =await this.获取token(this.loginForm);
			if(!获取token.data.access_token){
				this.loading = false
				this.$message.error(获取token.data.error_description ? 获取token.data.error_description : 获取token.data.message);
				return;
			}
			this.保存token(获取token.data);
			
			var 获取用户Id=await this.获取用户Id(获取token.data.access_token);
			//=============
			var userInfo=获取用户Id.data;
				try {
						userInfo.nickname=b64DecodeUnicode(userInfo.nickname);
					} catch (error) {}
				this.设置用户信息(userInfo);
			var 权限=userInfo.sysRoles;
				this.设置权限(权限);
			var 代理商=权限.find(x=>x.code=='AREA_MANAGER');
			var 管理员=权限.find(x=>x.code=='SUPER_ADMIN');
			//=============

			// if(获取用户Id.data.code==200){
			// 	var id=获取用户Id.data.data;
			// }else{
			// 	this.$message.error(获取用户Id.data.msg ? 获取用户Id.data.msg : 获取用户Id.data.message);
			// 	this.logining=false;
			// 	return;
			// }
			// var 用户信息=await this.获取用户信息(id);
			// if(用户信息.data.code==200){
			// 	var userInfo=用户信息.data.data;
			// 		try {
			// 			userInfo.nickname=b64DecodeUnicode(userInfo.nickname);
			// 		} catch (error) {}
			// 	this.设置用户信息(userInfo);
			// }else{
			// 	this.loading = false
			// 	this.$message.error(用户信息.data.msg ? 用户信息.data.msg : 用户信息.data.message);
			// 	return;
			// }
			// var 权限=await this.查询用户权限(id);
			// 	权限=权限.data;
			// this.设置权限(权限);
			// var 代理商=权限.find(x=>x.code=='AREA_MANAGER');
			// var 管理员=权限.find(x=>x.code=='SUPER_ADMIN');
			//============
			this.查询代理商信息();
			
			if(!代理商 && !管理员){
				this.loading = false
				this.$message.error('无登录权限。');
			}else{
				// this.获取测试()
				this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
					this.loading = false
					this.$router.push({ path: this.redirect || '/' })
				}).catch(() => {
					this.loading = false
				})
				// this.$router.push('/dailishang/zonglan')
				console.log('进入页面')
				// this.$router.push({ path: this.redirect || "/" });
			}
		},
		// handleLogin() {
		// 	console.log(1)
		// 	this.$refs.loginForm.validate(valid => {
		// 		if (valid) {
		// 			console.log(1)
		// 			this.loading = true
		// 			this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
		// 				this.loading = false
		// 				this.$router.push({ path: this.redirect || '/' })
		// 			}).catch(() => {
		// 				this.loading = false
		// 			})
		// 		} else {
		// 			console.log('error submit!!')
		// 			return false
		// 		}
		// 	})
		// },
		afterQRScan() {
			// const hash = window.location.hash.slice(1)
			// const hashObj = getQueryObject(hash)
			// const originUrl = window.location.origin
			// history.replaceState({}, '', originUrl)
			// const codeMap = {
			//   wechat: 'code',
			//   tencent: 'code'
			// }
			// const codeName = hashObj[codeMap[this.auth_type]]
			// if (!codeName) {
			//   alert('第三方登录失败')
			// } else {
			//   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
			//     this.$router.push({ path: '/' })
			//   })
			// }
		}
  }
}
</script>



<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;


/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      
    }
  }
  .el-form-item {
    border: 1px solid #a9a9a9;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.el-form-item__content{
    line-height:16px;
}


.login-container {
  min-height: 100%;
  width: 100%;
//   background-color: $bg;
    background: url(/static/image/login-bg.jpg);
    overflow: hidden;
    display: flex;
    justify-content:flex-end;
    align-items:center;
        padding: 0px 10% 0px 0px;
    background-size: cover;
    background-position: center;
  .login-form {
    position: relative;

    width: 300px;
    // width: 520px;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;

    max-width: 100%;
    padding: 0px 25px 0;
    // margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>