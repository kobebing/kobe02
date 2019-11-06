<template>
  <div>
    <!-- 面包屑导航 -->
    <bread name1="商品管理" name2="分类参数"></bread>

    <!-- 警告框 -->
    <el-alert title="! 注意：只允许为第三级分类设置相关参数！" type="warning"></el-alert>

    <!-- 下拉框 -->
    请选择商品分类：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <!-- tabs栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first"><el-button type="primary" disabled>动态参数</el-button></el-tab-pane>
      <el-tab-pane label="静态参数" name="second"><el-button type="primary" disabled>静态参数</el-button></el-tab-pane>
    </el-tabs>

    <!-- 表单 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="#" width="180"></el-table-column>
      <el-table-column prop="name" label="商品参数" width="180"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import bread from "../components/bread";
export default {
  name: "params",
  components: {
    bread
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  }
};
</script>

<style>
</style>
