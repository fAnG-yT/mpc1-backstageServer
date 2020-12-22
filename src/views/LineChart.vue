<template>
  <div>
    <el-card> </el-card>
    <el-card>
      <div class="container">
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
        <div class="block">
          <el-date-picker
            v-model="value2"
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
      // 指定图表的配置项和数据可以放在data() 里面也可以放在自己定义的函数方法里面
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
          data: [
            "8月1日",
            "8月2日",
            "8月3日",
            "8月4日",
            "8月5日",
            "8月6日",
            "8月7日",
          ], //日期
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
      option2:{
        title: {
          // text: "地区点位、设备核对进度",
          top: 5,
          left: "center",
        },
        legend: {
          data: ["发布数量", "领取数量"],
          top: 30,
        },
        // X轴
        xAxis: {
          data: ["一月", "二月", "三月", "四月", "五月"],
        },
        // Y轴
        yAxis: {},
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
      abscissa: [],
      draw_num: [],
      public_num: [],
      date: [],
      showChart: 0,
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
      value1: "",
      value2: "",
    };
  },
  created() {
    this.get_draw_num();
    this.get_public_num();
  },
  mounted() {
    this.myOneEcharts();
    this.draw();
  },
  methods: {
    myOneEcharts() {
      let that = this;
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart_one"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(that.option1);
    },
    draw() {
      let that = this;
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart_two"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(that.option2);
    },
    get_draw_num() {},
    get_public_num() {},
  },
};
</script>
<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
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
