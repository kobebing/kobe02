<template>
  <div>
    <!-- 面包屑导航 -->
    <bread name1="权限管理" name2="角色列表"></bread>
    <!-- 添加按钮 -->
    <el-button type="success" plain @click="addRolesVisible = true">添加角色</el-button>

    <!-- table下拉列表 角色列表 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 下拉 tag标签 -->
          <el-row v-for="item in scope.row.children">
            <el-col :span="6">
              <el-tag :key="item.id" closable type class="my-tag">{{item.authName}}</el-tag>
            </el-col>
            <el-col :span="18">
              <el-row v-for="it in item.children">
                <el-col :span="6">
                  <el-tag :key="it.id" closable type="success" class="my-tag">{{it.authName}}</el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    :key="level03.id"
                    closable
                    type="warning"
                    v-for="level03 in it.children"
                    class="my-tag"
                    @close="handleClose(level03,scope.row)"
                  >{{level03.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="eR(scope.row)"></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
            @click="del(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            plain
            @click="goTree(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <!-- tree -->
      <el-tree
        :data="data"
        ref="tree"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checklist"
        :props="defaultProps"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editRolesVisible">
      <el-form
        :model="roleForm"
        status-icon
        ref="roleForm"
        label-width="100px"
        class="demo-roleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="roleName" v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="roleDesc" v-model="roleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="editrl">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addRolesVisible">
      <el-form
        :model="roleForm"
        status-icon
        ref="roleForm"
        label-width="100px"
        class="demo-roleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="roleName" v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="roleDesc" v-model="roleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="addrl">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bread from "../components/bread";
import {
  getRoles,
  getRightsTree,
  giveRights,
  delRoles,
  addRoles,
  editRoles,
  delRolePower
} from "../api/http";
export default {
  components: {
    bread
  },
  name: "roles",
  data() {
    return {
      roleForm: {
        roleName: "",
        roleDesc: ""
      },
      checklist: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      dialogFormVisible: false,
      editRolesVisible: false,
      addRolesVisible:false,
      tableData: [],
      roleId: 0
    };
  },
  methods: {
    handleClose(tag,row){
      console.log(333);
      this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delRolePower({roleId:row.id,rightId:tag.id}).then(backData=>{
              console.log(backData)
              row.children = backData.data.data
              this.$message({
                type:'success',
                message:'删除成功'
              })
            })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消'
          })
        })
      
    },
    getData() {
      getRoles().then(backData => {
        console.log(backData);
        this.tableData = backData.data.data;
      });
    },

    eR(row) {
      this.roleForm = row;
      this.editRolesVisible = true;
    },
    //编辑角色
    editrl() {
      editRoles(this.roleForm).then(backData => {
        console.log(backData);
        this.editRolesVisible = false;
        this.getData();
      });
    },

    //添加角色
    addrl(){
      addRoles(this.roleForm).then(backData=>{
        console.log(backData);
        this.addRolesVisible = false
        this.getData()
      })
    },

    //删除角色
    del(rid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          delRoles({ id: rid }).then(backData => {
            console.log(backData);
            if (backData.data.meta.status == "200") {
              this.getData();
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
        });
    },

    submitForm() {
      //id列表
      const rids = [
        ...this.$refs.tree.getHalfCheckedKeys(),
        ...this.$refs.tree.getCheckedKeys()
      ].join(",");

      giveRights({ roleId: this.roleId, rids }).then(backData => {
        console.log(backData);
        this.getData();
        this.dialogFormVisible = false;
      });
    },
    goTree(row) {
      getRightsTree().then(backData => {
        console.log('树形');
        console.log(row);
        console.log(backData);
        if (backData.data.meta.status == 200) {
          console.log(11111);

          this.data = backData.data.data;
          this.checklist = [];

          const getCheckedKeys = row => {
            if (row.children == undefined) {
              this.checklist.push(row.id);
              console.log(2222222);
            } else {
              for (let i = 0; i < row.children.length; i++) {
                getCheckedKeys(row.children[i]);
              }
            }
          };

          getCheckedKeys(row);
          this.dialogFormVisible = true;
          console.log(this.checklist);
        }
      });

      this.roleId = row.id;
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style>
.my-tag {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
