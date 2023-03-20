<template>
  <div class="container">
    <div class="left-panel">
      <div class="company-info">
        <h3>{{ selectedCompany.name }}</h3>
        <p>地址：{{ selectedCompany.address }}</p>
        <p>员工人数：{{ selectedCompany.employeeNumber }}</p>
        <p>客户人数：{{ selectedCompany.customerNumber }}</p>
      </div>
    </div>
    <div class="right-panel">
      <el-amap class="map-container" ref="amap" :center="center" :zoom="zoom">
        <el-amap-marker v-for="(company, index) in companies" :key="index" :position="company.position" :extData="company" @click="selectCompany(company)">
        </el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>

export default {
  name: "CompanyMap",
  components: {
    ElAmap,
    ElAmapMarker,
  },
  data() {
    return {
      companies: [
        {
          name: "公司A",
          address: "北京市朝阳区",
          employeeNumber: 100,
          customerNumber: 2000,
          position: [116.397128, 39.916527],
        },
        {
          name: "公司B",
          address: "上海市浦东新区",
          employeeNumber: 200,
          customerNumber: 5000,
          position: [121.51746, 31.228171],
        },
        {
          name: "公司C",
          address: "广州市天河区",
          employeeNumber: 50,
          customerNumber: 1000,
          position: [113.36199, 23.128145],
        },
        {
          name: "公司D",
          address: "深圳市福田区",
          employeeNumber: 150,
          customerNumber: 3000,
          position: [114.059558, 22.54286],
        },
      ],
      selectedCompany: {},
      center: [116.397128, 39.916527],
      zoom: 10,
    };
  },
  methods: {
    selectCompany(company) {
      this.selectedCompany = company;
      const position = company.position;
      this.$refs.amap.setCenter(position);
    },
  },
  created() {
    this.selectedCompany = this.companies[0];
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}
.right-panel {
  flex: 1;
}
.company-info {
  margin-bottom: 20px;
}
.map-container {
  height: 100%;
}
</style>
