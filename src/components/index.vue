<template>
  <!-- 使用饿了么ui的布局容器来实现结构 -->
  <el-container class="my-container">
    <!-- 头部区域 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="5">
          <img class="my-logo" src="../assets/logo.png" alt />
        </el-col>
        <el-col :span="18">
          <h2 class="my-title">黑牛后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a class="my-logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px" class="my-aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="false"
        >
          <!-- 导航1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>选项1
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>选项2
            </el-menu-item>
          </el-submenu>
          <!-- 导航2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>选项1
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>选项2
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang='less' scoped>
.my-container {
  height: 100%;
  .my-header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    .my-title {
      text-align: center;
      color: white;
    }
    .my-logout {
      color: white;
      background-color: hotpink;
      padding: 5px;
      border-radius: 4px;
      text-decoration: none;
    }
  }
  .my-main {
    background-color: #e9eef3;
  }
}
</style>
