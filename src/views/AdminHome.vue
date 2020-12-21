<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/img/logo2.jpg" alt />
        <span>mychat后台</span>
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
          <el-menu-item index="hour">
            <i class="iconfont icon-pengyouquan2"></i>
            <span slot="title">小时活跃人数</span>
          </el-menu-item>
          <el-menu-item index="day">
            <i class="iconfont icon-jiahaoyou1"></i>
            <span slot="title">天活跃人数</span>
          </el-menu-item>
          <el-menu-item index="week" >
            <i class="iconfont icon-yonghu3"></i>
            <span slot="title">周活跃人数</span>
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
import { Script } from "vm";
export default {
  created() {
    // this.apitest();
    // this.applyFriendList();
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/admin");
    },
    async apitest() {
      const { data: res1 } = await this.$http.get(
        "/mychat/backgroup/getHourlyUV"
      );
      console.log("接口一");
      console.log(res1);
      const { data: res2 } = await this.$http.get(
        "/mychat/backgroup/getDailyUV"
      );
      console.log("接口二");
      console.log(res2);
      const { data: res3 } = await this.$http.get(
        "/mychat/backgroup/getWeeklyUV"
      );
      console.log("接口三");
      console.log(res3);
    }
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
    height: 60px;
    width: 75px;
  }

  span {
    color: #fff;
    font-size: 20px;
    margin-left: 15px;
  }
}

.el-aside {
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