<template>
  <div>
    <!-- alert -->
    <el-alert title="消息提示的文案" type="info"></el-alert>

    <el-steps :space="200" :active="+active" finish-status="success">
      <el-step title="用户管理"></el-step>
      <el-step title="配置管理"></el-step>
      <el-step title="角色管理"></el-step>
      <el-step title="定时任务补偿"></el-step>
    </el-steps>

    <!-- tab栏 -->
    <el-tabs v-model="active" tab-position="left">
      <el-tab-pane name="1" label="用户管理">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position="top"
          label-width="80px"
        >
          <el-form-item label="商品名称" prop='name'>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop='price'>
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop='weight'>
            <el-input v-model="ruleForm.weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop='num'>
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="2" label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane name="3" label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane name="4" label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "goodsAdd",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        weight: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        num: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
      },
      ruleForm: {
        name: "",
        price: "",
        weight:'',
        num: "",

      },
      active: '1',
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
