<template>
  <Pie :data="barData" :options="options" />
</template>
<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { defineProps } from 'vue'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)
import { ref } from 'vue'
const props = defineProps({
  barData: Object,
})
const options = ref({
  width: 300,
  height: 300,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '肢體非語言分析'
    }
  }
})
</script>