<template>
  <div>
      <input type="text" placeholder="输入框1" v-model="input01" @keyup.enter="search"><br><br>
      <input type="text" placeholder="输入框2" v-model="input02"><br><br>

      <button>确认提交</button>
  </div>
</template>

<script>
export default {
    name:'userTable',
    data(){
        return {
            input01:"",
            input02:""
        }
    },
    methods:{
        search(){
            this.$router.push(`/index/goods/goodsList/${this.input01}`)
        }
    }
}
</script>

<style>

</style>