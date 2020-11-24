<template>
  <div class="echart-box" ref="user-echart">

  </div>
</template>
<script>
// 引入echarts
import Echarts from 'echarts'
// 引入vuex辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Visitor',
  data() {
    return {
      // 用户所在城市列表
      cityList: ['北京' ,'上海' ,'深圳' ,'杭州' ,'其他'],
      // 统计所有用户所在地址对象
      userList: [],
    }
  },
  computed: {
    ...mapState({
      userCityInfo: state => state.userCityList.userCityInfo
    })
  },
  mounted() {
    // 分发action
    this.$store.dispatch('req_usercityList') 
    let option = {
        title: {
            text: '用户分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['北京' ,'上海' ,'深圳' ,'杭州' ,'其他']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 基于准备好的dom，初始化echarts实例
    this.myChart = Echarts.init(this.$refs['user-echart'])
    this.myChart.setOption(option) 
  },
  watch: {
    userCityInfo(val) {
      this.userList = Object.values(val).map((item ,index)=> {
        return {name: this.cityList[index] ,value: item}
      })
      this.myChart.setOption({
        series: [{
          name: '访问来源',
          data: this.userList
        }]
      })
    }
  },
  beforeDestroy() {
    this.myChart.clear()
    this.myChart.dispose();
  }
}
</script>
<style lang='less' rel='stylesheet/less' scoped>

.echart-box {
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  padding: 30px 100px 100px;
}
</style>
