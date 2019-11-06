<template>
  <div>
    <!-- 输入框 提交按钮 -->
    <el-input v-model="sendData.query" placeholder="请输入内容" class="input-with-select my-input">
      <el-button slot="append" icon="el-icon-search" ></el-button>
    </el-input>

    <el-button type="success" @click="goIndex" plain>添加用户</el-button>

    <el-button type="success" @click="goTable" plain>用户填表</el-button>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="380" class="goodsName"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="180"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column prop="email" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain ></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" plain ></el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { goodsList } from "../../../api/http";
export default {
  name: "goodsIndex",
  data() {
    return {
      tableData: [],
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      dialogFormVisible: false
    };
  },
  methods:{
      goIndex(){
          this.$router.push(`/index/goods/goodsAdd`)
      },
      goTable(){
        this.$router.push(`/index/goods/userTable`)
      }
  },
  created() {
    goodsList(this.sendData).then(backData => {
      console.log(backData);
      this.tableData = backData.data.data.goods;
    });
  }
};
</script>

<style>
.my-input {
  width: 270px;
  margin: 2px 5px 2px 0;
}
</style>
