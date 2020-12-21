<template>
  <div>
    <el-table :data="GroupList" style="width: 541px" border stripe>
      <el-table-column prop="id" label="群组ID" width="180"></el-table-column>
      <el-table-column prop="name" label="群名称" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="quitGroup(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前登录用户的ID
      uid: "",
      // 好友消息
      GroupList: [],
      // 所有信息 再从里面判断类型提取出好友申请消息
      totalList: [],
      // 拒绝好友申请，存储用户ID和申请人ID
      deleteForm: {
        userId: null,
        friendId: null
      },
      group:{
        id:1,
        name:'',
        memNum:'',
        memOnlineNum:'',
        notice:'',
        qrcode:''
      },
      url:''
    };
  },
  created() {
    this.getGroupList();
  },
  methods: {
    async getGroupList() {
      //   console.log("获取了群组列表");
      this.uid = this.$store.state.uid;
      this.uname = this.$store.state.uname;
      const { data: res } = await this.$http.get("/mychat/group/getGroups", {
        params: { userId: this.uid }
      });
      this.GroupList = res.data;
      console.log(this.GroupList);
    },
    async quitGroup(item) {
      console.log(item);
      this.uid = this.$store.state.uid;
      this.group.id = item.id;
      this.url = "/mychat/group/removeGroupMem/" + this.uid;
      console.log(JSON.stringify(this.group));
      const { data: del } = await this.$http.post(
        this.url,
        JSON.stringify(this.group)
      );
      console.log(del);
      this.getGroupList();
    }
  }
};
</script>

<style lang="less" scoped>
</style>