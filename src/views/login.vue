<template>
  <div class="login">
    <div class="form-container">
      <h2>用户登录</h2>
      <!-- el的表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入login
import { login } from "../api/http";
export default {
  name: "login",
  data() {
    return {
      // 表单元素绑定的数据
      ruleForm: {
        // 用户名
        username: "",
        // 密码
        password: "",
        buttenpremissions: ["a", "b", "c", "d", "e", "f"]
      },
      // 验证规则
      rules: {
        // 规则名
        username: [
          { required: true, message: "用户名不可以为空哦！", trigger: "blur" }
        ],
        // 规则名
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击提交
    submitForm(formName) {
      // 获取 饿了吗ui的form表单  饿了么ui提供的验证方法
      this.$refs[formName].validate(valid => {
        // valid 有值 说明验证通过
        if (valid) {
          // 提交数据
          login({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(backData => {
            console.log(backData);
            if (backData.data.meta.status == 200) {
              // 保存token
              window.localStorage.setItem("token", backData.data.data.token);
              //根据不同的用户获取不同的权限标识集合，存放权限标识集合到store中
              this.$store.commit("savePerms", this.buttenpremissions);
              console.log(this.$store.state)
              // 提示
              this.$message.success(backData.data.meta.msg);
              // 跳转
              this.$router.push("/index");
            } else if (backData.data.meta.status == 400) {
              // 提示
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          // 验证失败啦
          this.$message.error("哥们，你有东西没有写哦，滑稽！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  height: 100%;
  background-color: #324152;
  // 开启弹性布局
  display: flex;
  // 内容水平方向 对其方式 center 居中
  justify-content: center;
  // 内容竖直方向 对其方式 center居中
  align-items: center;
  .form-container {
    width: 580px;
    height: 437px;
    background-color: white;
    border-radius: 5px;
    padding: 60px 40px;
    h2 {
      margin-bottom: 30px;
    }
    .my-btn {
      width: 100%;
    }
  }
}
</style>
