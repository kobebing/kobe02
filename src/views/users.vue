<template>
  <div>
    <!-- 面包屑导航 -->
    <bread name1="用户管理" name2="用户列表"></bread>
    <!-- 输入框 提交按钮 -->
    <el-input v-model="sendData.query" placeholder="请输入内容" class="input-with-select my-input">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>

    <div class="cs" v-has="'a'">hahahahah</div>

    <!-- <div class="cs333">wairirrrrrrrr</div> -->

    <div>
      <el-button type="success" @click="dialogFormVisible = true" plain>添加用户</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="create_time" label="日期" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="email" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click.native="changeStatu(scope.row)"
            value="value1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain
            @click="goEdit(scope.row)"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            plain
            @click="goAssignment(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页导航 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- Dialog 对话框 --添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model.number="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="mobile" v-model.number="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Dialog 对话框 --进入编辑状态  -->
    <el-dialog title="添加用户" :visible.sync="dialogEdit">
      <el-form
        :model="editForm"
        status-icon
        ref="editForm"
        label-width="100px"
        class="demo-editForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="username" disabled v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="editForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input type="mobile" v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editForm1('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Dialog 对话框 --分配角色 -->
    <el-dialog title="添加用户" :visible.sync="assignmentUser">
      <el-form
        :model="assignmentForm"
        status-icon
        ref="assignmentForm"
        label-width="100px"
        class="demo-assignmentForm"
      >
        <el-form-item label="用户名" prop="username">
          <span>{{assignmentForm.username}}</span>
        </el-form-item>

        <el-select v-model="assignmentForm.role_name" placeholder="请选择">
          <el-option
            v-for="item in rolelist"
            :key="item.roleName"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="assignmentUser = false">取 消</el-button>
        <el-button type="primary" @click="assignment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  addUser,
  changeStatus,
  editUser,
  getRoles,
  assignmentRoles,
  delUser
} from "../api/http";
import bread from "../components/bread";

export default {
  components: {
    bread
  },
  name: "users",
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    if (from.name != "roles") {
      //to:自身
      to.meta.keepAlive = true;
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    //from:自身
    if (to.name == "roles") {
      from.meta.keepAlive = false;
    } else {
      to.meta.keepAlive = true;
    }
    next();
  },

  activated(){

  },

  data() {
    return {
      value1: true,
      total: 0,
      query: "",
      currentPage4: 4,
      input3: "",
      tableData: [],
      rolelist: [],
      dialogEdit: false,
      dialogFormVisible: false,
      assignmentUser: false,
      formLabelWidth: "120px",

      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      rules: {
        username: [
          { required: true, message: "用户名不能为空哦", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空哦", trigger: "blur" },
          { min: 6, max: 24, message: "长度在 6 到 24 个字符", trigger: "blur" }
        ]
      },
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      editForm: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      assignmentForm: {
        username: "",
        role_name: ""
      }
    };
  },
  methods: {
    search() {
      users(this.sendData).then(backData => {
        console.log(backData);
        this.tableData = backData.data.data.users;
        this.total = backData.data.data.total;
      });
    },

    //删除用户
    del(did) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          delUser({ id: did }).then(backData => {
            console.log(backData);
            if (backData.data.meta.status == "200") {
              this.search();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });//
    },

    // 获取角色列表
    roles() {
      getRoles().then(backData => {
        this.rolelist = backData.data.data;
        // console.log(backData);
      });
    },

    goAssignment(row) {
      this.assignmentForm = row;
      this.assignmentUser = true;
    },
    goEdit(row) {
      this.editForm.id = row.id;
      this.editForm.username = row.username;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
      this.dialogEdit = true;
    },
    handleCurrentChange(currentPage) {
      this.sendData.pagenum = currentPage;
      this.search();
    },
    handleSizeChange(size) {
      console.log(size);
      this.sendData.pagesize = size;
      this.search();
    },
    changeStatu(row) {
      // console.log(row)
      changeStatus({ uId: row.id, type: row.mg_state }).then(backData => {
        console.log(backData);
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 对
          addUser(this.ruleForm).then(backData => {
            console.log(backData);
            // 添加成功判断
            if (backData.data.meta.status == 201) {
              // 关闭弹框
              this.dialogFormVisible = false;
              // 重新获取数据
              this.search();
              this.ruleForm = {
                username: "",
                password: "",
                email: "",
                mobile: ""
              };
            } else if (backData.data.meta.status == 400) {
              this.$message.warning(backData.data.meta.msg);
            }
          });
        } else {
          // 错
          // this.$message.waring("数据不太对哦，小老弟！！");
          console.log("error");

          return false;
        }
      });
    },

    editForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调用接口
          editUser(this.editForm).then(backData => {
            console.log(backData);
            this.search();
            this.dialogEdit = false;
          });
        } else {
          console.log("hahahahah");

          return false;
        }
      });
    },

    assignment() {
      if (typeof this.assignmentForm.role_name == "string") {
      } else {
        assignmentRoles({
          id: this.assignmentForm.id,
          rid: this.assignmentForm.role_name
        }).then(backData => {
          console.log(backData);
          this.assignmentUser = false;
          this.search;
        });
      }
    }
  },
  created() {
    this.search();

    this.roles();
  }
};
</script>

<style lang='less' scoped>
.my-input {
  width: 270px;
  margin: 2px 5px 2px 0;
}
</style>
