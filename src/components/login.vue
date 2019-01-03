<template>
  <div class="wrap">
    <el-form class="form" label-position="top" label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="btn" type="primary" @click.prevent="handleLogin()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post("login", this.formdata);

      console.log(res);

      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;

      if (status === 200) {
        localStorage.setItem("token", data.token);
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.wrap {
  height: 100%;
  background-color: rgb(56, 85, 112);
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: translate(-50%, -50%); */
}
.wrap .form {
  background-color: #ffffff;
  width: 400px;
  border-radius: 4px;
  padding: 10px 30px;
  /* height: 300px; */
}
.wrap .form .btn {
  width: 100%;
}
</style>
