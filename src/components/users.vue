<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row>
      <el-col>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          clearable
          @clear="getAllData()"
          class="input-with-select select"
        >
          <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>
        <el-button type="success" @click="dialogFormVisibleAdd = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">{{scope.row.create_time | fmtData}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="160">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEdit(scope.row)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDelete(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagestyle"
    ></el-pagination>

    <!-- 对话框添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框编辑 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" disabled v-model="form.username"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>-->
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">{{this.currUsername}}</el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="currRoleId" placeholder="请选择活动区域">
            <el-option disabled label="请选择角色" :value="-1"></el-option>
            <el-option v-for="(v,i) in roles" :key="i" :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      tableData: [],
      total: -1,
      dialogFormVisibleAdd: false,
      formLabelWidth: "80px",
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      currRoleId: -1,
      currUsername: '',
      currUserId: '',
      roles: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 设置角色
    async setRole() {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {rid: this.currRoleId});
      const {status, msg} = res.data.meta;
      if(status === 200) {
        this.$message.success(msg);
        this.dialogFormVisibleRole = false;
      }else {
        this.$message.error(msg);
      }
    },
    // 显示分配角色对话框
    async showRole(users) {
      // 1、查询当前用户名
      this.currUsername = users.username;
      this.currUserId = users.id;
      // 2、查询所有的角色信息
      const res = await this.$http.get("roles");
      const {status, msg} = res.data.meta;
      if(status === 200) {        
        this.roles = res.data.data;
      }
      // 3、根据用户id查询用户角色id
      const res2 = await this.$http.get(`users/${users.id}`);
      const {rid} = res2.data.data;
      this.currRoleId = rid;
      this.dialogFormVisibleRole = true;
    },
    // 改变状态
    async changeState(users) {
      const res = await this.$http.put(
        `users/${users.id}/state/${users.mg_state}`
      );
      const { status, msg } = res.data.meta;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 编辑用户提交
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      const { msg, status } = res.data.meta;
      // console.log(res);
      if (status === 200) {
        this.$message.success(msg);
        this.dialogFormVisibleEdit = false;
        this.getTableData();
      }
    },
    // 编辑用户展示
    async showEdit(users) {
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`users/${users.id}`);
      const {
        meta: { status },
        data
      } = res.data;
      if (status === 200) {
        this.form = data;
      }
      console.log(this.form);
    },
    // 删除用户
    showDelete(users) {
      this.$confirm("是否要删除此用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${users.id}`);
          if (res.data.meta.status === 200) {
            this.pagenum = 1;
            this.getTableData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message.success(res.data.meta.msg);
          }
        })
        .catch(() => {
          this.$message.success("已取消删除");
        });
      // if(!confirm("确定删除？")){
      //   return
      // }
      // const res = await this.$http.delete(`users/${users.id}`);
      // if(res.data.meta.status === 200) {
      //   this.$message.success(res.data.meta.msg);
      //   this.pagenum = 1;
      //   this.getTableData();
      // }
    },
    // 添加新用户
    async addUser() {
      const res = await this.$http.post("users", this.form);
      const {
        data: {
          data,
          meta: { status, msg }
        }
      } = res;
      if (status === 201) {
        this.dialogFormVisibleAdd = false;
        this.getTableData();
      }
      this.$message.success(msg);
    },
    // 搜索全部数据
    getAllData() {
      this.getTableData();
    },
    // 搜索
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    // 分页
    handleSizeChange(val) {
      // 每页显示条数变化从第一页重新展示
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getTableData();
      // console.log(`当前页: ${val}`);
    },
    // 请求表格数据
    async getTableData() {
      // 设置请求头->Authorization=token ->看axiosAPI
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // query	查询参数	可以为空
      // pagenum	当前页码	不能为空
      // pagesize	每页显示条数	不能为空
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const {
        data: { total, users },
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // console.log(users);
        this.tableData = users;
        this.total = total;
        // this.$message.success(msg);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.select {
  margin-top: 15px;
  width: 300px;
}
.pagestyle {
  margin-top: 30px;
}
</style>
