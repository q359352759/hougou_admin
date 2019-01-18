import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'

import 登陆 from './vuex/登陆.js'

import 代理商 from './vuex/代理商.js';
import 区域 from './vuex/区域.js'
import 通用 from './vuex/通用.js'
const store = new Vuex.Store({
	plugins: [       //储存部分
		createPersistedState({
			key: 'vuex0117',
			reducer(val) {
				return {
					登陆: val.登陆,
					区域:val.区域,
                    通用:val.通用
				}
			}
		})
	],
	modules: {
		app,
		errorLog,
		permission,
		tagsView,
		user,

		登陆:登陆,
		区域,
		代理商,
		通用
	},
	getters
})

export default store
