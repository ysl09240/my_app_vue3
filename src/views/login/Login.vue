<template>
  <el-form
    ref="loginFormRef"
    class="login-container"
    :inline="true"
    :model="loginForm"
    label-width="70px"
  >
    <h3 class="login_title">系统登陆</h3>
    <!-- 使用单项验证 -->
    <el-form-item
      label="用户名"
      prop="username"
      :rules="[
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ]"
    >
      <el-input id="username" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      :rules="[
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]"
    >
      <el-input id="password" v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="margin:10px auto 10px 105px" type="primary" @click="onSubmit">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import Cookie from "js-cookies"
export default {
  setup() {
    const loginForm = reactive({
      username: "admin",
      password: "admin"
    });
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const getMenu = async () => {
      let res = await proxy.$api.getMenu(loginForm);
      console.log(res, "----getMenu");
      if (res) {
        store.commit("setMenu", res.menu);
        Cookie.setItem("token",res.token);
        router.push({
          name: "home"
        });
      }
    };
    const onSubmit = () => {
      proxy.$refs.loginFormRef.validate(valid => {
        if (valid) {
          getMenu();
        } else {
          ElMessage.error("表单验证失败!");
          return false;
        }
      });
    };
    return {
      loginForm,
      onSubmit
    };
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}
</style>



