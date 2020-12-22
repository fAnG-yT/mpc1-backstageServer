<template>
  <div>
    <el-card> </el-card>
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
  //  初始化获取上周数据
    this.set_date();
  },
  mounted() {
    this.myOneEcharts();
    this.draw();
  },
  methods: {
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
        "/v1/manage/statistics",
        JSON.stringify(first_date, last_date)
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
