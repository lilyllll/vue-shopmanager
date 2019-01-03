<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <img src="@/assets/logo.png" alt>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light middle">
              <h2>电商后台管理系统</h2>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple loginout">
              <a href="#" @click.prevent="handleLoginout">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 侧边栏 -->
      <el-container>
        <el-aside width="400px">
          <el-col :span="12">
            <el-menu
              :unique-opened="true"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  用户列表
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  角色列表
                </el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  权限列表
                </el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  商品列表
                </el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  分类参数
                </el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  商品分类
                </el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  订单列表
                </el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  数据报表
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // VM实例化前执行
  beforeCreate() {
    if(!localStorage.getItem("token")) {
      this.$router.push({
        name: 'login'
      })
      this.$message.warning("请登陆");
    }
  },
  methods: {
    //退出
    handleLoginout() {
      // 清除token
      localStorage.clear();
      this.$router.push({
        name: 'login'
      })
      this.$message.success("退出成功");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.header {
  background-color: rgb(187, 198, 223);
}
.middle {
  line-height: 1;
  text-align: center;
  color: #fff;
}
.loginout {
  margin-top: 20px;
}
.loginout a {
  color: #000;
}
</style>
