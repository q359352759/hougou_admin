<template>
  	<div id="app">
    	<router-view/>
  	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "App",
	data () {
		return {
			
		}
	},
	methods: {
		...mapActions({
            获取区域:'区域/获取区域',
            获取服务类型:'通用/获取服务类型',
            获取店铺类型:'通用/获取店铺类型'
        })
	},
	mounted() {
        this.获取区域();
        this.获取服务类型();
        this.获取店铺类型();
	},
};
</script>

<style lang="scss">
ul {
	margin: 0px;
	padding: 0px;
}
li{
	list-style: none;
}
</style>
