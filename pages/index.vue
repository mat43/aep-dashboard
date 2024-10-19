<template>
    <!-- Main Div -->
    <div>

        <!-- <div>
    <h1>Data from SQLite</h1>
    <table>
      <thead>
        <tr>
          <th>Observation Number</th>
          <th>Date/Time</th>
          <th>Point Name</th>
          <th>Qualifier</th>
          <th>At Risk Notes</th>
          <th>Follow-up Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.OBSRVTN_NB">
          <td>{{ item.OBSRVTN_NB }}</td>
          <td>{{ item.DATETIME_DTM }}</td>
          <td>{{ item.PNT_NM }}</td>
          <td>{{ item.QUALIFIER_TXT }}</td>
          <td>{{ item.PNT_ATRISKNOTES_TX }}</td>
          <td>{{ item.PNT_ATRISKFOLWUPNTS_TX }}</td>
        </tr>
      </tbody>
    </table>
  </div> -->


        <!-- Data Visualization -->
        <div class="flex justify-center p-10">
            <!-- Pie Chart -->
            <div class="w-1/2">
                <client-only>
                    <v-chart class="chart" :option="option" autoresize />
                </client-only>
            </div>
            <!-- Table -->
            <div class="flex">
                <EasyDataTable class=""
                :headers="headers"
                :items="users"
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

  // Setup SQL database

  use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);
  import { onMounted } from 'vue';
  const users = ref([]);
  // Fetch the data from the server-side API when the component is mounted
    onMounted(async () => {
    try {
        // Fetching the data from the SQLite API route at /api/db
        users.value = await $fetch('/api/db');
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
    });
  
  const option = ref({
    title: {
      text: 'Traffic Sources',
      left: 'center',
    },
    
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
    },
    series: [
      {
        name: 'Traffic Sources',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 234, name: 'Ad Networks' },
          { value: 135, name: 'Video Ads' },
          { value: 1548, name: 'Search Engines' },
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
    height: 100vh;
  }
  </style>
  