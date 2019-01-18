import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";

const user = {
	state: {
		user: '',
		status: '',
		code: '',
		token: getToken(),
		name: '',
		avatar: '',
		introduction: '',
		roles: [],
		setting: {
			articlePlatform: []
		}
	},

	mutations: {
		SET_CODE: (state, code) => {
			state.code = code
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_INTRODUCTION: (state, introduction) => {
			state.introduction = introduction
		},
		SET_SETTING: (state, setting) => {
			state.setting = setting
		},
		SET_STATUS: (state, status) => {
			state.status = status
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		}
	},

	actions: {
		// 用户名登录
		LoginByUsername({ commit,rootGetters}, userInfo) {
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				console.log(456)
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
			// commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
				var 权限=rootGetters['登陆/权限'];
				var 代理商=权限.find(x=>x.code=='AREA_MANAGER');
				var 管理员=权限.find(x=>x.code=='SUPER_ADMIN');
				var roles=[];
					权限.forEach(item => {
						if(item.code=='AREA_MANAGER'){
							roles.push('editor')
						}
						if(item.code=='SUPER_ADMIN'){
							roles.push('admin')
						}
					});
				var token='';
				var introduction=''
					if(管理员){
						token='admin';
						introduction="管理员"
					}else if(代理商){
						token='editor';
						introduction="代理商"
					}
				var userInfo=rootGetters['登陆/userInfo'];
				var avatar=userInfo.headImgUrl;
				// console.log(userInfo);
				try {
					var name=b64DecodeUnicode(userInfo.nickname);
				} catch (error) {
					var name=userInfo.nickname
				}
				
				
				var data={
						roles: ['editor'],
						token: 'editor',
						introduction: '我是编辑',
						avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
						name: 'Normal Editor'
					}
				var obj={
						roles:roles,
						token:token,
						introduction:introduction,
						avatar:avatar,
						name:name
					}
				commit('SET_TOKEN', obj.token)
				setToken(obj.token);
				resolve()

				// loginByUsername(username, userInfo.password).then(response => {
				// 	// const data = response.data;
				// 	console.log(response)
				// 	var data={
				// 			roles: ['editor'],
				// 			token: 'editor',
				// 			introduction: '我是编辑',
				// 			avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
				// 			name: 'Normal Editor'
				// 		}
				// 	commit('SET_TOKEN', data.token)
				// 	setToken(response.data.token)
				// 	resolve()
				// }).catch(error => {
				// 	reject(error)
				// })
			})
		},

		// 获取用户信息
		GetUserInfo({ commit, state ,rootGetters}) {
			return new Promise((resolve, reject) => {
				console.log(123132)
				
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
			// commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
			var 权限=rootGetters['登陆/权限'];
				var 代理商=权限.find(x=>x.code=='AREA_MANAGER');
				var 管理员=权限.find(x=>x.code=='SUPER_ADMIN');
				var roles=[];
					权限.forEach(item => {
						if(item.code=='AREA_MANAGER'){
							roles.push('editor')
						}
						if(item.code=='SUPER_ADMIN'){
							roles.push('admin')
						}
					});
				var token='';
				var introduction=''
					if(管理员){
						token='admin';
						introduction="管理员"
					}else if(代理商){
						token='editor';
						introduction="代理商"
					}
				var userInfo=rootGetters['登陆/userInfo'];
				var avatar=userInfo.headImgUrl;
				// console.log(userInfo);
				try {
					var name=b64DecodeUnicode(userInfo.nickname);
				} catch (error) {
					var name=userInfo.nickname
				}
				
				
				var data={
						roles: ['editor'],
						token: 'editor',
						introduction: '我是编辑',
						avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
						name: 'Normal Editor'
					}
				var obj={
						roles:roles,
						token:token,
						introduction:introduction,
						avatar:avatar,
						name:name
					}

				var data={
						roles: ['editor'],
						token: 'editor',
						introduction: '我是编辑',
						avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
						name: 'Normal Editor'
					}
				var response={
						status:200,
						data:obj
					}
				if (obj.roles && obj.roles.length > 0) { // 验证返回的roles是否是一个非空数组
					commit('SET_ROLES', obj.roles)
				} else {
					reject('getInfo: roles must be a non-null array!')
				}

				commit('SET_NAME', obj.name)
				commit('SET_AVATAR', obj.avatar)
				commit('SET_INTRODUCTION', obj.introduction)
				resolve(response)

				return
				getUserInfo(state.token).then(response => {
					// 由于mockjs 不支持自定义状态码只能这样hack
					console.log(response)
					if (!response.data) {
						reject('Verification failed, please login again.')
					}
					// const data = response.data
					var data={
							roles: ['editor'],
							token: 'editor',
							introduction: '我是编辑',
							avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
							name: 'Normal Editor'
						}
					if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
						commit('SET_ROLES', data.roles)
					} else {
						reject('getInfo: roles must be a non-null array!')
					}

					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_INTRODUCTION', data.introduction)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 第三方验证登录
		// LoginByThirdparty({ commit, state }, code) {
		//   return new Promise((resolve, reject) => {
		//     commit('SET_CODE', code)
		//     loginByThirdparty(state.status, state.email, state.code).then(response => {
		//       commit('SET_TOKEN', response.data.token)
		//       setToken(response.data.token)
		//       resolve()
		//     }).catch(error => {
		//       reject(error)
		//     })
		//   })
		// },

		// 登出
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					removeToken()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({ commit }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		},

		// 动态修改权限
		ChangeRoles({ commit, dispatch }, role) {
			return new Promise(resolve => {
				commit('SET_TOKEN', role)
				setToken(role)
				getUserInfo(role).then(response => {
					const data = response.data
					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_INTRODUCTION', data.introduction)
					dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
					resolve()
				})
			})
		}
	}
}

export default user
