<template>
  <div>
    <mybread name1="订单管理" name2="订单列表"></mybread>

    <el-dialog title="收获地址" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-cascader v-model="value" :options="cityData" :props="{ expandTrigger: 'hover' }"></el-cascader>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeCity()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="orderList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款"></el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain @click="goAddressChange(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import cityData from "../assets/city_data_2017";
import mybread from "../components/bread";
import { goodsOrder } from "../api/http";
export default {
  name: "orders",
  components: {
    mybread
  },
  data() {
    return {
      value: [],

      cityData:cityData,
      pagenum: 1,
      pagesize: 10,
      orderList: [],
      dialogVisible: false
    };
  },
  created() {
    goodsOrder({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
      backData => {
        console.log(backData);
        this.orderList = backData.data.data.goods;
      }
    );
  },
  methods:{
      changeCity(){
          this.dialogVisible = false;
          this.value = [];

      },
      goAddressChange(row){
          this.dialogVisible = true;
          this.value.push(row.consignee_addr);
      }
  }
};
</script>

<style>
</style>