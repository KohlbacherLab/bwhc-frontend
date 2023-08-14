<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <userPanel />
      <v-flex>
        <h3 class="display-3"><strong>bwHealthCloud</strong> Top10</h3>
        <span class="subheading subheading font-weight-thin">
          <v-btn dark icon color="blue accent-2" align-end @click="goBack">
            <v-icon dark>fas fa-arrow-left</v-icon>
          </v-btn>
          
          bwHC Statistiken finden Sie weiter unten.
          <strong @click="$router.push('help')">Hilfe?</strong>
        </span>
        <v-divider class="my-3"></v-divider>
        <div id="Top 10"></div>
      </v-flex>

      <v-tabs fixed-tabs color="grey lighten-5" v-model="selectedTabIndex">
        <v-tab @click="$router.push('/quality_bwhc')"> Datenqualität </v-tab>
        <v-tab @click="$router.push('/quality_reporting')">
          <i class="fas fa-chart-bar"></i>&nbsp;MTB-Therapien
        </v-tab>
        <v-tab @click="$router.push('/quality_top10')"
          ><i class="fas fa-chart-bar"></i>&nbsp;Tumorentitäten</v-tab
        >
      </v-tabs>

      <v-divider class="my-3"></v-divider>
      <v-layout wrap fluid>
        <!--
        <v-flex xs12 sm3 md12>
          <div v-if="displayChartData">
            <bar-chart
              :key="`${JSON.stringify(
                displayChartData
              )}-${new Date().getTime()}`"
              :data="displayChartData"
              :options="chartOptions"
            ></bar-chart>
          </div>
        </v-flex>
        <v-flex xs12 sm3 md12>

          <div v-if="displaySortedChartData">
            <bar-chart
              :key="`${JSON.stringify(
                displaySortedChartData
              )}-${new Date().getTime()}`"
              :data="displaySortedChartData"
              :options="chartOptions"
            ></bar-chart>
          </div>
        </v-flex>
        -->
        <v-card-title primary-title>
        <div>
          <div class="headline">Anzahl der Top 10 Tumorentitäten an den Standorten</div>
          <br />
          <h3>Top 10 ICD10-Codes für medizinische Diagnosen (kumuliert über alle Standorte) in gestapeltem Diagramm</h3>
        </div>
      </v-card-title>

        <v-flex xs12 sm3 md12>
          <div v-if="displayTop10ChartData">
            <bar-chart
              :key="`${JSON.stringify(
                displayTop10ChartData
              )}-${new Date().getTime()}`"
              :data="displayTop10ChartData"
              :options="chartOptions"
              :height="450"
            ></bar-chart>
          </div>
        </v-flex>

        <v-flex xs12 sm3 md12>
          <div v-if="displayTop10ChartData">
            <pie-chart
              :key="`${JSON.stringify(
                displayTop10ChartData
              )}-${new Date().getTime()}`"
              :data="displayTop10ChartData"
              :height="200"
            ></pie-chart>
          </div>
        </v-flex>

        <v-flex xs12 sm3 md12>
          <v-divider class="my-3"></v-divider>
          <v-col v-if="issues">
            <div v-if="issues.length">
              <ul>
                <li v-for="(issue, index) in issues" :key="index">
                  <strong>{{ issue.severity }}:</strong> {{ issue.details }}
                </li>
              </ul>
            </div>
            <div v-else>No issues to display.</div>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
import axios from "axios";
import BarChart from "~/components/BarChart";
import PieChart from "~/components/PieChart";
import userPanel from "~/components/userPanel";

const baseURL = `${process.env.baseUrl}${process.env.port}`;
const serverBaseURL = `${process.env.baseUrl}${process.env.port}${process.env.query}`;

export default {
  loading: "~/components/loading.vue",
  components: {
    userPanel,
    BarChart,
    PieChart
  },

  computed: {
    dataExists() {
      return this.itemsFiles.length > 0;
    },
  },

  mounted() {
    this.checkQueryRights();
  },

  methods: {
    async checkQueryRights() {
      const queryRights = await axios.get(
        `${process.env.baseUrl}${process.env.port}/bwhc/mtb/api/query/`
      );

      const whichQuery = queryRights.data._actions;
      if (whichQuery["submit-federated-query"].method.length > 0)
        this.drawCharts("federated");
      else this.drawCharts("local");
    },

    goBack() {
      return window.history.back();
    },

    async refreshData() {
      // Call the backend API or any other data-refreshing logic here
      // For example, you can call your drawCharts() method to refresh the data
      await this.drawCharts(this.queryType); // Make sure to pass the correct queryType parameter
    },

    async drawCharts(queryType) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let diagnosis = Array();
        if (this.diagnosis) {
          for (var i = 0; i < this.diagnosis.length; i++) {
            diagnosis.push(
              this.diagnosis[i].substr(0, this.diagnosis[i].indexOf(" "))
            );
          }
        }

        let queryParameters = Array();
        if (this.queryParameters) {
          for (var i = 0; i < this.queryParameters.length; i++) {
            queryParameters.push(this.queryParameters[i].slice(0, 5));
          }
        }

        let request = {
          mode: {
            code: queryType,
          },

          parameters: {
            mutatedGenes: [],
            simpleVariants: [],
            copyNumberVariants: [],
            dnaFusions: [],
            rnaFusions: [],
            diagnoses: [],
            tumorMorphology: [],
            medicationsWithUsage: [],
            responses: [],
            //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
            //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
            //drugs:[{usage:"recommended",drug:"something"}],
          },
        };

        let Response = await axios.post(
          process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query/`,
          request
        );

        if (JSON.stringify(Response.data._issues) != undefined) {
          let connectionErrors = "";
          for (var i = 0; i < Response.data._issues.length; i++) {
            connectionErrors += Response.data._issues[i].details + " · ";
          }

          localStorage.setItem("issues", connectionErrors);
        } else localStorage.removeItem("issues");

        let queryparams = await axios.get(
          `${serverBaseURL}/` + Response.data.id
        );

        let resultSummary;
        let results;

        if (queryparams.data._links["result-summary"]) {
          resultSummary = queryparams.data._links["result-summary"].href;
          results = await axios.get(`${baseURL}` + resultSummary);
        }

        let patients;
        let files;
        let filesEntries;

        if (queryparams.data._links["patients"]) {
          patients = queryparams.data._links["patients"].href;
          files = await axios.get(`${baseURL}` + patients);
          filesEntries = files.data.entries;
        }

        let groupedDataItem = [];
        let locations = [];
        let types = [];
        let groupedBarChartData = [];

        if (filesEntries) {
          for (var i = 0; i < filesEntries.length; i++) {
            let groupedDataItem = [];
            groupedDataItem.push(filesEntries[i].managingZPM);
            locations.push(filesEntries[i].managingZPM);
            groupedDataItem.push(filesEntries[i].diagnosis);
            types.push(filesEntries[i].diagnosis);
            groupedBarChartData.push(groupedDataItem);
          }
        }

        const typeFrequencies = {};
        for (let i = 0; i < groupedBarChartData.length; i++) {
          const location = groupedBarChartData[i][0];
          const type = groupedBarChartData[i][1];

          if (!typeFrequencies[location]) {
            typeFrequencies[location] = {};
          }

          if (!typeFrequencies[location][type]) {
            typeFrequencies[location][type] = 0;
          }
          typeFrequencies[location][type]++;
        }

        const locationLabels = Object.keys(typeFrequencies);
        const typeLabels = Object.keys(typeFrequencies[locationLabels[0]]);
        const datasets = [];
        const unsortedDatasets = [];

        const locationColors = {
          Tübingen: "gold",
          Freiburg: "rgba(0, 0, 139, 0.7)",
          Heidelberg: "rgba(135, 206, 235, 0.7)",
          Ulm: "green",
        };

        for (let i = 0; i < locationLabels.length; i++) {
          const location = locationLabels[i];
          const data = [];
          for (let j = 0; j < typeLabels.length; j++) {
            const type = typeLabels[j];
            const frequency = typeFrequencies[location][type] || 0;
            data.push(frequency);
          }
          unsortedDatasets.push({
            label: location,
            data: data,
            backgroundColor: locationColors[location],
          });

          datasets.push({
            label: location,
            data: data,
            backgroundColor: locationColors[location],
          });
        }

        let chartData = {
          labels: typeLabels,
          datasets: unsortedDatasets,
        };
        let labels = typeLabels;
        let sortedDatasets = datasets;
        let labelSums = new Array(labels.length).fill(0);

        sortedDatasets.forEach((data) => {
          data.data.forEach((value, index) => {
            labelSums[index] += value;
          });
        });

        let sortedIndices = labelSums
          .map((_, index) => index)
          .sort((a, b) => labelSums[b] - labelSums[a]);
        let sortedLabels = sortedIndices.map((index) => labels[index]);
        let sortedLabelSums = sortedIndices.map((index) => labelSums[index]);

        sortedDatasets.forEach((data) => {
          data.data = sortedIndices.map((index) => data.data[index]);
        });

        let sortedChartData = {
          labels: sortedLabels,
          datasets: sortedDatasets,
        };
        let top10ChartData = {
          labels: sortedLabels.slice(0, 10),
          datasets: sortedDatasets.map((data) => {
            return {
              label: data.label,
              data: data.data.slice(0, 10),
              backgroundColor: data.backgroundColor,
              borderColor: data.borderColor,
            };
          }),
        };

        this.displayResults = results.data;
        this.displayChartData = chartData;
        this.displaySortedChartData = sortedChartData;
        this.displayTop10ChartData = top10ChartData;
        this.itemsFiles = filesEntries;
        this.issues = Response.data._issues;
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          this.$router.push("/");
        } else if (error && error.response && error.response.status === 403) {
          this.$router.push("/403");
        } else {
          console.error("An error occurred:", error);
        }
      }
    },
  },
  data() {
    return {
      selectedTabIndex: 2,
      displayResults: [],
      displayChartData: [],
      displaySortedChartData: [],
      displayTop10ChartData: [],
      itemsFiles: [],
      issues: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Frequenz bei Standort",
          fontSize: 16,
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Frequenz",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Diagnose",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
      },
    };
  },
};
</script>
