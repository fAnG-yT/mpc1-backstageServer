<template>
  <div>
    <div class="box"> 
    <!-- 统计发布领取 -->
    <el-card class="totalBox" style="margin-right:10px">
      <div class="total">发布领取统计情况</div>
      <div v-for="item in publishList" 
      class="card"
      :style="{'background-color':item.background}"
      :key="item.type"
      >
        <div>{{item.type}}</div>
        <div>{{item.number}}份</div>
      </div>
    </el-card>
    <!-- 统计活跃人数 -->
    <el-card class="totalBox">
      <div class="total">活跃用户统计情况</div>
      <div v-for="item in dauList"
      class="card"
      :style="{'background-color':item.background}"
      :key="item.type"
      >
        <div>{{item.type}}</div>
        <div>{{item.number}}人</div>
      </div>
    </el-card>
    </div>
    <!-- 图表 -->
    <el-card>
      <router-view/>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //发布领取统计
      publishList:[
        {
          type:'上月发布总数量',
          number:0,
          background:'#ff9999'
        },{
          type:'上月领取总数量',
          number:0,
          background:'#d98cd9'
        },{
          type:'上周发布总数量',
          number:0,
          background:'#7575f0'
        },{
          type:'上周领取总数量',
          number:0,
          background:'#00b8e6'
        }
      ],
      //活跃用户统计
      dauList:[
        {
          type:'时活跃用户',
          number:0,
          background:'#7575f0'
        },{
          type:'日活跃用户',
          number:0,
          background:'#ff9999'
        },{
          type:'周活跃用户',
          number:0,
          background:'#d98cd9'
        }
      ],
    }
  },
  created() {
    this.getTotal()
  
  },

  methods: {
    getTotal(){
        this.$axios.post(
          '/v1/manage/statistics/sum'
          ).then(res => {
            console.log(res)
            
            this.publishList[0].number = res.data.data.pub_month_sum
            this.publishList[1].number = res.data.data.rec_month_sum
            this.publishList[2].number = res.data.data.pub_week_sum
            this.publishList[3].number = res.data.data.rec_week_sum
            this.dauList[0].number = res.data.data.one_hour_num
            this.dauList[1].number = res.data.data.one_day_num
            this.dauList[2].number = res.data.data.one_week_num
        }).catch(err => {
            console.log(err)
        })

  },

  }
};
</script>
<style scoped lang="less">
.box{
  display: flex;
  margin-bottom:10px;
}

.totalBox{
  flex: 1 1 auto;
}

.total{
  margin-left: 15px;
  margin-bottom: 5px;
}
.total::before{
  content: "";
  display: inline-block;
  width: 5px;
  height: 20px;
  border-radius: 8px;
  background-color: #f77e5e;
  margin-right: 10px;
  vertical-align: middle;
}

.card{
  display: inline-block;
  width: 150px;
  height: 80px;
  box-shadow: 2px 2px 6px 0px#ddd;
  margin: 5px 20px;
  color: #fff;
  border-radius: 8px;

  div:first-child{
    padding-left: 15px;
    padding-top:15px ;
    font-size: 13px;
    font-weight: 500;
  }

  div:last-child{
    padding-left: 15px;
    padding-top: 10px ;
    font-size: 10px;
  }
}

</style>
