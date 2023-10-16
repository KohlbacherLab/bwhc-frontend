<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <userPanel />
      <v-flex>
        <h3 class="display-3"><strong>bwHealthCloud</strong> Berichtwesen</h3>

        <span class="subheading subheading font-weight-thin">
          <v-btn
            dark
            icon
            color="blue accent-2"
            align-end
            @click="$router.push('/main')"
          >
            <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
          >bwHC Statistiken finden Sie weiter unten.
          <strong @click="$router.push('help')">Hilfe?</strong>
        </span>
        <v-divider class="my-3"></v-divider>
        <div id="berichtswesen"></div>
      </v-flex>

      <v-tabs fixed-tabs color="grey lighten-5" v-model="selectedTabIndex">
        <v-tab @click="$router.push('/quality_bwhc')"> Datenqualität </v-tab>
        <v-tab @click="$router.push('/quality_reporting')">
          <i class="fas fa-chart-bar"></i>&nbsp;MTB-Therapien
        </v-tab>
        <!--
        <v-tab @click="$router.push('/quality_top10')"
          ><i class="fas fa-chart-bar"></i>&nbsp;Tumorentitäten</v-tab
        >
        -->
      </v-tabs>

      <v-divider class="my-3"></v-divider>
      <v-flex xs12 md12>
        <v-col v-if="issues">
          <div v-if="issues.length">
            <ul>
              <li v-for="(issue, index) in issues" :key="index">
                <strong>{{ issue.severity }}:</strong> {{ issue.details }}
              </li>
            </ul>
            <v-divider class="my-3"></v-divider>
          </div>
          <div v-else>No issues to display.</div>
        </v-col>
      </v-flex>

      <v-card-title primary-title>
        <div>
          <div class="headline">
            <i class="fas fa-chart-bar"></i> Umgesetzte MTB–Therapien
          </div>
          <br />
          <h3>Verabreichte Wirkstoffklassen</h3>
        </div>
      </v-card-title>

      <v-layout wrap fluid>
        <v-flex xs12 sm3 md12>
          <bar-chart
            v-if="barChartDataGlobalMedicationDistribution[0]"
            :data="barChartDataGlobalMedicationDistribution[0]"
            :options="barChartOptionsGlobalMedicationDistribution"
            :height="
              50 +
              barChartDataGlobalMedicationDistribution[0].labels.length * 10
            "
          />

          <!--

          <pie-chart
            v-if="barChartDataGlobalMedicationDistibution[0]"
            :data="barChartDataGlobalMedicationDistribution[0]"
            :options="barChartOptionsGlobalMedicationDistribution"
            :height="100"
          />

          -->
        </v-flex>

        <v-flex d-flex xs12 sm12 md12>
          <v-autocomplete
            v-model="drugsGroup"
            :items="drugsGroupCat"
            :itemscope="used"
            :loading="isLoading"
            label="Wirkstoff-Klassen oder ATC Code"
            ref="drugUsage"
            chips
            deletable-chips
            hide-selected
            dense
            placeholder
            @input="compileGlobalMedicationDistributionDetails(drugsGroup)"
          >
          </v-autocomplete
        ></v-flex>

        <v-card-title v-if="drugsGroup != undefined" primary-title>
          <div>
            <h3>Verabreichte Wirkstoffe</h3>
          </div>
        </v-card-title>

        <v-card class="mx-auto" v-if="drugsGroup != undefined" flat>
          <v-card-text small class="font-weight-thin">
            <v-icon style="font-size: 1.1rem">fas fa-pills</v-icon>
            <strong>ausgewählter Wirkstoff-Klasse:</strong>
            {{ drugsGroup }}<br /><v-icon style="font-size: 1.1rem"
              >fas fa-hashtag</v-icon
            >
            <strong>Gesamtanzahl der umgesetzten Therapien: </strong>
            {{ barChartDataGlobalMedicationDistributionDetailsOnDemandCount }}
            <br />
            <div class="caption grey--text">
              <strong>Info:</strong> Bei Wirkstoffkombinationen werden die
              Wirkstoffe einzeln berücksichtigt.
            </div>
          </v-card-text>
        </v-card>

        <v-flex xs12 sm3 md12>
          <bar-chart
            v-if="barChartDataGlobalMedicationDistributionDetailsOnDemand[0]"
            :data="barChartDataGlobalMedicationDistributionDetailsOnDemand[0]"
            :options="barChartOptionsGlobalMedicationDistributionDetails"
            :height="
              50 +
              barChartDataGlobalMedicationDistributionDetailsOnDemand[0].labels
                .length *
                10
            "
          />
        </v-flex>

        <!--
        <v-flex xs12 sm3 md12>
          <bar-chart
            v-if="barChartDataGlobalMedicationDistributionDetails[0]"
            :data="barChartDataGlobalMedicationDistributionDetails[0]"
            :options="barChartOptionsGlobalMedicationDistributionDetails"
            :height="150"
          />
        </v-flex>

        -->

        <v-card-title primary-title>
          <div>
            <div class="headline">
              <i class="fas fa-chart-bar"></i> Tumorentitätsverteilung für
              verabreichte Wirkstoffe oder Wirkstoffklassen
            </div>
            <br />
          </div>
        </v-card-title>

        <v-flex d-flex xs12 sm12 md12>
          <v-autocomplete
            v-model="drugs"
            :items="drugsCat"
            :itemscope="used"
            :loading="isLoading"
            label="Wirkstoff(-Klasse) oder ATC Code"
            ref="drugUsage"
            chips
            deletable-chips
            hide-selected
            dense
            placeholder
            @input="compileGlobalTumorEntityDistribution(drugs)"
          >
          </v-autocomplete
        ></v-flex>

        <v-card-title primary-title v-if="drugs != undefined">
          <div>
            <h3>ICD-10 Kategorien</h3>
          </div>
        </v-card-title>

        <v-card class="mx-auto" v-if="drugs != undefined" flat>
          <v-card-text small class="font-weight-thin">
            <v-icon style="font-size: 1.1rem">fas fa-pills</v-icon>
            <strong>Ausgewählter Wirkstoff(-Klasse):</strong>
            {{ drugs }}<br /><v-icon style="font-size: 1.1rem"
              >fas fa-hashtag</v-icon
            >
            <strong>Gesamtanzahl der umgesetzten Therapien: </strong>
            {{ barChartDataGlobalTumorEntityDistributionCount }}
          </v-card-text>
        </v-card>

        <v-flex d-flex xs12 sm3 md12>
          <bar-chart
            v-if="barChartDataGlobalTumorEntityDistribution[0]"
            :data="barChartDataGlobalTumorEntityDistribution[0]"
            :options="barChartOptionsGlobalTumorEntityDistribution"
            :height="
              50 +
              barChartDataGlobalTumorEntityDistribution[0].labels.length * 10
            "
          />
        </v-flex>

        <v-card-title primary-title v-if="drugs != undefined">
          <v-flex d-flex
            ><h3>
              <v-switch
                v-if="icd10CodesDetailansicht"
                v-model="icd10CodesDetailansicht"
                :label="`ICD-10 Codes (Detailansicht) ausblenden`"
              ></v-switch>
              <v-switch
                v-else
                v-model="icd10CodesDetailansicht"
                :label="`ICD-10 Codes (Detailansicht) einblenden`"
              ></v-switch>
            </h3>
          </v-flex>
        </v-card-title>
        <!--
        <v-card class="mx-auto" v-if="drugs != undefined" flat>
          <v-card-text small class="font-weight-thin">
            <v-icon style="font-size: 1.1rem">fas fa-hashtag</v-icon> <strong>Gesamtanzahl der umgesetzten Therapien: </strong> {{ barChartDataGlobalTumorEntityDistributionDetailsCount }}
          </v-card-text>
        </v-card>
