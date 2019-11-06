<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRights} from '../api/http'
export default {
    name:'rights',
    data(){
        return {
            tableData:[]  
        }
    },
    created(){
        getRights().then(backData=>{
            // console.log(backData);
            this.tableData = backData.data.data
            for(let i=0;i<this.tableData.length;i++){
                switch(this.tableData[i].level){
                    case "0":{
                        this.tableData[i].level = "一级"
                        break
                    }
                    case "1":{
                        this.tableData[i].level = "二级"
                        break
                    }
                    case "2":{
                        this.tableData[i].level = "三级"
                        break
                    }
                }
            }
        })
    }
};
</script>

<style>
</style>
