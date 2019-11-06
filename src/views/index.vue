<template>
  <!-- 使用饿了么ui的布局容器来实现结构 -->
  <el-container class="my-container">
    <!-- 头部区域 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="5">
          <img class="my-logo" src="../assets/logo.png" alt />
        </el-col>
        <el-col :span="9">
          <h2 class="my-title">黑牛后台管理系统</h2>
        </el-col>
        <el-col :span="9">
          <input type="text" v-focus />
        </el-col>
        <el-col :span="1">
          <a class="my-logout" href="#" @click.prevent="logOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px" class="my-aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="false"
          :router="true"
        >
          <!-- @open="handleOpen"
          @close="handleClose"-->
          <!-- 导航1 -->
          <el-submenu :index="''+index" v-for="(item,index) in userList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="'/index/'+it.path" v-for="(it,i) in item.children">
              <i class="el-icon-menu"></i>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- <transition name="right"> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
        <!-- </transition> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { users } from "../api/http";
import { menus } from "../api/http";
export default {
  name: "index",
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      userList: []
    };
  },
  created() {
    users({ pagenum: 1, pagesize: 5 }).then(backData => {
      // console.log(backData);
    });
    menus().then(backData => {
      console.log('123')
      console.log(backData);
      this.userList = backData.data.data;
    });

    
  },
  // 方法
  methods: {
    logOut() {
      // 提示用户
      this.$confirm("此操作将立即退出咱们网站, 你真要这样子！！?", "┭┮﹏┭┮", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          window.localStorage.removeItem("token");
          this.$router.push("/login");
          // 提示
          this.$message.error("你真狠！！别来了！！");
        })
        .catch(() => {
          //  取消
          this.$message("你真好！");
        });
    }
  }
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
    padding: 0 20px;
  }
}

.right-enter-active,
.right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