-->
        <v-flex v-if="icd10CodesDetailansicht" d-flex xs12 sm3 md12>
          <bar-chart
            v-if="barChartDataGlobalTumorEntityDistributionDetails[0]"
            :data="barChartDataGlobalTumorEntityDistributionDetails[0]"
            :options="barChartOptionsGlobalTumorEntityDistributionDetails"
            :height="
              50 +
              barChartDataGlobalTumorEntityDistributionDetails[0].labels
                .length *
                10
            "
          />
        </v-flex>
      </v-layout>

      <v-card-title primary-title>
        <div>
          <div class="headline">
            <i class="fas fa-table"></i> Tumorentitätsverteilung Tabellenansicht
          </div>
          <br />
        </div>
      </v-card-title>

      <v-tooltip top>
        <v-btn
          small
          flat
          color="green"
          @click="downloadAllCsv"
          slot="activator"
        >
          <v-icon small left>fas fa-download</v-icon>
          <span class="caption text-none">Alles als CSV exportieren</span>
        </v-btn>
        <span
          >Alle Berichte als Comma Separated Values (.csv) herunterladen</span
        > </v-tooltip
      ><br /><br />

      <v-flex d-flex xs12 sm12 md12>
        <v-autocomplete
          v-model="drugsTable"
          :items="drugsTableCat"
          :itemscope="used"
          :loading="isLoading"
          label="Wirkstoff(-Klasse) oder ATC Code"
          ref="drugUsage"
          chips
          deletable-chips
          hide-selected
          dense
          placeholder
          @input="compileGlobalTumorEntityDistributionTable(drugsTable)"
        >
        </v-autocomplete
      ></v-flex>

      <v-card class="mx-auto" v-if="drugsTable != undefined" flat>
        <v-card-text small class="font-weight-thin">
          <v-icon style="font-size: 1.1rem">fas fa-pills</v-icon>
          <strong>Ausgewählter Wirkstoff(-Klasse):</strong>
          {{ drugsTable }}<br /><v-icon style="font-size: 1.1rem"
            >fas fa-hashtag</v-icon
          >
          <strong>Gesamtanzahl der Tabelleneinträge: </strong>
          {{ itemsFiles.length }}
        </v-card-text>
      </v-card>

      <v-layout flex-child wrap>
        <!--
          <v-flex xs12 md1 d-flex> </v-flex>
          -->
        <v-flex xs12 md12>
          <v-layout v-if="itemsFiles.length > 0" row justify-start class="my-3">
            <v-tooltip top>
              <v-btn
                small
                flat
                color="grey"
                @click="sortBy(itemsFiles, 'groupIndex')"
                slot="activator"
              >
                <v-icon small left>sort</v-icon>
                <span class="caption text-none">Index</span>
              </v-btn>
              <span>Sortieren nach Index</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                small
                flat
                color="green"
                @click="downloadCsv"
                slot="activator"
              >
                <v-icon small left>fas fa-download</v-icon>
                <span class="caption text-none"
                  >Auswahl als CSV Exportieren</span
                >
              </v-btn>
              <span
                >Den aktuellen Bericht als Comma Separated Values (.csv)
                herunterladen</span
              >
            </v-tooltip>
          </v-layout>

          <v-card
            flat
            hover
            v-for="itemsFile in itemsFiles"
            :key="itemsFile.patient.id"
          >
            <v-layout row wrap :class="`pa-3`">
              <v-flex xs12 sm4 md1>
                <div class="caption grey--text">Index</div>
                <div v-if="itemsFile.groupIndex">
                  {{ itemsFile.groupIndex }}
                </div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">ZPM</div>
                <div v-if="itemsFile.patient.managingZPM">
                  {{ itemsFile.patient.managingZPM }}
                </div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">Geburtsdatum</div>
                <div v-if="itemsFile.patient.birthDate">
                  {{ itemsFile.patient.birthDate }}
                </div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">Todesdatum</div>
                <div v-if="itemsFile.patient.dateOfDeath">
                  {{ itemsFile.patient.dateOfDeath }}
                </div>
                <div v-else>N/A</div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">Geschlecht</div>
                <div v-if="itemsFile.patient.gender">
                  {{ itemsFile.patient.gender }}
                </div>
              </v-flex>
              <v-flex xs12 sm4 md2>
                <div class="caption grey--text">Versicherung</div>
                <div v-if="itemsFile.patient.insurance">
                  {{ itemsFile.patient.insurance }}
                </div>
              </v-flex>

              <v-flex xs12 sm4 md1>
                <div>
                  <v-tooltip top>
                    <v-btn
                      icon
                      @click="
                        routeToPatient(
                          itemsFile.patient.id +
                            '&' +
                            itemsFile.patient.managingZPM
                        )
                      "
                      slot="activator"
                    >
                      <v-icon color="blue">folder</v-icon>
                    </v-btn>
                    <span>öffne die Datei</span>
                  </v-tooltip>
                </div>
              </v-flex>
            </v-layout>
            <v-divider class="my-3"></v-divider>

            <div flat v-for="focus in itemsFile.therapies" :key="focus.id">
              <v-layout wrap :class="`pa-3`">
                <v-flex xs12 sm4 md2>
                  <div class="caption grey--text">Therapie Status</div>
                  <div v-if="focus.therapy.status">
                    {{ focus.therapy.status }}
                  </div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md3>
                  <div class="caption grey--text">Entität</div>
                  <div v-if="focus.therapy.reason">
                    {{ focus.therapy.reason.code }}<br />{{
                      focus.therapy.reason.display
                    }}
                  </div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md2>
                  <div class="caption grey--text">Therapie Anfang</div>
                  <div v-if="focus.therapy.period.start">
                    {{ focus.therapy.period.start }}
                  </div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md2>
                  <div class="caption grey--text">Therapie Ende</div>
                  <div v-if="focus.therapy.period.end">
                    {{ focus.therapy.period.end }}
                  </div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md2>
                  <div class="caption grey--text">Wirkstoff</div>
                  <div v-if="focus.therapy.medication">
                    <div v-for="med in focus.therapy.medication" :key="med.id">
                      {{ med.display }}
                    </div>
                  </div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md2>
                  <div class="caption grey--text">Effective Date</div>
                  <div v-if="focus.response">
                    {{ focus.response.effectiveDate }}
                  </div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md3>
                  <div class="caption grey--text">Response</div>
                  <div v-if="focus.response">
                    {{ focus.response.value.code }}
                  </div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md7>
                  <div class="caption grey--text">Notes on Therapie</div>
                  <div v-if="focus.therapy.note">{{ focus.therapy.note }}</div>
                  <div v-else>-</div>
                </v-flex>

                <v-flex xs12 sm4 md12>
                  <div class="caption grey--text">
                    Stützende Molekulare Alteration(en)
                  </div>

                  <div v-if="focus.supportingVariants">
                    <div
                      v-for="variant in focus.supportingVariants"
                      :key="variant.id"
                    >
                      {{ variant }}<br />
                    </div>
                  </div>
                  <div v-else>-</div>
                </v-flex>
              </v-layout>
            </div>
          </v-card>

          <span v-if="itemsFiles.length == 0">
            <br />
            <v-alert :value="true" type="warning">
              <span class="subheading font-weight-light"
                >Keine ergebnisse gefunden.</span
              >
            </v-alert></span
          >
          <span v-if="itemsFiles.length > 0">
            <v-btn
              small
              icon
              @click="$vuetify.goTo('#berichtswesen', options)"
              flat
              color="grey"
            >
              <v-icon style="font-size: 1.2rem"
                >fas fa-arrow-alt-circle-up</v-icon
              >
            </v-btn>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
    <template></template>
  </v-responsive>
