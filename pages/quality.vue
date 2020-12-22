<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <userPanel />
      <v-flex>
        <h3 class="display-3">
          <strong>bwHealthCloud</strong> quality control stats
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
          >Local and Global ZPM statistics are shown below.
          <strong @click="$router.push('help')">Help?</strong>
        </span>
        <v-divider class="my-3"></v-divider>
      </v-flex>
      <v-layout wrap>
        <v-flex d-flex xs12 sm6 md3>
          <v-card
            class="mx-auto"
            flat
            color="deep-orange darken-1"
            dark
            max-width="400"
            v-ripple="{ center: true }"
          >
            <v-card-text class="headline font-weight-thin">
              <p>
                <v-icon color="deep-orange accent-1" dark
                  >fas fa-street-view</v-icon
                >
              </p>
              <strong>{{ localReport.data.patientTotal }}</strong>
              <br />
              Patients in {{ localReport.data.zpm }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>

      <v-icon color="red accent-2">fas fa-location-arrow</v-icon>

      <v-card-title class="title font-weight-light"
        >Local Average Stats</v-card-title
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
              <p><v-icon style="font-size: 1.4rem">fas fa-file-alt</v-icon></p>
              <strong
                >{{ localCompletionStats[0].patient.count }} ({{
                  localCompletionStats[0].patient.percent
                }}%)</strong
              >
              <br />{{ localCompletionStats[0].id }}
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
                <v-icon style="font-size: 1.6rem"
                  >fas fa-clipboard-check</v-icon
                >
              </p>
              <strong
                >{{ localCompletionStats[1].patient.count }} ({{
                  localCompletionStats[1].patient.percent
                }}%)</strong
              >
              <br />{{ localCompletionStats[1].id }}
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
                <v-icon style="font-size: 1.6rem">fas fa-id-badge</v-icon>
              </p>
              <strong
                >{{ localCompletionStats[2].patient.count }} ({{
                  localCompletionStats[2].patient.percent
                }}%)</strong
              >
              <br />{{ localCompletionStats[2].id }}
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
                <v-icon style="font-size: 1.4rem"
                  >fas fa-exclamation-triangle</v-icon
                >
              </p>
              <strong
                >{{ localCompletionStats[3].patient.count }} ({{
                  localCompletionStats[3].patient.percent
                }}%)</strong
              >
              <br />{{ localCompletionStats[3].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-card-title class="title font-weight-light"
        >Local Average Durations</v-card-title
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
                <v-icon style="font-size: 1.4rem">fas fa-asterisk</v-icon>
              </p>
              <strong>{{ localAverageDurations[0].patient.value }} days</strong>
              <br />{{ localAverageDurations[0].id }}
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
                <v-icon style="font-size: 1.4rem"
                  >fas fa-briefcase-medical</v-icon
                >
              </p>
              <strong>{{ localAverageDurations[1].patient.value }} days</strong>
              <br />{{ localAverageDurations[1].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-divider class="my-3"></v-divider>

      <v-icon color="blue accent-2">fas fa-globe-europe</v-icon>

      <v-card-title class="title font-weight-light"
        >Global Completion Stats</v-card-title
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
                >{{ globalCompletionStats[0].patient.count }} ({{
                  globalCompletionStats[0].patient.percent
                }}%)</strong
              >
              <br />{{ globalCompletionStats[0].id }}
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
                <v-icon style="font-size: 1.6rem"
                  >fas fa-clipboard-check</v-icon
                >
              </p>
              <strong
                >{{ globalCompletionStats[1].patient.count }} ({{
                  globalCompletionStats[1].patient.percent
                }}%)</strong
              >
              <br />{{ globalCompletionStats[1].id }}
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
                <v-icon style="font-size: 1.6rem">fas fa-id-badge</v-icon>
              </p>
              <strong
                >{{ globalCompletionStats[2].patient.count }} ({{
                  globalCompletionStats[2].patient.percent
                }}%)</strong
              >
              <br />{{ globalCompletionStats[2].id }}
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
                <v-icon style="font-size: 1.4rem"
                  >fas fa-exclamation-triangle</v-icon
                >
              </p>
              <strong
                >{{ globalCompletionStats[3].patient.count }} ({{
                  globalCompletionStats[3].patient.percent
                }}%)</strong
              >
              <br />{{ globalCompletionStats[3].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-card-title class="title font-weight-light"
        >Global Average Durations</v-card-title
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
                <v-icon style="font-size: 1.4rem">fas fa-asterisk</v-icon>
              </p>
              <strong
                >{{ globalAverageDurations[0].patient.value }} days</strong
              >

              <br />{{ globalAverageDurations[0].id }}
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
                <v-icon style="font-size: 1.4rem"
                  >fas fa-briefcase-medical</v-icon
                >
              </p>
              <strong
                >{{ globalAverageDurations[1].patient.value }} days</strong
              >
              <br />{{ localAverageDurations[1].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>
    </v-container>
    <template></template>
  </v-responsive>
</template>

<script>
import axios from "axios";
import { dirname } from "path";

import userPanel from "~/components/userPanel";
import navPanel from "~/components/navPanel";

let seen = true;

export default {
  data: () => ({}),

  components: {
    userPanel,
    navPanel,
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
      let localReport = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/LocalQCReport"
      );
      let globalReport = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/GlobalQCReport"
      );

      // LOCAL COMPLETION STATUS
      let rawLocalCompletionStats = Array();
      if (localReport.data.completionStats) {
        for (var i = 0; i < localReport.data.completionStats.length; i++) {
          let item = {
            id: localReport.data.completionStats[i].level,
            patient: localReport.data.completionStats[i].frequency,
          };
          rawLocalCompletionStats.push(item);
        }
      }

      // LOCAL AVERAGE DURATIONS
      let rawLocalAverageDurations = Array();
      if (localReport.data.averageDurations) {
        for (var i = 0; i < localReport.data.averageDurations.length; i++) {
          let item = {
            id: localReport.data.averageDurations[i].timeSpan,
            patient: localReport.data.averageDurations[i].duration,
          };
          rawLocalAverageDurations.push(item);
        }
      }

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

      return {
        localReport,
        localCompletionStats: rawLocalCompletionStats,
        localAverageDurations: rawLocalAverageDurations,

        globalReport,
        globalCompletionStats: rawGlobalCompletionStats,
        globalAverageDurations: rawGlobalAverageDurations,
        globalConstituentReports: rawGlobalConstituentReports,
      };
    } catch (err) {
      if (err.response.status === 401) {
        return redirect("/");
      }
    }
  },
};
</script>