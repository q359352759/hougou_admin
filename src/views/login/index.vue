<template>
    <!-- <div class="login-container" style="background-image:url(static/image/login-bg.jpg)" :style="{'background-image': 'url(static/image/login-bg.jpg)'}"> -->
    <div class="login-container" style="background-image:url(static/image/login-bg.jpg)">
		<!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
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
		</el-form> -->
		<form @submit.prevent="handleLogin()">
			<div class="外层">
				<div class="登陆框">
					<div class="img_1 img_box"><img src="static/image/login1.png" alt=""></div>
					<div class="img_2 img_box"><img src="static/image/login2.png" alt=""></div>
					<div class="img_3 img_box"><img src="static/image/login3.png" alt=""></div>
					<div class="img_4 img_box"><img src="static/image/login4.png" alt=""></div>
					<div class="img_5 img_box"><img src="static/image/login5.png" alt=""></div>
					<div class="img_6 img_box"><img src="static/image/login6.png" alt=""></div>
					<div class="img_7 img_box"><img src="static/image/login7.png" alt=""></div>
					<div class="img_8 img_box"><img src="static/image/login8.png" alt=""></div>
					<div class="img_9 img_box"><img src="static/image/login9.png" alt=""></div>
					<div class="输入框">
						<span class="图标">
							<svg-icon icon-class="手机" />
						</span>
						<input type="text" v-model="loginForm.username" placeholder="请输入手机号">
					</div>
					<div class="输入框">
						<span class="图标">
							<svg-icon icon-class="密码" />
						</span>
						<input type="password" v-model="loginForm.password" placeholder="请输入密码">
						<button type="submit" class="登陆按钮">登录</button>
					</div>
				</div>
			</div>
		</form>
		

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
				username: '',
				password: ''
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }]
			},
			passwordType: 'password',
			loading: false,
			loading_box: '',
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
		openloading(x){
            if(x){
                this.loading_box = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }else{
                this.loading_box.close();
            }
        },
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
		async 开始登陆(){
			// this.loading = true
			this.openloading(true)
			var 获取token =await this.获取token(this.loginForm);
			if(!获取token.data.access_token){
				// this.loading = false
				this.openloading(false)
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
				// this.loading = false
				this.openloading(false)
				this.$message.error('无登录权限。');
			}else{
				// this.获取测试()
				this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
					// this.loading = false
					this.openloading(false)
					console.log(this.redirect)
					// this.$router.push({ path:'/' })
					this.$router.push({path: '/zonglan' })
					
				}).catch(() => {
					this.openloading(false)
					// this.loading = false
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

<style lang="scss" scoped>
.login-container{
	min-height: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: center;
	justify-content:flex-end;
	overflow: hidden;
}
.外层{
	// border:1px solid red;
	width: 1080px;
	display: flex;
	align-items: center;
	justify-content:flex-end;
	padding-right: 316px;
}
.登陆框{
	width: 300px;
	height: 300px;
	// border: 1px solid #ffffff;
	position: relative;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content:center;
	align-items: center; 
	.输入框{
		position: relative;
		z-index: 1;
		width: 161px;
		height: 26px;
		background: #429bff;
		// border-radius: 6px;
		opacity: 0.95;
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		margin: 10px 0px;
		padding: 0px 0px 0px 6px ;
		input{
			width: 0;
			flex-grow: 1;
			background: none;
			border: none;
			outline: none;
			color: rgba(255, 255, 255, 1);
			font-size: 12px;
		}
		input::-webkit-input-placeholder { /* WebKit browsers */
			color:#ffffff;
			letter-spacing: 1px;
		}
		.图标{
			flex-shrink: 0;
			color: #ffffff;
			margin: 0px 3px 0px 0px;
		}
		.登陆按钮{
			width: 45px;
			height: 100%;
			color: #429bff;
			background-color: rgba(255, 255, 255, 1);
			// border-radius: 6px;
			font-size: 12px;
			line-height: 26px;
			text-align: center;
			padding: 0px;
			border: none;
			outline: none;
			cursor: pointer;
		}
	}
	.img_box{
		position: absolute;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.img_1,
	.img_2,
	.img_3{
		top: 0px;
		left: 0px;
	}
	.img_4{
		animation: 旋转1 40s linear infinite;
	}
	.img_5{
		top: 0px;
		left: 0px;
		animation: 旋转2 30s linear infinite;
	}
	.img_6{
		top: 0px;
		left: 0px;
		animation: 旋转1 20s linear infinite;
	}
	.img_7{
		bottom:-27px;
		left: 0px;
	}
	.img_8{
		left: 0px;
		top: -30px;
	}
	.img_9{
		width: 390px;
		right: -317px;
	    top: 64px;
	}
}

@keyframes 旋转1 {
	from{
		transform: rotate(0deg);
	}to {
		transform: rotate(360deg);
	}
}
@keyframes 旋转2 {
	from{
		transform: rotate(360deg);
	}to {
		transform: rotate(0deg);
	}
}
</style>


