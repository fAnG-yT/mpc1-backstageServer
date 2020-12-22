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
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse-transition="false"
          :router="true"
        >
          <!-- 这里加个@click 每点击一次重新获取一次好友列表从而达到刷新 -->
          <el-menu-item index="LineChart">
            <i class="iconfont icon-zhexiantu"></i>
            <span slot="title">信息统计</span>
          </el-menu-item>
          <el-menu-item index="UserManage">
            <i class="iconfont icon-yonghuguanli"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
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
  created() {
    // this.apitest();
    // this.applyFriendList();
  },
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
  background-color: rgb(55, 61, 65);
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
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>