</template>

<script>
import axios from "axios";
import { dirname } from "path";
import BarChart from "~/components/BarChart";
import PieChart from "~/components/PieChart";
import userPanel from "~/components/userPanel";

let seen = true;

let barChartDataGlobalTumorEntityDistribution = Array();
let barChartDataGlobalTumorEntityDistributionCount = 0;
let barChartDataGlobalTumorEntityDistributionDetails = Array();
//let barChartDataGlobalTumorEntityDistributionDetailsCount = Array();
let globalMedicationDistribution = Array();
let barChartDataGlobalMedicationDistributionDetailsOnDemand = Array();
let barChartDataGlobalMedicationDistributionDetailsOnDemandCount = 0;
let itemsFiles = 0;
let limitNumberItemsFiles = 20;
const downloadEndpoint = "";

export default {
  loading: "~/components/loading.vue",

  components: {
    userPanel,
    BarChart,
    PieChart,
  },

  data() {
    return {
      selectedTabIndex: 1,
      barChartOptionsGlobalMedicationDistribution: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Verabreichte Wirkstoff-Klassen",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Anzahl der umgesetzten Therapien",
              },
            },
          ],
        },
      },

      barChartOptionsGlobalMedicationDistributionDetails: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Verabreichte Wirkstoffen",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Anzahl der umgesetzten Therapien",
              },
            },
          ],
        },
      },

      barChartOptionsGlobalTumorEntityDistribution: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Darstellung ICD-10-Obergruppen",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString:
                  "Häufigkeit der Tumor-Entität  bei Patienten mit dem/der gegebenen Wirkstoff(-Klasse)",
              },
            },
          ],
        },
      },
      barChartOptionsGlobalTumorEntityDistributionDetails: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Darstellung ausführliche ICD-10-Klassifikation",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString:
                  "Häufigkeit der Tumor-Entität  bei Patienten mit dem/der gegebenen Wirkstoff(-Klasse)",
              },
            },
          ],
        },
      },
    };
  },

  computed: {
    dataExists() {
      return this.itemsFiles.length > 0;
    },
  },

  methods: {
    async downloadCsv() {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;

        const response = await axios.get(this.downloadEndpoint, {
          headers: {
            Accept: "text/csv",
          },
        });

        let blob = new Blob([response.data], {
          type: "text/csv",
        });

        const fileName =
          "data_" +
          new Date()
            .toISOString()
            .replace(/\D/g, "")
            .slice(0, 14)
            .replace(/(\d{8})(\d{6})/, "$1_$2");

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // For IE browser
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          // For other browsers
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        /*

        let blob = new Blob([JSON.stringify(response.data)], {
            type: "text/csv",
          }),
          url = window.URL.createObjectURL(blob);

        window.open(url);
        */
      } catch (error) {
        console.error(error);
      }
    },

    async downloadAllCsv() {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;

        const response = await axios.get(
          process.env.baseUrl +
            process.env.port +
            process.env.reporting +
            "/patient-therapies/",
          {
            headers: {
              Accept: "text/csv",
            },
          }
        );

        let blob = new Blob([response.data], {
          type: "text/csv",
        });

        const fileName =
          "data_" +
          new Date()
            .toISOString()
            .replace(/\D/g, "")
            .slice(0, 14)
            .replace(/(\d{8})(\d{6})/, "$1_$2");

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // For IE browser
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          // For other browsers
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        /*

        let blob = new Blob([JSON.stringify(response.data)], {
            type: "text/csv",
          }),
          url = window.URL.createObjectURL(blob);

        window.open(url);
        */
      } catch (error) {
        console.error(error);
      }
    },

    goBack() {
      return window.history.back();
    },

    routeToPatient(id, ort) {
      this.$router.push("access/" + id + "&" + ort);
    },

    sortBy(dataset, prop) {
      dataset.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    async compileTherapyData(code) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      let therapyData = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/patient-therapies?code=" +
          code.split(" · ")[1] +
          "&version=" +
          code.split(" · ")[2]
      );

      this.itemsFiles = therapyData.data.data;

      if (this.itemsFiles != undefined) {
        let x;

        for (var i = 0; i < this.itemsFiles.length; i++) {
          x = this.itemsFiles[i].id;
          this.itemsFiles[i].groupIndex = i + 1;

          if (this.itemsFiles[i].response === undefined) {
            this.itemsFiles[i].response = "";
          }
          if (this.itemsFiles[i].supportingVariants === undefined) {
            this.itemsFiles[i].supportingVariants = "";
          }

          for (var j = 0; j < this.itemsFiles[i].therapies.length; j++) {
            if (this.itemsFiles[i].therapies[j].medication === undefined) {
              this.itemsFiles[i].therapies[j].medication = "";
            }
            if (this.itemsFiles[i].therapies[j].therapy.period === undefined) {
              this.itemsFiles[i].therapies[j].therapy.period = "";
            }
          }
        }
      }
    },

    async compileGlobalMedicationDistributionDetails(code) {
      if (code == undefined) return;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      this.barChartDataGlobalMedicationDistributionDetailsOnDemand = [];
      this.barChartDataGlobalMedicationDistributionDetailsOnDemandCount = 0;

      let labelsGlobalMedicationDistributionDetailsOnDemand = Array();
      let countGlobalMedicationDistributionDetailsOnDemand = Array();
      let colorsGlobalMedicationDistributionDetailsOnDemand = Array();

      let red = 0;
      let green = 0;
      let blue = 0;

      globalMedicationDistribution = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/global-medication-distribution"
      );

      try {
        if (globalMedicationDistribution.data.data) {
          for (
            var i = 0;
            i < globalMedicationDistribution.data.data.length;
            i++
          ) {
            if (
              globalMedicationDistribution.data.data[i].concept.code ==
              code.split(" · ")[1]
            ) {
              red = (red + 10) % 255;
              blue = (blue + 10) % 255;
              green = (green + 10) % 255;

              for (
                var j = 0;
                j < globalMedicationDistribution.data.data[i].components.length;
                j++
              ) {
                labelsGlobalMedicationDistributionDetailsOnDemand.push(
                  globalMedicationDistribution.data.data[i].components[j]
                    .concept.display +
                    " - " +
                    globalMedicationDistribution.data.data[i].components[j]
                      .concept.code
                );
                countGlobalMedicationDistributionDetailsOnDemand.push(
                  globalMedicationDistribution.data.data[i].components[j].count
                );

                colorsGlobalMedicationDistributionDetailsOnDemand.push(
                  "rgba(" + red + ", " + green + ", " + blue + ", 0.4)"
                );
                this.barChartDataGlobalMedicationDistributionDetailsOnDemandCount +=
                  globalMedicationDistribution.data.data[i].components[j].count;
              }
            }

            let itemDetailsOnDemand = {
              labels: labelsGlobalMedicationDistributionDetailsOnDemand,
              datasets: [
                {
                  label: "Häufigkeit",
                  data: countGlobalMedicationDistributionDetailsOnDemand,
                  backgroundColor:
                    colorsGlobalMedicationDistributionDetailsOnDemand,
                  borderColor:
                    colorsGlobalMedicationDistributionDetailsOnDemand,
                  borderWidth: 1,
                },
              ],
            };

            this.barChartDataGlobalMedicationDistributionDetailsOnDemand.push(
              itemDetailsOnDemand
            );
          }
        }
      } catch (err) {
        if (err.status === 401) {
          this.$router.push("/");
        } else if (err.response.status === 403) {
          this.$router.push("/403");
        }
      }
    },

    async compileGlobalTumorEntityDistribution(code) {
      if (code == undefined) return;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      this.barChartDataGlobalTumorEntityDistribution = [];
      this.barChartDataGlobalTumorEntityDistributionCount = 0;
      this.barChartDataGlobalTumorEntityDistributionDetails = [];
      //this.barChartDataGlobalTumorEntityDistributionDetailsCount = 0;

      try {
        /*
          let request = {
            mode: {
              code: queryMode,
            },
            parameters: {
              medicationsWithUsage: this.selectedDrugs,
            },
          };
          */

        let globalTumorEntityDistribution = await axios.get(
          process.env.baseUrl +
            process.env.port +
            process.env.reporting +
            "/global-tumor-entity-distribution?code=" +
            code.split(" · ")[1] +
            "&version=" +
            code.split(" · ")[2]
        );

        this.downloadEndpoint =
          process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/patient-therapies?code=" +
          code.split(" · ")[1] +
          "&version=" +
          code.split(" · ")[2];

        let labelsGlobalTumorEntityDistribution = Array();
        let countGlobalTumorEntityDistribution = Array();
        let colorsGlobalTumorEntityDistribution = Array();

        let labelsGlobalTumorEntityDistributionDetails = Array();
        let countGlobalTumorEntityDistributionDetails = Array();
        let colorsGlobalTumorEntityDistributionDetails = Array();

        let red = 0;
        let green = 0;
        let blue = 0;

        if (globalTumorEntityDistribution.data.data) {
          for (
            var i = 0;
            i < globalTumorEntityDistribution.data.data.length;
            i++
          ) {
            red = (red + 8) % 255;
            blue = (blue + 16) % 255;
            green = (green + 32) % 255;

            labelsGlobalTumorEntityDistribution.push(
              globalTumorEntityDistribution.data.data[i].concept.display +
                " (" +
                globalTumorEntityDistribution.data.data[i].concept.code +
                ")"
            );

            countGlobalTumorEntityDistribution.push(
              globalTumorEntityDistribution.data.data[i].count
            );

            colorsGlobalTumorEntityDistribution.push(
              "rgba(" + red + ", " + green + ", " + blue + ", 0.4)"
            );

            for (
              var j = 0;
              j < globalTumorEntityDistribution.data.data[i].components.length;
              j++
            ) {
              labelsGlobalTumorEntityDistributionDetails.push(
                globalTumorEntityDistribution.data.data[i].concept.display +
                  " - " +
                  globalTumorEntityDistribution.data.data[i].components[j]
                    .concept.code
              );
              countGlobalTumorEntityDistributionDetails.push(
                globalTumorEntityDistribution.data.data[i].components[j].count
              );
              colorsGlobalTumorEntityDistributionDetails.push(
                "rgba(" + red + ", " + green + ", " + blue + ", 0.4)"
              );
              //this.barChartDataGlobalTumorEntityDistributionDetailsCount += globalTumorEntityDistribution.data.data[i].components[j].count;
            }

            let item = {
              labels: labelsGlobalTumorEntityDistribution,
              datasets: [
                {
                  label: "Häufigkeit",
                  data: countGlobalTumorEntityDistribution,
                  backgroundColor: colorsGlobalTumorEntityDistribution,
                  borderColor: colorsGlobalTumorEntityDistribution,
                  borderWidth: 1,
                },
              ],
            };

            this.barChartDataGlobalTumorEntityDistributionCount +=
              globalTumorEntityDistribution.data.data[i].count;

            let itemDetails = {
              labels: labelsGlobalTumorEntityDistributionDetails,
              datasets: [
                {
                  label: "Häufigkeit",
                  data: countGlobalTumorEntityDistributionDetails,
                  backgroundColor: colorsGlobalTumorEntityDistributionDetails,
                  borderColor: colorsGlobalTumorEntityDistributionDetails,
                  borderWidth: 1,
                },
              ],
            };

            this.barChartDataGlobalTumorEntityDistribution.push(item);
            this.barChartDataGlobalTumorEntityDistributionDetails.push(
              itemDetails
            );
          }

          /*

          if (JSON.stringify(Response.data._issues) != undefined) {
            let connectionErrors = "";
            for (var i = 0; i < Response.data._issues.length; i++) {
              connectionErrors += Response.data._issues[i].details + " · ";
            }

            localStorage.setItem("issues", connectionErrors);
          } else localStorage.removeItem("issues");
          */

          //window.location.reload(true);
        }
      } catch (err) {
        if (err.status === 401) {
          this.$router.push("/");
        } else if (err.response.status === 403) {
          this.$router.push("/403");
        }
      }
    },

    async compileGlobalTumorEntityDistributionTable(code) {
      if (code == undefined) return;
      this.compileTherapyData(code);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        /*
          let request = {
            mode: {
              code: queryMode,
            },
            parameters: {
              medicationsWithUsage: this.selectedDrugs,
            },
          };
          */
      } catch (err) {
        if (err.status === 401) {
          this.$router.push("/");
        } else if (err.response.status === 403) {
          this.$router.push("/403");
        }
      }
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      /*
      let drugsCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + "/ATC"
      );

      let drugsCat = Array();

      for (var i = 0; i < drugsCatRaw.data.entries.length; i++) {
        drugsCat.push(
          drugsCatRaw.data.entries[i].name +
            " · " +
            drugsCatRaw.data.entries[i].code
        );
      }
      */

      let globalReport = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/GlobalQCReport"
      );

      globalMedicationDistribution = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/global-medication-distribution"
      );

      // GLOBAL MEDICATION DISTRUBUTION

      let drugsCat = Array();
      let drugsGroupCat = Array();
      let drugsTableCat = Array();

      let labelsGlobalMedicationDistribution = Array();
      let countGlobalMedicationDistribution = Array();
      let colorsGlobalMedicationDistribution = Array();
      let barChartDataGlobalMedicationDistribution = Array();

      let labelsGlobalMedicationDistributionDetails = Array();
      let countGlobalMedicationDistributionDetails = Array();
      let colorsGlobalMedicationDistributionDetails = Array();
      let barChartDataGlobalMedicationDistributionDetails = Array();

      let red = 0;
      let green = 0;
      let blue = 0;

      if (globalMedicationDistribution.data.data) {
        for (
          var i = 0;
          i < globalMedicationDistribution.data.data.length;
          i++
        ) {
          red = (red + 16) % 255;
          blue = (blue + 32) % 255;
          green = (green + 64) % 255;

          drugsGroupCat.push(
            globalMedicationDistribution.data.data[i].concept.display +
              " · " +
              globalMedicationDistribution.data.data[i].concept.code +
              " · " +
              globalMedicationDistribution.data.data[i].concept.version
          );

          drugsCat.push(
            globalMedicationDistribution.data.data[i].concept.display +
              " · " +
              globalMedicationDistribution.data.data[i].concept.code +
              " · " +
              globalMedicationDistribution.data.data[i].concept.version
          );

          drugsTableCat.push(
            globalMedicationDistribution.data.data[i].concept.display +
              " · " +
              globalMedicationDistribution.data.data[i].concept.code +
              " · " +
              globalMedicationDistribution.data.data[i].concept.version
          );

          labelsGlobalMedicationDistribution.push(
            globalMedicationDistribution.data.data[i].concept.display +
              " (" +
              globalMedicationDistribution.data.data[i].concept.code +
              ")"
          );
          countGlobalMedicationDistribution.push(
            globalMedicationDistribution.data.data[i].count
          );

          colorsGlobalMedicationDistribution.push(
            "rgba(" + red + ", " + green + ", " + blue + ", 0.4)"
          );

          for (
            var j = 0;
            j < globalMedicationDistribution.data.data[i].components.length;
            j++
          ) {
            drugsCat.push(
              globalMedicationDistribution.data.data[i].components[j].concept
                .display +
                " · " +
                globalMedicationDistribution.data.data[i].components[j].concept
                  .code +
                " · " +
                globalMedicationDistribution.data.data[i].components[j].concept
                  .version
            );
            drugsTableCat.push(
              globalMedicationDistribution.data.data[i].components[j].concept
                .display +
                " · " +
                globalMedicationDistribution.data.data[i].components[j].concept
                  .code +
                " · " +
                globalMedicationDistribution.data.data[i].components[j].concept
                  .version
            );

            labelsGlobalMedicationDistributionDetails.push(
              globalMedicationDistribution.data.data[i].components[j].concept
                .display +
                " - " +
                globalMedicationDistribution.data.data[i].components[j].concept
                  .code
            );
            countGlobalMedicationDistributionDetails.push(
              globalMedicationDistribution.data.data[i].components[j].count
            );

            colorsGlobalMedicationDistributionDetails.push(
              "rgba(" + red + ", " + green + ", " + blue + ", 0.4)"
            );
          }
        }

        let item = {
          labels: labelsGlobalMedicationDistribution,
          datasets: [
            {
              label: "Häufigkeit",
              data: countGlobalMedicationDistribution,
              backgroundColor: colorsGlobalMedicationDistribution,
              borderColor: colorsGlobalMedicationDistribution,
              borderWidth: 1,
            },
          ],
        };

        let itemDetails = {
          labels: labelsGlobalMedicationDistributionDetails,
          datasets: [
            {
              label: "Häufigkeit",
              data: countGlobalMedicationDistributionDetails,
              backgroundColor: colorsGlobalMedicationDistributionDetails,
              borderColor: colorsGlobalMedicationDistributionDetails,
              borderWidth: 1,
            },
          ],
        };

        barChartDataGlobalMedicationDistribution.push(item);
        barChartDataGlobalMedicationDistributionDetails.push(itemDetails);
      }

      return {
        globalReport,
        issues: globalReport.data._issues,
        barChartDataGlobalMedicationDistribution,
        barChartDataGlobalMedicationDistributionDetails,
        barChartDataGlobalTumorEntityDistribution,
        barChartDataGlobalTumorEntityDistributionCount,
        barChartDataGlobalTumorEntityDistributionDetails,
        //barChartDataGlobalTumorEntityDistributionDetailsCount,
        barChartDataGlobalMedicationDistributionDetailsOnDemand,
        barChartDataGlobalMedicationDistributionDetailsOnDemandCount,
        drugsCat,
        drugsGroupCat,
        drugsTableCat,
        itemsFiles,
        limitNumberItemsFiles,
        icd10CodesDetailansicht: false,
      };
    } catch (err) {
      if (err.response.status === 401) {
        return redirect("/");
      } else if (err.response.status === 403) {
        return redirect("/403");
      } else {
        return redirect("/" + err.response.status);
      }
    }
  },
};
</script>
