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
      <div class="container">
        <!-- 图表 -->
        <div class="chart_container">
          <div class="icon">
            <div class="iconfont icon-zhexiantu" @click="showChart = 0"></div>
            <div class="iconfont icon-zhuzhuangtu" @click="showChart = 1"></div>
          </div>
          <div class="chart">
            <!--为echarts准备一个具备大小的容器dom-->
            <div
              id="chart_one"
              style="width: 600px; height: 400px"
              v-show="showChart == 0"
            ></div>
            <div
              id="chart_two"
              style="width: 600px; height: 400px"
              v-show="showChart == 1"
            ></div>
          </div>
        </div>
        <!-- 时间选择器 -->
        <div class="block">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
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

      // 指定图表的配置项和数据可以放在data() 里面也可以放在自己定义的函数方法里面
      // 折线图数据定义
      option1: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["发布数量", "领取数量"],
        },
        grid: {
          //自定义折线图的大小
          // x: "1%",//x 偏移量
          y: "17%", // y 偏移量
          width: "76%", // 宽度
          height: "74%", // 高度
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [], //日期
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} ",
          },
        },
        series: [
          {
            name: "发布数量",
            type: "line",
            data: [90, 88, 100, 99, 96, 110, 100],
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "领取数量",
            type: "line",
            data: [55, 50, 78, 77, 90, 88, 79],
            markLine: {
              //警示线 可以自己更改样式 位置 等
              data: [
                { type: "average", name: "平均值" },
                [
                  {
                    symbol: "none",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "最大值",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
              ],
            },
          },
        ],
      },
      // 柱状图数据定义
      option2: {
        title: {
          // text: "地区点位、设备核对进度",
          top: 5,
          left: "center",
        },
        legend: {
          data: ["发布数量", "领取数量"],
          // top: 30,
        },
        grid: {
          //自定义折线图的大小
          // x: "1%",//x 偏移量
          y: "17%", // y 偏移量
          width: "76%", // 宽度
          height: "74%", // 高度
        },
        // X轴
        xAxis: {
          data: [],
        },
        // Y轴
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} ",
          },
        },
        // 数据
        series: [
          {
            name: "发布数量",
            type: "bar",
            data: [120, 100, 440, 320, 150],
          },
          {
            name: "领取数量",
            type: "bar",
            data: [200, 120, 240, 330, 170],
          },
        ],
      },
      // 显示哪种图表
      showChart: 0,
      // element代码
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // 绑定element时间选择器，再调用watch修改first_date与last_date
      date: "",
      // 发起请求的开始时间
      first_date: "",
      // 发起请求的结束时间
      last_date: "",
    };
  },
  created() {
    this.getTotal()
  //  初始化获取上周数据
    this.set_date();
  },
  mounted() {
    this.myOneEcharts();
    this.draw();
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


    //在 moethods 里面创建一个方法在 mounted 里面调用
    set_date() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      console.log(this.dateFormat(start));
      console.log(this.dateFormat(end));
       this.get_num(start,end);
    },
    // 初始化折线图
    myOneEcharts() {
      let that = this;
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart_one"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(that.option1);
    },
    // 初始化柱状图
    draw() {
      let that = this;
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart_two"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(that.option2);
    },
    // 获取数据并修改折线图、柱状图信息
    async get_num(first_date, last_date) {
      const { data: res } = await this.$axios.post(
        "/v1/manage/statistics/list",
        JSON.stringify({data_from:first_date, data_to:last_date})
      );
      console.log(res);
      this.option1.xAxis.data = res.date_list;
      this.option2.xAxis.data = res.date_list;
      this.option1.series[0].data = res.publish_list;
      this.option2.series[0].data = res.publish_list;
      this.option1.series[1].data = res.receive_list;
      this.option2.series[1].data = res.receive_list;
    },
    // 格式化时间
    dateFormat(dateData) {
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
  },
  watch: {
    // 动态监听element时间选择器的时间发起请求，更新图表
    date(value) {
      this.first_date = this.dateFormat(value[0]);
      this.last_date = this.dateFormat(value[1]);
      console.log(this.first_date);
      console.log(this.last_date);
      this.get_num(this.first_date,this.last_date);
    },
  },
};
</script>
<style scoped lang="less">
.box{
  display: flex;
  
}

.totalBox{
  flex: 1 1 auto;
}
// .box::after{
//   content: "";
//   display: table;
//   clear: both;
// }

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

.el-card{
  margin-bottom:10px ;
  // max-width: ;
}

.container {
  display: flex;
  justify-content: space-around;
  height: 520px;
  .chart_container {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    .icon {
      .iconfont {
        font-size: 50px;
        width: 50px;
        height: 50px;
        margin: 20px 0;
      }
    }
    .chart {
      margin-left: 10%;
    }
  }
}
</style>
