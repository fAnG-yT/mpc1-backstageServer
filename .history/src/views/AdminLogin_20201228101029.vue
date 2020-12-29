<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/img/logo1.jpg" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFromRef"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="chatNum">
          <el-input
            v-model="username"
            prefix-icon="iconfont icon-yonghu"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="password"
            prefix-icon="iconfont icon-mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">管理员登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { CLIENT_RENEG_LIMIT } from "tls";
export default {
  data() {
    return {
      // 登录表单数据绑定对象
      username: "",
      password: "",
      // 这是表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        chatNum: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度应在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度应在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        userId: "",
      },
    };
  },
  methods: {
    async login() {
        const { data: res } = await this.$axios.post(
          "/v1/manage/login",
          JSON.stringify({
            username: this.username,
            password: this.password,
          })
        );
        console.log(res)
        if (res.code != 200)
          return this.$message.error("用户名或密码错误！");
        this.$message.success("登录成功！");
        console.log(res.data.token);
        // 1.将登录成功后的token，保存到客户端的sessionStorage中
        //      1.1项目中除了登录之外的其他API接口必须在登录只能才能访问
        //      1.2token只应在当前网站打开期间生效,所以讲token保存在sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);
        //通过编程式导航跳转到主页面，路由地址是 /home
        this.$router.push("/adminHome");
      ;
    },
  },
};
</script>
<!-- 支持less scoped控制样式区间,加上scope 该样式只在当前组件生效-->
<style lang="less" scoped>
.login_container {
  background-color: #0088a8;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
