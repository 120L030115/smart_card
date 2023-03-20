<template>
    <div id="app">
        <Select v-model="personal_id" style="width:200px" filterable @on-change="selectPersonal">
            <Option v-for="(item, index) in personal_data" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
        <!--为echarts准备一个具备大小的容器dom-->
        <div id="main" style="height: 400px"></div>
    </div>
</template>
<script>
import {personalTotal} from '@api/personal_data';
import {personal_infoGet} from '@api/personal_info';
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      role_id:'',
      personal_id:'',
      personal_data: [],
      charts: "",
      opinionData0: [],//折线上每个点的数据
      opinionData1: [],
      opinionData2: [],
      opinionData3: [],
      opinionDataX: []
    };
  },
  mounted () {
    this.role_id=parseInt(sessionStorage.getItem('role_id'));
    this.company_id=parseInt(sessionStorage.getItem('company_id'));
    this.getPersonalData();
  },
  methods: {
    async getPersonalData(){
      let res=await personal_infoGet();
      if (res.errno === 0) {
        this.personal_data=res.data;
        this.personal_id=this.personal_data[0].id;
        this.getData()
      }else{
        this.$Message['error']({
              content: res.errmsg,
              duration: 3
          });
      }
    },
    selectPersonal(e){
      this.personal_id=e;
      this.getData()
    },
    async getData(){
      this.loading = true;
      let params ={
        personal_id : this.personal_id
      }
      let res = await personalTotal(params);
      if (res.errno === 0) {
          this.opinionData0=res.data.year_month_liked;
          this.opinionData1=res.data.year_month_saved;
          this.opinionData2=res.data.year_month_communicated;
          this.opinionData3=res.data.year_month_forwarded;
          this.opinionDataX=res.data.year_month_x;
          this.drawLine();
      } else {
          this.$Message['error']({
              content: res.errmsg,
              duration: 3
          });
      };
      this.loading = false;
    },

    drawLine() {
      let charts = echarts.init(document.getElementById('main'));
      charts.setOption({
        title: {
          text: '近半年名片数据'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['被点赞数', '被保存数','沟通人数','被转发数']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.opinionDataX
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '被点赞数',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: this.opinionData0
          },
          {
            name: '被保存数',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: this.opinionData1
          },
          {
            name: '沟通人数',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: this.opinionData2
          },
          {
            name: '被转发数',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: this.opinionData3
          }
        ]
      });
    },
  }
};
</script>
<style scoped>
</style>