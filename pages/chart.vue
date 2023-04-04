<template>
  <div class="container">
    <bar-chart :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>

<script>
import BarChart from "~/components/BarChart";

export default {
  data() {
    return {
      barChartData: {
        labels: [
          "Sequenziert",
          "Mit MTB-Beschluss",
          "Mit Follow-up",
          "Verstorben",
          "Referral to Sequencing",
          "Referral to Care Plan",
          "Referral to Follow Up",
        ],
        datasets: [
          {
            label: "Global",
            fill: true,
            backgroundColor: "rgba(64,64,64, 0.2)",
            borderColor: "rgb(64,64,64)",
            pointBackgroundColor: "rgb(64,64,64)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(64,64,64)",
            data: [50, 50, 50, 10, 24, 42, 0],
          },
          {
            label: "Tübingen",
            fill: true,
            backgroundColor: "rgba(178,24,43, 0.2)",
            borderColor: "rgb(178,24,43)",
            pointBackgroundColor: "rgb(178,24,43)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(178,24,43)",
            data: [40, 40, 10, 20, 12, 52, 0],
          },
          {
            label: "Heidelberg",
            fill: true,
            backgroundColor: "rgba(239,138,98, 0.2)",
            borderColor: "rgb(239,138,98)",
            pointBackgroundColor: "rgb(239,138,98)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(239,138,98)",
            data: [50, 50, 50, 20, 5, 25, 2],
          },
          {
            label: "Ulm",
            fill: true,
            backgroundColor: "rgba(253,219,199, 0.2)",
            borderColor: "rgb(253,219,199)",
            pointBackgroundColor: "rgb(253,219,199)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(253,219,199)",
            data: [10, 30, 40, 40, 20, 40, 2],
          },
          {
            label: "Freiburg",
            fill: true,
            backgroundColor: "rgba(224,224,224, 0.2)",
            borderColor: "rgb(224,224,224)",
            pointBackgroundColor: "rgb(224,224,224)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(224,224,224)",
            data: [20, 20, 10, 5, 10, 5, 5],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Quality Statistics",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  components: {
    BarChart,
  },
};
</script>
