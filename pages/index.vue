<template>
    <!-- Main Div -->
    <div>
        <!-- Data Visualization -->
        <div class="p-10">
            <!-- Pie Chart -->
            <div class="">
                <client-only>
                    <v-chart class="chart" :option="option" autoresize />
                </client-only>
            </div>
            <!-- Table -->
            <div class="">
                <EasyDataTable class=""
                :headers="headers"
                :items="entries"
                />
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">

  // Libraries for Pie Chart
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { ref } from 'vue';

  // Labraries for Table
  import type { Header, Item } from "vue3-easy-data-table";

  use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

  // Set up SQL database
  import { onMounted } from 'vue';

  const entries = ref([]);
  // Fetch the data from the server-side API when the component is mounted
    onMounted(async () => {
    try {
        // Fetching the data from the SQLite API route at /api/db
        entries.value = await $fetch('/api/db');
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
    });
  
  // Pie Chart Logic
  const option = ref({
    title: {
      text: 'Categories of Hazards',
      left: 'center',
    },
    
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Fire with Sustained Fuel Force', 'Explosion', 'Excavation or Trench', 'Electrical Contact with Source', 'Arc Flash', 'High Dose of Toxic Chemical or Radiation', 'Suspended Load', 'Fall from Elevation', 'Mobile Equipment/Traffic with Workers on Foot', 'Motor Vehicle Incident (occupant)', 'Heavy Rotating Equipment', 'High Temperature', 'Steam'],
    },
    series: [
      {
        name: 'Categories of Hazards',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'Fire with Sustained Fuel Force' },
          { value: 310, name: 'Explosion' },
          { value: 234, name: 'Excavation or Trench' },
          { value: 135, name: 'Electrical Contact with Source' },
          { value: 232, name: 'Arc Flash' },
          { value: 123, name: 'High Dose of Toxic Chemical or Radiation' },
          { value: 564, name: 'Suspended Load' },
          { value: 111, name: 'Fall from Elevation' },
          { value: 45, name: 'Mobile Equipment/Traffic with Workers on Foot' },
          { value: 213, name: 'Motor Vehicle Incident (occupant)' },
          { value: 1548, name: 'Heavy Rotating Equipment' },
          { value: 321, name: 'High Temperature' },
          { value: 543, name: 'Steam' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });


  const headers: Header[] = [
  { text: "Observation Number", value: "OBSRVTN_NB" },
  { text: "Date/Time", value: "DATETIME_DTM"},
  { text: "Point Name", value: "PNT_NM"},
  { text: "Qualifier", value: "QUALIFIER_TXT"},
  { text: "At Risk Notes", value: "PNT_ATRISKNOTES_TX"},
  { text: "Follow-up Notes", value: "PNT_ATRISKFOLWUPNTS_TX"},
  ];
  </script>
  
  <style scoped>
  .chart {
    height: 50vh;
  }
  </style>
  