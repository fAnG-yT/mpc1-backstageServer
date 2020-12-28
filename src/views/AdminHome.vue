<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/img/logo.png" alt />
        <span>T饭友后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside >
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse-transition="false"
          :router="true"
          default-active="LineChart"
        >
        <el-submenu index='1'>
          <template slot="title">
            <i class="iconfont icon-tongji"></i>
            <span>信息统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="LineChart">
              <i class="iconfont icon-zhexiantu"></i>
              <span slot="title">领取发布</span>
            </el-menu-item>
            <el-menu-item index="DAU">
              <i class="iconfont icon-huoyuedu"></i>
              <span slot="title">活跃用户</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边主体区 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/adminLogin");
    },
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #38A28A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  > div {
    display: flex;
    align-items: center;
  }
  img {
    height: 30px;
    width: 30px;
    margin-left: 10px;
  }

  span {
    color: #fff;
    font-size: 17px;
    margin-left: 15px;
  }
}

.el-aside {
  width: 200px!important;
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-button {
  background-color: #fff;
  color: #38A28A;
  border: none;
}

.el-main {
  background-color: #eaedf1;
}

.leftContainer {
  background-color: #333744;
}

.msgNum {
  // margin-top: 10px;
  // margin-right: 40px;
  position: absolute;
  left: 200px;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #38A28A;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>