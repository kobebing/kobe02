<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{name1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{name2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "bread",
  props:['name1','name2']
};
</script>

<style>
.my-bread {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>
