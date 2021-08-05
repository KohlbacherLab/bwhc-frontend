<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <userPanel />
      <v-flex>
        <h3 class="display-3">
          <strong>bwHealthCloud</strong> Qualitätskontrolle Statistik
        </h3>

        <span class="subheading subheading font-weight-thin">
          <v-btn
            dark
            icon
            color="blue accent-2"
            align-end
            @click="$router.push('/main')"
          >
            <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
          >bwHC breit ZPM Statistiken finden Sie weiter unten.
          <strong @click="$router.push('help')">Hilfe?</strong>
        </span>
        <v-divider class="my-3"></v-divider>
      </v-flex>

      <v-layout wrap>
        <v-flex d-flex xs12 sm6 md3>
          <v-card
            class="mx-auto"
            flat
            color="yellow darken-1"
            light
            max-width="400"
            v-ripple="{ center: true }"
          >
            <v-card-text class="headline font-weight-thin">
              <p>
                <v-icon color="yellow accent-1" dark>fas fa-street-view</v-icon>
              </p>
              <strong>{{ globalReport.data.patientTotal }}</strong>
              <br />
              Gesamtzahl Patienten in bwHC
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>

      <v-icon color="yellow darken-1">fas fa-globe-europe</v-icon>

      <v-card-title class="title font-weight-light"
        >Globale Übersicht</v-card-title
      >

      <v-layout wrap fluid>
        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-2"
            light
            width="250"
            v-ripple="{ center: true }"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem">fas fa-file-alt</v-icon>
              </p>
              <strong
                >{{ globalCompletionStats[0].patient.count }} ({{
                  globalCompletionStats[0].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ globalCompletionStats[0].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-2"
            light
            width="250"
            v-ripple="{ center: true }"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.6rem"
                  >fas fa-clipboard-check</v-icon
                >
              </p>
              <strong
                >{{ globalCompletionStats[1].patient.count }} ({{
                  globalCompletionStats[1].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ globalCompletionStats[1].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-2"
            light
            width="250"
            v-ripple="{ center: true }"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.6rem">fas fa-id-badge</v-icon>
              </p>
              <strong
                >{{ globalCompletionStats[2].patient.count }} ({{
                  globalCompletionStats[2].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ globalCompletionStats[2].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-2"
            light
            width="250"
            v-ripple="{ center: true }"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem"
                  >fas fa-exclamation-triangle</v-icon
                >
              </p>
              <strong
                >{{ globalCompletionStats[3].patient.count }} ({{
                  globalCompletionStats[3].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ globalCompletionStats[3].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-card-title class="title font-weight-light"
        >Globale Mittlere Dauern</v-card-title
      >
      <v-layout wrap fluid>
        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-2"
            light
            width="250"
            v-ripple="{ center: true }"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon>
              </p>
              <strong
                >{{ globalAverageDurations[0].patient.value }}
                {{ globalAverageDurations[0].patient.unit }}</strong
              >

              <br />{{ globalAverageDurations[0].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-2"
            light
            width="250"
            v-ripple="{ center: true }"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                ><v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon>
              </p>
              <strong
                >{{ globalAverageDurations[1].patient.value }}
                {{ globalAverageDurations[1].patient.unit }}</strong
              >
              <br />{{ globalAverageDurations[1].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-2"
            light
            width="250"
            v-ripple="{ center: true }"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                ><v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                ><v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon>
              </p>
              <strong
                >{{ globalAverageDurations[2].patient.value }}
                {{ globalAverageDurations[2].patient.unit }}</strong
              >
              <br />{{ globalAverageDurations[2].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>

      <v-col
        v-for="(globalConstituentReport, i) in globalConstituentReports"
        :key="i"
      >
        <v-flex d-flex xs12 sm6 md3>
          <v-card-title class="title font-weight-light"
            >ZPM {{ globalConstituentReport.zpm }}
            <div class="caption">
              <p>
               Gesamtzahl Patienten: {{ globalConstituentReport.patientTotal }}
              </p>
            </div></v-card-title
          ></v-flex
        >
        <v-layout wrap fluid>
          <v-flex d-flex xs12 sm6 md3>
            <v-card
              flat
              color="grey lighten-4"
              light
              width="250"
              v-ripple="{ center: true }"
            >
              <v-card-text class="title font-weight-thin">
                <p>
                  <v-icon style="font-size: 1.4rem">fas fa-file-alt</v-icon>
                </p>
                <strong
                  >{{
                    globalConstituentReport.completionStats[0].frequency.count
                  }}
                  ({{
                    globalConstituentReport.completionStats[0].frequency.percent.toFixed(
                      1
                    )
                  }}%)</strong
                >
                <br />{{ globalConstituentReport.completionStats[0].level }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm6 md3>
            <v-card
              flat
              color="grey lighten-4"
              light
              width="250"
              v-ripple="{ center: true }"
            >
              <v-card-text class="title font-weight-thin">
                <p>
                  <v-icon style="font-size: 1.4rem">fas fa-file-alt</v-icon>
                </p>
                <strong
                  >{{
                    globalConstituentReport.completionStats[1].frequency.count
                  }}
                  ({{
                    globalConstituentReport.completionStats[1].frequency.percent.toFixed(
                      1
                    )
                  }}%)</strong
                >
                <br />{{ globalConstituentReport.completionStats[1].level }}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md3>
            <v-card
              flat
              color="grey lighten-4"
              light
              width="250"
              v-ripple="{ center: true }"
            >
              <v-card-text class="title font-weight-thin">
                <p>
                  <v-icon style="font-size: 1.4rem">fas fa-file-alt</v-icon>
                </p>
                <strong
                  >{{
                    globalConstituentReport.completionStats[2].frequency.count
                  }}
                  ({{
                    globalConstituentReport.completionStats[2].frequency.percent.toFixed(
                      1
                    )
                  }}%)</strong
                >
                <br />{{ globalConstituentReport.completionStats[2].level }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm6 md3>
            <v-card
              flat
              color="grey lighten-4"
              light
              width="250"
              v-ripple="{ center: true }"
            >
              <v-card-text class="title font-weight-thin">
                <p>
                  <v-icon style="font-size: 1.4rem">fas fa-file-alt</v-icon>
                </p>
                <strong
                  >{{
                    globalConstituentReport.completionStats[3].frequency.count
                  }}
                  ({{
                    globalConstituentReport.completionStats[3].frequency.percent.toFixed(
                      1
                    )
                  }}%)</strong
                >
                <br />{{ globalConstituentReport.completionStats[3].level }}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-flex d-flex xs12 sm6 md3>
          <v-card-title class="title font-weight-light"
            >Mittlere Dauern</v-card-title
          >
        </v-flex>
        <v-layout wrap fluid>
          <v-flex d-flex xs12 sm6 md3>
            <v-card
              flat
              color="grey lighten-4"
              light
              width="250"
              v-ripple="{ center: true }"
            >
              <v-card-text class="title font-weight-thin">
                <p>
                  <v-icon style="font-size: 1.4rem"
                    >fas fa-chevron-right</v-icon
                  >
                </p>
                <strong
                  >{{
                    globalConstituentReport.averageDurations[0].duration.value
                  }}
                  {{
                    globalConstituentReport.averageDurations[0].duration.unit
                  }}</strong
                >

                <br />{{ globalConstituentReport.averageDurations[0].timeSpan }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm6 md3>
            <v-card
              flat
              color="grey lighten-4"
              light
              width="250"
              v-ripple="{ center: true }"
            >
              <v-card-text class="title font-weight-thin">
                <p>
                  <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                  ><v-icon style="font-size: 1.4rem"
                    >fas fa-chevron-right</v-icon
                  >
                </p>
                <strong
                  >{{
                    globalConstituentReport.averageDurations[1].duration.value
                  }}
                  {{
                    globalConstituentReport.averageDurations[1].duration.unit
                  }}</strong
                >

                <br />{{ globalConstituentReport.averageDurations[1].timeSpan }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm6 md3>
            <v-card
              flat
              color="grey lighten-4"
              light
              width="250"
              v-ripple="{ center: true }"
            >
              <v-card-text class="title font-weight-thin">
                <p>
                  <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                  ><v-icon style="font-size: 1.4rem"
                    >fas fa-chevron-right</v-icon
                  ><v-icon style="font-size: 1.4rem"
                    >fas fa-chevron-right</v-icon
                  >
                </p>
                <strong
                  >{{
                    globalConstituentReport.averageDurations[2].duration.value
                  }}
                  {{
                    globalConstituentReport.averageDurations[2].duration.unit
                  }}</strong
                >

                <br />{{ globalConstituentReport.averageDurations[2].timeSpan }}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-divider class="my-3"></v-divider>
      </v-col>

      <v-card-title class="title font-weight-light">Fehler</v-card-title>
      <v-col v-for="(issue, i) in issues" :key="i">
        <div class="caption">{{ issue.details }}</div>
      </v-col>
    </v-container>
    <template></template>
  </v-responsive>
</template>

<script>
import axios from "axios";
import { dirname } from "path";

import userPanel from "~/components/userPanel";

let seen = true;

export default {
  data: () => ({}),

  components: {
    userPanel,
  },

  computed: {
    form() {
      return {
        //diagnosis: this.diagnosis,
      };
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let globalReport = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/GlobalQCReport"
      );

      //alert(JSON.stringify(globalReport));

      // GLOBAL COMPLETION STATS
      let rawGlobalCompletionStats = Array();
      if (globalReport.data.completionStats) {
        for (var i = 0; i < globalReport.data.completionStats.length; i++) {
          let item = {
            id: globalReport.data.completionStats[i].level,
            patient: globalReport.data.completionStats[i].frequency,
          };
          rawGlobalCompletionStats.push(item);
        }
      }

      // GLOBAL AVERAGE DURATIONS
      let rawGlobalAverageDurations = Array();
      if (globalReport.data.averageDurations) {
        for (var i = 0; i < globalReport.data.averageDurations.length; i++) {
          let item = {
            id: globalReport.data.averageDurations[i].timeSpan,
            patient: globalReport.data.averageDurations[i].duration,
          };
          rawGlobalAverageDurations.push(item);
        }
      }

      // GLOBAL CONSTITUENT REPORTS
      /*
      let rawGlobalConstituentReports = Array();
      if (globalReport.data.constituentReports) {
        for (var i = 0; i < globalReport.data.constituentReports.length; i++) {
          let item = {
            id: globalReport.data.constituentReports[i].timeSpan,
            patient: globalReport.data.constituentReports[i].duration,
          };
          rawGlobalConstituentReports.push(item);
        }
      }
      */

      return {
        globalReport,
        globalCompletionStats: rawGlobalCompletionStats,
        globalAverageDurations: rawGlobalAverageDurations,
        globalConstituentReports: globalReport.data.constituentReports,
        issues: globalReport.data._issues,
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
