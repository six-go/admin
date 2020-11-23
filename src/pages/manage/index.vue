<template>
  <div class="Ma-outer">
    <div class="Ma-header">
      <p class="Ma-title">数据统计</p>
      <a-row type="flex" justify="space-around" class="Ma-titleBox">
        <a-col :span="4">
          <div class="Ma-titleContent" id="firstbox1">当日数据:</div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
             {{dataAll.weekApi[6]}}<span class="Ma-title2">新API请求量</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
            {{dataAll.weekUser[6]}} <span class="Ma-title2">新注册用户</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
            {{dataAll.weekIndent[6]}} <span class="Ma-title2">新增订单</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
            {{dataAll.weekAdmin[6]}} <span class="Ma-title2">新增管理员</span>
          </div>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-around" class="Ma-titleBox">
        <a-col :span="4">
          <div class="Ma-titleContent" id="firstbox2">全部数据:</div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
            {{ dataAll.allApi }} <span class="Ma-title2">API请求量</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
            {{dataAll.allUser}} <span class="Ma-title2">注册用户</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
            {{dataAll.allIndent}} <span class="Ma-title2">全部订单</span>
          </div>
        </a-col>
        <a-col :span="4">
          <div class="Ma-titleContent">
            {{dataAll.allAdmin}} <span class="Ma-title2">全部管理员</span>
          </div>
        </a-col>
      </a-row>
    </div>
    <div id="Ma-main" class="Ma-main"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import "./manage.less";
import { getAllApi, getNowApi,getAllUser,getNowUser,getAllIndent,getNowIndent,getAllAdmin,getNowAdmin } from "../../api";
export default {
  name: "Manage",
  data() {
    return {
      date: '', //当前日期
      dataAll: {
        allApi: null, //全部api
        weekApi: [], //7日api  最后一个为当天
        allUser: null, //全部用户
        weekUser: [], //7日用户
        allIndent: null, //全部订单
        weekIndent: [], //7日订单
        allAdmin: null, //全部管理员
        weekAdmin: [], //7日管理
      },
    };
  },
  async mounted() {
    //初始化数据
    // 全部类型数据请求
    const result1 =  getAllApi();
    
    const result2 = getAllUser()

    const result3 = getAllIndent()

    const result4 = getAllAdmin()

    Promise.all([result1,result2,result3,result4]).then((arr)=>{
        this.dataAll.allApi = arr[0].count
        this.dataAll.allUser = arr[1].count
        this.dataAll.allIndent = arr[2].count
        this.dataAll.allAdmin = arr[3].count

    })

    //获取当日请求api数量
    for(var i=0;i<7;i++){
        //获取7天时间
        this.getDate(i);
        //api
        getNowApi(this.date).then((value)=>{
            this.dataAll.weekApi.unshift(value.count)
        })
        
        //user
        getNowUser(this.date).then((value)=>{
            this.dataAll.weekUser.unshift(value.count)
        })
        
        //indent
        getNowIndent(this.date).then((value)=>{
            this.dataAll.weekIndent.unshift(value.count)
        })
        
        //admin
        getNowAdmin(this.date).then((value)=>{
            this.dataAll.weekAdmin.unshift(value.count)
        })
        

    }









    

        // const result5 = getNowApi()

        // const result6 = getNowUser()

        // const result7 = getNowIndent()

        // const result8 = getNowAdmin()

        // Promise.all([result5,result6,result7,result8]).then((value)=>{

        // })

  },
  methods: {
    //获取初始化日期
    getDate(i) {
      const now = new Date();
      const year = now.getFullYear();
      const month = (function () {
        let month = now.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        return month;
      })();
      const day = (function () {
        let day = now.getDate()-i;
        if (day < 10) {
          day = "0" + day;
        }
        return day;
      })();
      this.date = year + "-" + month + "-" + day;
      
    },
  },
  watch: {
      dataAll:{
        handler:function(val,oldval){
        var myChart = echarts.init(document.getElementById("Ma-main"));
        // 指定图表的配置项和数据
        var option = {
        title: {
            text: "走势图",
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: ["新API请求量", "新注册用户", "新增订单", "新增管理员"],
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        toolbox: {
            feature: {
            saveAsImage: {},
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
            name: "API请求量",
            type: "line",
            stack: "总量",
            data: [...this.dataAll.weekApi],
            },
            {
            name: "新注册用户",
            type: "line",
            stack: "总量",
            data: [...this.dataAll.weekUser],
            },
            {
            name: "新增订单",
            type: "line",
            stack: "总量",
            data: [...this.dataAll.weekIndent],
            },
            {
            name: "新增管理员",
            type: "line",
            stack: "总量",
            data: [...this.dataAll.weekAdmin],
            },
        ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);  
            },
            deep:true
        }
    },
};
</script>
<style lang="less">
</style>