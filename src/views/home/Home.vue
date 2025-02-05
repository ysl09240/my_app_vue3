<template>
  <el-row class="home" :gutter="10">
    <el-col :span="8" style="margin-top:10px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/userimg.png">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登陆时间:
            <span>2022-7-11</span>
          </p>
          <p>
            上次登陆的地点:
            <span>北京</span>
          </p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top:10px" height="450px">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:10px">
      <div class="num">
        <el-card
          :body-style="{display:'flex',padding:0}"
          v-for="item in countData"
          :key="item.name"
        >
          <component class="icons" :is="item.icon" :style="{background:item.color}"/>
          <div class="detail">
            <p class="num">¥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:240px">
        <div ref="echarts" style="height:240px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div ref="userEchart" style="height:240px"></div>
        </el-card>
        <el-card style="height:260px">
          <div ref="videoEchart" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive
} from "vue";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const tableData = ref([]);
    const countData = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      monthBuy: "当月购买",
      totalBuy: "总购买"
    };
    const getTableList = async () => {
      let res = await proxy.$api.getTableData();
      tableData.value = res.tableData;
    };
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      countData.value = res.countData;
    };
    onMounted(() => {
      getTableList();
      getCountData();
      getEchartData();
    });

    //关于echarts表格的渲染

    //折线图和柱状图的配置项
    let xOptions = reactive({
      //图例文字颜色
      textStyle: {
        color: "#333"
      },
      grid: {
        left: "20%"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3"
          }
        },
        axisLabel: {
          interval: 0,
          color: "#333"
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3"
          }
        }
      },
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: []
    });
    // 饼状图的配置项
    let pieOptions = reactive({
      tooltip: {
        trigger: "item"
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1ef"
      ],
      series: []
    });
    let orderData = reactive({
      xData: [],
      series: []
    });
    let userData = reactive({
      xData: [],
      series: []
    });
    let videoData = reactive({
      series: []
    });

    const getEchartData = async () => {
      let res = await proxy.$api.getEchartData();
      console.log(res, "getEchartData");
      let orderRes = res.orderData;
      let userRes = res.userData;
      let videoRes = res.videoData;
      orderData.xData = orderRes.date;
      let keyArray = Object.keys(orderRes.data[0]);
      const orderSeries = [];
      keyArray.forEach(key => {
        orderSeries.push({
          name: key,
          data: orderRes.data.map(item => item[key]),
          type: "line"
        });
      });
      orderData.series = orderSeries;
      xOptions.xAxis.data = orderData.xData;
      xOptions.series = orderData.series;

      let hEcharts = echarts.init(proxy.$refs["echarts"]);
      hEcharts.setOption(xOptions);

      //柱状图的渲染
      userData.xData = userRes.map(item => item.date);
      userData.series = [
        {
          name: "新增用户",
          data: userRes.map(item => item.new),
          type: "bar"
        },
        {
          name: "活动用户",
          data: userRes.map(item => item.active),
          type: "bar"
        }
      ];
      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;

      let uEcharts = echarts.init(proxy.$refs["userEchart"]);
      uEcharts.setOption(xOptions);

      //饼状图渲染
      videoData.series = [
        {
          type:"pie",
          data: videoRes,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ];
      pieOptions.series = videoData.series;
      let vEcharts = echarts.init(proxy.$refs["videoEchart"]);
      vEcharts.setOption(pieOptions);

    };

    return {
      tableData,
      tableLabel,
      countData
    };
  }
});
</script>


<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      height: 80px;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      height: 80px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        margin: 10px 0 0 0;
      }
      .txt {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
      margin-top:20px;
      display: flex;
      justify-content: space-between;
      .el-card {
        width: 48%;
      }
  }
}
</style>
