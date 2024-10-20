<template>
    <!-- Main Div -->
    <div class="bg-gray-50 font-sans">
        <!-- Data Visualization -->
        <div class="p-10">
            <!-- Pie Chart -->
            <div class="mb-5 p-4 bg-white shadow-md rounded-md">
                <client-only>
                    <v-chart v-if="isChartReady" class="chart" :option="option" autoresize />
                </client-only>
            </div>
            <!-- Table -->
            <div class="">
                <!-- Search Div + Stats -->
                <div class="flex">
                    <!-- Search Div -->
                    <div class="mb-4 p-4 bg-white shadow-md rounded-md w-1/2 mr-3">
                        <!-- First Row: Search By Dropdown -->
                        <div class="flex items-center space-x-4 mb-3">
                            <!-- Label for Search By Dropdown -->
                            <label for="search-field" class="font-medium text-sm">Search by:</label>
                            
                            <!-- Dropdown (select) for selecting search field -->
                            <select v-model="searchField" id="search-field" 
                            class="border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-1/2 text-sm">
                            <option value="OBSRVTN_NB">Observation Number</option>
                            <option value="DATETIME_DTM">Date/Time</option>
                            <option value="PNT_NM">Point Name</option>
                            <option value="QUALIFIER_TXT">Qualifier</option>
                            <option value="PNT_ATRISKNOTES_TX">At Risk Notes</option>
                            <option value="PNT_ATRISKFOLWUPNTS_TX">Follow-up Notes</option>
                            <option value="PSIF">Is a PSIF</option>
                            <option value="CATEGORY">Category</option>
                            <option value="CONFIDENCE">Confidence</option>
                            </select>
                        </div>

                        <!-- Second Row: Search Value Input Field -->
                        <div class="flex items-center space-x-4 text-sm">
                            <!-- Label for Search Value Input -->
                            <label for="search-value" class="font-medium text-sm">Search value:</label>
                            
                            <!-- Input field for entering search value -->
                            <input id="search-value" 
                            class="border border-gray-300 rounded-md p-2 w-8/12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" 
                            type="text" 
                            v-model="searchValue" 
                            placeholder="Enter search value">
                        </div>
                    </div>
                
                <!-- Statistics -->
                <div class="mb-4 p-4 bg-white shadow-md rounded-md w-1/2 flex flex-col">
                    <div class="flex">
                        <span class="text-sm mr-1 font-bold">Number of PSIFs:</span>
                        <span class="font-medium text-sm">{{ PSIF }}</span>
                    </div>
                    <div class="flex">
                        <span class="text-sm mr-1 font-bold">Total data entries:</span>
                        <span class="font-medium text-sm">{{ entries.length }}</span>
                    </div>
                    <div class="flex">
                        <span class="text-sm mr-1 font-bold">Average confidence:</span>
                        <span class="font-medium text-sm">{{ Math.floor(avgConf / entries.length) }}%</span>
                    </div>
                    <div class="flex">
                        <span class="text-sm mr-1 font-bold">Most common hazard:</span>
                        <span class="font-medium text-sm">{{ mostCommonCategory }}</span>
                    </div>
                </div>
            </div>
                <EasyDataTable class=""
                :headers="headers"
                :items="entries"
                :search-field="searchField"
                :search-value="searchValue"
                alternating
                buttons-pagination
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
const isChartReady = ref(false); // This flag controls when the chart is ready to be displayed

// Labraries for Table
import type { Header, Item } from "vue3-easy-data-table";

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

// Set up SQL database
import { onMounted } from 'vue';

const entries = ref([]);
// Fetch the data from the server-side API when the component is mounted
let counts = [
    { value: 0, name: 'Fire with Sustained Fuel Force' },
    { value: 0, name: 'Explosion' },
    { value: 0, name: 'Excavation or Trench' },
    { value: 0, name: 'Electrical Contact with Source' },
    { value: 0, name: 'Arc Flash' },
    { value: 0, name: 'High Dose of Toxic Chemical or Radiation' },
    { value: 0, name: 'Suspended Load' },
    { value: 0, name: 'Fall from Elevation' },
    { value: 0, name: 'Mobile Equipment/Traffic with Workers on Foot' },
    { value: 0, name: 'Motor Vehicle Incident (occupant)' },
    { value: 0, name: 'Heavy Rotating Equipment' },
    { value: 0, name: 'High Temperature' },
    { value: 0, name: 'Steam' },
];

let PSIF = 0;
let avgConf = 0;
let mostCommonCategory = "None";
let mostCommonNumber = 0;

onMounted(async () => {
try {
    // Fetching the data from the SQLite API route at /api/db
    entries.value = await $fetch('/api/db');
    entries.value.forEach(element => {
        // Convert PSIF to True/False format
        element.PSIF = element.PSIF === 1 ? (PSIF++, "True") : "False";
        avgConf += element.CONFIDENCE;

        switch (element.CATEGORY) {
            case 1:
                counts[0].value++;
                element.CATEGORY = "Fire with Sustained Fuel Force";
                break;
            case 2:
                counts[1].value++;
                element.CATEGORY = "Explosion";
                break;
            case 3:
                counts[2].value++;
                element.CATEGORY = "Excavation or Trench";
                break;
            case 4:
                counts[3].value++;
                element.CATEGORY = "Electrical Contact with Source";
                break;
            case 5:
                counts[4].value++;
                element.CATEGORY = "Arc Flash";
                break;
            case 6:
                counts[5].value++;
                element.CATEGORY = "High Dose of Toxic Chemical or Radiation";
                break;
            case 7:
                counts[6].value++;
                element.CATEGORY = "Suspended Load";
                break;
            case 8:
                counts[7].value++;
                element.CATEGORY = "Fall from Elevation";
                break;
            case 9:
                counts[8].value++;
                element.CATEGORY = "Mobile Equipment/Traffic with Workers on Foot";
                break;
            case 10:
                counts[9].value++;
                element.CATEGORY = "Motor Vehicle Incident (occupant)";
                break;
            case 11:
                counts[10].value++;
                element.CATEGORY = "Heavy Rotating Equipment";
                break;
            case 12:
                counts[11].value++;
                element.CATEGORY = "High Temperature";
                break;
            case 13:
                counts[12].value++;
                element.CATEGORY = "Steam";
                break;
            default:
                element.CATEGORY = "";
                break;
        }
        isChartReady.value = true;

        for (let i = 0; i < counts.length; i++) {
            if (counts[i].value > mostCommonNumber) {
                mostCommonCategory = counts[i].name;
                mostCommonNumber = counts[i].value;
            }
        }
    });
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
        data: counts,
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

// Table Logic
const searchField = ref("OBSRVTN_NB");
const searchValue = ref("");

// Headers for table
const headers: Header[] = [
    { text: "Observation Number", value: "OBSRVTN_NB" },
    { text: "Date/Time", value: "DATETIME_DTM", sortable: true},
    { text: "Point Name", value: "PNT_NM"},
    { text: "Qualifier", value: "QUALIFIER_TXT"},
    { text: "At Risk Notes", value: "PNT_ATRISKNOTES_TX"},
    { text: "Follow-up Notes", value: "PNT_ATRISKFOLWUPNTS_TX"},
    { text: "Is a PSIF", value: "PSIF", sortable: true},
    { text: "Category", value: "CATEGORY", sortable: true},
    { text: "Confidence", value: "CONFIDENCE", sortable: true},
];
</script>
  
<style scoped>
    .chart {
        height: 50vh;
    }
</style>
  