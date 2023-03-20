<template>
    <div style="position:relative;width:100%" :style="{'height':height}">
      <el-amap :zoom="zoom" :center="center" mapStyle="amap://styles/macaron">
        <el-amap-marker v-for="(marker, index) in companyData" :key="index" :position="marker.position" :events="marker.events" :extData="marker">
        </el-amap-marker>
      </el-amap>
      <div style="position: absolute;top:20px;left:20px;">
        <div style="display:flex;align-items: center;font-size:20px;padding:20px;margin-bottom:20px;background-color: rgba(0,0,0,0.5);color:#fff;border-radius:10px">
          公司总数：88
        </div>
        <div style="display:flex;align-items: center;font-size:20px;padding:20px;margin-bottom:20px;background-color: rgba(0,0,0,0.5);color:#fff;border-radius:10px">
          用户总数：230
        </div>
      </div>
      <div style="position: absolute;bottom:20px;right:20px;">
        <div style="display:flex;align-items: center;font-size:20px;padding:20px;margin-bottom:20px;background-color: rgba(0,0,0,0.5);color:#fff;border-radius:10px">
          <Icon type="ios-briefcase" />
          {{ selectCompany.company_name }}
        </div>
        <div style="display:flex;align-items: center;font-size:20px;padding:20px;margin-bottom:20px;background-color: rgba(0,0,0,0.5);color:#fff;border-radius:10px">
          <Icon type="md-locate" />
          {{ selectCompany.address }}
        </div>
        <div style="display:flex;align-items: center;font-size:20px;padding:20px;margin-bottom:20px;background-color: rgba(0,0,0,0.5);color:#fff;border-radius:10px">
          客户数量：
          {{ selectCompany.number_of_clients }}
        </div>
        <div style="display:flex;align-items: center;font-size:20px;padding:20px;margin-bottom:20px;background-color: rgba(0,0,0,0.5);color:#fff;border-radius:10px">
          员工数量：
          {{ selectCompany.number_of_employees }}
        </div> 
      </div>
      <div style="position: absolute;top:20px;right:20px;width:400px;height:400px;background-color: rgba(173,216,230,0.7);;border-radius:10px">
          <div style="text-align: center;font-size:25px;border-radius:10px color:white">公司类型占比统计</div>
          <div class="echart" id="mychart" :style="myChartStyle"></div>
          <div id="charts" style="width:100%;height:500px;"></div>
      </div>


    </div>
</template>

  <script>
    import * as echarts from "echarts";
    import { company_infoGet } from '@api/company_info';
    export default {
      name: 'amap-page',
      data() {
        return {


          rain:'',
          xData: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], //横坐标
          yData: [5,2,3,5,6,8,10,4,7,7,3,2], //降雨数据
          myChartStyle: { float: "right", width: "100%", height: "100%" }, //图表样式



          height:document.body.clientHeight-64+'px',
          zoom: 10,
          center: [113.2573285, 23.15515044],
          companyData:[],
          selectCompany: {},
        };
      },
      methods: {
        async getCompany(){
                let res = await company_infoGet();
                if(res.errno === 0) {
                    let data=res.data;
                    let that=this;
                    for(let i in data){
                      data[i].events={
                        click(e){
                          that.selectCompany = e.target.De.extData;
                        }
                      }
                    }
                    this.selectCompany=data[0]
                    this.companyData=data;
                }else {
                    this.$Message['error']({
                        content: res.errmsg,
                        duration: 3
                    });
                }
            },



            initEcharts() {
                // 基本柱状图
                const option = {
                  series: [
                  {
                    type: 'pie',
                    data: [
                      {
                        value: 335,
                        name: '制造类'
                      },
                      {
                        value: 234,
                        name: '零售类'
                      },
                      {
                        value: 1548,
                        name: '服务类'
                      },
                      {
                        value: 1548,
                        name: '金融类'
                      }
                    ],
                    radius: '60%'
                  }
                ]
              };
                //data.splice(1, 0, "6");
                const myChart = echarts.init(document.getElementById("mychart"));
                myChart.setOption(option);
                //随着屏幕大小调节图表
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            },




      },
      mounted () {
            this.getCompany();
            this.initEcharts();
        }
    };
</script>