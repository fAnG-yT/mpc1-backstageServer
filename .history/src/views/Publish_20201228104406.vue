<template>
  <div>
    <!-- 统计发布领取 -->
    <el-card>
      <div class="total">发布领取统计情况</div>
      <div
        v-for="item in publishList"
        class="card"
        :style="{ 'background-color': item.background }"
        :key="item.type"
      >
        <div>{{ item.type }}</div>
        <div>{{ item.number }}份</div>
      </div>
    </el-card>
    <!-- 图表 -->
    <el-card>
      <div class="container">
        <!-- 图表 -->
        <div class="chart_container">
          <div class="icon">
            <div @click="showChart = 0" :class="{ actived: showChart == 0 }">
              <i class="iconfont icon-zhexiantu"></i>折线图
            </div>
            <div @click="showChart = 1" :class="{ actived: showChart == 1 }">
              <i class="iconfont icon-zhuzhuangtu"></i>柱状图
            </div>
          </div>
          <div class="chart">
            <!--为echarts准备一个具备大小的容器dom-->
            <div
              id="chart_one"
              style="width: 900px; height: 500px"
              v-show="showChart == 0"
            ></div>
            <div
              id="chart_two"
              style="width: 900px; height: 500px"
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
      publishList: [
        {
          type: "上月发布总数量",
          number: 0,
          background: "#ff9999",
        },
        {
          type: "上月领取总数量",
          number: 0,
          background: "#d98cd9",
        },
        {
          type: "上周发布总数量",
          number: 0,
          background: "#7575f0",
        },
        {
          type: "上周领取总数量",
          number: 0,
          background: "#00b8e6",
        },
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
            data: [],
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "领取数量",
            type: "line",
            data: [],
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
      option2: {
        title: {
        //   text: "某地区蒸发量和降水量",
        //   subtext: "纯属虚构",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["发布数量", "领取数量"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
            //   "1月",
            //   "2月",
            //   "3月",
            //   "4月",
            //   "5月",
            //   "6月",
            //   "7月",
            //   "8月",
            //   "9月",
            //   "10月",
            //   "11月",
            //   "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
            //   2.0,
            //   4.9,
            //   7.0,
            //   23.2,
            //   25.6,
            //   76.7,
            //   135.6,
            //   162.2,
            //   32.6,
            //   20.0,
            //   6.4,
            //   3.3,
            ],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" },
            //   ],
            // },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "降水量",
            type: "bar",
            data: [
            //   2.6,
            //   5.9,
            //   9.0,
            //   26.4,
            //   28.7,
            //   70.7,
            //   175.6,
            //   182.2,
            //   48.7,
            //   18.8,
            //   6.0,
            //   2.3,
            ],
            // markPoint: {
            //   data: [
            //     { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
            //     { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 },
            //   ],
            // },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      },

      // 柱状图数据定义
    //   option2: {
    //     title: {
    //       // text: "地区点位、设备核对进度",
    //       top: 5,
    //       left: "center",
    //     },
    //     legend: {
    //       data: ["发布数量", "领取数量"],
    //       // top: 30,
    //     },
    //     grid: {
    //       //自定义折线图的大小
    //       // x: "1%",//x 偏移量
    //       y: "17%", // y 偏移量
    //       width: "76%", // 宽度
    //       height: "74%", // 高度
    //     },
    //     // X轴
    //     xAxis: {
    //       data: [],
    //     },
    //     // Y轴
    //     yAxis: {
    //       type: "value",
    //       axisLabel: {
    //         formatter: "{value} ",
    //       },
    //     },
    //     // 数据
    //     series: [
    //       {
    //         name: "发布数量",
    //         type: "bar",
    //         data: [],
    //       },
    //       {
    //         name: "领取数量",
    //         type: "bar",
    //         data: [],
    //       },
    //     ],
    //   },
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

      // 发起请求的开始时间
      first_date: "",
      // 发起请求的结束时间
      last_date: "",
      // 绑定element时间选择器，再调用watch修改first_date与last_date
      date: "",
    };
  },
  created() {
    //获取发布领取的总数量
    this.getTotal();
    //初始化最近一周的数据
    this.last_date = new Date();
    this.start_date = this.last_date.getTime() - 3600 * 1000 * 24 * 7;
    this.date = [this.start_date, this.last_date];
    // start.setTime();
    //初始化获取上周数据
    // this.set_date();
  },
  mounted() {
    this.myOneEcharts();
    this.draw();
  },
  methods: {
    getTotal() {
      this.$axios
        .post("/v1/manage/statistics/sum")
        .then((res) => {
          if (res.data.code == 200) {
            this.publishList[0].number = res.data.data.pub_month_sum;
            this.publishList[1].number = res.data.data.rec_month_sum;
            this.publishList[2].number = res.data.data.pub_week_sum;
            this.publishList[3].number = res.data.data.rec_week_sum;
          } else {
            this.$message.error("登录失效,请重新登录");
            this.$router.replace("/adminLogin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //在 moethods 里面创建一个方法在 mounted 里面调用
    // set_date() {
    // const end = new Date();
    // const start = new Date();
    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    // console.log(this.dateFormat(start));
    // console.log(this.dateFormat(end));
    // this.get_num(this.dateFormat(start),this.dateFormat(end));
    // },

    // 获取数据并修改折线图、柱状图信息
    async get_num(first_date, last_date) {
      console.log(
        JSON.stringify({ data_from: first_date, data_to: last_date })
      );
      const { data: res } = await this.$axios.post(
        "/v1/manage/statistics/list",
        JSON.stringify({ data_from: first_date, data_to: last_date })
      );
      if (res.code == 200) {
        this.option1.xAxis.data = res.data.date_list;
        this.option2.xAxis.data = res.data.date_list;
        this.option1.series[0].data = res.data.publish_list;
        this.option2.series[0].data = res.data.publish_list;
        this.option1.series[1].data = res.data.receive_list;
        this.option2.series[1].data = res.data.receive_list;
        this.myOneEcharts();
        this.draw();
      } else {
        this.$message.error("登录失效,请重新登录");
        this.$router.replace("/adminLogin");
      }
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
  },
  watch: {
    // 动态监听element时间选择器的时间发起请求，更新图表
    date(value) {
      this.first_date = this.dateFormat(value[0]);
      this.last_date = this.dateFormat(value[1]);
      console.log(this.first_date);
      console.log(this.last_date);
      this.get_num(this.first_date, this.last_date);
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  margin-left: 15px;
  margin-bottom: 5px;
}
.total::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 20px;
  border-radius: 8px;
  background-color: #f77e5e;
  margin-right: 10px;
  vertical-align: middle;
}

.card {
  display: inline-block;
  width: 150px;
  height: 80px;
  box-shadow: 2px 2px 6px 0px#ddd;
  margin: 5px 20px;
  color: #fff;
  border-radius: 8px;

  div:first-child {
    padding-left: 15px;
    padding-top: 15px;
    font-size: 13px;
    font-weight: 500;
  }

  div:last-child {
    padding-left: 15px;
    padding-top: 10px;
    font-size: 10px;
  }
}

.container {
  display: flex;
  justify-content: center;
  // height: 600px;
  // margin-top: 20px;
  padding: 50px;
  .chart_container {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    .icon {
      div {
        color: rgb(121, 118, 118);
        margin: 20px 0;
      }

      .iconfont {
        font-size: 50px;
        width: 50px;
        height: 50px;
      }

      .actived {
        color: rgb(52, 69, 219);
      }
    }
    .chart {
      margin-left: 10%;
    }
  }
}
</style>