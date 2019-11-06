<template>
    <div>
        <ul class="list" v-for="item in jsNumber" >
            <li>{{item}}</li>
        </ul>
    </div>
</template>

<script>
import { menus } from "../../../api/http";
export default {
    name:'list',
    data(){
        return {
            // number:1
        }
    },
    created(){
        
    },
    destroyed(){
        console.log('已被销毁')        
    },
    computed:{
        jsNumber(){
            
            return parseInt(this.$route.params.number)
        }
    }
}
</script>

<style lang='less' scoped>
ul.list li{
    line-height: 50px;
    margin-bottom: 3px;
    background-color: yellowgreen;
}
</style>